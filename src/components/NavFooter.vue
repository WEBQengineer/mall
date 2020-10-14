<template>
  <div class="container">
    <div class="mallLogo">
      <img src="/imgs/logo-mi.png" alt="" class="logoImg" />
      <h3 class="logoName" href="">小米商城</h3>
    </div>
    <div class="copyright">
      <a href="" target="_blank">河畔一角主页</a>
      <a href="" target="_blank">Vue全栈课程</a>
      <a href="" target="_blank">React全家桶课程</a>
      <a href="" target="_blank">微信支付专项课程（H5+小程序+Node+Mongo）</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nav-footer'
}
</script>

<style lang="scss" scoped>
  @import 'scss/config.scss';
  .container{
    height: 185.8px;
    width: 100%;
    background: #333333;
    text-align: center;
    border-top: 4px solid $colorA;
    .copyright{
      a {
        color: #999999;
        //给a标签加伪元素
        &:after {
          content: '|';
          margin: 0 5px;
        }
        &:last-child:after{
          content: '';
        }
      }
    }
    .mallLogo{
      img{
        width: 53px;
        height: 36px;
        margin-top: 37px;
        margin-bottom: 13px;
      }
      .logoName{
        color: #999999;
        font-size:16px;
        font-weight:400;
        margin-bottom: 31px;
      }
    }
  }                        
</style>