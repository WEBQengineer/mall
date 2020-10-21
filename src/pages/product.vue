<template>
  <div class="product">
    <product-param :title="product.name">
      <template v-slot:buy>
        <button class="btn" @click="byeButton">立即购买</button>
      </template>
    </product-param>
    <div class="content">
      <div class="item-bg">
        <h2>小米10</h2>
        <h3>小米10至尊纪念版</h3>
        <p>
          <a href="" id="">120X 超远变焦</a>
          <span>|</span>
          <a href="" id="">骁龙865</a>
          <span>|</span>
          <a href="" id="">120Hz刷新率 + 240Hz采样率</a>
          <span>|</span>
          <a href="" id="">WiFi 6 多功能NFC </a>
        </p>
        <div class="price">
          <span>￥<em>5599</em></span>
        </div>
      </div>
      <div class="item-swiper">
        <swiper :options="swiperOption">
            <swiper-slide><img src="/imgs/product/more_ai_4.png" alt=""></swiper-slide>
            <swiper-slide><img src="/imgs/product/more_ai_3.png" alt=""></swiper-slide>
            <swiper-slide><img src="/imgs/product/more_ai_2.png" alt=""></swiper-slide>
            <swiper-slide><img src="/imgs/product/more_ai_1.png" alt=""></swiper-slide>
            <swiper-slide><img src="/imgs/product/more_ai_5.png" alt=""></swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
        <p class="desc">小米10 AI变焦</p>
      </div>
      <div class="item-video">
        <h2>你即将拿起的<br/>是我们最自豪的一部作品</h2>
        <p>120X 超远变焦、120W 秒充科技、120Hz 专业屏幕。
          以更未来、更智能的制造工艺，呈现中国科技的力量。
          <br/>
          现在，就让它与你一起，拾级而上，一往无前。
        </p>
        <!-- <div class="video-bg" @click="openWin()"></div> -->
        
        <div class="video-bg" @click="throttle(650)"></div>
        <div class="video-box" v-if="showVideoBox">
          <div class="video" :class="{showVideo:showSlide}">
            <div class="icon-close"  @click="closeWin()">
              <span class="iconfont ">&#xe607;</span>
            </div>
            <video src="/imgs/product/video.mp4" muted autoplay controls="controls"></video>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import ProductParam from 'components/ProductParam'
  export default{
    name:'product',
    components:{
      Swiper,
      SwiperSlide,
      ProductParam
    },
    data(){
      return {
        showSlide:false,//控制动画效果
        product:{},//商品信息
        showVideoBox:false,
        previous:0,
        swiperOption:{
          autoplay:true,
          slidesPerView:3,
          spaceBetween: 15,
          freeMode: true,
          pagination: {
            el: '.swiper-pagination',
            clickable :true,
          }
        }
      }
    },
    mounted() {
      this.getProductDetail();
    },
    methods: {
      getProductDetail(){
        let id = this.$route.params.id
        this.axios.get(`/products/${id}`).then((res)=>{
          this.product = res
        })
      },
      byeButton(){
        let id = this.$route.params.id
        this.$router.push(`/detail/${id}`)
      },
      //控制视频弹窗的关闭
      closeWin(){
        this.showSlide=false;
        this.previous = +new Date()
        setTimeout(() => {
          this.showVideoBox=false
        }, 600);
      },
      //控制视频弹窗的展示
      openWin(){
        console.log(this.showVideoBox,this.showSlide)
        this.showVideoBox=true
        setTimeout(() => {
          this.showSlide=true
          console.log(this.showVideoBox,this.showSlide)
        }, 100);
      },

      throttle(wait) {
        var now = +new Date();
        console.log('当前：',now)
        console.log('等待：',wait)
        console.log('上一次：',this.previous)
        console.log('差值：',now - this.previous)
        if (now - this.previous > wait) {
            console.log('执行了')
            this.openWin();
            // this.previous = now;
        }
      }


    }
  }
</script>
<style lang="scss">
  @import 'scss/mixin.scss';
  @import 'scss/config.scss';
  .product{
    .content{
      .item-bg{
        background:url('/imgs/product/product-bg-1.jpg') no-repeat center;
        background-size: 1226px 718px;
        height:718px;
        text-align:center;
        h2{
          font-size:80px;
          padding-top:55px;
        }
        h3{
          font-size:24px;
          letter-spacing: 10px;
        }
        p{
          margin-top:21px;
          margin-bottom:40px;
          a{
            font-size:16px;
            color:#333333;
          }
          span{
            margin:0 15px;
          }
        }
        .price{
          font-size:30px;
          color:#333333;
          em{
            font-style:normal;
            font-size:38px;
          }
        }
      }
      .item-swiper{
        margin:36px auto 52px;
        .desc{
          font-size:18px;
          color:#333333;
          text-align:center;
        }
        img{
          width:100%;
        }
      }
      .item-video{
        height:1044px;
        background-color:#070708;
        margin-bottom:76px;
        color:#FFFFFF;
        text-align:center;
        h2{
          font-size:60px;
          padding-top:82px;
          margin-bottom:47px;
        }
        p{
          font-size:24px;
          margin-bottom:58px;
        }
        .video-bg{
          background:url('/imgs/product/gallery-1.png') no-repeat center;
          background-size:cover;
          width:1226px;
          height:540px;
          margin:0 auto 120px;
          cursor:pointer;
        }
        .video-box{
          .overlay{
            @include position(fixed);
            background-color:#333333;
            opacity:.4;
            z-index:10;
          }
          .video{
            position:fixed;
            top:-50%;
            left:50%;
            transform:translate(-50%,-50%);
            z-index:10;
            width:1000px;
            height:536px;
            opacity:0;
            transition:all .6s;
            &.showVideo{
              top:50%;
              opacity:1;
              transition:all .6s;
            }
            .icon-close{
              position:absolute;
              top:20px;
              right:20px;
              cursor:pointer;
              z-index:11;
              width: 30px;
              height: 30px;
              line-height: 30px;
              border-radius: 15px;
              text-align: center;
              span{
                font-size: 12px;
                font-weight: bold;
                color: #757575;
              }
              &:hover{
                background: red;
                span{
                  color: $colorG;
                }
              }
            }
            video{
              width:100%;
              height:100%;
              object-fit:cover;
              outline:none;
            }
          }
        }
      }
    }
    button{
      margin-left:10px;
    }
  }
</style>