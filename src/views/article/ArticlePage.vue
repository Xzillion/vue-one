// 文章页面
<template>
  <div id="article-page">
    <b-scroll
      ref="scroll"
      :scrollbar="scrollBarObj"
      :data="articleList"
      :pullUpLoad="pullUpLoadObj"
      @pullingUp="onPullingUp"
    >
      <div slot="scroll-content" class="article-list">
        <article-item v-for="(item, index) in articleList" :author-avatar="item.author[0].web_url"
                      :author-name="item.author[0].user_name" :article-title="item.hp_title"
                      :article-abstract="item.guide_word" :key="index">

        </article-item>
      </div>
    </b-scroll>
  </div>
</template>

<script type="es6">
  import BScroll from '../../components/BScroll.vue'
  import ArticleItem from '../../components/ArticleItem.vue'
  import api from '../../common/api'
  import { dateFormat } from 'vux'
  import Vue from 'vue'
  import {mapMutations} from 'vuex'

  export default {
    name: 'article',
    data () {
      return {
        articleList: [], // 鸡汤列表
        scrollBarObj: { //滚动条属性
          fade: true // 是否自动消失
        },
        pullUpLoadObj: { // 是否允许上拉加载更多 可传入对象用于配置上拉距离和加载提示
          threshold: 100,
          stop: 100,
          txt: {
            more: '加载更多',
            noMore: '没有更多数据'
          }
        }, // 是否允许上拉加载更多 可传入对象用于配置上拉距离和加载提示,
        sourceTime: new Date(), // 文章数据源的时间
        headerTitle: '文章'
      }
    },
    components: {
      BScroll,
      ArticleItem
    },
    created () {
      this.$vux.loading.show({
        text: '数据载入中...'
      })
      this.setHeaderTitle(this.headerTitle)
      this.getArticleList()
    },
    methods: {
      getArticleList (sourceTime = new Date()) {
        this.$store.commit('setLoadState', true) // 正在加载
        this.$http.get(`${api.getArticleList}${dateFormat(sourceTime, 'YYYY-MM')}`) // 获取文章列表
          .then((data) => {
            this.sourceTime.setMonth(this.sourceTime.getMonth() - 1) // 获取上一个月的日期
            this.$store.commit('setLoadState', false, 1000) // 延迟1s改变状态
            this.$vux.loading.hide()
            this.$refs.scroll.forceUpdate()
            this.articleList.push(...Vue.filter('axiosRespFilter')(data))
          })
          .catch(() => {
            this.$store.commit('setLoadState', false, 1000) // 延迟1s改变状态
            this.$vux.loading.hide()
            this.$refs.scroll.forceUpdate()
            this.$vux.toast.text('数据载入失败', 'middle')
          })
      },
      onPullingUp () { // 触发上拉动作时
        return (!this.$store.state.isLoading) && this.getArticleList(this.sourceTime) // 获取更多数据
      },
      ...mapMutations([
        'setHeaderTitle'
      ]),
    }
  }
</script>

<style lang="less">
  #article-page {
    position: relative;
    width: 100%;
    height: 100%;
    .article-list {
      padding: .1rem;
    }
  }
</style>
