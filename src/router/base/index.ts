import { RouteRecordRaw } from 'vue-router'

import Login from '../../view/login/login.vue'
import ErrorPage from '/@/view/error-page/404.vue'

const routers:Array<RouteRecordRaw> = [
    {
        path: '/loginApp',
        name:'login-app',
        component:Login,
        meta:{
            title:'login'
        }
    },
    {
        path: '/401',
        name: 'error_401',
        meta: {
          title:'401'
        },
        component: () => import('/@/view/error-page/401.vue')
    },
    {
        path: '/500',
        name: 'error_500',
        meta: {
            title:'500'
        },
        component: () => import('/@/view/error-page/500.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        meta: {
            title:'404'
        },
        component: ErrorPage
    }
]

export default routers