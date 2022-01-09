import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./../components/Home.vue";
import Welcome from "../views/Welcome.vue";

const routes = [
  {
    name: "home",
    path: "/",
    meta: {
      title: "Home",
    },
    redirective: "/welcome",
    component: Home,
    children: [
      {
        name: "welcome",
        path: "/welcome",
        meta: {
          title: "Welcome",
        },
        component: Welcome,
      },
    ],
  },
  {
    name: "login",
    path: "/login",
    meta: {
      title: "Login",
    },
    component: () => import("../views/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
