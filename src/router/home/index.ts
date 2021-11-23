import { RouteRecordRaw } from 'vue-router'
import IndexPage from '/@/layout/page/index.vue'
import Login from '../../view/login/login.vue'


const router:Array<RouteRecordRaw> = [
    {
        path:'/',
        name:'index',
        component:IndexPage,
        meta:{
            title:'home',
            icon:'sd', // 自定义
            isCache:false // 是否缓存改页面
        },
        children:[
            {
                path: '/loginApp',
                name:'login-app',
                component:Login,
                meta:{
                    title:'login'
                }
            },
        ]
    }
]

export default router