<template>
  <div>
    <nav-header></nav-header>
    <router-view></router-view>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
  import NavHeader from './../components/NavHeader'
  import NavFooter from './../components/NavFooter'
  export default{
    name:'nav-home',
    components:{
      NavHeader,
      NavFooter
    },
    mounted () {
      console.log('home组件的mounted')
    }
  }
</script>

<style lang="scss" scoped>
  
</style>
