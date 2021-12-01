import { loginin } from '/@/api/base'
import { setToken, getToken } from '/@/utils/libs/utils'
export default {

    state:{
        baseUserInfo:null,
        token:getToken(),
    },

    mutations:{
        setBaseUserInfo (state, baseInfo) {
            state.baseUserInfo = baseInfo
        },
        setToken (state, token) {
            state.token = token
            setToken(token)
        },
    },

    action:{
        handleLogin({commit}, payload){
            return new Promise((resolve,reject) => {
                loginin(payload).then(res => {  
                    const data = res.data
                    commit('setToken',data.userToken)
                })
            })
        }
    },

    getters:{
        userInfo: (state) => {
            return {
                ...state.baseUserInfo
            }
        }
    }
}