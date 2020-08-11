<template>
  <div class="header">
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-menu">
          <a href="javascript:;">小米商城</a>
          <a href="javascript:;">MUI</a>
          <a href="javascript:;">云服务</a>
          <a href="javascript:;">协议规则</a>
        </div>
        <div class="topbar-user">
          <a href="javascript:;" v-if="username">{{username}}</a>
          <a href="javascript:;" v-if="!username" @click="login">登陆</a>
          <a href="javascript:;" v-if="username">我的订单</a>
          <a href="javascript:;"
            class="my-cart"
            @click="goToCart"
          >
            <span class="icon-cart" @click="goToCart">
              <span class="iconfont">&#xe600;</span>
              购物车
            </span>
          </a>
        </div>
      </div>
    </div>
    <div class="nav-header">
      <div class="container">
        <div class="header-logo">
          <a href="/#/index" ></a>
        </div>
        <div class="header-menu">
          <div class="item-menu"
            key="world"
            @mouseenter="onMenu"
            @mouseleave="leaveMenu"
          >
            <span>小米手机</span>
            <transition  name="fade">
              <div class="children" key="hello" v-if="childrenShow">
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
        </div>
        <div class="header-search">
          <div class="wrapper">
            <input type="text" class="searchInput" />
            <div class="searchIcon">
              <span class="iconfont">&#xe632;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nav-header',
  data () {
    return {
      childrenShow: false,
      username: 'jack',
      phoneList: []
    }
  },
  mounted () {
    this.getProductList()
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
      console.log('enter')
      this.childrenShow = true
    },
    leaveMenu () {
      console.log('leave')
      this.childrenShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'scss/base.scss';
  @import 'scss/mixin.scss';
  @import 'scss/config.scss';
  //opcity是可以有过渡效果的，height不行
  .fade-enter-active, .fade-leave-active {
    // transition: opacity .5s;
    transition: height 2s;
  }
  .fade-enter, .fade-leave-to {
    // opacity: 0;
    height: 0px;
  }
  .header{
    .nav-topbar{
      height: 39px;
      line-height: 39px;
      background-color: #333333;
      color: #B0B0B0;
      .container{
        @include flex();
        a {
          display: inline-block;
          color: #ffffff;
          margin-right: 17px;
        }
        .my-cart{
          width:110px;
          height: 39px;
          background: #ff6600;
          text-align: center;
        }
      }
    }
    .nav-header{
      .container{
        height: 112px;
        @include flex();
        position: relative;
        .header-logo{
          display: inline-block;
          width: 55px;
          height: 55px;
          background: #ff6600;
          a{
            display: inline-block;
            width: 110px;
            height: 55px;
            &:before{
              content: '';
              display: inline-block;
              width: 55px;
              height: 55px;
              background: url('/imgs/mi-logo.png') no-repeat center;
              background-size: 55px;
            }
            &:after{
              content: '';
              display: inline-block;
              width: 55px;
              height: 55px;
              background: url('/imgs/mi-home.png') no-repeat center;
              background-size: 55px;
            }
            &:hover:before, &:hover:before{
              margin-left: -55px;
              transition: margin .2s;
            }
          }
        }
        .header-menu{
          display: inline-block;
          width: 700px;
          padding-left: 209px;
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
              overflow: hidden;
              width: 1226px;
              height: 220px;
              left: 0;
              top: 112px;
              border-top: 1px solid $colorH;
              box-shadow:0px 7px 6px 0px rgba(0, 0, 0, 0.11);
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
              padding-left: 15px;
              border: none;
              border-right: 1px solid #E0E0E0;
            }
            .searchIcon{
              display: inline-block;
              width: 50px;
              height: 50px;
              text-align: center;
              line-height: 50px;
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
