// 文章页面
<template>
  <div id="article-page">
    <b-scroll
      :data="articleList"
      :pullUpLoad="pullUpLoadObj"
      @pullingUp="onPullingUp"
    >
      <div slot="scroll-content" class="article-list">
        <article-item v-for="item in articleList" :author-avatar="item.author.web_url"
                      :author-name="item.author.user_name" :article-title="item.hp_title"
                      :article-abstract="item.hp_content.substr(0, 100)">

        </article-item>
      </div>
    </b-scroll>
  </div>
</template>

<script type="es6">
  import BScroll from '../components/BScroll.vue'
  import ArticleItem from '../components/ArticleItem.vue'
  import api from '../common/api'

</script>
