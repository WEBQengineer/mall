<template>
  <div class="container">
    <div class="mallLogo">
      <img src="/imgs/logo-mi.png" alt="" class="logoImg" />
      <h3 class="logoName" href="">小米商城</h3>
    </div>
    <div class="copyright">
      <a href="https://blog.csdn.net/weixin_38724114" target="_blank">陈志强的博客</a>
      <a href="https://blog.csdn.net/weixin_38724114" target="_blank">小米商城</a>
      <a href="https://blog.csdn.net/weixin_38724114" target="_blank">MIUI</a>
      <a href="https://blog.csdn.net/weixin_38724114" target="_blank">游戏</a>
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