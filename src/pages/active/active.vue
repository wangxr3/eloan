<template>
  <div>
    <swiper :positionId="positionId"></swiper>
  </div>
</template>
<script>
import swiper from 'base/swiper/swiper'
import { advPostiongIds } from 'api/config'
export default {
  data () {
    return {
      positionId: {
        lunbo: advPostiongIds.index_1,
        tc: advPostiongIds.index_tc,
        small: advPostiongIds.index_2
      }
    }
  },
  created () {
    // console.log(this.advPostiongIds.index_1)
  },
  components: {
    swiper
  }
}
</script>
<style lang="scss">
@import "~assets/styles/function";
.swiper {
  height: px2rem(200) !important;
  .image {
    height: px2rem(200) !important;
  }
}
.small {
    img {
        width: px2rem(660);
        height: px2rem(560);
    }
}
</style>
<style lang="scss" scoped>
</style>
