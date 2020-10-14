<template>
  <div class="order-pay">
    <order-header orderTitle="订单支付">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话</span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="order-wrap">
          <div class="item-order">
            <div class="icon-succ"></div>
            <div class="order-info">
              <h2>订单提交成功！去付款咯～</h2>
              <p>请在<span>30分</span>内完成支付, 超时后将取消订单</p>
              <p>收货信息：{{this.addInfo}}</p>
            </div>
            <div class="order-total">
              <p>应付总额：<span>{{payment}}</span>元</p>
              <p>订单详情<em class="icon-down" :class="{'up':showDetail}"  @click="showDetail=!showDetail"></em></p>
            </div>
          </div>
          <div class="item-detail" v-if="showDetail">
            <div class="item">
              <div class="detail-title">订单号：</div>
              <div class="detail-info theme-color">{{orderNo}}</div>
            </div>
            <div class="item good">
              <div class="detail-title">商品名称：</div>
              <div class="detail-info">
                <ul>
                  <li v-for="(item,index) in orderItemVoList" :key="index">
                    <img v-lazy="item.productImage"/>{{item.productName}}
                  </li>
                </ul>
              </div>
            </div>
            <div class="item">
              <div class="detail-title">发票信息：</div>
              <div class="detail-info">电子发票 个人</div>
            </div>
          </div>
        </div>
        <div class="item-pay">
          <h3>选择以下支付方式付款</h3>
          <div class="pay-way">
            <p>支付平台</p>
            <div class="pay pay-ali" :class="{'checked':payMethodAli}" @click="payTypeAli"></div>
            <div class="pay pay-wechat" :class="{'checked':payMethodWeChat}" @click="payTypeWeChat"></div>
          </div>
        </div>
      </div>
    </div>
    <scan-pay-code v-if="showPay"></scan-pay-code>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>您还未支付，确认返回吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogOk">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import OrderHeader from 'components/OrderHeader';
import { Dialog, Button } from 'element-ui';
export default{
  name:'order-pay',
  data(){
    return {
      orderNo:this.$route.query.orderNo,
      showDetail:false,//是否显示订单详情
      showPay:false,//是否显示微信支付弹框
      addInfo:'', //地址信息
      orderItemVoList:[], //订单信息
      payment: 0,
      payMethodAli:true,
      payMethodWeChat:false,
      isConfirmed:false,
      dialogVisible:false,
      closeDialog: 1,//规定该参数为0时关闭dialog弹窗，默认设置为一，也可以自定义设置其它数值
      timer: null  //监听对话框的setInterval
    }
  },
  components:{
    OrderHeader,
    [Button.name]:Button,
    [Dialog.name]:Dialog
  },
  //禁止返回结算页
  beforeRouteLeave (to, from, next) {
    // from.path == '/order/pay' && 
    if (to.path == '/order/confirm') {
      this.dialogVisible = true;//打开对话框
      let count = 0;
      this.timer = setInterval(() => {
        if (this.closeDialog == 0 && count == 0) {
          ++count;//限制只执行一次
          this.dialogVisible = false;//关闭对话框
          next({ path: '/', replace: true })
          console.log('beforeRouteLeave执行！')
        }
      }, 100);
    } else {
      next()
    }
  },
  mounted(){
    this.getOrderDetail();
  },
  methods:{
    clearTimeoutOk(){
      clearTimeout(this.timer)
    },
    handleClose(){},
    dialogOk(){
      this.closeDialog = 0
      // setTimeout(this.clearTimeoutOk,1000)
      setTimeout(()=>{clearTimeout(this.timer)},1000)
    },
    payTypeAli(){
      if (this.payMethodAli == true) {
        return
      }
      this.payMethodAli = true
      this.payMethodWeChat = false
    },
    payTypeWeChat(){
      if (this.payMethodWeChat == true) {
        return
      }
      this.payMethodAli = false
      this.payMethodWeChat = true
    },
    // 关闭微信弹框
    closePayModal(){
      this.showPay = false;
      this.showPayModal = true;
      clearInterval(this.T);
    },
    goOrderList(){
      this.$router.push('/order/list');
    },
    getOrderDetail(){
      this.axios.get(`/orders/${this.orderNo}`).then((res)=>{
        //地址信息
        let addInfo = res.shippingVo;
        this.addInfo = `${addInfo.receiverMobile} ${addInfo.receiverName} ${addInfo.receiverProvince} ${addInfo.receiverCity} ${addInfo.receiverDistrict} ${addInfo.receiverAddress}`
        this.orderItemVoList = res.orderItemVoList;//订单商品信息
        this.payment = res.payment //总金额
      })
    }
  }
}
</script>
<style lang="scss">
  .order-pay{
    .wrapper{
      background-color:#F5F5F5;
      padding-top:30px;
      padding-bottom:61px;
      .order-wrap{
        padding: 62px 50px;
        background-color: #fff;
        font-size:14px;
        margin-bottom:30px;
        .item-order{
          display: flex;
          align-items: center;
          .icon-succ{
            width: 90px;
            height: 90px;
            border-radius: 50%;
            background:url('/imgs/icon-gou.png') #80c58a no-repeat center;
            background-size:60px;
            margin-right:40px;
          }
          .order-info{
            margin-right: 248px;
            h2{
              font-size:24px;
              color:#333333;
              margin-bottom:20px;
            }
            p{
              color:#666666;
              span{
                color:#FF6700;
              }
            }
          }
          .order-total{
            &>p:first-child{
              margin-bottom:30px;
            }
            span{
              font-size:28px;
              color:#FF6700;
            }
            .icon-down{
              display:inline-block;
              width:14px;
              height:10px;
              background:url('/imgs/icon-down.png') no-repeat center;
              background-size:contain;
              margin-left:9px;
              transition:all .5s;
              cursor:pointer;
              &.up{
                transform: rotate(180deg);
              }
            }
          }
        }
        .item-detail{
          border-top: 1px solid #D7D7D7;
          padding-top: 47px;
          padding-left: 130px;
          font-size: 14px;
          margin-top: 45px;
          .item{
            margin-bottom:19px;
            .detail-title{
              float:left;
              width:100px;
            }
            .detail-info{
              display:inline-block;
              img{
                width: 30px;
                vertical-align: middle;
              }
            }
          }
        }
      }
      .item-pay{
        padding:26px 50px 72px;
        background-color:#ffffff;
        color: #333333;
        h3{
          font-size: 20px;
          font-weight: 200;
          color: #333333;
          padding-bottom: 24px;
          border-bottom: 1px solid #D7D7D7;
          margin-bottom: 26px;
        }
        .pay-way{
          font-size:18px;
          .pay{
            display:inline-block;
            width:188px;
            height:64px;
            border:1px solid #D7D7D7;
            cursor:pointer;
            &:last-child{
              margin-left:20px;
            }
            &.checked{
              border:1px solid #FF6700;
            }
          }
          .pay-ali{
            background:url('/imgs/pay/icon-ali.png') no-repeat center;
            background-size:103px 38px;
            margin-top:19px;
          }
          .pay-wechat{
            background:url('/imgs/pay/icon-wechat.png') no-repeat center;
            background-size:103px 38px;
          }
        }
      }
    }
  }
</style>
