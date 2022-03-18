//具体配置参考https://www.npmjs.com/package/vite-plugin-mock
import { viteMockServe } from 'vite-plugin-mock';

export function mockConfig(isBuild) {
  return viteMockServe({
    mockPath: 'mock',
    ignore: /^\_/, // 忽略注入文件
    localEnabled: true, // 开发环境是否启动
    prodEnabled: true, // 生产环境是否启动
    injectCode: `
            import { setupProdMockServer } from '../mock/_createProductionServer';

            setupProdMockServer();
        `,
  });
}
