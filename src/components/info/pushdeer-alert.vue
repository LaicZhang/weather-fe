<template>
  <p>iOS14+</p>
  <p>苹果手机（iOS 14+）用系统摄像头扫描下方二维码即可拉起轻应用，</p>
  <p> 亦可在苹果商店搜索「PushDeer」安装</p>
  <p>(注意：这里不要安装PushDeer自架版)</p>
  <el-image
    alt="the ios pusherdeer install image"
    :src="`${baseCdnUrl}img/pushdeer-resize.png`"
    style="width:10vw"
  />
  <p>MacOS 11+</p>
  <p>PushDeer有Mac客户端，亦支持推送。</p>
  <p>可在Mac应用商店中搜索「PushDeer」安装。</p>
  <p>Android</p>
  <p>
    快应用尚在开发，可下载并安装Android测试版APP(
    <a style="color:blue" href="https://github.com/easychen/pushdeer/releases">GitHub</a>
    |<a style="color:blue" href="https://gitee.com/easychen/pushdeer/releases">Gitee</a>)。
  </p>
  <p>获取key</p>
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
        5. 注意注册设备用到了device token，应用一旦重装，device token会变，所以需要重新注册一次。
      </li>
    </ol>
  </p>
  <!-- 通过访问后边的URL即可推送内容： -->
  <!-- <p>https://api2.pushdeer.com/message/push?pushkey=key&text=要发送的内容</p> -->
</template>

<script setup>
import store from '@/store'

const baseCdnUrl = store.state.BASE_CDN_URL

</script>

<style lang="scss" scoped>
</style>
