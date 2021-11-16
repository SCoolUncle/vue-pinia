import { useRouter } from "vue-router"

const LOGIN_PAGE = '/login'
const router = useRouter()

export function handleStatus(error:any){
    const status = error.response.status
    switch(status) {
        case 400:
            error.message = '请求错误'
            break
        case 401:
            error.message = '未登录！'
            router.push(LOGIN_PAGE)
            break
        case 403:
            error.message = '拒绝访问'
            break
        case 404:
            error.message = `请求地址错误：${error.response.config.url}`
            break
        case 408:
            error.message = '请求超时'
            break
        case 500:
            error.message = '服务器出错了'
            break
        case 502:
            error.message = '网关错误'
            break
        case 503:
            error.message = '服务不可用'
            break
        case 504:
            error.message = '网关超时'
        case 505:
            error.message = 'HTTP版本不受支持'
            break
        default:
            break
    }
    return Promise.reject(error)
}