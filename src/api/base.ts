import http from '/@/utils/axios'

const prefix = '/yai'

export const login = (params = {}) => {
   return http.request({
        url:`${prefix}/login`,
        params,
        method:'get'
    })
}