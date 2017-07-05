/**
 * Created by lyc on 2017/3/23.
 */
export const LOGIN = 'login'

export const LOGOUT = 'logout'

export default {
  // 授权相关操作
  oauth: {
    getAuthToken: "getAuthToken",
    updateAuthToken: "updateAuthToken",

    getCurUser: "getCurUser",
    updateCurUser: "updateCurUser",

    getCurShop: "getCurShop",
    updateCurShop: "updateCurShop",

    getRole: "getRole",
    updateRole: "updateRole"
  }
}
