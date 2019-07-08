<template>
  <div class="bd">
    <mt-swipe :auto="2000" @change="handleChange">
      <mt-swipe-item  v-for="(item,index) in topImgList" :key="index">
          <img @click= "imgClick()" :src="imgurl(item.imageUrl)"/>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script type="text/ecmascript-6">
import { getPersonBaseInfo, advert, imgUrl } from 'api/request'
export default {
  data () {
    return {
      name: '',
      positionId: '20180711000001',
      topImgList: '',
      img_id: '0'
    }
  },
  created () {
    this.getPerson()
    this.advert()
  },
  methods: {
    handleChange (index) {
      this.img_id = index
    },
    imgurl (img) {
      return imgUrl(img)
    },
    getPerson () {
      getPersonBaseInfo({}).then(data => {
        this.name = data.personName
      })
    },
    advert () {
      advert({'positionId': [this.positionId]}).then(data => {
        // console.log(data.result[0].advertContentList)
        this.topImgList = data.result[0].advertContentList
      })
    },
    imgClick () {
      // alert(this.img_id)
      let list = this.topImgList
      let current_ = list[this.img_id]
      if (current_.linkType === '01') {
      //  console.log(list[this.img_id].content)
        this.$router.push({path: current_.content, params: {id: '1'}})
      }
    }
  },
  components: {
  }
}
</script>
<style scoped lang="scss" rel="stylesheet/scss">
@import '~assets/styles/function';
   .bd{
     width: 100%;
     height: px2rem(330);
     color:#ffffff;
     font-size:16px;
     img{
       width:100%;
       height:100%;
     }
   }
</style>
