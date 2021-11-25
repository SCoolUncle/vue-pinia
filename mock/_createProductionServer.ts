import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';

// 使用globEager 函数导入模块不懂参考 => https://cn.vitejs.dev/guide/features.html#glob-import
const modules = import.meta.globEager('./**/*.ts');

const mockModules: any[] = [];
Object.keys(modules).forEach((key) => {
  if (key.includes('/_')) {
    return;
  }
  mockModules.push(...modules[key].default);
});

/**
 * Used in a production environment. Need to manually import all modules
 */
export function setupProdMockServer() {
  createProdMockServer(mockModules);
}
