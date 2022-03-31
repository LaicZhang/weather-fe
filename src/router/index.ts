import { createRouter, createWebHashHistory } from 'vue-router'
// import { menuPermissionApi } from '../api'
// import storage from '../util/storage'
import Home from '@/views/Home.vue'
import Welcome from '@/views/Welcome.vue'
import User from '@/views/User.vue'
import MineInfo from '@/views/MineInfo.vue'
import Notice from '@/views/Notice.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Forget from '@/views/Forget.vue'
import Sign from '@/views/Sign.vue'
import Dashboard from '@/views/Dashboard.vue'
import showData from '@/views/showData.vue'
import SetDataConfig from '@/views/SetDataConfig.vue'
import Pusher from '@/views/Pusher.vue'
import FeedBack from '@/views/FeedBack.vue'

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
    meta: { title: '首页' },
    redirect: { name: 'welcome' },
    children: [
      {
        name: 'welcome',
        path: '/welcome',
        meta: { title: '欢迎页' },
        component: Welcome,
      },
      {
        name: 'info',
        path: '/system/userInfo',
        meta: { title: '个人信息' },
        // component: () => import('@/views/MineInfo.vue'),
        component: MineInfo,
      },
      {
        name: 'user',
        path: '/system/user',
        meta: { title: '用户管理' },
        // component: () => import('@/views/User.vue'),
        component: User,
      },
      {
        name: 'notice',
        path: '/system/notice',
        meta: { title: '公告管理' },
        // component: () => import('@/views/Notice.vue'),
        component: Notice,
      },
      {
        name: 'pusher',
        path: '/system/pusher',
        meta: { title: '推送管理' },
        // component: () => import('@/views/Pusher.vue'),
        component: Pusher,
      },
      {
        name: '反馈管理',
        path: '/system/feedback',
        meta: { title: '反馈管理' },
        // component: () => import('@/views/Pusher.vue'),
        component: FeedBack,
      },
      {
        name: 'showData',
        path: '/data/showData',
        meta: { title: '数据展示设置' },
        // component: () => import('@/views/showData.vue'),
        component: showData,
      },
      {
        name: 'SetDataConfig',
        path: '/data/SetDataConfig',
        meta: { title: '数据获取管理' },
        // component: () => import('@/views/SetDataConfig.vue'),
        component: SetDataConfig,
      },
    ],
  },
  {
    name: 'login',
    path: '/login',
    meta: { title: '登录页' },
    // component: () => import('@/views/Login.vue'),
    component: Login,
  },
  {
    name: 'register',
    path: '/register',
    meta: { title: '注册页' },
    // component: () => import('@/views/Register.vue'),
    component: Register,
  },
  {
    name: 'forget',
    path: '/forget',
    meta: { title: '忘记密码' },
    // component: () => import('@/views/Forget.vue'),
    component: Forget,
  },
  {
    name: 'sign',
    path: '/sign',
    meta: { title: '登陆注册页' },
    // component: () => import('@/views/Sign.vue'),
    component: Sign,
  },
  {
    name: 'dashboard',
    path: '/dashboard',
    meta: { title: '数据展示页' },
    // component: () => import('@/views/Dashboard.vue'),
    component: Dashboard,
  },
  {
    name: '404',
    path: '/:pathMatch(.*)',
    meta: { title: '未找到该页面' },
    component: () => import('@/views/404.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
// 加载动态路由
// await loadAsyncRoutes();
// router.beforeEach(async(to, from, next) => {
//   // const valid = tokenValidate()
//   // if (to.path === "/login" || valid) {
//   //   next();
//   //   // await loadAsyncRoutes();
//   // } else {
//   //   next({ name: "login" });
//   // }
//   document.title = to.meta.title
//   next()
// })

// export async function loadAsyncRoutes() {
//   const valid = tokenValidate()
//   if (valid) {
//     const { menuList } = await menuPermissionApi();
//     const result = generatorRoutes(menuList);
//     result.forEach((route) => {
//       const path = `./../views/${route.component}.vue`;
//       const modules = import.meta.globalEager(`./../views/*.vue`);
//       console.log('modules=>', modules);
//       router.addRoute("home", {
//         ...route,
//         component: modules[path].default
//       });
//     });
//   }else{
//     router.push({name:'login'})
//   }
// }

// function generatorRoutes(menuList) {
//   const result = []
//   const deep = (list) => {
//     while (list.length) {
//       const item = list.pop()
//       if (item.action) {
//         result.push({
//           name: item.component,
//           path: item.path,
//           meta: { title: item.menuName },
//           component: item.component,
//         })
//       }
//       if (item.children && !item.action)
//         deep(item.children)
//     }
//   }
//   deep(JSON.parse(JSON.stringify(menuList)))
//   return result
// }
// function tokenValidate() {
//   const userInfo = storage.getItem('userInfo') || {}
//   // if (userInfo.token) {
//   //   return true;
//   // } else {
//   //   return false;
//   // }
//   return !!userInfo.token
// }
// window.router = router

export default router
