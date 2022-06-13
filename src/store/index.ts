import { useStore } from './pinia/index';
import { useUserStore } from './pinia/user';
import { useHomeStore } from './pinia/home';
import { createPinia } from 'pinia';

const setupPinia = function (app) {
  const pinia = createPinia();
  app.use(pinia);
};

export { setupPinia, useStore, useUserStore, useHomeStore };
