<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      res: {}
    }
  },
  mounted () {
    // 本地mock
    // this.axios.get('/mock/user/login.json').then((res)=>{
    //   this.res = res
    // })

    this.axios.get('/user/login').then((res)=>{
      this.res = res
    })
  }
}
</script>

<style>

</style>
