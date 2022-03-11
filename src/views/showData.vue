<template>
  <div class="showData-page">
    <div class="home-banner">
      <el-form>
        <el-form-item>
          <span>您的地址：</span>
          <city @change-city="changeCity" :fullLocation="fullLocation" />
        </el-form-item>
      <el-col :span="24"
        ><el-form-item>
          <el-button @click="onSubmit" type="primary">提交</el-button>
          <el-button @click="resetForm">撤销修改</el-button>
        </el-form-item></el-col
      >
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
<!--        <el-table-column type="selection" width="55" />-->
        <el-table-column
            v-for="column in dataColumns"
            :key="column.prop"
            :prop="column.prop"
            :label="column.label"
            :width="column.width"
            :formatter="column.formatter"
            show-overflow-tooltip
        />
<!--        <el-table-column label="Operations">-->
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

<script >
  import city from '@/components/city.vue';
  import {ref, reactive, onMounted} from 'vue';
  import { getWeatherListApi } from '@/api';
  export default {
    name: 'setDataConfig',
    components: {
      city,
    },
    props: {
      goods: {
        type: Object,
        default: () => {},
      },
    },
    setup() {
      const provinceCode = ref('110000');
      const cityCode = ref('119900');
      const countyCode = ref('110101');
      // const fullLocation = ref('北京市 市辖区 东城区')
      const fullLocation = ref('');
      const pager = reactive({
        pageNum: 1,
        pageSize: 10,
        total: 0,
      });
      const dataColumns = [
        {prop: 'time', label: '爬取日期'},
        {prop: 'province', label: '省份'},
        {prop: 'city', label: '城市'},
        {prop: 'daytime_weather_conditions', label: '白天天气'},
        {prop: 'nighttime_weather_conditions', label: '夜晚天气'},
        {prop: 'maximum_temperature', label: '最高温度'},
        {prop: 'minimum_temperature', label: '最低温度'},
        {prop: 'daytime_wind', label: '白天风向风向'},
        {prop: 'nighttime_wind', label: '夜晚风向'}
      ]

      // 更新选中的省市区数据
      const changeCity = (cityInfo) => {
        provinceCode.value = cityInfo.provinceCode;
        cityCode.value = cityInfo.cityCode;
        countyCode.value = cityInfo.countyCode;
        fullLocation.value = cityInfo.fullLocation;
        console.log('changeCity', cityInfo);
      };

      const onSubmit = () => {
        console.log('submit!');
      };
      const resetForm = () => {
        getUserInfo();
      };

      onMounted(() => {
        getWeatherListApi();
      });

      return { 
        fullLocation,pager, dataColumns, changeCity , onSubmit, resetForm
        };
    },
  };
</script>
<style lang="scss" scoped>
.showData-page {
  padding: 30px;
  box-sizing: border-box;
  height: 100vh;
}
</style>
