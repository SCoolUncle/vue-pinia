/**
 * showMessage 用来设置是否对返回状态进行提示操作，不设置不会有任何提示
 */

import http from '/@/utils/axios'

const prefix = '/yai'
const mockUrl = '/local' // mock数据使用该前缀

export const login = (params = {}) => {
   return http.request({
        url:`${prefix}/login`,
        params,
        method:'get'
    },{showMessage:'message'})
}