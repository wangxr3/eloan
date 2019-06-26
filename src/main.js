// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
/* import { Swipe, SwipeItem } from 'mint-ui' */
import 'mint-ui/lib/style.css'
import App from './App'
import router from './router'
/* Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem) */
Vue.config.productionTip = false
Vue.use(MintUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
