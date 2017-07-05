<template>
  <div class='full-height valign-center'>
    <div class='align-center block-center font-light'>
      <div class='inline-block'>
        <p color='#bbbec4' :size='28'></p>
      </div>
      <p class='margin-top'>正在登出系统，请稍候...</p>
    </div>
  </div>
</template>

<script>
  import app from '@/assets/scriptes/app'
  import types from '@/vuex/types'
  export default{
    name: 'logout',
    created () {
      this.$http.post(this.$basehost + '/logout')
        .then((resp) => {
          // 获取重定向路径
          let redirect = ''
//          const role = this.$store.getters[types.oauth.getRole]
//          if(role === 'USER') {
//            const curShop = this.$store.getters[types.oauth.getCurShop]
//            redirect = '/shop_' + curShop.id
//          } else {
            redirect = '/index'
//          }
          // 清理授权信息
          this.$store.commit(types.oauth.updateAuthToken, '')
          this.$store.commit(types.oauth.updateCurUser, null)
          this.$store.commit(types.oauth.updateCurShop, null)
          // 重新登录
          this.$router.replace({
            path: '/login',
            query: { redirect: redirect }
          })
        })
    }
  }
</script>
