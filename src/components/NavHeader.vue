<template>
  <div class="header">
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-menu">
          <router-link :to="{ name: 'product', params: { id: 45 }}">小米商城</router-link>
          <router-link :to="{ name: 'product', params: { id: 45 }}">MUI</router-link>
          <router-link :to="{ name: 'product', params: { id: 45 }}">云服务</router-link>
          <router-link :to="{ name: 'product', params: { id: 45 }}">金融</router-link>
          <router-link :to="{ name: 'product', params: { id: 45 }}">有品</router-link>
          <router-link :to="{ name: 'product', params: { id: 45 }}">小爱开放平台</router-link>
          <router-link :to="{ name: 'product', params: { id: 45 }}">企业团购</router-link>
          <router-link :to="{ name: 'product', params: { id: 45 }}">资质证照</router-link>
          <router-link :to="{ name: 'product', params: { id: 45 }}">协议规则</router-link>
          <router-link :to="{ name: 'product', params: { id: 45 }}">下载app</router-link>
          <router-link :to="{ name: 'product', params: { id: 45 }}">智能生活</router-link>
          <router-link :to="{ name: 'product', params: { id: 45 }}">Select Location</router-link>
        </div>
        <div class="topbar-user">
          <a href="javascript:;" v-if="username">{{username}}</a>
          <a href="javascript:;" v-if="!username" @click="login">登陆</a>
          <a href="javascript:;" v-if="username" @click="logout">退出</a>
          <a href="/#/order/list" v-if="username">我的订单</a>
          <a href="javascript:;"
            class="my-cart"
            @click="goToCart"
          >
            <span class="icon-cart" @click="goToCart">
              <span class="iconfont">&#xe600;</span>
              购物车({{cartCount}})
            </span>
          </a>
        </div>
      </div>
    </div>
    <div class="nav-header">
      <div class="container">
        <div class="header-logo">
          <a href="/#/index"></a>
        </div>
        <div class="actImg">
          <img src="/imgs/mithank.gif" alt="">
        </div>
        <div class="header-menu">
          <div class="item-menu"
            key="world"
            @mouseenter="onMenu"
            @mouseleave="leaveMenu"
          >
            <span>小米手机</span>
            <transition  name="fade">
              <div class="children" key="hello" v-show="childrenShow">
                <ul>
                  <li
                    class="product"
                    v-for="(item) of phoneList"
                    :key="item.id"
                  >
                    <a :href="'/#/product/'+item.id" target="_blank">
                      <div class="pro-img">
                        <img :src="item.mainImage" alt="">
                      </div>
                      <div class="pro-name">{{item.name}}</div>
                      <div class="pro-price">{{item.price | currency}}</div>
                    </a>
                  </li>
                </ul>
              </div>
            </transition>
          </div>
          <div class="item-menu">
            <span>Redmi红米</span>
          </div>
          <div class="item-menu">
            <span>电视</span>
          </div>
          <div class="item-menu">
            <span>笔记本</span>
          </div>
          <div class="item-menu">
            <span>家电</span>
          </div>
          <div class="item-menu">
            <span>路由器</span>
          </div>
          <div class="item-menu">
            <span>智能硬件</span>
          </div>
          <div class="item-menu">
            <span>服务</span>
          </div>
          <div class="item-menu">
            <span>社区</span>
          </div>
        </div>
        <div class="header-search">
          <div class="wrapper">
            <input type="text" class="searchInput" placeholder="米家插线板 快充版 27W" />
            <div class="searchIcon" @click="selfMsg">
              <span class="iconfont">&#xe632;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { _throttle } from '../util/debounce-throttle'
// import { _de } from '../util/test'
export default {
  name: 'nav-header',
  data () {
    return {
      childrenShow: false,
      phoneList: []
    }
  },
  computed: {
    /*username() {
      return this.$store.state.username
    },
    cartCount() {
      return this.$store.state.cartCount
    }*/
    ...mapState(['username','cartCount'])
  },
  // mounted() {
  //   let params = this.$route.params;
  //   this.getProductList();
  //   if (params && params.from == 'login') {
  //     this.getCartCount();
  //   }
  // },

  //因为使用了keep-alive 所以mounted失效，只能用mounted
  //另一种解决方案<keep-alive exclude="Detail">
  activated(){
    console.log('this123',this)//打印的是VueComponent
    console.log('this.$route',this.$route.name)
    this.getProductList();
    let params = this.$route.params;
    if(params && params.from == 'login'){
      this.getCartCount();
    }
  },
  filters: {
    currency(val){
      if (!val) {
        return '¥0.00'
      }
      return '¥' + val.toFixed(2)
    }
  },
  methods: {
    selfMsg: _throttle(function() {
      this.$message.success('敬请期待');
      return '测试返回值'
    },2000,{trailing: false,immediate: true}),
    
    // selfMsg(){
    //   this.selfMsg1().then((f)=>console.log(f))
    // },
    //“敬请期待提示”-加了防抖
    // selfMsg1: _debounce(function() {
    //   this.$message.success('敬请期待');
    //   return '测试返回值'
    // }, 1000,true),
    //测试用--点击添加localStorage
    localsto(){
      localStorage['city123'] = 'city456'
      // window.sessionStorage.setItem('kakaka','hahaha')
    },
    getProductList () {
      this.axios.get('/products',{
        params:{
          categoryId: 100012
        }
      }).then((res) => {
        console.log(res.list)
        if (res.list.length>6) {
          this.phoneList = res.list.slice(0,6)
        }
      })
    },
    goToCart(){
      this.$router.push('/cart')
    },
    login(){
      this.$router.push('/login')
    },
    onMenu () {
      this.childrenShow = true
    },
    leaveMenu () {
      this.childrenShow = false
    },
    getCartCount(){
        this.axios.get('/carts/products/sum').then((res=0)=>{
          this.$store.dispatch('saveCartCount',res);
        })
      },
    logout(){
      this.axios.post('/user/logout').then(()=>{
        this.$message.success('退出成功');
        this.$cookie.set('userId','',{expires:'-1'});//设为-1代表永不过期
        this.saveUserName('');
        this.saveCartCount('0')
      })
    },
    ...mapActions(['saveUserName', 'saveCartCount'])
  }
}
</script>

<style lang="scss">
  @import 'scss/base.scss';
  @import 'scss/mixin.scss';
  @import 'scss/config.scss';
  
  .header{
    .nav-topbar{
      height: 39px;
      line-height: 39px;
      background-color: #333333;
      color: #B0B0B0;
      .container{
        display:flex;
        justify-content:space-between;
        a {
          display: inline-block;
          color: #b0b0b0;
          margin-right: 17px;
          font-size: 12px;
        }
        .my-cart{
          width:110px;
          height: 39px;
          background: #ff6600;
          text-align: center;
          margin-right: 0;
          color: $colorG;
        }
        height: 39px;
      }
    }
    .nav-header{
      .container{
        height: 112px;
        @include flex();
        position: relative;
        .actImg{
          display: inline-block;
          height: 55px;
          margin: 0 20px;
        }
        .header-menu{
          // display: inline-block;
          width: 700px;
          // padding-left: 209px;
          .item-menu{
            display: inline-block;
            margin-right: 20px;
            color: #333333;
            font-size: 16px;
            span{
              cursor: pointer;
            }
            &:hover{
              color: $colorA;
            }
            .children{
              position: absolute;
              background: #ffffff;
              overflow: hidden;
              width: 1226px;
              height: 220px;
              left: 0;
              top: 112px;
              border-top: 1px solid $colorH;
              box-shadow:0px 7px 6px 0px rgba(0, 0, 0, 0.11);
              z-index: 12;
              &.fade-enter-active, &.fade-leave-active {
                transition: all .6s;
              }
              &.fade-enter, &.fade-leave-to {
                opacity: 0;
                height: 0px;
              }
              .product{
                width: 16.6%;
                height: 220px;
                float: left;
                font-size: 12px;
                text-align: center;
                position: relative;
                img{
                  width: auto;
                  height: 111px;
                  margin-top: 26px;
                }
                a{
                  display: block;
                }
                .pro-img{
                  height: 137px;
                }
                .pro-name{
                  font-weight: 700;
                  margin-top: 19px;
                  margin-bottom: 8px;
                  color: #333;
                }
                .pro-price{
                  color: #FF6600;
                }
                &:before{
                  content: '';
                  position: absolute;
                  top: 28px;
                  right: 0;
                  height: 100px;
                  width: 18px;
                  border-right: 1px solid $colorF;
                }
                &:last-child:before{
                  display: none;
                }
              }
            }
          }
        }
        .header-search{
          .wrapper{
            width: 280px;
            height: 50px;
            display: flex;
            align-items: center;
            border: 1px solid #E0E0E0;
            .searchInput{
              width: 230px;
              height: 50px;
              padding: 0 15px;
              border: none;
              border-right: 1px solid #E0E0E0;
            }
            .searchIcon{
              display: inline-block;
              width: 50px;
              height: 50px;
              text-align: center;
              line-height: 50px;
              cursor: pointer;
              span{
                font-size: 22px;
              }
            }
          }
        }
      }
    }
  }
</style>
