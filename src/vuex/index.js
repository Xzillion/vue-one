// 状态管理
import Vue from 'vue'
import Vuex from 'vuex'
import api from '../common/api'
import util from '../common/utils'
import axios from 'axios'
Vue.use(Vuex)

const store = {
  state: { // 组件状态
    isLoading: false, // 是否正在加载数据
    swatchColor: '#000', // 主色
    headerTitle: '', // 顶栏标题
    titleTextColor: '#fff', // 标题栏文字颜色
    bodyTextColor: '#fff', // 主体文字颜色
    home: { // 首页相关
      drawerImg: '' // drawer图片
    }
  },
  mutations: { // 改变状态
    setDrawerImage (state, imgUrl) {
      state.home.drawerImg = imgUrl
    },
    setLoadState (state, loadState, delay = 0) {
      setTimeout(() => {
        state.isLoading = loadState
      }, delay)
    },
    setHeaderTitle (state, headerTitle) {
      state.headerTitle = headerTitle
    },
    setSwatchColor (state, swatchColor) {
      state.swatchColor = swatchColor
    },
    setTitleTextColor (state, titleTextColor) {
      state.titleTextColor = titleTextColor
    },
    setBodyTextColor (state, bodyTextColor) {
      state.bodyTextColor = bodyTextColor
    }
  },
  actions: { // 组件动作
    initSwatch ({commit}) { // 获取今日鸡汤图片初始化swatch
      axios.get(`${api.getTodaySoup}`)
        .then((data) => {
          let todaySoupObj = Vue.filter('axiosRespFilter')(data)
          commit('setDrawerImage', todaySoupObj.hp_img_url) // 设置drawer图片
          return util.getImagePalette(todaySoupObj.hp_img_url)
        })
        .then((swatch) => {
          commit('setSwatchColor', swatch.getHex().toString())
          commit('setTitleTextColor', swatch.getTitleTextColor().toString())
          commit('setBodyTextColor', swatch.getBodyTextColor().toString())
        })
        .catch((err) => {
          Vue.$vux.toast.text(err.toString(), 'middle')
        })
    }
  }
}
export default new Vuex.Store(store)

