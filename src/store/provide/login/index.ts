import { reactive } from 'vue';

const state = reactive({
  userName: 'sssss',
  password: '',
});

/** action */
const actions = {
  updateState: (value) => {
    console.log(value);
    state.userName = value;
  },
};

export default {
  state,
  actions,
};
