<template>
    <div class="bill_detail">
        <mt-header title="账单详情">
            <router-link to="/my" slot="left">
            <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div class="detail_top">
            <div>借款金额（元）</div>
            <div>￥{{data.authAmount}}&nbsp;{{status(repaymentStatus)}}</div>
            <div>贷款管理费（一次性收取）￥（未缴￥）</div>
            <div>放款卡：{{data.loanBankName}}({{accountformat(data.loanAccountNo)}})</div>
            <div>一次性还款卡：{{data.bankName}}({{accountformat(data.accountNo)}})</div>
            <div>申请人：{{data.accountName}}</div>
        </div>
        <div class="detail_content">

        </div>
        <div class="detail_button"></div>
        <div class="loading-wrapper" v-show="isLoading">
             <loading title="数据量大，请耐心等待..."></loading>
        </div>
    </div>
</template>
<script>
import Loading from 'base/loading/loading'
import { getLoanApplyDetail } from 'api/request'
export default {
  data () {
    return {
      data: '',
      repaymentStatus: '',
      isLoading: true
    }
  },
  created () {
    this.getLoanApplyDetail()
  },
  methods: {
    getLoanApplyDetail () {
      getLoanApplyDetail({'loanNo': this.$route.query.loanNo}).then(data => {
        this.isLoading = false
        this.flag = true
        this.data = data
        this.repaymentStatus = data.topPlan.repaymentStatus
      })
    },
    accountformat (loanAccountNo) {
      if (loanAccountNo) {
        return `${loanAccountNo.substr((loanAccountNo.length - 4), 4)}`
      }
    },
    status (repaymentStatus) {
      switch (repaymentStatus) {
        case '10':
          return '待还款'
        case '20':
          return '还款逾期'
        default:
          return '已结清'
      }
    }
  },
  components: {
    Loading
  }
}
</script>
<style lang="sass" scoped>
</style>
