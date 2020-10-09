import Vue from 'vue'
import Router from 'vue-router'
import Home from 'pages/home'
import Index from 'pages/index'
import AliPay from 'pages/alipay'
import NotFound from 'pages/notFound'

Vue.use(Router);

const router = new Router({
  routes:[
    {
      path:'/',
      name:'home',
      component:Home,
      redirect:'/index',
      children:[
        {
          path: 'index',
          name: 'index',
          component: Index,
        }, {
          path: 'product/:id',
          name: 'product',
          component: resolve => require(['./pages/product.vue'],resolve),
        }, {
          path: 'detail/:id',
          name: 'detail',
          component: resolve => require(['./pages/detail.vue'],resolve)
        }
      ]
    }, {
      path: '/login',
      name: 'login',
      component: resolve => require(['./pages/login.vue'],resolve)
    },{
      path: '/cart',
      name: 'cart',
      component: resolve => require(['./pages/cart.vue'],resolve)
    }, {
      path: '/order',
      name: 'order',
      component: resolve => require(['./pages/order.vue'],resolve),
      children:[
        {
          path: 'list',
          name: 'order-list',
          component: resolve => require(['./pages/orderList.vue'],resolve),
        },
        {
          path: 'confirm',
          name: 'order-confirm',
          component: resolve => require(['./pages/orderConfirm.vue'],resolve),
        },
        {
          path: 'pay',
          name: 'order-pay',
          component: resolve => require(['./pages/orderPay.vue'],resolve),
        },
        {
          path: 'alipay',
          name: 'alipay',
          component: AliPay,
        }
      ]
    },
    { path: '*', component: NotFound }
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

//如果是结算页到支付页，不允许回到支付页
// router.beforeEach((to, from, next) => {
//   if (from.path == '/order/pay' && to.path == '/order/confirm') {
//     next(false)
//   } else {
//     next()
//   }
// })

export default router;