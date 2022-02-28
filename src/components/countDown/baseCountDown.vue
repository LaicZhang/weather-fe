<template>
  <div class="_base-count-down no-rtl">
    <div class="content">
      <slot v-bind="{
        d: days, h: hours, m: mins, s: seconds,
        hh: `00${hours}`.slice(-2),
        mm: `00${mins}`.slice(-2),
        ss: `00${seconds}`.slice(-2),
      }"></slot>
    </div>
  </div>
</template>
<script>
/* eslint-disable object-curly-newline */

export default {
  data: () => ({
    days: '0',
    hours: '00',
    mins: '00',
    seconds: '00',
    timer: null,
    curTime: 0
  }),
  props: {
    time: {
      type: [Number, String],
      default: 0
    },
    refreshCounter: {
      type: [Number, String],
      default: 0
    },
    end: {
      type: [Number, String],
      default: 0
    },
    isMiniSecond: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    duration() {
      if (this.end) {
        let end = String(this.end).length >= 13 ? +this.end : +this.end * 1000;
        end -= Date.now();
        return end;
      }
      const time = this.isMiniSecond ? Math.round(+this.time / 1000) : Math.round(+this.time);
      return time;
    }
  },
  mounted() {
    this.countDown();
  },
  watch: {
    duration() {
      this.countDown();
    },
    refreshCounter() {
      this.countDown();
    }
  },
  methods: {
    durationFormatter(time) {
      if (!time) return { ss: 0 };
      let t = time;
      const ss = t % 60;
      t = (t - ss) / 60;
      if (t < 1) return { ss };
      const mm = t % 60;
      t = (t - mm) / 60;
      if (t < 1) return { mm, ss };
      const hh = t % 24;
      t = (t - hh) / 24;
      if (t < 1) return { hh, mm, ss };
      const dd = t;
      return { dd, hh, mm, ss };
    },
    countDown() {
      // eslint-disable-next-line no-unused-expressions
      this.curTime = Date.now();
      this.getTime(this.duration);
    },
    getTime(time) {
      // eslint-disable-next-line no-unused-expressions
      this.timer && clearTimeout(this.timer);
      if (time < 0) {
        return;
      }
      // eslint-disable-next-line object-curly-newline
      const { dd, hh, mm, ss } = this.durationFormatter(time);
      this.days = dd || 0;
      // this.hours = `00${hh || ''}`.slice(-2);
      // this.mins = `00${mm || ''}`.slice(-2);
      // this.seconds = `00${ss || ''}`.slice(-2);
      this.hours = hh || 0;
      this.mins = mm || 0;
      this.seconds = ss || 0;
      this.timer = setTimeout(() => {
        const now = Date.now();
        const diffTime = Math.floor((now - this.curTime) / 1000);
        const step = diffTime > 1 ? diffTime : 1; // 页面退到后台的时候不会计时，对比时间差，大于1s的重置倒计时
        this.curTime = now;
        this.getTime(time - step);
      }, 1000);
    }
  }
};
</script>
<style lang='scss' scoped>
@import '~@assets/css/common.scss';

._base-count-down {
  color: #fff;
  text-align: left;
  position: relative;
  .content {
    width: auto;
    display: flex;
    align-items: center;
  }
  span {
    display: inline-block;
  }
  .section {
    position: relative;
  }
}
</style>
