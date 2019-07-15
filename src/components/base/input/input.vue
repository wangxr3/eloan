<template>
    <div class="text_group">
        <div class="input_group" :class="{'is-invalid': error}">
            <!-- 输入框 -->
            <input
                :type="type"
                :placeholder="placeholder"
                :value="value"
                :name="name"
                @input="$emit('input',$event.target.value)"
            >
            <!-- 输入框后面的内s容 -->
            <button v-if="btnTitle" @click="$emit('btnClick')" :disabled="disabled">{{btnTitle}}</button>
            <img v-if="imgCode" :src="imgsrc"/>
        </div>
        <!-- 验证提示 -->
        <div v-if="error" class="invalid-feedback">{{error}}</div>
    </div>
</template>
<script>
export default {
  name: 'inputGroup',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    flag: Boolean,
    placeholder: String,
    value: String,
    name: String,
    disabled: Boolean,
    imgsrc: String,
    imgCode: Boolean,
    btnTitle: String, // input里文字
    error: String // 验证不正确提示
  }
}
</script>
<style scoped lang="scss" rel="stylesheet/scss">
@import '~assets/styles/function';
.text_group{
  float:left;
  margin-left:px2rem(80);
  margin-top: px2rem(40);
  &:first-child{
    margin-top:px2rem(80);
  }
  input{
    padding-top: px2rem(10);
    padding-bottom: px2rem(10);
    font-size: px2rem(30);
    color:#000000;
  }
  button{
    width: px2rem(220);
    height:px2rem(50);
    line-height: px2rem(50);
    color:#000000;
    font-size: px2rem(30);
  }
}

</style>
