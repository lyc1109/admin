<template>
  <div class="full-height valign-center">
    <div class="align-center block-center font-light">
      <p class="margin-top">正在处理授权登录信息，请稍候...</p>
    </div>
  </div>
</template>

<script>
  import app from "@/assets/scriptes/app"
  import Utils from "@/assets/scriptes/utils"
  import types from "@/vuex/types"

  export default {
    name: "access-token",
    created() {
      const accessTokenCode = Utils.parseUrlParam("code")
//      console.log(accessTokenCode)
      if (accessTokenCode !== null && accessTokenCode !== "") {
        this.accessToken(accessTokenCode)
      }
    },
    methods: {
      accessToken(accessTokenCode){
        this.$http.post(this.$basehost + "/oauth/access_token", {
          "client_id": app.appId,
          "client_secret": app.appSecret,
          "code": accessTokenCode
        })
          .then((authToken) => {
            console.log(authToken)
            this.$store.commit(types.oauth.updateAuthToken, authToken)
            // 获取当前用户信息
            this.getCurUser()
          })
      },

      getCurUser() {
        this.$http.get(this.$apihost + "/user")
          .then((user) => {
            this.$store.commit(types.oauth.updateCurUser, user)
            sessionStorage.setItem('user',user.loginName)
            this.redirect()
          })
      },

      // 重定向
      redirect() {
        const redirectUri = this.$route.query.redirect
        if (redirectUri !== undefined && typeof redirectUri !== 'undefined') {
          this.$router.replace(redirectUri)
        } else {
          this.$router.replace("/")
        }
      }
    }
  }
</script>
