<template>
  <div id="app">
    <p style="text-align: center">正在登录中...</p>
  </div>
</template>

<script type="application/ecmascript">
  import * as types from '@/vuex/types'
  import app from '@/assets/scriptes/app'
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button"
  export default {
    components: {ElButton},
    name: 'login',
    created: function () {

      // 登录后重定向URL
      const redirect = this.$route.query.redirect
      const appId = app.appId

      // 接收access code地址
      let accessCodeUrl = "http://localhost:8085/access/token?redirect=" + redirect
      // 授权地址
      let authUrl = null
      if (app.isLocal) {
        authUrl = "http://localhost:8080"
      } else if (app.isDev) {
        authUrl = "http://192.168.199.10:8081"
      } else if (app.isStage){
        authUrl = this.$basehost
        accessCodeUrl = "http://test.xohaa.net/access/token?redirect=" + redirect
      } else if (app.isProduct){
        authUrl = this.$basehost
        accessCodeUrl = "http://www.xohaa.net/access/token?redirect=" + redirect
      }
      window.location.href = authUrl + "/oauth/authorize?client_id="+ appId +"&redirect_uri=" + accessCodeUrl
    }
  }
</script>
