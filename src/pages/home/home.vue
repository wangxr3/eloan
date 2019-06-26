<template>
  <div class="bd">
    <mt-swipe :auto="2000" @change="handleChange">
      <mt-swipe-item>1</mt-swipe-item>
      <mt-swipe-item>2</mt-swipe-item>
      <mt-swipe-item>3</mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    handleChange (index) {
    //  console.log(index)
    }
  },
  components: {
  }
}
</script>
<style>
   .bd{
     width: 100%;
     height: 100%;
     background: green;
     color:#ffffff;
     font-size:16px;
   }
</style>
