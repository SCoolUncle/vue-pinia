import axios, { AxiosRequestConfig } from "axios";
import { message } from 'ant-design-vue'
import { getToken } from '../libs/utils'
import config from '/@/config'
import { handleStatus } from './statusHandle'
import { collectHttpError } from '/@/logics/request-error'

class HttpRequest {
    private baseUrl:String
    constructor (baseUrl){
        this.baseUrl = baseUrl
    }

    getInsideConfig () {
        const config = {
            baseURL: this.baseUrl,
            headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'X-URL-PATH': location.pathname
            },
            timeout:10000
        }
        return config
    }

    setInterceptors(instance){
        instance.interceptors.request.use(config => {
            config.headers['Authorization'] = getToken()
            config.headers['access-token'] = getToken()
            return config
        },error => {
            return Promise.reject(error)
        })

        instance.interceptors.response.use(response => {
            // if(response.status % 100 === 2){}
            const { data } = response.data
            const { code } = data
            this.handleCode(code)
            return data
        },(error) => {
            handleStatus(error)
            collectHttpError(error)
        })
    }

    handleCode(data:any){
        const {code, msg} = data
        const rem = code % 100
        if(rem !== 2) {
            message.error({
                content:msg || '接口返回异常！',
                duration:2
            })
        }
    }

    cancelRequest(options:AxiosRequestConfig,that){
        return axios.request({
            ...options,
           cancelToken:new axios.CancelToken(function executor(c){
               that.cancelHttp = c
           }) 
        })
    }

    request (options:AxiosRequestConfig) {
        const instance = axios.create()
        options = Object.assign(this.getInsideConfig(), options)
        this.setInterceptors(instance)
        return instance(options)
    }
}

const http = new HttpRequest(config.baseUrl)
export default http