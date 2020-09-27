<template>
  <div class="noDate">
    <img src="/imgs/icon-no-data.png" alt="">
    <p>暂无数据</p>
  </div>
</template>

<script>
export default {
  name:'NoDate'
}
</script>

<style lang="scss">
  .noDate{
    text-align: center;
    img{
      width: 520px;
      height: 368px;
    }
    p{
      font-size: 16px;
    }
  }
</style>