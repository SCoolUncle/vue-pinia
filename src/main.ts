import { createApp } from 'vue';
import App from './App.vue';

import './design/index.less';
import '@purge-icons/generated';

import router, { setupRouter } from '/@/router';
import { setupStore } from './store';
import { handleError } from '/@/logics/error-handle';
import { createPinia } from 'pinia';

let appInstance;

async function render() {
  appInstance = createApp(App);

  setupRouter(appInstance);
  setupStore(appInstance);

  handleError(appInstance);

  await router.isReady();

  appInstance.use(createPinia()).mount(container ? container.querySelector('#app') : '#app');
}

render();
