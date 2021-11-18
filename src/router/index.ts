import  {createRouter, createWebHistory} from 'vue-router'
import { getToken } from '../utils/libs/utils'

import routes from './routes'

const router  = createRouter({
    history:createWebHistory(),
    routes
})

const LOGIN_PAGE_NAME = 'login'

// 动态路由有待考虑
// 未登录允许访问的路由列表
const allowPathArr = []
const allowPass = (target:string, pathArr:Array<string>) => {
    return pathArr.includes(target)
}

router.beforeEach((to, from, next):void => {
    // 首次加载动画
    // 用户信息相关页面权限
    // 自动登录校验,方案，个人路由 可后端动态返回 2：默认空白提示页显示
    // 登录校验
    const token = getToken()
    const isPass = allowPass(to.path,allowPathArr)
    if(token){
        // 判断是否过期
        next()
    }else if(isPass){
        next()
    }else if(!isPass){
        next({   
            name: LOGIN_PAGE_NAME,
            query: {
                targetUrl: to.fullPath
            }
        })
    }

})

router.afterEach(to => {
    
})

const setupRouter = (app) => {
    app.use(router)
}

export default setupRouter