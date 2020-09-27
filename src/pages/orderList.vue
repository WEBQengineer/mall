<template>
  <div class="order-list">
    <order-header orderTitle="订单列表">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话</span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <loading v-if="loadingImg"></loading>
          <div class="order" v-for="item of orderList" :key="item.orderNo">
            <div class="order-title">
              <div class="item-info fl">
                {{item.createTime}}
                <span>|</span>
                订单号：{{item.orderNo}}
                <span>|</span>
                在线支付
              </div>
              <div class="item-money fr">
                <span>应付金额：</span>
                <span class="money">{{item.payment}}</span>
                <span>元</span>
              </div>
            </div>
            <div class="order-content clearfix">
              <div class="good-box fl">
                <div class="good-list" v-for="goodItem of item.orderItemVoList" :key="goodItem.productId">
                  <div class="good-img">
                    <img v-lazy="goodItem.productImage" alt="">
                  </div>
                  <div class="good-name">
                    <div class="p-name">{{goodItem.productName}}</div>
                    <div class="p-money">{{goodItem.currentUnitPrice}}</div>
                  </div>
                </div>
              </div>
              <div class="good-state fr">
                <a href="javascript:;">未支付</a>
              </div>
            </div>
          </div>
          <no-date v-if="orderList.length == 0 && loadingImg==false"></no-date>
        </div>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="pageSize"
          @current-change="handleChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import OrderHeader from 'components/OrderHeader';
  import Loading from 'components/Loading';
  import NoDate from 'components/NoDate';
  import { Pagination } from 'element-ui';
  export default{
    name:'order-list',
    data(){
      return{
        orderList:[],//订单列表
        loadingImg:true, //加载中状态提示
        pageSize:10,
        pageNum:1,
        total:0
      }
    },
    components:{
      OrderHeader,
      Loading,
      NoDate,
      [Pagination.name]:Pagination
    },
    mounted () {
      this.getOrderList()
    },
    methods:{
      getOrderList(){
        this.axios.get('/orders',{
          params:{
            pageSize: 10,
            pageNum: this.pageNum
          }
        }).then((res)=>{
          this.orderList = res.list
          this.loadingImg = false
          this.total = res.total
          this.pageSize = res.pageSize
        }).catch(()=>{
          this.loadingImg = false
        })
      },
      handleChange(pageNum){
        this.pageNum = pageNum;
        this.getOrderList()
      }
    }
  }
</script>
<style lang="scss">
  @import './../assets/scss/config.scss';
  @import './../assets/scss/mixin.scss';
  .order-list{
    .wrapper{
      background-color:$colorJ;
      padding-top:33px;
      padding-bottom:110px;
      .order-box{
        .order{
          @include border();
          background-color:$colorG;
          margin-bottom:31px;
          &:last-child{
            margin-bottom:0;
          }
          .order-title{
            @include height(74px);
            background-color:$colorK;
            padding:0 43px;
            font-size:16px;
            color:$colorC;
            .item-info{
              span{
                margin:0 9px;
              }
            }
            .money{
              font-size:26px;
              color:$colorB;
            }
          }
          .order-content{
            padding:0 43px;
            .good-box{
              width:88%;
              .good-list{
                display: flex;
                align-items: center;
                height:145px;
                .good-img{
                  width:112px;
                  img{
                    width:100%;
                  }
                }
                .good-name{
                  font-size:20px;
                  color:$colorB;
                }
              }
            }
            .good-state{
              @include height(145px);
              font-size: 20px;
              color:$colorA;
              a{
                color:$colorA;
              }
            }
          }
        }
      }
      //分页器
      .el-pagination{
        text-align:right;
        margin-top: 18px;
        .el-pager li:not(.disabled).active{
          background-color: #FF6600;
        }
      }
    }
  }
</style>