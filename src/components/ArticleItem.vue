// 文章['p
<template>
  <div class="article-item">
    <img class="author-avatar" :src="authorAvatar"/><span class="author-name">{{authorName}}</span>
    <h1 class="article-title">{{articleTitle}}</h1>
    <p class="left-symbol"><i class="iconfont icon-yinhao-left"></i></p>
    <div class="article-abstract"><p class="center">{{articleAbstract}}</p></div>
    <p class="right-symbol"><i class="iconfont icon-yinhao-right"></i></p>
  </div>
</template>

<script>
  export default {
    name: 'article-item',
    props: {
      authorAvatar: {
        type: String
      }, // 作者头像
      authorName: {
        type: String
      }, // 作者名称
      articleTitle: {
        type: String
      }, // 文章标题
      articleAbstract: {
        type: String
      }// 文章摘要
    }
  }
</script>

<style lang="less">
  @import "../styles/mixin";

  .article-item {
    padding: .1rem;
    margin-bottom: .1rem;
    width: 100%;
    // height: 1.5rem;
    background: @white-bgcolor;
    border: 1px solid @border-bgcolor;
    border-radius: .06rem;
    box-shadow: 0 7px 28px rgba(0, 0, 0, 0.25), 0 5px 10px rgba(0, 0, 0, 0.22);
    overflow: hidden;
    .author-avatar {
      width: .4rem;
      height: .4rem;
      border-radius: .4rem;
    }
    .author-name {
      display: inline-block;
      margin-left: .08rem;
      max-width: 2rem;
      color: @title-font-color;
      font-size: @medium-font-size;
      vertical-align: middle;
      .overHide();
    }
    .article-title {
      display: block;
      margin: .1rem 0;
      max-width: 100%;
      color: @black-bgcolor;
      font-size: @large-font-size;
      font-weight: normal;
      .overHide();
    }
    .article-abstract {
      padding: .05rem .15rem;
      color: @minor-font-color;
      font-size: @small-font-size;
      text-align: center;
      .center {
        display: inline-block;
        text-align: left;
      }
    }
    .left-symbol {
      text-align: left;
    }
    .right-symbol {
      text-align: right;
    }
    .iconfont {
      font-size: @small-font-size;
      color: @tint-dark-color;
    }
  }
</style>
