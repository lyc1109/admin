<template>
  <div id="header">
    <headbar></headbar>
    <sidebar></sidebar>
    <div class="shade" v-show="shade" @click="shadeClick()"></div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import sidebar from './layouts/sidebar.vue'
  import headbar from './layouts/headbar.vue'
  export default {
    name: 'header',
    components: {
      sidebar,
      headbar
    },
    computed: {
      ...mapState({
        shade: (state) => state.shade
      })
    },
    methods: {
      shadeClick(){
        this.$store.state.leftNav = false
        setTimeout(() => {
          this.$store.state.shade = false
        },400)
        this.$store.state.isFixed = false
        this.$store.state.normal = true
        this.$store.state.ed = false
      }
    }
  }
</script>
