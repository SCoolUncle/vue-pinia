import { createApp } from "vue";
import App from "./App.vue";

import './design/index.less';
import '@purge-icons/generated'

import setupRouter from '/@/router'
import {handleError} from '/@/logics/error-handle'

async function init() {
  const app = createApp(App)
    
  setupRouter(app)

  handleError(app)

  app.mount('#app')

}

init()
