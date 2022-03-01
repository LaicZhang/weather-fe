<template>
  <el-input
    v-model.trim="val"
    :placeholder="placeholder"
    :disabled="disabled"
    :maxlength="maxlength"
    :min="min"
    clearable
    @input="handleInput"
  >
    <template v-if="append" slot="append">{{ appendStr }}</template>
  </el-input>
</template>

<script>
/**
 * 此组件主要目的是对正整数和小数的输入限制
 * 当传入的inputType为int时表示只能输入正整数，默认可以输入小数
 * 当传入的append为true时表示输入框有后缀，必须同时传入后缀单位appendStr
*/
export default {
  props: {
    value: {
      default: "",
      type: String,
    },
    maxlength: {
      default: 15,
      type: Number,
    },
    min: {
      default: 0,
      type: Number,
    },
    placeholder: {
      default: "",
      type: String,
    },
    inputType: {
      default: "int",
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    append: {
      default: false,
      type: Boolean,
    },
    appendStr: {
      default: "",
      type: String,
    },
  },
  data() {
    return {
      val: this.value,
    };
  },
  watch: {
    value(newVal) {
      this.val = newVal;
    }
  },
  methods: {
    handleInput() {
      if(this.inputType == "int"){
        this.val = this.val.replace(/[^0-9]/g, '').replace(/^0{1,}/g, '');
      }else{
        this.val = this.val.replace(/[^\.\d]/g,'').replace(/^\./g,'').replace(".","$#$").replace(/\./g,"").replace("$#$",".").replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1');
      }
      this.$emit("input", this.val);
    }
  }
};
</script>
