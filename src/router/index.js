import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home";
import Welcome from "@/views/Welcome";
import User from "@/views/User";
import Menu from "@/views/Menu";
import Role from "@/views/Role";
import Dept from "@/views/Dept";
import Leave from "@/views/Leave";
import Approve from "@/views/Approve";
import Login from "@/views/Login";
import Register from "@/views/Register";
import Sign from "@/views/Sign";
import Dashboard from "@/views/Dashboard";
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
        name: "menu",
        path: "/system/menu",
        meta: { title: "菜单管理" },
        component: Menu,
      },
      {
        name: "role",
        path: "/system/role",
        meta: { title: "角色管理" },
        component: Role,
      },
      {
        name: "dept",
        path: "/system/dept",
        meta: { title: "部门管理" },
        component: Dept,
      },
      {
        name: "leave",
        path: "/audit/leave",
        meta: {title: "休假申请"},
        component: Leave
      },
      {
        name: "check",
        path: "/audit/check",
        meta: {title: "待审批"},
        component: Approve
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
