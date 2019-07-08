<template>
    <div class="bill_detail">
        <mt-header title="账单详情">
            <router-link to="/bill_list" slot="left">
            <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div class="detail_top">
            <div>借款金额（元）</div>
            <div class="dueAmount">￥{{data.authAmount}}&nbsp;{{status(topPlan.repaymentStatus)}}</div>
            <div>贷款管理费（一次性收取）￥{{}}（未缴￥）</div>
            <div>放款卡：{{data.loanBankName}}({{accountformat(data.loanAccountNo)}})</div>
            <div>一次性还款卡：{{data.bankName}}({{accountformat(data.accountNo)}})</div>
            <div>申请人：{{data.accountName}}</div>
        </div>
        <div class="detail_content">
            <mt-cell class="date" title="还款日"></mt-cell>
            <mt-cell class="period" title="期数"></mt-cell>
            <mt-cell class="amount" title="应还"></mt-cell>
            <mt-cell class="status" title="状态"></mt-cell>
            <div  class="detail" v-for= " (arr,index) in billDetail" :key="index" @click="fee(arr)">
                <mt-cell class="date" :title="arr.dueDate" ></mt-cell>
                <mt-cell class="period" :title="arr.perdNo" ></mt-cell>
                <mt-cell class="amount" :title="arr.dueAmount"></mt-cell>
                <mt-cell class="status" :title="status(arr.repaymentStatus)"></mt-cell>
            </div>
        </div>
        <div class="detail_button">

        </div>
    </div>
</template>
<script>
import { getLoanApplyDetail } from 'api/request'
export default {
  data () {
    return {
      data: '',
      billDetail: [],
      topPlan: ''
    }
  },
  created () {
    this.getLoanApplyDetail()
  },
  methods: {
    getLoanApplyDetail () {
      getLoanApplyDetail({'loanNo': this.$route.query.loanNo}).then(data => {
        this.data = data;
        this.topPlan = data.topPlan
        this.billDetail = data.repaymentPlanList;
      })
    },
    accountformat (loanAccountNo) {
      if(loanAccountNo){
         return `${loanAccountNo.substr((loanAccountNo.length - 4), 4)}`
      }
    },
    status(repaymentStatus) {
        switch(repaymentStatus) {
            case '10':
            return '待还款'
            case '20':
            return '还款逾期'
            default :
            return '已结清'            
        }
    }
  }
}
</script>
<style scoped lang="scss" rel="stylesheet/scss">
@import '~assets/styles/function';
  .detail_top{
    background: #44ccca;
    color: #fff;
    font-size: px2rem(30);
    text-align: left;
    padding-left: px2rem(45);
    div{
      padding: px2rem(15) 0;
    }
    .dueAmount{
      font-size: px2rem(60);
    }
  }
  .detail_content{
    .date,.period,.amount,.status{
      width:25%;
      float:left;
    }
  }
</style>
