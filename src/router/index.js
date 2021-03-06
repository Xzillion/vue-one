// 路由配置
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/home/soup'
  },
  {
    path: '/home',
    redirect: '/home/soup',
    component: (resolved) => require(['../views/Home.vue'], resolved), // 按需加载页面文件
    children: [ // 子路由
      {
        name: 'soup',
        path: 'soup',
        component: (resolved) => require(['../views/soup/SoupPage.vue'], resolved)
      },
      {
        name: 'article',
        path: 'article',
        component: (resolved) => require(['../views/article/ArticlePage.vue'], resolved)
      }
    ]
  }
]
export default new Router({
  routes
})
