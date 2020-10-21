<template>
  <div class="nav-bar"  :class="{'is_fixed':isFixed}">
    <div class="container">
      <div class="pro-title">
        {{title}}
      </div>
      <div class="pro-param">
        <a href="javascript:;" @click="selfMsg">概述</a><span>|</span>
        <a href="javascript:;" @click="selfMsg">参数</a><span>|</span>
        <a href="javascript:;" @click="selfMsg">用户评价</a>
        <slot name='buy'></slot>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    name:'nav-bar',
    props:{
      title:String
    },
    data () {
     return {
       isFixed: false
     }
    },
    methods: {
      //提示'敬请期待'
      selfMsg(){
        this.$message.success('敬请期待')
      },
      printTop (){
        let topDis = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        this.isFixed = topDis>=152 ? true : false
      }
    },
    mounted () {
      window.addEventListener('scroll', this.printTop)
    },
    destroyed () {
      window.removeEventListener('scroll',this.printTop,false)
    }
  }
</script>
<style lang="scss">
  @import 'scss/config.scss';
  @import 'scss/mixin.scss';
  .nav-bar{
    height:70px;
    line-height:70px;
    border-top:1px solid $colorH;
    background-color:$colorG;
    z-index:10;
    &.is_fixed{
      position: fixed;
      top: 0px;
      width: 100%;
    }
    .container{
      background: #fff;
      @include flex();
      .pro-title{
        font-size: 18px;
      }
      .pro-param{
        font-size: 14px;
        a{
          color: #656565;
        }
        span{
          margin: 0 8px;
        }
      }
    }
  }
</style>