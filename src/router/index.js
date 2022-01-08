import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./../components/Home.vue";
import Welcome from "./../components/Welcome.vue";
import Login from "./../components/Login.vue";

const routes = [
    {
        name: "home",
        path: '/',
        meta:{
            title: 'Home'
        },
        redirective: '/welcome',
        component: Home,
        children: [
            {
                name: "welcome",
                path: '/welcome',
                meta:{
                    title: 'Welcome'
                },
                component: Welcome,
            },
            {
                name: "login",
                path: '/login',
                meta:{
                    title: 'Login'
                },
                component: Login,
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router