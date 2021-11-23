import { defineConfig } from "vite";

import path from "path";

import createPlugin from './build/vite'

import {PROXY_LIST} from './src/config/proxyConfig'

function getAbsPath(name:string){
  return path.resolve(process.cwd(),'.',name)
}

// 相关配置参考 https://vitejs.dev/config/
export default defineConfig({
    base:'/',
    resolve:{
      alias:[
        {
          find:/\/@\//,
          replacement: getAbsPath('src') + '/',
        },
        {
          find:/\/_c\//,
          replacement: getAbsPath('src/components' + '/')
        },
        {find:/\/#\//,
          replacement: getAbsPath('types') + '/',
        }
      ]
    },
    plugins: createPlugin(true),
    css:{
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    
    server:{
      host:'127.0.0.1',
      port:8088,
      strictPort:false,
      proxy:PROXY_LIST
    },
    build:{
      target:'es2015',
      outDir:'dist',
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: true,
        },
      },
      // 禁用brotli压缩大小报告，提高构建性能
      brotliSize: false,
      chunkSizeWarningLimit:2000
    },
    optimizeDeps: {
      // @iconify/iconify: The dependency is dynamically and virtually loaded by @purge-icons/generated, so it needs to be specified explicitly
      include: [
        '@iconify/iconify',
      ],
      exclude: [],
    }
});
