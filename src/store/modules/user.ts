import router from '/@/router'
import { message } from 'ant-design-vue'
import { loginin, userRegister } from '/@/api/base'
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

    actions:{
        async handleLogin({commit}, payload){
            const { data } = await loginin(payload)
            commit('setToken',data.userToken)
            commit('setBaseUserInfo',data.userInfo)
            return data.userInfo
        },
        async handleRegister({commit}, payload){
            const {data} = await userRegister(payload)
            commit('setToken',data.userToken)
            commit('setBaseUserInfo',data.userInfo)
            return data.userInfo
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