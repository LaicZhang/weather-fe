<template>
  <div class="SetDataConfig-page">
    <el-form>
      <el-form-item label="目标地址">
        <el-input v-model="dataConfig.targetUrl" disabled />
      </el-form-item>
      <el-form-item label="爬取方式">
        <el-select v-model="dataConfig.method">
          <el-option label="python" value="python" />
          <el-option label="node" value="node" />
        </el-select>
      </el-form-item>
      <el-form-item label="爬取时间">
        <el-time-select
          v-model="dataConfig.time"
          start="08:00"
          step="00:30"
          end="12:00"
          placeholder="Select time"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getDataAtNow">
          立刻爬取
        </el-button>
        <el-button type="primary" @click="onSubmit">
          提交
        </el-button>
        <el-button @click="resetForm">
          撤销修改
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
</script>

<script setup>
import { onMounted, reactive } from 'vue'

defineProps({
})

const dataConfig = reactive({
  targetUrl: 'http://www.weather.com.cn/textFC/',
  method: 'python',
  time: '08:00',
})
const consoleConfig = () => {
  console.log(dataConfig)
}
const onSubmit = () => {
  console.log('submit')
}
const getDataAtNow = () => {
  console.log('getDataAtNow')
}
const resetForm = () => {
  console.log('resetForm')
}
onMounted(() => {
  consoleConfig()
})
</script>

<style lang="scss" scoped>
  .SetDataConfig-page {
    padding: 30px;
    box-sizing: border-box;
    height: 100vh;
    width: 30vw;
  }
  .search-from-wrap {
    background: white;
    margin-bottom: 18px;
  }
</style>
