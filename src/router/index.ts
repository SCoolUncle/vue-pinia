import type { RouteRecordRaw } from 'vue-router';

import moment from 'moment';

import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '/@/store';
import { getToken } from '../utils/tool/utils';
import routesList from './routes';

// ✖ const store = useUserStore(); // 当前实例还没有引用pinia,所以拿不到store

const baseUrl = '/';
const router = createRouter({
  history: createWebHistory(baseUrl),
  routes: routesList as unknown as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

const LOGIN_PAGE_NAME = 'login';

// 暂无权限校验一说，如有校验 turnto(assecc,routes)
router.beforeEach((to, from, next): void => {
  // ✔
  const store = useUserStore();

  if (to.meta.noCheckAuth) {
    next();
  } else {
    if (getToken()) {
      if (!Object.keys(store.userInfo).length) {
        store.handleRegister({ _t: moment().valueOf() });
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
