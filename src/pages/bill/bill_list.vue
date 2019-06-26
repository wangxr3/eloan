<template>
    <div class="bill_list">
        <mt-header title="我的账单">
            <router-link to="/my" slot="left">
            <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div v-if="hasList">
            <div  class="order" v-for= " (arr,index) in billList" :key="index">
                <mt-cell class="amount" title="借款金额" :label="arr.amount"></mt-cell>
                <mt-cell class="period" title="期限" :label="arr.periodValue+'期'"></mt-cell>
                <mt-cell class="date" title="放款日期" :label="arr.loanTime"></mt-cell>
                <mt-cell class="status" @click="detail()" is-link :value="caseStatus(arr.status)"></mt-cell>
            </div>
        </div>
        <div class="none" v-else>
            <div :style="noneList"></div>
            <p>您还没有相关的账单</p>
            <mt-button type="primary" size="normal" @click.native="toHome">立即借款</mt-button>
        </div>
    </div>
</template>
<script>
import { getBillList } from 'api/request'
export default {
  data () {
    return {
      noneList: {
        backgroundImage: `url(${require('@/assets/images/no-data.png')})`
      },
      hasList: '',
      loanNo: '',
      billList: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    toHome () {
      alert('首页')
    },
    getList () {
      getBillList({}).then(data => {
        if (data.effectiveLoanList === '') {
          this.hasList = false
        } else {
          this.billList = data.effectiveLoanList
          this.hasList = true
          this.loanNo = data.effectiveLoanList.loanNo
        }
      })
    },
    detail () {
      this.$router.push({name: '/billDetail', params: {'loanNo': this.loanNo, 'from': 'h5'}})
    },
    caseStatus (status) {
      switch (status) {
        case '10':
          return '待还款'
        case '20':
          return '已逾期'
        case '30':
          return '已结清'
        case '11':
          return '放款失败，去换卡'
        case '82':
        case '83':
        case '84':
          return '待放款确认'
        default:
          return '放款审核中'
      }
    }
  }
}
</script>
<style scoped lang="scss" rel="stylesheet/scss">
@import '~assets/styles/function';
.none div{
    width: px2rem(250);
    height: px2rem(183);
    background-size: 100% 100%;
    margin-top: px2rem(160);
    margin-left: px2rem(250);
}
.none p{
    font-size: px2rem(36);
    margin-top: px2rem(40);
}
.none mt-button{
    margin-top: px2rem(60);
    width: px2rem(400);
}
.order{
    text-align: left;
    width: px2rem(700);
    margin-top: px2rem(30);
    margin-left: px2rem(25);
    .amount, .period, .date, .status{
        width: px2rem(200);
        float: left;
    }
    .period{
        width: px2rem(120);
    }
    .date, .status{
        width: px2rem(190);
    }
}
</style>
