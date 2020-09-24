<template>
  <div class="itemsContainer">
    <div v-for="(item, index) of radioItems"
      name="selfRadio"
      :key="index"
      class="radioItems"
      :class="{itemChecked:(index==clickNum)}"
      @click="changeItem(index);onchecked(item)"
    >
      <slot>{{item}}</slot>
    </div>
  </div>
</template>

<script>
  export default{
    name:'SelfRadio',
    props:{
      radioItems: Array
    },
    data(){
      return{
        //设置默认选中的值
        clickNum: 0
      }
    },
    methods: {
      changeItem(itemNum){
        this.clickNum = itemNum
      },
      onchecked(item){
        this.$emit('onchecked',item)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .itemsContainer{
    display: flex;
    justify-content: space-between;
    .radioItems{
      margin-right: 10px;
    }
  }
  .itemChecked{
    background: rgb(129, 115, 84);
  }
</style>
