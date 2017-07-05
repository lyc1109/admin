<template>
  <div class="sidebar">
    <transition name="listtoggle" enter-active-class="animated slideInLeft" leave-active-class="animated slideOutLeft">
      <div class="left_nav" v-show="leftNav">
        <el-menu theme="dark" class="el-menu-vertical-demo">
          <div v-for="item in tab1" @click="selectTab()">
            <router-link :to="{ path: item.link }">
              <el-menu-item index="0"><i :class="[fa,'fa-'+ item.icon]"></i>{{ item.name }}</el-menu-item>
            </router-link>
          </div>
        </el-menu>
      </div>
    </transition>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default{
    name: "sidebar",
    data () {
      return {
        isAct: 0,
        isAct1: -1,
        fa: 'fa',
        tab1: [
          {
            name: 'Dashboard',
            link: '/index',
            icon: 'home'
          },
          {
            name: '企业管理',
            link: '/business',
            icon: 'wrench'
          },
          {
            name: 'Iot设备管理',
            link: '/iotDevice',
            icon: 'file-text'
          },
          {
            name: '服务订单管理',
            link: '/home',
            icon: 'user-o'
          },
          {
            name: '用户管理',
            link: '/home',
            icon: 'cube'
          },
          {
            name: '服务器管理',
            link: '/home',
            icon: 'briefcase'
          },
          {
            name: '日志管理',
            link: '/home',
            icon: 'btc'
          }
        ]
      }
    },
    created(){
        this.browser()
    },
    computed: {
      ...mapState({
        leftNav: (state) => state.leftNav,
        shade: (state) => state.shade
      })
    },
    methods: {
      browser(){
        if(screen.width <= 1199){
          this.$store.state.leftNav = false
        }else{
          this.$store.state.leftNav = true
        }
      },
      selectTab(){
        this.$store.state.shade = false
        this.$store.state.normal = true
        this.$store.state.ed = false
        this.$store.state.isFixed = false
        if(screen.width <= 1199){
          this.$store.state.leftNav = false
        }else{
          this.$store.state.leftNav = true
        }
      }
    }
  }
</script>
