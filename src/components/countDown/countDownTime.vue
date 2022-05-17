<script>
export default {
  props: {
    endTime: {
      type: String,
    },
  },
  emits: ['timeEnd'],
  data() {
    return {
      time: '',
      flag: false,
    }
  },
  mounted() {
    const time = setInterval(() => {
      if (this.flag === true)
        clearInterval(time)

      this.timeDown()
    }, 500)
  },
  methods: {
    timeDown() {
      const endTime = new Date(this.endTime)
      const nowTime = new Date()
      const leftTime = parseInt((endTime.getTime() - nowTime.getTime()) / 1000)
      const d = parseInt(leftTime / (24 * 60 * 60))
      const h = this.formate(parseInt((leftTime / (60 * 60)) % 24))
      const m = this.formate(parseInt((leftTime / 60) % 60))
      const s = this.formate(parseInt(leftTime % 60))
      if (leftTime <= 0) {
        this.flag = true
        this.$emit('timeEnd')
      }
      this.time = `${h}:${m}:${s}` // 需要修改时间样式的话 ，比如需要什么30分钟倒计时，就只保留分和秒
    },
    formate(time) {
      if (time >= 10)
        return time
      else
        return `0${time}`
    },
  },
}
</script>

<template>
  <span>{{ time }}</span>
</template>

<style scoped>
</style>
