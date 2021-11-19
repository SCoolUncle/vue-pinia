import { createApp } from "vue";
import App from "./App.vue";

import './design/index.less';
import '@purge-icons/generated'

import router, {setupRouter} from '/@/router'
import setupStore from "./store";
import {handleError} from '/@/logics/error-handle'

async function init() {
  const app = createApp(App)
    
  setupRouter(app);
  setupStore(app);

  handleError(app);

  await router.isReady();

  app.mount('#app');

}

init()
