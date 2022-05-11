<script setup lang="ts">
import { reactive } from 'vue'
import store from '@/store'

const today = store.state.weatherData.today.lifeIndex
const clothesIndex = reactive(today.ct)
const rayIndex = reactive(today.uv)
const carIndex = reactive(today.xc)
const clothesIndexText = `${clothesIndex.liNm}:${clothesIndex.liAttr},${clothesIndex.liDese}`
const rayIndexText = `${rayIndex.liNm}:${rayIndex.liAttr},${rayIndex.liDese}`
const carIndexText = `${carIndex.liNm}:${carIndex.liAttr},${carIndex.liDese}`
</script>

<template>
  <div class="life-index">
    <div>今日生活指数</div>
    <div class="index-content">
      <el-tooltip
        class="box-item"
        effect="dark"
        :content="clothesIndexText"
        placement="top-end"
      >
        <p>{{ clothesIndexText }}</p>
      </el-tooltip>
      <el-divider />
      <el-tooltip
        class="box-item"
        effect="dark"
        :content="carIndexText"
        placement="top-end"
      >
        <p>{{ carIndexText }}</p>
      </el-tooltip>
      <el-divider />
      <el-tooltip
        class="box-item"
        effect="dark"
        :content="rayIndexText"
        placement="top-end"
      >
        <p>{{ rayIndexText }}</p>
      </el-tooltip>
    </div>
  </div>
</template>

<style>
  .life-index {
    font-size: 20px;
    border-radius: 10px;
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
    cursor: default;
  }
</style>
