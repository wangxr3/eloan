<template>
  <mt-popup v-model="regionVisible" position="bottom" class="region-popup">
    <div class="picker-btn-wrap">
      <span class="picker-cancel" @click="$emit('cancel')">取消</span>
      <span class="picker-sure" @click="$emit('selectArea',myAddressProvince)">确定</span>
    </div>
    <mt-picker :slots="myAddressSlots" @change="onMyAddressChange" value-key="value">
    </mt-picker>
    <!-- <p>地址3级联动：{{myAddressProvince}} {{myAddressCity}} {{myAddresscounty}}</p>
    <p>地址3级联动code：{{provinceCode}} {{cityCode}} {{countyCode}}</p>-->
 </mt-popup>
</template>

<script>
import { areaData } from '../../../common/js/areaData.js' // 引入省市区数据
const { iosProvinces, iosCitys, iosCountys } = areaData
export default {
  name: 'Address',
  props: {
    regionVisible: Boolean,
    startprovinceCode: String,
    startcityCode: String,
    startcountysCode: String
  },
  data () {
    return {
      myAddressSlots: [
        {
          flex: 1,
          defaultIndex: 1,
          values: iosProvinces, // 省份数组
          className: 'slot1',
          textAlign: 'center'
        },
        {
          flex: 1,
          values: [],
          className: 'slot3',
          textAlign: 'center'
        },
        {
          flex: 1,
          values: [],
          className: 'slot5',
          textAlign: 'center'
        }
      ],
      myAddress: '',
      myAddressProvince: '省',
      myAddressCity: '市',
      myAddresscounty: '区/县',
      provinceCode: '',
      cityCode: '',
      countyCode: '',
      index: '0',
      index_c: '0',
      index_q: '0'
    }
  },
  created () {
  },
  methods: {
    onMyAddressChange (picker, values) {
      let cityArr = []
      for (let i = 0; i < iosCitys.length; i++) {
        if (iosCitys[i].parentId === values[0].id) {
          cityArr.push(iosCitys[i])
          picker.setSlotValues(1, cityArr)
        }
      }
      let countysArr = []
      for (let j = 0; j < iosCountys.length; j++) {
        if (iosCountys[j].parentId === values[1].id) {
          countysArr.push(iosCountys[j])
          picker.setSlotValues(2, countysArr)
        }
      }
      this.myAddressProvince = values[0].value
      this.myAddressCity = values[1].value
      this.myAddresscounty = values[2].value
      this.cityCode = values[1].id
      this.countyCode = values[2].id
      this.provinceCode = values[0].id
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (this.startprovinceCode) {
        for (let i = 0; i < iosProvinces.length; i++) {
          if (iosProvinces[i].id === this.startprovinceCode) {
            this.index = i
          }
        }
      }
      if (this.startcityCode) {
        let cityList = []
        for (let j = 0; j < iosCitys.length; j++) {
          if (iosCitys[j].parentId === this.startprovinceCode) {
            cityList.push(iosCitys[j])
          }
          for (let k = 0; k < cityList.length; k++) {
            if (cityList[k].id === this.startcityCode) {
              this.index_c = k
            }
          }
        }
      }
      if (this.startcountysCode) {
        let countyList = []
        for (let j = 0; j < iosCountys.length; j++) {
          if (iosCountys[j].parentId === this.startcityCode) {
            countyList.push(iosCountys[j])
          }
          for (let k = 0; k < countyList.length; k++) {
            if (countyList[k].id === this.startcountysCode) {
              this.index_q = k
            }
          }
        }
      }
      this.myAddressSlots[0].defaultIndex = this.index
      this.myAddressSlots[1].defaultIndex = this.index_c
      this.myAddressSlots[2].defaultIndex = this.index_q
    })
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import '~assets/styles/function';
</style>
