<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { readConfigApi, requestDataApi, writeConfigApi } from '@/api'

const options = [
  {
    label: '全国',
    value: 'http://www.weather.com.cn/textFC/',
  },
  {
    label: '华北',
    value: 'http://www.weather.com.cn/textFC/hb.shtml',
  },
  {
    label: '华东',
    value: 'http://www.weather.com.cn/textFC/hd.shtml',
  },
  {
    label: '华中',
    value: 'http://www.weather.com.cn/textFC/hz.shtml',
  },
  {
    label: '华南',
    value: 'http://www.weather.com.cn/textFC/hn.shtml',
  },
  {
    label: '西南',
    value: 'http://www.weather.com.cn/textFC/xn.shtml',
  },
  {
    label: '西北',
    value: 'http://www.weather.com.cn/textFC/xb.shtml',
  },
  {
    label: '东北',
    value: 'http://www.weather.com.cn/textFC/db.shtml',
  },
  {
    label: '港澳台',
    value: 'http://www.weather.com.cn/textFC/gat.shtml',
  },
]
let savedConfig = {}
const dataFormRef = ref(null)
const dataConfig: any = reactive({})
function onSubmit() {
  writeConfig()
}
const dataFormRules = {
  targetUrl: [
    { required: true, message: '请选择目标地址', trigger: 'blur' },
  ],
  method: [
    { required: true, message: '请选择爬取方式', trigger: 'blur' },
  ],
  time: [
    { required: true, message: '请选择爬取时间', trigger: 'blur' },
  ],
}
async function getDataAtNow() {
  await requestDataApi()
}
async function readConfig() {
  const res = await readConfigApi()
  dataConfig.targetUrl = res.targetUrl
  dataConfig.method = res.method
  dataConfig.time = res.time
  if (!savedConfig)
    savedConfig = structuredClone(res)
}
async function writeConfig() {
  if (!dataConfig)
    return
  await writeConfigApi(dataConfig)
}
function resetForm() {
  readConfig()
}
onMounted(() => {
  readConfig()
})
</script>

<template>
  <div class="SetDataConfig-page">
    <el-form ref="dataFormRef" :model="dataConfig" :rules="dataFormRules">
      <el-form-item label="目标地址">
        <el-select
          v-model="dataConfig.targetUrl"
          placeholder="选择地域"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
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
          start="08:30"
          step="00:15"
          end="15:30"
          size="small"
          placeholder="选择时间"
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

<style lang="scss" scoped>
  .SetDataConfig-page {
    padding: 30px;
    box-sizing: border-box;
    height: 100vh;
    width: 30vw;
  }
</style>
