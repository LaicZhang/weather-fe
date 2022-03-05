<template>
  <div class="life-index">
    <div>生活指数</div>
    <div class="index-content">
      <el-tooltip
        class="box-item"
        effect="dark"
        :content="clothesIndexText"
        placement="top-end"
      >
        <p>{{clothesIndexText}}</p>
      </el-tooltip>
      <el-divider> </el-divider>
      <el-tooltip
        class="box-item"
        effect="dark"
        :content="carIndexText"
        placement="top-end"
      >
        <p>{{ carIndexText }}</p>
      </el-tooltip>
      <el-divider> </el-divider>
      <el-tooltip
        class="box-item"
        effect="dark"
        :content="rayIndexText"
        placement="top-end"
      >
        <p>{{ rayIndexText}}</p>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'life-index',
    data() {
      return {
        clothesIndex: {},
        rayIndex: {},
        carIndex: {},
        clothesIndexText: '',
        rayIndexText: '',
        carIndexText: '',
      };
    },
    methods: {
      getLifeIndex() {
        let { today } = JSON.parse(window.localStorage.getItem('weatherData'));
        console.log('today=>', today);
        this.clothesIndex = today.lifeIndex.ct;
        this.rayIndex = today.lifeIndex.uv;
        this.carIndex = today.lifeIndex.xc;
        this.clothesIndexText = `${this.clothesIndex.liNm}:${this.clothesIndex.liAttr},${this.clothesIndex.liDese}`;
        this.rayIndexText = `${this.rayIndex.liNm}:${this.rayIndex.liAttr},${this.rayIndex.liDese}`;
        this.carIndexText = `${this.carIndex.liNm}:${this.carIndex.liAttr},${this.carIndex.liDese}`;
      },
    },
    mounted() {
      this.getLifeIndex();
      console.log('life-index mounted');
    },
  };
</script>

<style>
  .life-index {
    font-size: 20px;
  }
  .index-content {
      margin: 10px;
  }
  p {
    width: 95%;
    overflow: hidden;
    /*文本不会换行*/
    white-space: nowrap;
    /*当文本溢出包含元素时，以省略号表示超出的文本*/
    text-overflow: ellipsis;
    font-size: 15px;
  }
</style>
