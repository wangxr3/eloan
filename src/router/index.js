import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/home'
/* import HelloWorld from '@/components/HelloWorld' */
import my from '@/pages/my/my'
import billList from '@/pages/bill/bill_list'
import billDetail from '@/pages/bill/bill_detail'
import login from '@/pages/login/login'
import coupon from '@/pages/coupon/coupon'
import active from '@/pages/active/active'
import basicInfo from '@/pages/basicInfo/basicInfo'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: '首页',
      component: Home
    },
    {
      path: '/my',
      name: 'my',
      component: my
    },
    {
      path: '/bill_list',
      name: 'bill_list',
      component: billList
    },
    {
      path: '/bill_detail',
      name: 'bill_detail',
      component: billDetail
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/coupon',
      name: 'coupon',
      component: coupon
    },
    {
      path: '/active',
      name: 'active',
      component: active
    },
    {
      path: '/basicInfo',
      name: 'basicInfo',
      component: basicInfo
    }
  ]
})
