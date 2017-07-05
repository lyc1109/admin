/**
 * Created by lyc on 2017/3/16.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const login = (resolve) => require(['@/pages/login/login.vue'], resolve)
const home = (resolve) => require(['@/components/home.vue'], resolve)
const index = (resolve) => require(['@/components/index.vue'], resolve)
const reset = (resolve) => require(['@/pages/user/reset.vue'],resolve)
const business = (resolve) => require(['@/pages/business/index.vue'],resolve)
const businessDetail = (resolve) => require(['@/pages/business/detail.vue'],resolve)
const iotDevice = (resolve) => require(['@/pages/iotDevice/index.vue'],resolve)
const iotDeviceDetail = (resolve) => require(['@/pages/iotDevice/detail.vue'],resolve)
const accessToken = (resolve) => require(['@/pages/login/accessToken.vue'],resolve)
const loginOut = (resolve) => require(['@/pages/login/loginout.vue'],resolve)

const routers = [
  {
    name: 'login',
    path: '/login',
    component: login,
    meta: {
      requireAuth: false
    }
  },
  {
    name: 'accessToken',
    path: '/access/token',
    component: accessToken,
    meta: {
      requireAuth: false
    }
  },
  {
    name: 'loginOut',
    path: '/logout',
    component: loginOut,
    meta: {
      requireAuth: false
    }
  },
  {
    name: 'reset',
    path: '/reset',
    component: reset,
    meta: {
      requireAuth: false
    }
  },
  {
    name: 'index',
    path: '/index',
    component: index
  },
    {
      name: 'home',
      path: '/',
      redirect: '/index',
      // meta: {
      //   requireAuth: true
      // },
      component: home,
      children: [
        {
          name: 'index',
          path: '/index',
          component: index
        },
        {
          name: 'business',
          path: '/business',
          component: business
        },
        {
          name: 'businessDetail',
          path: '/business/:id',
          component: businessDetail
        },
        {
          name: 'iotDevice',
          path: '/iotDevice/',
          component: iotDevice
        },
        {
          name: 'iotDeviceDetail',
          path: '/iotDevice/detail',
          component: iotDeviceDetail
        }
      ]
    }
]

export default routers
