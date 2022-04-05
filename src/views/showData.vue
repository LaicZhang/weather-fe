<template>
  <div class="showData-page">
    <div class="home-banner">
      <el-form>
        <el-form-item>
          <p>当前地址：{{ currentLocation }}</p>
          <div>修改地址：<city :key="locationKey" :full-location="fullLocation" @change-city="changeCity" /></div>
        </el-form-item>
        <el-col :span="24">
          <el-form-item>
            <el-button type="primary" @click="onSubmit('permanent')">
              设为默认地址
            </el-button>
            <el-button type="primary" @click="onSubmit('temporary')">
              临时查看
            </el-button>
            <el-button @click="resetForm">
              撤销修改
            </el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <div class="data-table">
      <el-table
        class="base-table"
        :data="dataList"
        size="default"
        stripe
        style="width: 100%"
      >
        <!-- <el-table-column sortable type="index" width="55" /> -->
        <el-table-column
          v-for="column in dataColumns"
          :key="column.prop"
          sortable
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
          :formatter="column.formatter"
          show-overflow-tooltip
        />
        <!--        <el-table-column sortable label="Operations">-->
        <!--          <template #default="scope">-->
        <!--            <el-button size="default" type="text" @click="onEditUser(scope.row)">编辑</el-button>-->
        <!--            <el-button size="default" type="text" @click="onAddDeleteList(scope.row)">删除</el-button>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
      </el-table>
      <el-pagination
        class="text-right"
        background
        layout="prev, pager, next"
        :current-page="pager.pageNum"
        :page-size="pager.pageSize"
        :total="pager.total"
        @current-change="onChangeCurrentPage"
      />
    </div>
  </div>
</template>

<script  setup>
import { onMounted, reactive, ref } from 'vue'
import store from '@/store'
import city from '@/components/city.vue'
import { getWeatherListApi } from '@/api'

const provinceCode = ref('110000')
const cityCode = ref('119900')
const countyCode = ref('110101')
// const fullLocation = ref('北京市 市辖区 东城区')
const fullLocation = ref('')
const pager = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0,
})
const dataList = ref([])
const dataColumns = [
  { prop: 'time', label: '爬取日期' },
  { prop: 'province', label: '省份' },
  { prop: 'city', label: '城市' },
  { prop: 'daytime_weather_conditions', label: '白天天气' },
  { prop: 'nighttime_weather_conditions', label: '夜晚天气' },
  { prop: 'maximum_temperature', label: '最高温度' },
  { prop: 'minimum_temperature', label: '最低温度' },
  { prop: 'daytime_wind', label: '白天风力风向' },
  { prop: 'nighttime__wind', label: '夜晚风力风向' },
]
const weatherData = store.state.weatherData
const userInfo = store.state.userInfo
const currentLocation = ref('')
currentLocation.value = userInfo.location.province + userInfo.location.city

let cityNm = '成都'
const locationKey = ref(1)
// 更新选中的省市区数据
const changeCity = (cityInfo) => {
  provinceCode.value = cityInfo.provinceCode
  cityCode.value = cityInfo.cityCode
  countyCode.value = cityInfo.countyCode
  fullLocation.value = cityInfo.fullLocation
  console.log('changeCity', cityInfo)
  cityNm = cityInfo.cityName
  cityNm = cityNm.substring(0, cityNm.length - 1)
  currentLocation.value = cityInfo.fullLocation
}
const setValue = (list, page) => {
  pager.pageNum = page.pageNum
  pager.total = page.total
  dataList.value = list
}
const getWeatherList = async() => {
  const { list, page } = await getWeatherListApi({ pager })
  setValue(list, page)
}
const onChangeCurrentPage = async(currentPage) => {
  pager.pageNum = currentPage
  const { list, page } = await getWeatherListApi({ pager, city: cityNm })
  setValue(list, page)
}
const onSubmit = async(action) => {
  if (store.state.location !== '')
    cityNm = store.state.location
  if (action === 'permanent')
    store.dispatch('setLocation', cityNm)

  const { list, page } = await getWeatherListApi({ pager, city: cityNm, action })
  setValue(list, page)
}
const resetForm = () => {
  locationKey.value++
}

onMounted(async() => {
  const { list, page } = await getWeatherListApi({ pager, city: cityNm })
  setValue(list, page)
})
</script>
<style lang="scss" scoped>
.showData-page {
  padding: 30px;
  box-sizing: border-box;
  height: 100vh;
}
</style>
