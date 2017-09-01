// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './vuex'

// 引入插件式组件
import './vux-init'

// 兼容es6 promise
require('es6-promise').polyfill()

// 解决移动端点击延迟问题
require('fastclick').attach(document.body)

// 初始化过滤器和指令
import './common/filter'
import './common/directive'

// 引入重置样式
import './styles/reset.less'

// 引入字体图标
import './styles/iconfont.css'

Vue.config.productionTip = false

// 引入axios管理http请求
Vue.prototype.$http = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
