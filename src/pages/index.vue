<template>
  <div>
    <div class="container">
      <div class="swiper-box">
        <div class="nav-menu">
          <ul class="menu-wrap">
            <li class="menu-item">
              <a href="javascript:;">手机 电话卡
                <span class="iconfont iconImg">&#xe601;</span>
              </a>
              <div class="children"></div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电视 盒子
                <span class="iconfont iconImg">&#xe601;</span>
              </a>
              <div class="children"></div>
            </li>
          </ul>
        </div>
        <Swiper :options="swiperOptions" ref="swi">
          <swiper-slide class="swiper-item" v-for="item of slideList" :key="item.id">
            <a :href="'/#/product'+item.id">
              <img class="swiper-img" :src="item.img" />
            </a>
          </swiper-slide>
          <div class="swiper-button-prev navigation"></div>
          <div class="swiper-button-next navigation"></div>
          <div class="swiper-pagination" slot="pagination"></div>
        </Swiper>
      </div>
    </div>
    <service-bar></service-bar>
  </div>
</template>

<script>
import ServiceBar from 'components/ServiceBar';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
export default {
  name: 'index',
  components:{
    Swiper,
    SwiperSlide,
    ServiceBar
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
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'scss/config.scss';
  .container{
    width: 1226px;
    margin: 0 auto;
    .swiper-box{
      position: relative;
      .swiper-container {
        height: 451px;
        img {
          width: 100%;
          height: 100%;
        };
        --swiper-navigation-color: #cccccc;
        --swiper-navigation-size: 29px;
      }  
      .navigation{
        border:20px solid #66666600; border-width:23px 15px;
        &:hover{
          background: $colorD;
          opacity: 0.8;
          border:20px solid $colorD; border-width:23px 15px;
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
        background: rgba(105,101,101,.6);
        box-sizing: border-box;
        .menu-wrap{
          .menu-item {
            vertical-align: middle;
            a {
              position: relative;
              padding-left: 30px;
              font-size: 16px;
              display: block;
              width: 204px;
              height: 50px;
              line-height: 50px;
              color: $colorG;
              .iconImg{
                position: absolute;
                right: 0px;
              }
            }
            &:hover{
              background: $colorA;
            }
          }
        }
      }
    }
  }
  
</style>