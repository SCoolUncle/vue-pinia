import type { RouteRecordRaw } from 'vue-router';

import moment from 'moment';

import { createRouter, createWebHistory } from 'vue-router';
import { store } from '/@/store';
import { getToken } from '../utils/libs/utils';

import routesList from './routes';
const baseUrl = window.__POWERED_BY_QIANKUN__ ? '/vueweb' : '/';
const router = createRouter({
  history: createWebHistory(baseUrl),
  routes: routesList as unknown as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

const LOGIN_PAGE_NAME = 'login';

// 暂无权限校验一说，如有校验 turnto(assecc,routes)
router.beforeEach((to, from, next): void => {
  if (to.meta.noCheckAuth) {
    next();
  } else {
    if (getToken()) {
      if (!Object.keys(store.getters.userInfo).length) {
        store.dispatch('handleRegister', { _t: moment().valueOf() });
        next();
      } else {
        next();
      }
    } else {
      next({ name: LOGIN_PAGE_NAME, query: { url: to.path } });
    }
  }
});

router.afterEach((to) => {
  console.log(to);
});

const setupRouter = (app) => {
  app.use(router);
};

export { setupRouter };

export default router;
