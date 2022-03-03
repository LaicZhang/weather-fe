<template>
  <div class="SetDataConfig-page">
    <div>
      <!-- <el-form>
        <el-form-item>
          <el-select v-model="selected" v-if="provinceL">
            <el-option v-for="item in provinceL" :label="item.name" :key="item.code" :value="item"></el-option>
          </el-select>
          <el-select v-model="citySelected" v-if="cityL">
            <el-option v-for="item in cityL" :label="item.name" :key="item.code" :value="item"></el-option>
          </el-select>
          <el-select v-model="areaSelected" v-if="areaL">
            <el-option v-for="item in areaL" :label="item.name" :key="item.code" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-form> -->
    </div>
    <div class="home-banner">
    <city @change-city='changeCity' :fullLocation='fullLocation' />
  </div>
  </div>
</template>

<script>
  // import vueArea from 'vue-area';
  // import { province, city, area } from '@/util/area.js';
  // export default {
    // name: 'setDataConfig',
    // data() {
    //   return {
    //     msg: '省市联动',
    //     selected: {
    //       code: 110000,
    //       name: '北京市',
    //       parentId: 0,
    //     },
    //     citySelected: {},
    //     areaSelected: {},
    //     provinceL: [],
    //     cityL: [],
    //     areaL: [],
    //   };
    // },
    // watch: {
    //   selected: function () {
    //     console.log('this.selected', this.selected);
    //     // 清除区县
    //     this.citySelected = {};
    //     this.cityL = city.filter((item) => item.parentId === this.selected.code);
    //   },
    //   citySelected: function () {
    //     console.log('this.citySelected', this.citySelected);
    //     this.areaL = area.filter((item) => item.parentId === this.citySelected.code);
    //   },
    // },
    // components: {
    //   vueArea: vueArea,
    // },
    // methods: {
    //   selected() {
    //     console.log('this.selected', this.selected.name);
    //     // 清除区县
    //     this.citySelected = {};
    //     this.cityL = city.filter((item) => item.parentId === this.selected.code);
    //   },
    //   citySelected () {
    //     console.log('this.citySelected', this.citySelected);
    //     this.areaL = area.filter((item) => item.parentId === this.citySelected.code);
    //   },
    // },
    // created() {
    //   this.provinceL = [...province];
    // },
  // };
  import city from '@/components/city.vue';
import { ref } from 'vue'
export default {
  name: 'setDataConfig',
  components: {
    city
  },
  props: {
    goods: {
      type: Object,
      default: () => {}
    }
  },
  setup () {
    const provinceCode = ref('110000')
    const cityCode = ref('119900')
    const countyCode = ref('110101')
    // const fullLocation = ref('北京市 市辖区 东城区')
    const fullLocation = ref('')

    // 更新选中的省市区数据
    const changeCity = (cityInfo) => {
      provinceCode.value = cityInfo.provinceCode
      cityCode.value = cityInfo.cityCode
      countyCode.value = cityInfo.countyCode
      fullLocation.value = cityInfo.fullLocation
    }

    return { fullLocation, changeCity }
  }
}
</script>

<style lang="scss" scoped>
  .SetDataConfig-page {
    padding: 30px;
    box-sizing: border-box;
    height: 100vh;
  }
  .search-from-wrap {
    background: white;
    margin-bottom: 18px;
  }
</style>
