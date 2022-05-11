<script>
export default {
  components: {},
  props: ['pwdee'],
  data() {
    return { msgText: '' }
  },
  watch: {
    pwdee(newname, oldname) {
      this.msgText = this.checkStrong(newname)
      if (this.msgText > 1 || this.msgText === 1)
        document.getElementById('one').style.background = 'red'

      else
        document.getElementById('one').style.background = '#eee'

      if (this.msgText > 2 || this.msgText === 2)
        document.getElementById('two').style.background = 'orange'

      else
        document.getElementById('two').style.background = '#eee'

      if (this.msgText === 4)
        document.getElementById('three').style.background = '#00D1B2'

      else
        document.getElementById('three').style.background = '#eee'
    },
  },
  methods: {
    checkStrong(sValue) {
      let modes = 0
      // 正则表达式验证符合要求的
      if (sValue.length < 1)
        return modes
      if (/\d/.test(sValue))
        modes++ // 数字
      if (/[a-z]/.test(sValue))
        modes++ // 小写
      if (/[A-Z]/.test(sValue))
        modes++ // 大写
      if (/\W/.test(sValue))
        modes++ // 特殊字符

      // 逻辑处理
      switch (modes) {
        case 1:
          return 1
        case 2:
          return 2
        case 3:
        case 4:
          return sValue.length < 4 ? 3 : 4
      }
      return modes
    },
  },
}
</script>

<template>
  <div class="input_span">
    <span id="one" />
    <span id="two" />
    <span id="three" />
  </div>
  <div id="font">
    <span>弱</span>
    <span>中</span>
    <span>强</span>
  </div>
</template>

<style scoped>
#inputValue {
  width: 240px;
  margin-left: 20px;
  padding-left: 10px;
  border-radius: 3px;
}
.input_span span {
  display: inline-block;
  /* width: 85px; */
  height: 10px;
  background: #eee;
  line-height: 20px;
}

#one {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-right: 0px solid;
  margin-left: 20px;
  margin-right: 3px;
}

#two {
  border-left: 0px solid;
  border-right: 0px solid;
  margin-left: -5px;
  margin-right: 3px;
}

#three {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-left: 0px solid;
  margin-left: -5px;
}
#font span:nth-child(1) {
  color: #ff0000;
  margin-left: 80px;
}
#font span:nth-child(2) {
  color: #ffa500;
  margin: 0 60px;
}
#font span:nth-child(3) {
  color: #00d1b2;
}
</style>
