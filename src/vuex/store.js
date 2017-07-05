/**
 * Created by lyc on 2017/3/20.
 */
import Vue from 'vue'
import Vuex from 'vuex'
// import actions from './actions';
// import mutations from './mutations';
// import state from './state';
// import types from './types'
import auth from './auth'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    // user: {},
    // token: null,
    title: '',
    leftNav: false,
    shade: false,
    isFixed: false,
    normal: true,
    ed: false
    // leftAnimate: false,
    // rightAnimate: false
  },
  mutations: {
    // [types.LOGIN]: (state, data) => {
    //   sessionStorage.token = data
    //   state.token = data
    // },
    // [types.LOGOUT]: (state) => {
    //   sessionStorage.removeItem('token')
    //   state.token = null
    // },
    listToggle(state){
      if(state.leftNav === false){
        state.leftNav = true
        state.normal = false
        state.ed = true
        setTimeout(() => {
          state.shade = true
          state.isFixed = true
        },400)

        // state.leftAnimate = true
        // state.rightAnimate = false
      }else{
        state.leftNav = false
        state.normal = true
        state.ed = false
        setTimeout(() => {
          state.shade = false
          state.isFixed = false
        },400)
        // state.leftAnimate = false
        // state.rightAnimate = true
      }
    }
  },
  modules: {
    auth
  }
})

export default store
