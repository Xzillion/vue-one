/* eslint-disable */
/* 接口声明
  One的基础访问api
  鸡汤
   获取前十期鸡汤列表 	http://v3.wufazhuce.com:8000/api/hp/idlist/0 获取的是鸡汤的id列表
   获取某鸡汤id前的十期 	http://v3.wufazhuce.com:8000/api/hp/idlist/1400 获取鸡汤1400前面的十期鸡汤id
   获取某月的鸡汤 		http://v3.wufazhuce.com:8000/api/hp/bymonth/yyyy-mm-01 某月鸡汤是所有信息
   获取某期鸡汤详情 	http://v3.wufazhuce.com:8000/api/hp/detail/id
  文章
   获取前十期文章列表 	http://v3.wufazhuce.com:8000/api/reading/index 包含近十期的文章 问题 长篇连载 的id
   获取某月的文章列表      http://v3.wufazhuce.com:8000/api/essay/bymonth/yyyy-mm-01 id 标题 简介 作者 头像
   获取某期文章详情	    http://v3.wufazhuce.com:8000/api/essay/id
   获取以index为基准的五期 http://v3.wufazhuce.com:8000/api/reading/index/20 index/0 为最近一到五期 递加类推 1：六到十期 。。。。文章 问题 长篇连载 列表
 电影
  获取最新前20期电影		http://v3.wufazhuce.com:8000/api/movie/list/0
  获取某id的之前20期		http://v3.wufazhuce.com:8000/api/movie/list/id
  获取某电影详情			http://v3.wufazhuce.com:8000/api/movie/detail/id
  获取某期电影所有的评论故事 	http://v3.wufazhuce.com:8000/api/movie/id/story/0/0
  获取某期最佳评论故事	 http://v3.wufazhuce.com:8000/api/movie/id/story/1/0 */

import axios from 'axios'
import Vue from 'vue'
import { dateFormat } from 'vux'

const BASE_URL = 'http://v3.wufazhuce.com:8000/api/'
let api = {
  // 鸡汤相关
  getSoupList: (id = 0) => {// 获取鸡汤列表
    console.log(this)
    return api.requestHandler.get(`${BASE_URL}hp/idlist/${id}`)
  },
  getSoupDetail: (id = 0) => {// 获取鸡汤详情
    return api.requestHandler.get(`${BASE_URL}hp/detail/${id}`)
  },
  // 文章相关
  getArticleList: (date = new Date()) => { // 获取某月文章列表
    return api.requestHandler.get(`${BASE_URL}essay/bymonth/${dateFormat(date, 'YYYY-MM')}`)
  },
  getArticleDetail: (id = 0) => { // 获取某期文章详情
    return api.requestHandler.get(`${BASE_URL}essay/${id}`)
  },
  // 电影相关
  getMovieList: (id = 0) => { //

    return this.requestHandler.get(`${BASE_URL}movie/list/${id}`)
  },
  requestHandler: {
      get: (url) => {
        return axios.get(url)
          .then((data) => {
            return Vue.filter('axiosRespFilter')(data) //Promise.resolve(Vue.filter('axiosRespFilter')(data))
          })
          /*.catch((err) => {
            return Promise.reject(err)
          })*/
      }
  }

}
export default api
