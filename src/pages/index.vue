<template>
  <div>
    <div class="container">
      <div class="swiper-box">
        <div class="nav-menu">
          <ul class="menu-wrap">
            <li class="menu-item">
              <a href="javascript:;" class="ia">手机 电话卡
                <span class="iconfont iconImg">&#xe601;</span>
              </a>
              <div class="children">
                <ul v-for="(item,i) in menuList" v-bind:key="i">
                  <li v-for="(sub,j) in item" v-bind:key="j">
                    <a :href="sub?'/#/product/'+sub.id:''">
                      <img v-bind:src="sub?sub.img:'/imgs/item-box-1.png'" alt="">
                      {{sub?sub.name:'小米9'}}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电视 盒子
                <span class="iconfont iconImg">&#xe601;</span>
              </a>
              <div class="children">
                <ul v-for="(item,i) in menuList" v-bind:key="i">
                  <li v-for="(sub,j) in item" v-bind:key="j">
                    <a v-bind:href="sub?'/#/product/'+sub.id:''">
                      <img v-bind:src="sub?sub.img:'/imgs/item-box-1.png'" alt="">
                      {{sub?sub.name:'小米9'}}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <Swiper :options="swiperOptions" ref="swi">
          <swiper-slide class="swiper-item" v-for="item of slideList" :key="item.id">
            <a :href="'/#/product/'+item.id">
              <img :src="item.img" />
            </a>
          </swiper-slide>
          <div class="swiper-button-prev navigation"></div>
          <div class="swiper-button-next navigation"></div>
          <div class="swiper-pagination" slot="pagination"></div>
        </Swiper>
      </div>
      <div class="ads-box">
        <a :href="'/#/product/'+item.id" v-for="(item,index) in adsList" :key="index">
          <img v-lazy="item.img" alt="" />
        </a>
      </div>
      <div class="banner">
        <a href="/#/product/30">
          <img v-lazy="'/imgs/banner-1.png'" alt="">
        </a>
      </div>
    </div>
    <div class="product-box">
      <h2 class="title">手机</h2>
      <div class="wrapper container">
        <div class="banner-left">
          <a href="">
            <img v-lazy="'/imgs/mix-alpha.jpg'" alt="">
          </a>
        </div>
        <div class="list-box">
          <div class="list" v-for="(item, index) of phoneList" :key="index">
            <div class="item" v-for="item of item" :key="item.id">
              <span
                :class="{stateLabelNew:item.price>2400,stateLabelHot:item.price<2400&&item.price>1000,stateLabelNow:item.price<1000}"
              >
                <!-- {{(item.id%2==0)? '热销' : '新品'}} -->
                <!-- {{stateLabel(item.price)}} -->
                {{item.price | stateLabel}}
              </span>
              <div class="item-img">
                <a href="">
                  <img v-lazy="item.mainImage" alt="">
                </a>
              </div>
              <div class="item-info">
                <h3>{{item.name}}</h3>
                <p>{{item.subtitle}}</p>
                <p class="goods-money" @click="addCart(item.id)">
                  {{item.price}}
                  <a class="iconfont" >&#xe602;</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <modal
      title='购物车'
      btnType='1'
      sureText='查看购物车'
      modalType='middle'
      :showModal="showModal"
      v-on:submit="goToCart"
      v-on:cancel="closeOk"
    >
      <template v-slot:body>
        <p>商品添加成功</p>
      </template>
    </modal>
  </div>
</template>

<script>
import ServiceBar from 'components/ServiceBar';
import Modal from 'components/Modal';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
export default {
  name: 'index',
  components:{
    Swiper,
    SwiperSlide,
    ServiceBar,
    Modal
  },
  data () {
    return {
      swiperOptions: {
        pagination :{
          el: '.swiper-pagination',
          clickable :true
        },
        loop : true,
        autoplay: {
          delay: 1500,
          stopOnLastSlide: false,
          disableOnInteraction: false,
          waitForTransition: false,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        effect : 'fade',
        fadeEffect: {
          crossFade: true,
        }
      },
      slideList:[
        {
          id:'42',
          img:'/imgs/slider/slide-1.jpg'
        },
        {
          id:'45',
          img:'/imgs/slider/slide-2.jpg'
        },
        {
          id:'46',
          img:'/imgs/slider/slide-3.jpg'
        }
      ],
      menuList:[
        [
          {
            id:30,
            img:'/imgs/item-box-1.png',
            name:'小米CC9',
          },{
            id:31,
            img:'/imgs/item-box-2.png',
            name:'小米8青春版',
          },{
            id:32,
            img:'/imgs/item-box-3.jpg',
            name:'Redmi K20 Pro',
          },{
            id:33,
            img:'/imgs/item-box-4.jpg',
            name:'移动4G专区',
          }
        ],
        [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]
      ],
      adsList:[
        {
          id:33,
          img:'/imgs/ads/ads-1.png'
        },{
          id:48,
          img:'/imgs/ads/ads-2.jpg'
        },{
          id:45,
          img:'/imgs/ads/ads-3.png'
        },{
          id:47,
          img:'/imgs/ads/ads-4.jpg'
        }
      ],
      phoneList:[],
      showModal: false
    }
  },
  mounted() {
    this.init();
  },
  filters:{
    stateLabel(price){
      if (price>=2400) {
        return '满减'
      } else if (price>=2400)  {
        return '折扣'
      }else {
        return '秒杀'
      }
    }
  },
  methods: {
    init () {
      this.axios.get('/products',{
        params:{
          categoryId: 100012,
          pageSize: 14
        }
      }).then((res)=>{
        let firstLine = res.list.slice(6,10);
        let secondLine = res.list.slice(10,14);
        this.phoneList = [firstLine, secondLine]
      })
    },
    // 判断显示热销和新品
    // stateLabel (price) {
    //   if (price>=2400) {
    //     return '满减'
    //   } else if (price>=2400)  {
    //     return '折扣'
    //   }else {
    //     return '秒杀'
    //   }
    // },
    addCart (id) {
      this.axios.post('/carts',{
        productId: id,
        selected: true
      }).then((res)=>{
        this.showModal = true;
        this.$store.dispatch('saveCartCount',res.cartTotalQuantity)
      }).catch(()=>{
        this.showModal = true
      })
    },
    closeOk () {
      this.showModal=false
    },
    goToCart () {
      this.$router.push('/cart')
      this.showModal = false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'scss/config.scss';
  @import 'scss/mixin.scss';
  @import 'scss/base.scss';
  .container{
    margin: 0 auto;
    .swiper-box{
      position: relative;  
      .navigation{
        // 这是一个透明色#66666600
        border:20px solid #66666600; 
        border-width:23px 15px;
        &:hover{
          background: $colorD;
          opacity: 0.8;
          border:20px solid $colorD;
          border-width:23px 15px;
          border-radius: 1px;
        }
      }
      .swiper-button-prev{
        left: 264px;
      }
      .swiper-button-next{
        right: 0;
      }
      .nav-menu{
        z-index: 10;
        position: absolute;
        padding: 26px 0;
        width: 264px;
        height: 451px;
        background: rgba(105, 101, 101, 0.6);
        box-sizing: border-box;
        .menu-wrap{
          .menu-item {
            height: 50px;
            line-height: 50px;
            width: 264px;
            a {
              position: relative;
              padding-left: 30px;
              font-size: 16px;
              display: block;
              line-height: 50px;
              color: $colorG;
              .iconImg{
                position: absolute;
                right: 30px;
              }
            }
            &:hover{
              background-color:$colorA;
              .children{
                display:block;
              }
            }
            .children{
              width: 962px;
              height: 451px;
              display: none;
              background: $colorG;
              position: absolute;
              border: 1px solid $colorH;
              left: 264px;
              top: 0;
              ul {
                display: flex;
                justify-content: space-around;
                height: 75px;
                li {
                  height: 75px;
                  line-height: 75px;
                  flex: 1;
                  padding-left: 23px;
                  a {
                    padding: 0;
                    color: $colorB;
                    font-size: 14px;
                    img {
                      width: 42px;
                      height: 35px;
                      vertical-align: middle;
                      margin-right: 15px;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    .ads-box{
      @include flex();
      margin-top: 14px;
      margin-bottom: 31px;
      a {
        width: 296px;
        height: 167px;
      }
    }
    .banner{
      margin-top: 31px;
      a {
        height: 130px;
      }
    }
  }
  .product-box{
    background: $colorJ;
    height: 670px;
    width: 100%;
    padding: 30px 0 30px;
    margin-top: 30px;
    .title{
      font-size: 22px;
      font-weight: 200;
      line-height: 58px;
      color: $colorB;
    }
    .wrapper{
      display: flex;
      .banner-left{
        width: 264px;
        height: 619px;
        margin-right: 16px;
        a{
          img{}
        }
      }
      .list-box{
        .list{
          @include flex();
          .item{
            width: 236px;
            height: 302px;
            background: $colorG;
            margin-right: 14px;
            margin-bottom: 14.5px;
            text-align: center;
            .stateLabelNew{
              background: green;
            }
            .stateLabelNew999{
              background: green;
            }
            .stateLabelHot{
              background: red;
            }
            .stateLabelNow{
              background:pink;
            }
            span{
              display: inline-block;
              width: 67px;
              height: 24px;
              line-height: 24px;
              font-size: 14px;
              color: $colorG;
              &.new-pro{
                background: #7ECF68;
              }
              &.kill-pro{
                background: #e82626;
              }
            }
            .item-img{
              width: 190px;
              height: 194px;
              margin: 0 auto;
              a{
                img{}
              }
            }
            &:last-child{
              margin-right: 0px;
            }
            .item-info{
              text-align: center;
              cursor: pointer;
              .goods-money{
                color: red;
                margin-top: 10px;
                a{
                  color: $colorA;
                }
              }
            }
          }
        }
      }
    }
    
  }
</style>
