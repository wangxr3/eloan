<template>
  <div id="app">
    <!-- <img src="./assets/images/logo.png"> -->
    <router-view></router-view>
  </div>
</template>

<script>
(((doc, win) => {
  let docEl = doc.documentElement
  let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  let recalc = function () {
    let clientWidth = docEl.clientWidth
    if (!clientWidth) return
    docEl.style.fontSize = 20 * (clientWidth / 320) + 'px' // 其中“20”根据你设置的html的font-size属性值做适当的变化
  }
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window))

export default {
  name: 'App'
}
</script>

<style>
body{
  margin:0;
  background: #F0EFF5;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  margin: 0;
  padding: 0;
}
</style>
