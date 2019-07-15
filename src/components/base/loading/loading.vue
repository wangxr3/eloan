<template>
  <div class="loading">
    <img src="./loading.gif" width="24" height="24">
    <p class="desc" v-show="title">{{title}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
