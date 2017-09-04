// 文章['p
<template>
  <div class="article-item">
    <img class="author-avatar" :src="authorAvatar"/><span class="author-name">{{authorName}}</span>
    <label class="article-title">{{articleTitle}}</label>
    <p class="article-abstract" v-html="articleAbstract"></p>
  </div>
</template>

<script type="es6">
  export default {
    name: 'article-item',
    props: {
      authorAvatar, // 作者头像
      authorName, // 作者名称
      articleTitle, // 文章标题
      articleAbstract // 文章摘要
    }
  }
</script>

<style lang="less">
  @import "../styles/mixin";

  .article-item {
    padding: .1rem;
    margin-bottom: .1rem;
    width: 100%;
    height: 1.2rem;
    background: @white-bgcolor;
    border-radius: .08rem;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    overflow: hidden;
    .author-avatar {
      width: .4rem;
      height: .4rem;
      border-radius: .4rem;
    }
    .author-name {
      margin-left: .08rem;
      max-width: .5rem;
      color: @title-font-color;
      font-size: @medium-font-size;
      .overHide();
    }
    .article-title {
      margin-top: .05rem;
      max-width: 1rem;
      color: @black-bgcolor;
      font-size: @large-font-size;
      .overHide();
    }
    .article-abstract {
      margin-top: .05rem;
      color: @minor-font-color;
      font-size: @small-font-size;
      .overHide();
    }
  }
</style>
