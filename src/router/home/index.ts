import { RouteRecordRaw } from 'vue-router'
import IndexPage from '/@/layout/page/index.vue'

const router:Array<RouteRecordRaw> = [
    {
        path:'/',
        name:'index',
        component:IndexPage,
        meta:{
            title:'home',
            icon:'sd' // 自定义
        },
        children:[
            
        ]
    }
]

export default router