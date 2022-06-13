import { createApp } from 'vue';
import App from './App.vue';

import './design/index.less';
import '@purge-icons/generated';

import router, { setupRouter } from '/@/router';
// import { setupStore } from './store';
import { handleError } from '/@/logics/error-handle';
import { setupPinia } from '/@/store/index';

let appInstance;

async function render() {
  appInstance = createApp(App);

  setupRouter(appInstance);
  // setupStore(appInstance);
  setupPinia(appInstance);

  handleError(appInstance);

  await router.isReady();

  appInstance.mount('#app');
}

render();
