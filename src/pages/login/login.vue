<template>
  <div class="login">
    <mt-header title="登录">
        <router-link to="/my" slot="left">
        <mt-button icon="back">返回</mt-button>
        </router-link>
    </mt-header>
    <!-- 手机号 -->
        <InputGroup
            type="number"
            placeholder="手机号"
            v-model.trim="phone"
            :btnTitle="btnTitle"
            :disabled="disabled"
            :error="errors.phone"
            @btnClick="getVerifyCode"
        />
          <InputGroup
              v-show="flag"
              type="text"
              placeholder="请输入右侧图形验证码"
              v-model.trim="imgcode"
              :imgCode="imgCode"
              :imgsrc="imgsrc"
              :error="errors.phone"
          />
          <br>
          <mt-button @click="eventMessage" v-show="flag" class="img_btn" size="large" type="danger">确定</mt-button>
        <!-- 输入验证码 -->
        <InputGroup
            v-show="flag01"
            type="number"
            v-model="verifyCode"
            placeholder="验证码"
            :error="errors.code"
        />
        <!-- 登录按钮 -->
      <br>
      <mt-button @click.native="login" v-show="flag01" class="btn" size="large" type="danger">登录</mt-button>
  </div>
</template>
<script type="text/ecmascript-6">
import InputGroup from 'base/input/input'
import { login, getMobileMessage, getImageCode } from 'api/request'
export default {
  data () {
    return {
      phone: '', // 手机号
      verifyCode: '', // 验证码
      btnTitle: '获取验证码',
      imgCode: true,
      imgcode: '',
      imgsrc: '',
      flag: false,
      flag01: true,
      disabled: false, // 是否可点击
      errors: {} // 验证提示信息
    }
  },
  created () {
    // this.login()
  },
  methods: {
    login () {
      let params = {
        'mobile': this.phone,
        'password': this.erifyCode,
        'normal': '02'
      }
      login(params).then(data => {
        console.log(data)
        if (data.resultCode === '00000000') {
          this.$router.push({ path: '/my' })
        } else {
          alert(data.resultMessage)
        }
      })
    },
    eventMessage () {
      let phone = this.phone
      let imgval = this.imgcode
      let params = {
        'productType': '31',
        'sourceProduct': '03',
        'sourceOrganizationNo': 'O20180507113389',
        'channel': '01',
        'mobile': phone,
        'imageCode': imgval
      }
      let imgReg = /^[a-zA-Z0-9]{4}$/
      alert(this.imgcode)
      if (!imgReg.test(this.imgcode)) {
        alert('请输入正确的图形验证码')
        this.imgsrc = getImageCode(this.phone)
      } else {
        getMobileMessage(params).then(data => {
          if (data.resultCode === '00000000') {
            this.flag = false
            this.flag01 = true
            this.validateBtn()
          } else {
            this.flag01 = false
            this.imgsrc = getImageCode(this.phone)
            this.imgcode = ''
            alert(data.resultMessage)
          }
        })
      }
    },
    getVerifyCode () {
      if (!this.phone) {
        alert('手机号不能为空')
      } else if (!/^1[345678]\d{9}$/.test(this.phone)) {
        alert('手机号格式不正确')
      } else {
        this.flag01 = false
        this.flag = true
        this.imgsrc = getImageCode(this.phone)
      }
    },
    /* getImageCode () {
      return getImageCode(this.phone)
    }, */
    validateBtn () {
      // 倒计时
      let time = 60
      let timer = setInterval(() => {
        if (time === 0) {
          clearInterval(timer)
          this.disabled = false
          this.btnTitle = '获取验证码'
        } else {
          this.btnTitle = time + '秒后重试'
          this.disabled = true
          time--
        }
      }, 1000)
    }
  },
  components: {
    InputGroup
  }
}
</script>
<style scoped lang="scss" rel="stylesheet/scss">
@import '~assets/styles/function';
.btn,.img_btn{
  width:80%;
  margin-left: 10%;
  margin-top:px2rem(30);
  float:left;
}
</style>
