<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
((doc, win) => {
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
})(document, window)
</script>
<style media="screen">
@import 'common/sass/reset.css';
html,body,#app{
   height: 100%;
}
</style>
