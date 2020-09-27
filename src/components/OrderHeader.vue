<template>
  <div class="order-header">
    <div class="container clearfix">
      <div class="header-logo fl">
        <a href="/#/index"></a>
      </div>
      <div class="orderTitle fl">
        <h2>
          {{orderTitle}}
          <!-- 下面一行要用span -->
          <slot name="tip"></slot>
        </h2>
      </div>
      <div class="username fr">
        <a href="javascript:;">{{username}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'order-header',
  props:{
    orderTitle: String
  },
  computed:{
    ...mapState(['username'])
  }
}
</script>

<style lang='scss'>
  @import 'scss/base.scss';
  @import 'scss/mixin.scss';
  .order-header{
    padding: 30px 0;
    .orderTitle{
      color: #333333;
      margin-left: 55px;
      h2{
        color: #424242;
        font-size: 24px;
        font-weight: 400
      }
      span{
        font-size:14px;
        margin-left:17px;
        color:#999999;
        font-weight:200;
      }
    }
    .username{
      a{
        color: #656565;
        font-size: 16px;
      }
    }
    .username,.orderTitle{
      display: inline-block;
      height: 55px;
      line-height: 55px;
    }
  }
</style>