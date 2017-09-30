<template>
  <div id="home">
    <drawer
      :show.sync="showDrawer"
      show-mode="overlay"
      placement="left"
      :drawer-style="drawerStyle"
    >
      <!--drawer content-->
      <div slot="drawer" class="drawer-content">
        <cover-image class="drawer-img" :img-source="drawerImg"></cover-image>
        <b-scroll
          class="menu-wrapper"
          :data="menuList"
          :click="true"
        >
          <ul class="menu-list" slot="scroll-content">
            <router-link class="menu-item" :to="item.link" active-class="active" v-for="(item, index) in menuList"
                         :key="index" @click.native="changeRoute(item.title)" tag="li">
              <i :class="item.icon"></i><span class="title">{{item.title}}</span>
            </router-link>
          </ul>
        </b-scroll>
      </div>
      <!--main content-->
      <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="0px">
        <x-header
          slot="header"
          class="header"
          :left-options="leftOptions"
          :right-options="rightOptions"
          :transition="headerTransition"
          :style="headerStyle"
        >
          <span :style="headerStyle">{{headerTitle}}</span>
          <span slot="overwrite-left" @click="showDrawer = !showDrawer">
            <x-icon type="navicon" class="nav-icon" size="35" :style="headerStyle"></x-icon>
          </span>
        </x-header>
        <router-view></router-view>
      </view-box>
    </drawer>
  </div>
</template>

<script>
  import {Drawer, XHeader, ViewBox} from 'vux'
  import CoverImage from '../components/CoverImage'
  import BScroll from '../components/BScroll'
  import {mapState} from 'vuex'

  export default {
    name: 'home',
    components: {
      CoverImage,
      Drawer,
      XHeader,
      ViewBox,
      BScroll
    },
    created () {
      this.$store.dispatch('initSwatch') // 发出初始化swatch请求
    },
    data () {
      return {
        leftOptions: {
          showBack: false,
          backText: ''
        },
        rightOptions: {
          showMore: false
        },
        headerTransition: 'vux-header-fade-in-left',
        drawerStyle: {
          backgroundColor: '#fff',
          width: '2.5rem'
        },
        showDrawer: false, // 是否打开drawer
        menuList: [
          {
            icon: 'iconfont icon-heart',
            title: '鸡汤',
            link: '/home/soup'
          },
          {
            icon: 'iconfont icon-articles',
            title: '文章',
            link: '/home/article'
          },
          {
            icon: 'iconfont icon-movie',
            title: '电影',
            link: '/home/movie'
          }

        ]
      }
    },
    methods: { // 事件
      changeRoute () {
        this.showDrawer = !this.showDrawer
      }
    },
    computed: {
      ...mapState({
        drawerImg: state => state.home.drawerImg,
        headerStyle: state => {
          return {
            backgroundColor: state.swatchColor,
            color: state.titleTextColor + '!important',
            fill: state.titleTextColor
          }
        },
        headerTitle: state => state.headerTitle
      })
    }
  }
</script>

<style lang="less">
  #home {
    position: relative;
    height: 100%;
    .header {
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 100;
      .nav-icon {
        fill: #fff;
        position: relative;
        top: -8px;
        left: -3px;
      }
    }
    .drawer-content {
      .drawer-img {
        width: 100%;
        height: 2rem;
      }
      .menu-wrapper {
        margin-top: .3rem;
        width: 100%;
        text-align: left;
      }
      .menu-list {
        width: 100%;
        .menu-item {
          padding-left: .5rem;
          line-height: .4rem;
          color: @minor-font-color;

          .iconfont {
            font-size: @icon-large-size;
            vertical-align: middle;
          }
          .title {
            margin-left: .5rem;
            font-size: @large-font-size;
            vertical-align: middle;
          }
          &.active, &:hover {
            color: @main-color;
            background: @border-bgcolor;
          }
        }
      }
    }
  }
</style>
