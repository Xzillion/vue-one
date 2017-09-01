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
        >
          <ul class="menu-list" slot="scroll-content">
            <li class="menu-item" :class="{'active':item.active}" v-for="(item, index) in menuList" :key="index" @click="">
              <i :class="item.icon"></i><span class="title">{{item.title}}</span>
            </li>
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
          :title="title"
          :transition="headerTransition"
        >
          <span slot="overwrite-left" @click="showDrawer = !showDrawer">
            <x-icon type="navicon" class="nav-icon" size="35"></x-icon>
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

  export default {
    name: 'home',
    components: {
      CoverImage,
      Drawer,
      XHeader,
      ViewBox,
      BScroll
    },
    data () {
      return {
        showDrawer: false,
        leftOptions: {
          showBack: false,
          backText: ''
        },
        rightOptions: {
          showMore: false
        },
        title: '首页',
        headerTransition: 'vux-header-fade-in-left',
        drawerStyle: {
          backgroundColor: '#fff',
          width: '2.5rem'
        },
        menuList: [
          {
            icon: 'iconfont icon-heart',
            title: '鸡汤',
            active: true
          },
          {
            icon: 'iconfont icon-articles',
            title: '文章'
          },
          {
            icon: 'iconfont icon-movie',
            title: '电影'
          }

        ]
      }
    },
    computed: {
      drawerImg () {
        return this.$store.state.home.drawerImg
      }
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
      background: #000;
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
