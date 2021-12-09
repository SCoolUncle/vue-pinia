const state = {
  homeName: '',
};

const mutations = {};

const actions = {
  getHomeName: () => {
    return state.homeName;
  },
};

const getter = {};

export default {
  state,
  actions,
  mutations,
  getter,
  namespaced: true,
};
