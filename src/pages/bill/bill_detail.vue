<template>
  <div class='bill_detail'>
    <mt-header title='账单详情'>
      <router-link to='/bill_list' slot='left'>
        <mt-button icon='back'>返回</mt-button>
      </router-link>
    </mt-header>
    <div class='detail_top'>
      <div>借款金额（元）</div>
      <div class='dueAmount'>￥{{data.authAmount}}&nbsp;{{status(topPlan.repaymentStatus)}}</div>
      <!-- <div>贷款管理费（一次性收取）￥{{}}（未缴￥）</div> -->
      <div>放款卡：{{data.loanBankName}}({{accountformat(data.loanAccountNo)}})</div>
      <div>一次性还款卡：{{data.bankName}}({{accountformat(data.accountNo)}})</div>
      <div>申请人：{{data.accountName}}</div>
    </div>
    <div class='detail_content'>
      <mt-cell class='date' title='还款日'></mt-cell>
      <mt-cell class='period' title='期数'></mt-cell>
      <mt-cell class='amount' title='应还'></mt-cell>
      <mt-cell class='status' title='状态'></mt-cell>
      <div class='detail' v-for=' (arr,index) in billDetail' :key='index'>
        <div class='detail_list' @click='showCost(index)'>
          <mt-cell class='date' :title='arr.dueDate'></mt-cell>
          <mt-cell class='period' :title='arr.perdNo'></mt-cell>
          <mt-cell class='amount' :title='arr.dueAmount'></mt-cell>
          <mt-cell class='status' :title='status(arr.repaymentStatus)'></mt-cell>
        </div>
        <div class='cost_detail' :class='{xs:showFree == index}'>
          <p>
            本金
            <span>{{amountformat(arr.principal)}}</span>
          </p>
          <p>
            利息
            <span>{{amountformat(arr.interest)}}</span>
          </p>
          <div v-for='(list,index) in arr.chargeDetailList' :key='index'>
            <p :class='amountshow(list.chargeAmount)'>
              {{list.chargeName}}
              <span>{{amountformat(list.chargeAmount)}}</span>
            </p>
          </div>
          <p :class='amountshow(arr.penalty)'>
            罚金
            <span>{{amountformat(arr.penalty)}}</span>
          </p>
          <p :class='amountshow(arr.lateFee)'>
            滞纳金
            <span>{{amountformat(arr.lateFee)}}</span>
          </p>
          <p :class='amountshow(arr.damages)'>
            违约金
            <span>{{amountformat(arr.damages)}}</span>
          </p>
          <p class='total'>
            合计
            <span>{{amountformat(arr.dueAmount)}}</span>
          </p>
        </div>
      </div>
    </div>
    <div class='mask' v-show='hasRepay'>
      <div class='list_box'>
        <mt-checklist title='确认还款' v-model='value' :options='repayPlanList'></mt-checklist>
        <mt-button
          type='primary'
          size='large'
          class='cashier'
          @click='toCashier'
        >去还款{{amountValue(value)}}</mt-button>
        <div class='close' @click='closeBox'>X</div>
      </div>
    </div>
    <div class='detail_button' v-show='toRepay'>
      <mt-button class='button early'>提前结清</mt-button>
      <mt-button class='button repay' @click='repay'>主动还款</mt-button>
    </div>
    <!-- <div class='loading-wrapper' v-show='isLoading'>
             <loading title='数据量大，请耐心等待...'></loading>
    </div>-->
  </div>
</template>
<script>
// import Loading from 'base/loading/loading'
import { getLoanApplyDetail, queryDeductionRepaymentPlan } from 'api/request'
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      data: '',
      billDetail: [],
      topPlan: '',
      toRepay: '',
      chargeDetailList: '',
      repaymentPlan: '',
      showFree: -1,
      value: [],
      repayPlanList: [],
      hasRepay: ''
    }
  },
  created () {
    this.getLoanApplyDetail()
    // this.queryDeductionRepaymentPlan()
  },
  methods: {
    getLoanApplyDetail () {
      getLoanApplyDetail({ loanNo: this.$route.query.loanNo }).then(data => {
        this.data = data
        this.topPlan = data.topPlan
        this.billDetail = data.repaymentPlanList
        this.chargeDetailList = data.chargeDetailList
        this.isToRepay()
      })
    },
    queryDeductionRepaymentPlan () {
      queryDeductionRepaymentPlan({ applyNo: this.$route.query.loanNo }).then(
        data => {
          this.repaymentPlan = data
          this.repayPlanList = []
          if (data.repayPlanList.length > 0) {
            this.hasRepay = true
            const repayEndDate =
              data.repayEndDate.substr(0, 4) +
              '-' +
              data.repayEndDate.substr(4, 2) +
              '-' +
              data.repayEndDate.substr(6, 2)
            for (var i = 0; i < data.repayPlanList.length; i++) {
              const deadlineDate =
                data.repayPlanList[i].deadlineDate.substr(0, 4) +
                '-' +
                data.repayPlanList[i].deadlineDate.substr(4, 2) +
                '-' +
                data.repayPlanList[i].deadlineDate.substr(6, 2)
              if (
                new Date(repayEndDate).getTime() -
                  new Date(deadlineDate).getTime() >
                  0 &&
                data.repayPlanList[i].settleFlag === 1
              ) {
                this.repayPlanList.push(
                  data.repayPlanList[i].deadlineDate +
                    '   ' +
                    data.repayPlanList[i].periodNo +
                    '期 ' +
                    data.repayPlanList[i].repayAmount +
                    '元  ' +
                    this.settleStatus(data.repayPlanList[i].settleFlag)
                )
              } else {
                this.hasRepay = false
                Toast('当前暂无待还款明细')
              }
            }
          } else {
            this.hasRepay = false
            Toast('当前暂无待还款明细')
          }
          // this.repayPlanList = data.repayPlanList
        }
      )
    },
    repay () {
      this.queryDeductionRepaymentPlan()
    },
    toCashier () {
      // this.$router.push({path: '/bill_detail', query: {'loanNo': arr.loanNo, 'from': 'h5'}})
    },
    closeBox () {
      this.hasRepay = false
    },
    showCost (index) {
      this.showFree === index ? (this.showFree = -1) : (this.showFree = index)
    },
    accountformat (loanAccountNo) {
      if (loanAccountNo) {
        return `${loanAccountNo.substr(loanAccountNo.length - 4, 4)}`
      }
    },
    status (repaymentStatus) {
      return repaymentStatus === 10 ? '待还款' : repaymentStatus === 20 ? '还款逾期' : '已结清'
    },
    settleStatus (settleFlag) {
      return settleFlag === 1 ? '待还款' : settleFlag === 2 ? '已逾期' : '已结清'
    },
    isToRepay () {
      if (
        this.topPlan.repaymentStatus !== 10 ||
        this.topPlan.repaymentStatus !== 20
      ) {
        this.toRepay = true
      } else {
        this.toRepay = true
      }
    },
    amountformat (amount) {
      return Number(amount).toFixed(2)
    },
    amountshow (amount) {
      return amount === 0 || amount === '' ? 'yc' : 'xs'
    },
    amountValue (value) {
      var totle = ''
      for (var i = 0; i < value.length; i++) {
        totle = value[i].slice(value[i].indexOf('期') + 1, value[i].indexOf('元'))
      }
      return totle
    }
  }
  // components: {
  //   Loading
  // }
}
</script>
<style scoped lang='scss' rel='stylesheet/scss'>
@import '~assets/styles/function';
.detail_top {
  background: #44ccca;
  color: #fff;
  font-size: px2rem(30);
  text-align: left;
  padding-left: px2rem(45);
  div {
    padding: px2rem(15) 0;
  }
  .dueAmount {
    font-size: px2rem(60);
  }
}
.detail_content {
  .date,
  .period,
  .amount,
  .status {
    width: 25%;
    float: left;
  }
}
.detail_button {
  width: 100%;
  position: fixed;
  bottom: 0;
  .button {
    width: px2rem(360);
  }
}
.cost_detail {
  font-size: px2rem(22);
  background: #fff;
  display: none;
  p {
    margin: 0;
  }
}
.yc {
  display: none;
}
.xs {
  display: block;
}
.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  background: rgba(0, 0, 0, 0.3);
  .list_box {
    width: 100%;
    height: px2rem(600);
    position: absolute;
    bottom: 0;
    background: #fff;
    text-align: left;
  }
  .cashier {
    position: absolute;
    bottom: 0;
  }
  .close {
    width: px2rem(24);
    height: px2rem(24);
    position: absolute;
    right: px2rem(30);
    top: px2rem(10);
  }
}
</style>
