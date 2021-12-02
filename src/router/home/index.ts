import { RouteRecordRaw } from 'vue-router'
import IndexPage from '/@/layout/page/index.vue'


const router:Array<RouteRecordRaw> = [
    {
        path:'/',
        name:'index',
        component:IndexPage,
        meta:{
            title:'home',
            icon:'sd', // 自定义
            keepAlive:false // 是否缓存改页面
        },
        children:[
            {
                path:'/',
                name:'index',
                component:() => import('/@/view/home/index.vue'),
                meta:{
                    title:'home',
                    icon:'sd', // 自定义
                    keepAlive:false // 是否缓存改页面
                },
            }
        ]
    }
]

export default router