<template>
  <p class="device-name">
    获取key
  </p>
  <p>
    <ol>
      <li>
        1. 通过apple账号（或微信账号·仅Android版支持）登录
      </li>
      <li>
        2. 切换到「设备」标签页，点击右上角的加号，注册当前设备
      </li>
      <li>
        3. 切换到「Key」标签页，点击右上角的加号，创建一个Key
      </li>
      <li>
        4. 将获取的key填入输入框
      </li>
      <li>
        注意: 应用一旦重装，需要重新注册。
      </li>
    </ol>
  </p>
  <p class="device-name">
    iOS 14+
  </p>
  <el-image class="svg-img" :src="SVG_CDN_URL+'download/appstore.svg'" @click="toDownload" />
  <el-image class="svg-img" :src="SVG_CDN_URL+'download/made-for-iphone.svg'" @click="imgVisible=true" />
  <el-dialog v-model="imgVisible" title="快应用版" width="20vw">
    <el-image
      alt="the ios pusherdeer install image"
      :src="`${baseCdnUrl}img/pushdeer-resize.png`"
      style="width: 50%;left: 25%;"
    />
    <p>使用IOS系统相机扫描上方二维码即可拉起快应用。</p>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="imgVisible = false">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <p class="device-name">
    MacOS 11+
  </p>
  <el-image class="svg-img" :src="SVG_CDN_URL+'download/appstore.svg'" @click="toDownload" />
  <p class="device-name">
    Android
  </p>
  <p>
    快应用尚在开发，可下载并安装Android测试版APP(
    <a style="color:blue" :href="GH_URL+releasesPath">GitHub</a>
    | <a style="color:blue" :href="GE_URL+releasesPath">Gitee</a>)。
  </p>
  <!-- 通过访问后边的URL即可推送内容： -->
  <!-- <p>https://api2.pushdeer.com/message/push?pushkey=key&text=要发送的内容</p> -->
</template>
<script setup lang="ts">
import { ref } from 'vue'
import store from '@/store'

const imgVisible = ref(false)
const GH_URL = 'https://github.com'
const GE_URL = 'https://gitee.com'
const releasesPath = '/easychen/pushdeer/releases'
const baseCdnUrl: string = store.state.BASE_CDN_URL
const SVG_CDN_URL: string = store.state.SVG_CDN_URL
const toDownload = () => {
  window.open('https://apps.apple.com/us/app/pushdeer/id1596771139', 'target')
}
</script>

<style lang="scss" scoped>
.pusherdeer-img{
  width:10vw;
  // float: right;
}
.device-name{
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.svg-img{
  cursor: pointer;
  margin: 1vh;
}
li{
  line-height: 5vh;
}
</style>
