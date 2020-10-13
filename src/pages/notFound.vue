<template>
  <!-- path: 'register', query: { plan: 'private' } -->
  <!-- <router-link :to="{ name: 'product', params: { id: 123 }}"> -->
  <!-- <router-link :to="{ path: 'product', query: { id: 123 }}"> -->
  <router-link to="/">
    <div  class="container">
      <!-- <img class="container" :src="`404.jpeg`"> -->
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'NotFound',
  mounted () {
    console.log('404的mounted')
  }
}
</script>

<style lang='stylus' scoped>
  .container
    position: absolute
    width: 100%
    height: 100%
    background: url("http://localhost:8080/404.jpeg") no-repeat center
    background-size:100% 100%
</style>