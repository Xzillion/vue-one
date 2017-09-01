// 状态管理
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = {
  state: { // 组件状态
    home: { // 首页相关
      drawerImg: ''
    }
  },
  mutations: { // 改变状态
    setDrawerImage (state, imgUrl) {
      state.home.drawerImg = imgUrl
    }
  }
}
export default new Vuex.Store(store)

