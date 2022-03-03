<template>
  <div class="showData-page">
    <div class="home-banner">
      <el-form>
        <el-form-item>
          <span>您的地址：</span>
          <city @change-city="changeCity" :fullLocation="fullLocation" />
        </el-form-item>
        <el-form-item>
          <span>图表主题：</span>
          <el-select>
            <el-option label="蓝色" value="blue"></el-option>
            <el-option label="红色" value="red"></el-option>
          </el-select>
        </el-form-item>
      <el-col :span="24"
        ><el-form-item>
          <el-button @click="onSubmit" type="primary">提交</el-button>
          <el-button @click="resetForm">撤销修改</el-button>
        </el-form-item></el-col
      >
      </el-form>
    </div>
  </div>
</template>

<script >
  import city from '@/components/city.vue';
  import { ref } from 'vue';
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

      return { 
        fullLocation, changeCity , onSubmit, resetForm
        };
    },
  };
</script>
<style lang="scss" scoped>
.showData-page {
  padding: 30px;
  box-sizing: border-box;
  width: 30vw;
  height: 100vh;
}
</style>
