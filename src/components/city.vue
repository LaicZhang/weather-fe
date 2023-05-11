<script setup>
import { computed, reactive, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { getCityList } from '@/api'

const emit = defineEmits(['changeCity'])
const props = defineProps({
  fullLocation: {
    type: String,
    default: '',
  },
})

const isShow = ref(false)
const loading = ref(false)
// 城市列表原始数据
const list = ref([])

// 选中的省市区
const changeResult = reactive({
  provinceCode: '',
  provinceName: '',
  cityCode: '',
  cityName: '',
  countyCode: '',
  countyName: '',
  fullLocation: '',
})

// 选择城市操作
const changeCity = (city) => {
  if (city.level === 0) {
    // 点击的省级单位
    changeResult.provinceCode = city.code
    changeResult.provinceName = city.name
  }
  else if (city.level === 1) {
    // 点击的市级单位
    changeResult.cityCode = city.code
    changeResult.cityName = city.name
  }
  else if (city.level === 2) {
    // 点击的县级单位:选中最终的省市区数据，并且传递给父组件
    changeResult.countyCode = city.code
    changeResult.countyName = city.name
    // 组合完整的省市区名称
    changeResult.fullLocation = `${changeResult.provinceName}${changeResult.cityName}${changeResult.countyName}`
    // 关闭碳层
    isShow.value = false
    // 把选中的数据最终传递给父组件
    emit('changeCity', changeResult)
  }
}

// 通过计算属性计算当前显示的列表数据：省级；市级；县级
const cityList = computed(() => {
  let result = list.value
  // 当前点击的是省，那么就计算市级列表
  if (changeResult.provinceCode && changeResult.provinceName)
    result = result.find(item => item.code === changeResult.provinceCode).areaList

  if (changeResult.cityCode && changeResult.cityName)
    result = result.find(item => item.code === changeResult.cityCode).areaList

  // 当前点击的是市，那么就计算县级列表
  return result
})

// 点击显示和隐藏弹层
const toggle = () => {
  isShow.value = !isShow.value
  if (isShow.value) {
    loading.value = true
    // 调用接口之前，把之前选中的数据置空
    for (const key in changeResult)
      changeResult[key] = ''

    // 弹层显示了，调用接口
    getCityList().then((ret) => {
      list.value = ret
      loading.value = false
    })
  }
}
// 控制点击区域外，隐藏弹层
const target = ref(null)
onClickOutside(target, () => {
  isShow.value = false
})
</script>

<template>
  <div ref="target" class="city">
    <div class="select" :class="{ active: isShow }" @click="toggle">
      <span v-if="!fullLocation" class="placeholder">请选择您的地址</span>
      <span v-else class="value">{{ fullLocation }}</span>
      <em class="iconfont icon-angle-down" />
    </div>
    <!-- 下拉弹层 -->
    <div v-show="isShow" class="option">
      <!-- 数据的加载过程进行提示 -->
      <div v-if="loading" class="loading" />
      <template v-else>
        <span v-for="item in cityList" :key="item.code" class="ellipsis" @click="changeCity(item)">{{ item.name }}</span>
      </template>
    </div>
  </div>
</template>

<style scoped lang="less">
.city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    .loading {
      height: 290px;
      width: 100%;
      background: url(https://code-1307161657.cos.ap-beijing.myqcloud.com/images/load.gif) no-repeat center;
    }
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
