export const PROXY_LIST = {
    '/api':{
        target:'127.0.0.1',
        changeOrigin:true,
        rewrite:(path) => path.replace(/\/^api/,'')
    }
}