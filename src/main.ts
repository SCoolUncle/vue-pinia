import { createApp } from 'vue';
import App from './App.vue';

import './design/index.less';
import '@purge-icons/generated';

import router, { setupRouter } from '/@/router';
import { setupStore } from './store';
import { handleError } from '/@/logics/error-handle';

let appInstance;

async function render(props = {}) {
  const { container } = props;
  appInstance = createApp(App);

  setupRouter(appInstance);
  setupStore(appInstance);

  handleError(appInstance);

  await router.isReady();

  appInstance.mount(container ? container.querySelector('#app') : '#app');
}

// 独立运行时直接渲染
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log('微应用初始化时调用一次');
}

export async function mount(props) {
  console.log('每次进入都会执行mount');
  render(props);
}

export async function unmount() {
  console.log('应用每次切出/卸载调用的方法，通常在这卸载微应用的实例');
  appInstance.unmount();
  appInstance._container.inerHTML = '';
  appInstance = null;
}

export async function update(props) {
  console.log('可选的生命周期钩子，仅使用loadmicroApp 加载微应用时生效');
}
