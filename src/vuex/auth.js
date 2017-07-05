/**
 * Created by lyc on 2017/6/19.
 */
// 授权验证管理
import types from './types'
import app from '@/assets/scriptes/app'

const TOKEN_KEY = "authToken"
const USER_KEY = "curUser"
const SHOP_KEY = "curShop"

export default {
  state: {
    authToken: app.storage.get(TOKEN_KEY),
    curUser: app.storage.get(USER_KEY),
    curShop: app.storage.get(SHOP_KEY),
    userRole: "USER"
  },
  mutations: {
    /**
     * 更新授权token
     *
     * @param state 状态对象
     * @param token auth token
     */
    [types.oauth.updateAuthToken]: (state, token) => {
      state.authToken = token
      console.log(state.authToken)
      let storageToken = app.storage.get(TOKEN_KEY)
      if (storageToken === null || storageToken !== token) {
        app.storage.set(TOKEN_KEY, token)
      }
    },

    /**
     * 更新当前用户
     *
     * @param state  状态对象
     * @param curUsr 当前用户信息
     */
    [types.oauth.updateCurUser]: (state, curUsr) => {
      state.curUser = curUsr
      app.storage.set(USER_KEY, curUsr)
    },

    /**
     * 更新当前店铺信息
     *
     * @param state   状态对象
     * @param curShop 当前店铺
     */
    [types.oauth.updateCurShop]: (state, curShop) => {
      state.curShop = curShop
      app.storage.set(SHOP_KEY, curShop)
    },

    /**
     * 更新当前用户角色
     *
     * @param state   状态对象
     * @param role 当前店铺
     */
    [types.oauth.updateRole]: (state, role) => {
      state.userRole = role
    }
  },
  getters: {
    /**
     * 获取授权token
     *
     * @param state 状态对象
     * @returns 返回token
     */
    [types.oauth.getAuthToken]: (state) => state.authToken,

    /**
     * 获取当前用户
     *
     * @param state 状态对象
     * @returns 返回当前用户
     */
    [types.oauth.getCurUser]: (state) => state.curUser,

    /**
     * 获取当前店铺
     *
     * @param state 状态对象
     * @returns 返回当前店铺
     */
    [types.oauth.getCurShop]: (state) => state.curShop,

    /**
     * 获取当前用户角色
     *
     * @param state 状态对象
     * @returns 返回当前角色
     */
    [types.oauth.getRole]: (state) => state.userRole
  }
}
