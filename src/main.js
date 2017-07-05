import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import routers from '@/router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import home from '@/components/home.vue'
import store from '@/vuex/store'
import Axios from 'axios'
import http from '@/assets/scriptes/http'
import types from './vuex/types'
import '@/assets/scss/app.scss'
import echarts from 'echarts'
import 'animate.css'
import VueBus from 'vue-bus'
import moment from 'moment'
require('@/assets/scss/app.scss')

require('es6-promise').polyfill()
Vue.config.debug = true
Vue.use(ElementUI)
// Vue.use(Button)
// Vue.use(Select)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueBus)
Vue.prototype.axios = Axios
Vue.prototype.echarts = echarts
Vue.prototype.$moment = moment

// 其它通用配置
// -----------------------------------------------
Vue.config.productionTip = false

// api地址配置
Vue.prototype.$http = http
Vue.prototype.$basehost = process.env.HOST_BASE
Vue.prototype.$apihost = process.env.API_HOST_BASE
// Vue.prototype.api = '/api'

const router = new VueRouter({
  mode: 'history',
  routes: routers
})

// 页面刷新时，重新赋值token
// if (window.sessionStorage.getItem('token')) {
//   store.commit(types.LOGIN, window.sessionStorage.getItem('token'))
// }
//
// router.beforeEach((to, from, next) => {
//   if (to.matched.some((r) => r.meta.requireAuth)) {
//     if (store.state.token) {
//       next()
//     } else {
//       next({
//         path: '/login',
//         query: {
//           redirect: to.fullPath
//         }
//       })
//     }
//   } else {
//     next()
//   }
// })
// 登录拦截操作
router.beforeEach((to, from, next) => {
  // 默认所有路由都需要授权
  // 例外请在路由中配置： { meta: { requireAuth: true } }
  let requireAuth = to.meta.requireAuth
  if (typeof (requireAuth) === "undefined") {
    requireAuth = true
  }

  if (requireAuth === true) {
    // 通过vuex state获取当前的token是否存在
    const token = store.getters[types.oauth.getAuthToken]
    // console.log(token)
    if (token !== null && token !== "") {
      // console.log(token)
      // localStorage.setItem('token',token)
      next()
    } else {
      // 将跳转的路由path作为参数，登录成功后跳转到该路由
      console.log("授权信息失效，重新登录...")
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})


new Vue({
  el: '#app',
  store,
  router,
  mounted(){
    // 监听登录处理
    this.$bus.on("oauth", () => {
      router.replace({
        path: '/login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    })
  },
  render: (h) => h(home)
}).$mount('#app')
