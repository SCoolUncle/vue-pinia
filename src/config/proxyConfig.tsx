export const PROXY_LIST = {
    '/yai':{
        target:'http://127.0.0.1:8081',
        changeOrigin:true,
        ws:true,
        rewrite:(path) => path.replace(/^\/yai/,'/yai')
    }
}