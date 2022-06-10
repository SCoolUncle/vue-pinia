import { defineStore } from 'pinia';
import { getUserInfo, loginin, userRegister } from '/@/api/base';
import { setToken, getToken } from '../../utils/tool/utils';

export const useUserStore = defineStore('user', {
  state: () => ({
    baseUserInfo: {},
    token: getToken(),
  }),
  getters: {
    userInfo: (state) => {
      return {
        ...state.baseUserInfo,
      };
    },
  },
  actions: {
    async handleLogin(payload) {
      const { userToken, userInfo } = await loginin(payload);
      this.token = userToken;
      setToken(userToken);
      this.baseUserInfo = userInfo;
    },
    async handleRegister(payload) {
      const { userToken, userInfo } = await userRegister(payload);
      this.token = userToken;
      setToken(userToken);
      this.baseUserInfo = userInfo;
      return userInfo;
    },
    async getUserInfo(payload) {
      const { userInfo } = await getUserInfo(payload);
      this.baseUserInfo = userInfo;
    },
  },
});
