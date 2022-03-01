<template>
  <el-date-picker
    v-model="val"
    :picker-options="pickerOptions"
    :type="dateType"
    :placeholder="placeholder"
    :value-format="dateFormat"
    :disabled="disabled"
    @change="handleChange"
    clearable
  />
</template>

<script>
import moment from "moment";
//此组件主要目的是禁用未来时间的选择，当传入的limitFuture为false时表示不限制选择未来时间，那必须同时传入dateType为date
export default {
  props: {
    value: {
      default: "",
      type: String,
    },
    dateType: {
      default: "datetime",
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    limitBefore: {
      default: "",
      type: String,
    },
    limitAfter: {
      default: "",
      type: String,
    },
    limitFuture: {
      default: true,
      type: Boolean,
    },
  },
  data() {
    const that = this;
    return {
      val: this.value,
      dateFormat: this.dateType == "datetime" ? "yyyy-MM-dd HH:mm:ss" : "yyyy-MM-dd",
      placeholder: this.dateType == "datetime" ? "选择时间" : "选择日期",
      pickerOptions: {
        selectableRange:(()=>{
          if(that.dateType == "datetime" && this.limitFuture){
        　　let data=new Date();
            let hour=data.getHours();
            let minute=data.getMinutes();
            let second=data.getSeconds();
            return [`00:00:00 - ${hour}:${minute}:${second}`]
          }
        })(),
        disabledDate: (time) => {
          if(that.limitBefore && that.limitAfter) {
            return time.getTime() <= new Date(that.limitBefore).getTime() - 8.64e7 ||  time.getTime() >= new Date(that.limitAfter).getTime();
          }else if(that.limitBefore && that.limitAfter == "") {
            if(that.limitFuture){
              return time.getTime() <= new Date(that.limitBefore).getTime() - 8.64e7 ||  time.getTime() >= Date.now();
            }else{
              return time.getTime() <= new Date(that.limitBefore).getTime() - 8.64e7;
            }
          }else if(that.limitBefore == "" && that.limitAfter) {
            return time.getTime() >= new Date(that.limitAfter).getTime();
          }else{
            if(that.limitFuture){
              return time.getTime() >= Date.now();
            }else{
              return false;
            }
          } 
        }
      },
    };
  },
  watch: {
    value(newVal) {
      this.val = newVal;
    },
    val: {
      handler(newValue, oldValue) {
        if (newValue && this.dateType == "datetime" && this.limitFuture) {
          const limitBefore = new Date(this.limitBefore)
          const limitAfter = new Date(this.limitAfter)
          const _newValue = new Date(newValue)
          let startTime = "";
          let endTime = "";
          startTime = this.limitBefore ? moment(this.limitBefore).format("HH:mm:ss") : "00:00:00";
          endTime = this.limitAfter ? moment(this.limitAfter).format("HH:mm:ss") : "23:59:59";
          this.pickerOptions.selectableRange = startTime + " - " + endTime;

          if (_newValue <= limitBefore) {
            this.val = this.limitBefore
            return false
          }
          if (_newValue >= limitAfter) {
            this.val = this.limitAfter
            return false
          }
          
          let date = new Date();
          let nowDate = moment(date).format("HH:mm:ss");
          let hh1 = moment(newValue).format("HH:mm:ss")
          if (!this.limitBefore || limitBefore.getTime() < _newValue.getTime()) {
            startTime = "00:00:00";
          }
          if (!this.limitAfter || limitAfter.getTime() < _newValue.getTime()) {
            endTime = "23:59:59";
          }
          if (moment(date).format("yyyy-MM-DD") === moment(newValue).format("yyyy-MM-DD")) {
            if(hh1 > nowDate) {
               this.val = new Date();
            }
            endTime = nowDate;
          } else {
            endTime = "23:59:59";
          }
          this.pickerOptions.selectableRange = startTime + " - " + endTime;
        }
      },
      deep: true,
      immediate: true,
    }
  },
  methods: {
    handleChange(value) {
      if(value){
        this.$emit("change", value);
      }else{
        this.$emit("change", "");
      }
    }
  }
};
</script>
