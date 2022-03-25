import router from '/@/router';
import { message } from 'ant-design-vue';
import { getUserInfo, loginin, userRegister } from '/@/api/base';
import { setToken, getToken } from '/@/utils/libs/utils';
import { reject } from 'lodash';
export default {
  state: {
    baseUserInfo: {},
    token: getToken(),
  },

  mutations: {
    setBaseUserInfo(state, baseInfo) {
      state.baseUserInfo = baseInfo;
    },
    setToken(state, token) {
      state.token = token;
      setToken(token);
    },
  },

  actions: {
    async handleLogin({ commit }, payload) {
      const { userToken, userInfo } = await loginin(payload);
      commit('setToken', userToken);
      commit('setBaseUserInfo', userInfo);
    },
    async handleRegister({ commit }, payload) {
      const { userToken, userInfo } = await userRegister(payload);
      commit('setToken', userToken);
      commit('setBaseUserInfo', userInfo);
      return userInfo;
    },
    async getUserInfo({ commit }, payload) {
      const { userInfo } = await getUserInfo(payload);
      commit('setBaseUserInfo', userInfo);
    },
  },

  getters: {
    userInfo: (state) => {
      return {
        ...state.baseUserInfo,
      };
    },
  },
};
