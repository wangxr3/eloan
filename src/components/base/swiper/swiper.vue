<template>
  <div>
    <div class='swiper' v-if='lunbo'>
      <mt-swipe :auto='2000'>
        <mt-swipe-item v-for='(arr,index) in positionIdList' :key='index'>
          <img :src='imgurl(arr.imageUrl)' class='image' @click='adsevt(arr)'>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class='small' v-if='small'>
        <img :src='imgurl(smallImg.imageUrl)'  @click='adsevt(smallImg)'>
    </div>
    <div class='tc' v-if='tc'>
        <img v-if='first' :src='imgurl(tcImg.imageUrl)' @click='adsTcevt(tcImg)'>
        <img v-if='second' :src='imgurl(tcImg.pwImageUrl)' @click='adsTcevt(tcImg)'>
        <img src='~assets/images/cancel.png' class='cancel' @click='closeTc'>
    </div>
  </div>
</template>
<script>
import { advert, imgUrl } from 'api/request'
export default {
  data () {
    return {
      positionIdList: [],
      lunbo: false,
      tc: false,
      small: false,
      tcImg: '',
      smallImg: '',
      first: false,
      second: false
    }
  },
  props: ['positionId'],
  created () {
    this.getAdvert()
  },
  methods: {
    getAdvert () {
      let positionIdList = []
      for (var p1 in this.positionId) {
        positionIdList.push(this.positionId[p1])
      }
      const param = { appType: 'H5', positionId: positionIdList }
      advert(param).then(data => {
        let result = data.result
        for (var i = 0; i < result.length; i++) {
          if (result[i].advertContentList && result[i].advertContentList.length > 0) {
            if (result[i].advertPosition.positionId === this.positionId.lunbo) {
              this.positionIdList = result[i].advertContentList
              this.lunbo = true
            } else if (result[i].advertPosition.positionId === this.positionId.tc) {
              this.tc = true
              this.first = true
              this.tcImg = result[i].advertContentList[0]
            } else {
              this.small = true
              this.smallImg = result[i].advertContentList[0]
            }
          }
        }
      })
    },
    adsevt (arr) {
      if (arr.linkType === '01') {
        window.location.href = arr.content
      } else if (arr.linkType === '11') {
        this.tc = true
        this.second = true
        this.tcImg = arr
        this.adsTcevt(arr)
      } else if (arr.linkType === '02') {
        window.location.href = global.advJump[arr.pwContent]
      }
    },
    adsTcevt (arr) {
      if (arr.pwLinkType === '01') {
        window.location.href = arr.pwContent
      } else if (arr.pwLinkType === '03') {
        this.tc = false
      } else if (arr.pwLinkType === '02') {
        window.location.href = global.advJump[arr.pwContent]
      }
    },
    closeTc () {
      this.tc = false
      this.first = false
    },
    imgurl (img) {
      return imgUrl(img)
    }
  }
}
</script>
<style lang='scss' scoped>
@import '~assets/styles/function';
.swiper {
  width: 100%;
  height: px2rem(330);
  .image {
    width: 100%;
    height: px2rem(330);
  }
}
.tc{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.4);
    position: absolute;
    top: 0;
    left: 0;
    img{
        width: px2rem(600);
        height: px2rem(800);
        position: absolute;
        left: px2rem(75);
        top: px2rem(200)
    }
    .cancel{
        width: px2rem(88);
        height: px2rem(88);
        top: px2rem(1080);
        left: px2rem(340)
    }
}
</style>
