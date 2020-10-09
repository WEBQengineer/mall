<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
// import { mapActions } from 'vuex';
export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      res: {}
    }
  },
  methods: {
    getUser () {
      this.axios.get('/user').then((res={})=>{
        this.$store.dispatch('saveUserName',res.username);
      })
    },
    getCartCount () {
      this.axios.get('/carts/products/sum').then((res=0)=>{
        this.$store.dispatch('saveCartCount',res);
      })
    },
    // ...mapActions(['saveUserName','saveCartCount'])
  },
  mounted () {
    if (this.$cookie.get('userId')) {
      this.getUser()
      this.getCartCount()
    }
  }
}
</script>

<style lang='scss'>
  @import 'scss/base.scss';
  @import 'scss/mixin.scss';
  @import 'scss/config.scss';
  @import 'scss/button.scss';
</style>
