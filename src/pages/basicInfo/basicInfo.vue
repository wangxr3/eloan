<template>
  <div class="info">
    <mt-header title="基本信息">
        <router-link to="/home" slot="left">
        <mt-button icon="back"></mt-button>
        </router-link>
    </mt-header>
    <div class="real_name">
       <h1>实名信息</h1>
       <mt-field label="姓名" v-model="name"
       placeholder="请输入姓名"
       :readonly="readonly" disableClear></mt-field>
       <mt-field label="身份证号" v-model="certNo"
       placeholder="请输入身份证号"
       :readonly="readonly" disableClear></mt-field>
       <mt-field label="婚姻状况" @click.native="showHy" placeholder="请选择" :readonly="true" v-model="hyResult"></mt-field>
       <mt-field :readonly="true" @click.native="addressClick" label="现居地区" placeholder="请选择" v-model="address"></mt-field>
       <mt-field label="现居地址" placeholder="请输入" v-model="xx_address"></mt-field>
    </div>
    <div class="real_name">
       <h1>公司信息</h1>
       <mt-field label="公司名称" v-model="name"
       placeholder="请输入公司名称"
       disableClear></mt-field>
       <mt-field @click.native="addressClick_"  label="公司地区" :readonly="readonly" placeholder="请选择" v-model="companyAddress"></mt-field>
       <mt-field label="公司地址" placeholder="请输入" v-model="xx_address"></mt-field>
    </div>
    <div class="real_name">
       <h1>联系人1</h1>
        <mt-field label="关系" @click.native="gxOne" placeholder="请选择" :readonly="true" v-model="gxOneResult"></mt-field>
       <mt-field label="姓名" placeholder="请输入联系人姓名" v-model="name_one"></mt-field>
       <mt-field label="手机号" placeholder="请输入联系人手机号" v-model="phone1"></mt-field>
    </div>
    <div class="real_name">
       <h1>联系人2</h1>
       <mt-field v-model="gxTwoResult" label="关系" @click.native="gxTwo" placeholder="请选择" :readonly="true"></mt-field>
       <mt-field label="姓名" placeholder="请输入联系人姓名" v-model="name_two"></mt-field>
       <mt-field label="手机号" placeholder="请输入联系人手机号" v-model="phone2"></mt-field>
    </div>
    <popBottom :data="hy" :popupVisible="popupVisible1" @selecct="select_hy"></popBottom>
    <popBottom :data="gx1" :popupVisible="popupVisible2" @selecct="select_gx1"></popBottom>
    <popBottom :data="gx2" :popupVisible="popupVisible3" @selecct="select_gx2"></popBottom>
    <Address :startcountysCode="startcountysCode" :startcityCode="startcityCode" :startprovinceCode="startprovinceCode" @selectArea="selectAddress" :regionVisible="regionVisible" @cancel="cancel"></Address>
    <Address :startcountysCode="startcountysCode_" :startcityCode="startcityCode_" :startprovinceCode="startprovinceCode_" @selectArea="companyAddress_" :regionVisible="regionVisible_" @cancel="cancel"></Address>
  </div>
</template>
<script type="text/ecmascript-6">
import popBottom from 'base/popBottom/popBottom'
import Address from 'base/area/area'
import { getPersonBaseInfo } from 'api/request'
export default {
  data () {
    return {
      name: '',
      readonly: false,
      certNo: '',
      address: '',
      companyAddress: '',
      xx_address: '',
      popupVisible1: false,
      popupVisible2: false,
      popupVisible3: false,
      regionVisible: false,
      regionVisible_: false,
      startprovinceCode: '140000',
      startcityCode: '140800',
      startcountysCode: '140821',
      startprovinceCode_: '140000',
      startcityCode_: '140800',
      startcountysCode_: '140821',
      name_one: '',
      name_two: '',
      phone1: '',
      phone2: '',
      hy: [
        {code: '1', value: '未婚'},
        {code: '2', value: '已婚'},
        {code: '3', value: '离异'},
        {code: '4', value: '丧偶'}
      ],
      gx1: [
        {code: '2', value: '配偶'},
        {code: '3', value: '父亲'},
        {code: '4', value: '母亲'},
        {code: '9', value: '子女'}
      ],
      gx2: [
        {code: '1', value: '同事'},
        {code: '6', value: '朋友'},
        {code: '5', value: '其他亲属'},
        {code: '7', value: '同学'}
      ],
      hyResult: '',
      hyResultCode: '',
      gxOneResult: '',
      gxOneCode: '',
      gxTwoResult: '',
      gxtwoCode: ''
    }
  },
  created () {
    this.getPersonBaseInfo()
  },
  methods: {
    cancel () {
      this.regionVisible = false
      this.regionVisible_ = false
    },
    addressClick () {
      this.regionVisible = true
    },
    addressClick_ () {
      this.regionVisible_ = true
    },
    showHy () {
      // this.hy_ = true
      this.popupVisible1 = true
    },
    gxOne () {
    //  this.gx_one = true
      this.popupVisible2 = true
    },
    gxTwo () {
    //  this.gx_two = true
      this.popupVisible3 = true
    },
    getPersonBaseInfo () {
      getPersonBaseInfo({}).then(data => {
        console.log(data)
        if (data.resultCode === '90000000') {
        //  this.$router.push({ path: '/login?from=basic' })
        } else {
          if (data.personName !== '') {
            this.name = data.personName
            this.certNo = data.certNo
            this.readonly = true
          }
        }
      })
    },
    selectAddress (item) {
      this.address = item.myAddressProvince + item.myAddressCity + item.myAddresscounty
      this.regionVisible = false
    },
    companyAddress_ (item) {
      /* myAddressProvince
         myAddressCity
         myAddresscounty
         cityCode
         countyCode
         provinceCode */
      this.companyAddress = item.myAddressProvince + item.myAddressCity + item.myAddresscounty
      this.regionVisible_ = false
    },
    select_hy (item) {
      this.hyResult = item.value
      this.hyResultCode = item.code
      this.popupVisible1 = false
      this.hy_ = false
    },
    select_gx1 (item) {
      this.gxOneResult = item.value
      this.gxOneResultCode = item.code
      this.popupVisible2 = false
      this.gx_one = false
    },
    select_gx2 (item) {
      this.gxTwoResult = item.value
      this.gxTwoResultCode = item.code
      this.popupVisible3 = false
      this.gx_two = false
    }
  },
  components: {
    popBottom,
    Address
  }
}
</script>
<style scoped lang="scss" rel="stylesheet/scss">
@import '~assets/styles/function';
.info{
  background: #ffffff;
  float:left;
  width:100%;
  .mint-field{
    clear: both;
  }
  .real_name{
    h1{
      font-size: px2rem(30);
      color:#333333;
      text-align: left;
      padding-left: px2rem(40)
    }
    .name{
      label{
        float: left;
        margin-left: px2rem(40);
        font-size: px2rem(28);
        color: #3e3e3e;
        display: inline-block;
        width: px2rem(120);
        text-align: left;
      }
      .text_group{
        margin-top: 0;
      }
    }
  }
  input{
    outline:none;
    border:0;
    padding-top: px2rem(10);
    padding-bottom: px2rem(10);
    font-size: px2rem(30);
    color:#000000;
    margin-left:px2rem(80);
  }
  .mint-popup{
    width: 100%;
  }
}
</style>
