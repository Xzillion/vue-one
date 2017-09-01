// 注册过滤器

import Vue from 'vue'

/**
 * 简化axios返回的数据对象
 * @resp axios返回的对象
 * return 简化后的对象
 */
Vue.filter('axiosRespFilter', (resp) => {
  if (Array.isArray(resp)) { // 数组，则简化数组的每一个item
    return resp.map((item) => {
      return item.data.data
    })
  } else {
    return resp.data.data
  }
})
