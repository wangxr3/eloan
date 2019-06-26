import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/home'
/* import HelloWorld from '@/components/HelloWorld' */
import my from '@/pages/my/my'
import billList from '@/pages/bill/bill_list'
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
    }
  ]
})
