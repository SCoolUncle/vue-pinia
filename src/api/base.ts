import http from '/@/utils/axios'

const prefix = '/passion'

export const getUserInfo = (params) => {
   return http.request({
        url:`${prefix}/userinfo`,
        params,
        method:'get'
    })
}