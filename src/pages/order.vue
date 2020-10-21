<template>
  <div>
    <router-view></router-view>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavFooter from 'components/NavFooter'
import ServiceBar from 'components/ServiceBar'
export default {
  name: 'order',
  components: {
    NavFooter,
    ServiceBar
  },
  data(){
    return{
      tip:'',
      desc:''
    }
  },
  mounted(){
    this.getPath();
 
  },
  methods:{
    getPath(){
      let path = this.$route.path;
      if (path == '/order/list') {
        this.tip = '订单列表'
        this.desc = '请谨防钓鱼链接或诈骗电话'
      } else if (path == '/order/confirm'){
        this.tip = '订单确认'
        this.desc = '请谨防钓鱼链接或诈骗电话'
      } else if (path == '/order/pay'){
        this.tip = '微信支付'
        this.desc = '请谨防钓鱼链接或诈骗电话'
      }
    }
  }
}
</script>