import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home";
import Welcome from "@/views/Welcome";
import User from "@/views/User";
import Notice from "@/views/Notice";
import Login from "@/views/Login";
import Register from "@/views/Register";
import Forget from "@/views/Forget";
import Sign from "@/views/Sign";
import Dashboard from "@/views/Dashboard";
import showData from "@/views/showData";
import SetDataConfig from "@/views/SetDataConfig";
import Pusher from "@/views/Pusher";
import { menuPermissionApi } from "../api";
import storage from "../util/storage";
/**
 * @type {import('vue-router').RouteRecordRaw[]}
 * */
const routes = [
  {
    name: "home",
    path: "/",
    component: Home,
    meta: { title: "首页" },
    redirect: { name: "welcome" },
    children: [
      {
        name: "welcome",
        path: "welcome",
        meta: { title: "欢迎页" },
        component: Welcome,
      },
      {
        name: "user",
        path: "/system/user",
        meta: { title: "用户管理" },
        component: User,
      },
      {
        name: "notice",
        path: "/system/notice",
        meta: { title: "公告管理" },
        component: Notice,
      },
      {
        name: "pusher",
        path: "/system/pusher",
        meta: { title: "推送管理" },
        component: Pusher,
      },
      {
        name: "showData",
        path: "/data/showData",
        meta: { title: "数据展示设置" },
        component: showData,
      },
      {
        name: "SetDataConfig",
        path: "/data/SetDataConfig",
        meta: { title: "数据获取管理" },
        component: SetDataConfig,
      }
    ],
  },
  {
    name: "login",
    path: "/login",
    meta: { title: "登录页" },
    component: Login,
  },
  {
    name: "register",
    path: "/register",
    meta: { title: "注册页" },
    component: Register,
  },
  {
    name: "forget",
    path: "/forget",
    meta: { title: "忘记密码" },
    component: Forget,
  },
  {
    name: "sign",
    path: "/sign",
    meta: { title: "登陆注册页" },
    component: Sign,
  },
  {
    name: "dashboard",
    path: "/dashboard",
    meta: { title: "数据展示页" },
    component: Dashboard,
  },
  {
    name: "404",
    path: "/:pathMatch(.*)",
    meta: { title: "未找到该页面" },
    component: () => import("@/views/404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
// 加载动态路由
// await loadAsyncRoutes();
router.beforeEach(async (to, from, next) => {
  // const valid = tokenValidate()
  // if (to.path === "/login" || valid) {
  //   next();
  //   // await loadAsyncRoutes();
  // } else {
  //   next({ name: "login" });
  // }
  document.title = to.meta.title;
  next();
});

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

function generatorRoutes(menuList) {
  const result = [];
  const deep = (list) => {
    while (list.length) {
      const item = list.pop();
      if (item.action) {
        result.push({
          name: item.component,
          path: item.path,
          meta: { title: item.menuName },
          component: item.component,
        });
      }
      if (item.children && !item.action) {
        deep(item.children);
      }
    }
  };
  deep(JSON.parse(JSON.stringify(menuList)));
  return result;
}
function tokenValidate() {
  const userInfo = storage.getItem("userInfo") || {};
  // if (userInfo.token) {
  //   return true;
  // } else {
  //   return false;
  // }
  return !!userInfo.token;
}
window.router = router;

export default router;
