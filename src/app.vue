<template>
  <div id="app">
    <headbar></headbar>
    <sidebar></sidebar>
    <router-view></router-view>
  </div>
</template>

<script>
  // 公共布局
  import headbar from '@/components/layouts/headbar'
  import sidebar from '@/components/layouts/sidebar'
  import helpbar from '@/components/layouts/helpbar'

  export default {
    name: 'app',
    components: {
      headbar: headbar,
      sidebar: sidebar,
      helpbar: helpbar
    }
  }
</script>
