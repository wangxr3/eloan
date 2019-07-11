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
                <div class="detail_list" @click="showCost()">
                  <mt-cell class="date" :title="arr.dueDate" ></mt-cell>
                  <mt-cell class="period" :title="arr.perdNo" ></mt-cell>
                  <mt-cell class="amount" :title="arr.dueAmount"></mt-cell>
                  <mt-cell class="status" :title="status(arr.repaymentStatus)"></mt-cell>
                </div>
                <div class="cost_detail">
                  <p>本金<span>{{amountformat(arr.principal)}}</span></p>
                  <p>利息<span>{{amountformat(arr.interest)}}</span></p>
                  <div v-for = "list in arr.chargeDetailList">
                  <p :class="amountshow(list.chargeAmount)">{{list.chargeName}}<span>{{amountformat(list.chargeAmount)}}</span></p>
                  </div>
                  <p :class="amountshow(arr.penalty)">罚金<span>{{amountformat(arr.penalty)}}</span></p>
                  <p :class="amountshow(arr.lateFee)">滞纳金<span>{{amountformat(arr.lateFee)}}</span></p>
                  <p :class="amountshow(arr.damages)">违约金<span>{{amountformat(arr.damages)}}</span></p>
                  <p class="total">合计<span>{{amountformat(arr.dueAmount)}}</span></p>
                </div>
            </div>
        </div>
        <div class="detail_button" v-show="toRepay">
            <mt-button class="button early">提前结清</mt-button>
            <mt-button class="button repay">主动还款</mt-button>
        </div>
    </div>
</template>
<script>
import { getLoanApplyDetail } from 'api/request'
import { queryDeductionRepaymentPlan } from 'api/request'
export default {
  data () {
    return {
      data: '',
      billDetail: [],
      topPlan: '',
      toRepay: '',
      chargeDetailList: '',
      repaymentPlan: ''
    }
  },
  created () {
    this.getLoanApplyDetail()
    this.queryDeductionRepaymentPlan()
  },
  methods: {
    getLoanApplyDetail () {
      getLoanApplyDetail({'loanNo': this.$route.query.loanNo}).then(data => {
        this.data = data;
        this.topPlan = data.topPlan
        this.billDetail = data.repaymentPlanList;
        this.chargeDetailList = data.chargeDetailList
        this.isToRepay();
      })
    },
    queryDeductionRepaymentPlan (){
        queryDeductionRepaymentPlan({'applyNo': this.$route.query.loanNo}).then(data => {
          this.repaymentPlan = data;
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
    },
    isToRepay(){
      if(this.topPlan.repaymentStatus !=10 || this.topPlan.repaymentStatus != 20){
        this.toRepay = true
      }else{
        this.toRepay = true
      }
    },
    amountformat(amount) {
      return Number(amount).toFixed(2);
    },
    amountshow(amount){
      return (amount == 0 || amount == '') ? 'yc' : 'xs';
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
  .detail_button{
    width: 100%;
    position: fixed;
    bottom: 0;
    .button{
      width: px2rem(360);
    }
  }
  .cost_detail{
    font-size: px2rem(22);
    background: #FFF;
    display: none;
  }
  .yc{
    display: none;
  }
  .xs{
    display: block;
  }
</style>
