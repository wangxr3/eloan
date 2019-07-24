<template>
  <mt-popup position="bottom" v-model="popupVisible" :closeOnClickModal="false">
    <mt-cell v-for="(item,index) in data" :key="index" :title="item.value" @click.native="$emit('selecct',item)"></mt-cell>
  </mt-popup>
</template>
<script>
export default {
  name: 'popBottom',
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    popupVisible: Boolean
  },
  data () {
    return {
    }
  },
  created () {
  }
}
</script>
<style scoped lang="scss" rel="stylesheet/scss">
@import '~assets/styles/function';
</style>
