import { RouteRecordRaw } from 'vue-router'
import Home from '/@/layout/page/index.vue'

const router:Array<RouteRecordRaw> = [
   {
       path:'/',
       component:Home
   }
]

export default router