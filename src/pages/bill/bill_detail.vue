<template>
    <div class="bill_detail">
        <div class="detail_top">
            <div>借款金额（元）</div>
            <div>￥{{data.authAmount}}&nbsp;</div>
        </div>
        <div class="detail_content"></div>
        <div class="detail_button"></div>
    </div>
</template>
<script>
import { getLoanApplyDetail } from 'api/request'
export default {
    data() {
        return {
            data:''
        }
    },
    created() {
        this.getLoanApplyDetail();
    },
    methods:{
        getLoanApplyDetail(){
            getLoanApplyDetail({"loanNo":this.$route.query.loanNo}).then(data =>{
                this.data = data;
            })
        }
    }
}
</script>
<style lang="sass" scoped>

</style>
