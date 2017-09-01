<template>
  <div class="cover-image" :style="imageStyle"></div>
</template>

<script>
  export default {
    name: 'cover-image',
    props: {
      imgSource: {
        default: ''
      }
    },
    computed: {
      imageStyle () {
        return {
          backgroundImage: `url(${this.imgSource})`, // 如果将props属性放入data中使用 则父组件更新props值的时候不会触发子组件更新
          backgroundSize: 'cover'
        }
      }
    }
  }
</script>

<style lang="less">
  .cover-image {
    width: 100%;
    height: 100%;
  }
</style>
