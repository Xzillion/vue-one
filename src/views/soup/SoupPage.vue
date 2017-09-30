// 鸡汤页面
<template>
  <div id="soup-page">
    <b-scroll
      ref="scroll"
      :data="soupList"
      :pullUpLoad="pullUpLoadObj"
      @pullingUp="onPullingUp"
    >
      <div slot="scroll-content" class="soup-list">
        <div class="soup-item" v-for="(item, index) in soupList" :key="index">
          <cover-image class="soup-image" :imgSource="item.hp_img_url"></cover-image>
          <div class="soup-overlay">
            <span class="title">{{item.hp_title}}</span>
            <span class="author">{{item.hp_author}}</span>
          </div>
        </div>
      </div>
    </b-scroll>
  </div>
</template>

<script>
  import BScroll from '../../components/BScroll.vue'
  import CoverImage from '../../components/CoverImage.vue'
  import api from '../../common/api'
  import {mapMutations} from 'vuex'

  export default {
    name: 'soup-page',
    data () {
      return {
        soupList: [], // 鸡汤列表
        soupIdList: [], // 鸡汤id列表
        pullUpLoadObj: { // 是否允许上拉加载更多 可传入对象用于配置上拉距离和加载提示
          threshold: 50,
          txt: {
            more: '加载更多',
            noMore: '没有更多数据'
          }
        },
        headerTitle: '鸡汤'
      }
    },
    components: {
      CoverImage,
      BScroll
    },
    mounted () {
      this.$vux.loading.show({
        text: '数据载入中...'
      })
      this.setHeaderTitle(this.headerTitle)
      this.getSoupList()
    },
    methods: {
      getSoupList (soupId = 0) {
        this.$store.commit('setLoadState', true) // 正在加载
        api.getSoupList(soupId) // 获取鸡汤id列表
          .then((data) => {
            this.soupIdList.push(...data)
            return this.$http.all(data.map(this.getSoupDetail)) // 根据列表获取鸡汤详情
          })
          .then((data) => {
            this.$store.commit('setLoadState', false)
            this.$vux.loading.hide()
            if (soupId !== 0) {
              this.$refs.scroll.forceUpdate()
            }
            this.soupList.push(...data)
          })
          .catch(() => {
            this.$store.commit('setLoadState', false)
            this.$vux.loading.hide()
            if (soupId !== 0) {
              this.$refs.scroll.forceUpdate()
            }
            this.$vux.toast.text('数据载入失败', 'middle')
          })
      },
      getSoupDetail (soupId) { // 获取鸡汤详情
        return api.getSoupDetail(soupId)
      },
      onPullingUp () { // 触发上拉动作时
        return (!this.$store.state.isLoading) && this.getSoupList(this.soupIdList[this.soupIdList.length - 1]) // 获取更多数据
      },
      ...mapMutations([
        'setHeaderTitle'
      ])
    }
  }
</script>

<style lang="less">
  #soup-page {
    position: relative;
    width: 100%;
    height: 100%;
    .soup-item {
      position: relative;
      height: 2.5rem;
      .soup-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .4);
        .title {
          position: absolute;
          right: .1rem;
          bottom: .2rem;
          color: @white-bgcolor;
          font-size: @soup-index-title;
        }
        .author {
          position: absolute;
          right: .1rem;
          bottom: 0;
          color: @white-bgcolor;
          font-size: @mini-font-size;
        }
      }
    }
  }
</style>
