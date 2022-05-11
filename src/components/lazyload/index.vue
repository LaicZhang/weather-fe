<script>
export default {
  name: 'PlLazy',
  props: {
    time: {
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      initSuccess: false,
    }
  },
  created() {
    this.initSlot()
  },

  methods: {
    initSlot() {
      setTimeout(() => {
        this.initSuccess = true
      }, (Number(this.time || 0)))
    },
  },
}
</script>

<template>
  <span>
    <slot v-if="initSuccess" />
  </span>
</template>
