//具体配置参考https://www.npmjs.com/package/vite-plugin-mock
import {viteMockServe} from "vite-plugin-mock"

export function mockConfig(isBuild) {
    return viteMockServe({
        mockPath:'mock',
        ignore:/^\_/, // 忽略注入文件
        localEnabled:!isBuild,
        prodEnabled:isBuild,
        injectCode:`
            import { setupProdMockServer } from '../mock/_createProductionServer';

            setupProdMockServer();
        `
    })
}