/**
 * showMessage 用来设置是否对返回状态进行提示操作，不设置不会有任何提示
 */

import http from '/@/utils/axios'

const prefix = '/yai'
const mockUrl = '/local' // mock数据使用该前缀

export const loginin = (data = {}) => {
   return http.request({
        url:`${prefix}/login`,
        data,
        method:'post'
    },{showMessage:'error'})
}

export const userRegister = (data = {}) => {
    return http.request({
        url:`${prefix}/register`,
        data,
        method:'post'
    })
}

export const recodeLoginStatus = (params = {}) => {
    return http.request({
        url:`${prefix}/register`,
        params,
        method:'get'
    })
}

export const getUserInfo = (params = {}) => {
    return http.request({
        url:`${prefix}/userinfo`,
        params,
        method:'get'
    })
}