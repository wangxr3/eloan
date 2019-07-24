<template>
  <div>
    <mt-header title="我的优惠券">
      <router-link to="/my" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">未使用</mt-tab-item>
      <mt-tab-item id="2">已失效</mt-tab-item>
    </mt-navbar>
    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <mt-cell v-for="(n,index) in 10" :title="'未使用 ' + n" :key="index"/>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <mt-cell v-for="(n,index) in 4" :title="'已失效' + n" :key="index"/>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      selected: '1'
    }
  },
  created () {},
  methods: {
    getVoucherList () {
      const params = {
        status: '-1,0,1,2',
        sortListStr: JSON.stringify([{ name: 'endTime', order: false }])
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
