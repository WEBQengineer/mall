<template>
  <div class="service">
    <div class="container">
      <ul class="serviceList">
        <li><span class="iconfont iconItem">&#xe74b; </span>预约维修服务</li>
        <li class="septal-line"></li>
        <li><span class="iconfont iconItem">&#xe691; </span>7天无理由退货</li>
        <li class="septal-line"></li>
        <li><span class="iconfont iconItem">&#xe60c; </span>15天免费换货</li>
        <li class="septal-line"></li>
        <li><span class="iconfont iconItem">&#xe63e; </span>满150元包邮</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default{
    name:'service-bar'
  }
</script>

<style lang="scss" scoped>
  @import 'scss/mixin.scss';
  @import 'scss/config.scss';
  .service{
    width: 1226px;
    margin: 0 auto;
    .container{
      padding: 32px 0;
      .serviceList {
        @include flex(space-around);
        li {
          @include flex(flex-start,center);
          font-size: 16px;
          color: #666666;
          .iconItem{
            font-size: 24px;
            margin-right: 8px;
          }
        }
        .septal-line{
          width: 1px;
          height: 34px;
          border-right: 1px solid #E5E5E5;
        }
      }
    }
  }
</style>
