<template>
  <div class="headbar">
    <i :class="{ listImg: normal,listImged: ed }" @click="listToggle" class="listImage"></i>
    <el-menu class="el-menu-top" mode="horizontal">
      <div class="left_head">
        <div class="head_img">
          <img src="./../../assets/images/login_img.jpg">
          <span>小哈伙伴</span>
        </div>
      </div>
      <el-submenu index="1" class="nav_top">
        <template slot="title">{{loginNames}}</template>
        <!--<el-menu-item index="2-1">小哈智服</el-menu-item>-->
        <!--<span>{{title}}</span>-->
        <el-menu-item index="2-2" @click="logout">登出系统</el-menu-item>
      </el-submenu>
      <!--<el-menu-item index="2" class="bell">消息</el-menu-item>-->
    </el-menu>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import types from './../../vuex/types'
  export default{
    name: "headbar",
    data(){
      return {
        loginNames: ''
      }
    },
    computed: {
      ...mapState({
        title: (state) => state.title,
        token: (state) => state.token,
        leftNav: (state) => state.leftNav,
        isFixed: (state) => state.isFixed,
        normal: (state) => state.normal,
        ed: (state) => state.ed
      })
    },
    created(){
      this.browser()
    },
    methods: {
      logout () {
//        this.$store.commit(types.LOGOUT)
        this.$router.push({
          path: '/logout'
        })
      },
      listToggle(e){
        this.$store.commit('listToggle',e.target.leftNav)
      },
      browser(){
        let userName = sessionStorage.getItem('user')
        this.loginNames = userName
        if(screen.width <= 1199){
          this.$store.state.leftNav = false
        }else{
          this.$store.state.leftNav = true
        }
      }
    }
  }
</script>
