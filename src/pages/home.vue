<template>
  <div class="homePage">
    <nav-header></nav-header>
    <router-view></router-view>
    <div class="zw">占位1000px</div>
    <nav-footer class="navFooter"></nav-footer>
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
  .homePage{
    .zw{
      height: 1px;
    };
  }
  
</style>
