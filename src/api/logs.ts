import http from '/@/utils/axios'
import type { httpErrorInfo } from './types'

const prefix = '/passion'

export const uploadHttpErrorLog = (params:httpErrorInfo) => {
    return http.request({
        url:`${prefix}/error/httplog`,
        params,
        method:'get'
    })
}

export const uploadJavascriptErrorLog = (params) => {
    return http.request({
        url:`${prefix}/error/javascriptlog`,
        params,
        method:'get'
    })
}