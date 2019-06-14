<template>
    <div class="my_box" >
        <mt-header title="个人中心">
            <router-link to="/" slot="left">
            <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div class="top">
            <div :style="myBg"></div>
        </div>
        <div class="cell">
            <mt-cell title="资料提额" is-link to="">
            <span style="color: green">更多认证，额度更高</span>
            <img slot="icon" src="~assets/images/logo.png" width="24" height="24">
            </mt-cell>
            <mt-cell title="账单管理" is-link to="">
            <img slot="icon" src="~assets/images/logo.png" width="24" height="24">
            </mt-cell>
            <mt-cell title="优惠券管理" is-link to="">
            <img slot="icon" src="~assets/images/logo.png" width="24" height="24">
            </mt-cell>
            <mt-cell title="分享易贷" is-link to="">
            <img slot="icon" src="~assets/images/logo.png" width="24" height="24">
            </mt-cell>
            <mt-cell title="帮助中心" is-link to="">
            <img slot="icon" src="~assets/images/logo.png" width="24" height="24">
            </mt-cell>
            <mt-cell title="在线客服" is-link to="">
            <img slot="icon" src="~assets/images/logo.png" width="24" height="24">
            </mt-cell>
            <mt-cell title="联系我们"" is-link to="">
            <img slot="icon" src="~assets/images/logo.png" width="24" height="24">
            </mt-cell>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return{
             myBg: {
                  backgroundImage: `url(${require('@/assets/images/my_bg.png')})`
             }
        }
    }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import '~assets/styles/function';
.top div{
    height: px2rem(330);
    background-size: 100% 100%;
}
.cell{
text-align: left;
}
</style>
