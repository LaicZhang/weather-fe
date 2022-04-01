<template>
  <div class="history-page">
    <el-card>
      <el-card v-for="item in historyList" :key="item.loginId" class="history-card">
        <el-image class="browser-img" :src="`${BASE_CLIENT_URL}${item.loginBrowser}.png`" />
        <!-- <div class="facility-content">
          <div class="facility-message">
            <p class="facility-name">
              浏览器：
            </p> <p class="record-facility">
              浏览器版本：
            </p> <p class="login-address">

            </p>
          </div>
        </div> -->
        <el-descriptions style="float: right;margin-right: 5vw;" :title="item.loginTime">
          <el-descriptions-item label="浏览器">
            <el-tag>
              {{ item.loginBrowser }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="浏览器版本">
            <el-tag>
              {{ item.loginBrowserVersion }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="操作系统">
            <el-tag>
              {{ item.loginOs }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="登录地址">
            {{ item.loginAddress.city }}({{ item.loginIp }})
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </el-card>
  </div>
</template>

<script>
</script>

<script setup>
import { onMounted, reactive } from 'vue'
import store from '../store'
import { checkHistoryApi, getHistoryApi } from '@/api/history'

const userId = store.state.userInfo.userId
const BASE_CLIENT_URL = `${store.state.BASE_CDN_URL}img/client/`
const historyList = reactive([])

const getHistory = async() => {
  const data = await getHistoryApi({ userId })
  Object.assign(historyList, data)
}

onMounted(() => {
  getHistory()
})
</script>

<style lang="scss" scoped>
  .history-page {
    padding: 30px;
    box-sizing: border-box;
    height: 100vh;
    .history-card{
      width: 48vw;
      margin: 0 auto;
      border-radius: 30px;
      margin-bottom: 10px;
      .browser-img{
        // width: 50px;
        // height: 50px;
        width: 80px;
        height: 80px;
        // float: left;
        margin-left: 5vw;
      }
      .facility-content{
        position: relative;
        // padding: 25px 30px;
        margin: 18px;
        display: inline-block;
        .facility-message{
          box-sizing: border-box;
          top: 0;
          left: 0;
          width: 100%;
          // padding: 20px 120px 0 100px;
          color: #999;
          font-size: 12px;
        }
        .recode-time{
          // position: absolute;
          top: 25px;
          right: 30px;
          font-size: 12px;
          // line-height: 50px;
          color: #999;
        }
      }

    }
  }
  .search-from-wrap {
    background: white;
    margin-bottom: 18px;
  }
</style>
