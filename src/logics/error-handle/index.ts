import {uploadJavascriptErrorLog} from '/@/api/logs'

/** 临时console */
/** promise */
function  handlePromiseError():void {
    window.addEventListener('unhandledrejection',(e) => {
        console.log(e.reason)
    })
}

/** 资源错误 */
function  handleSourceError() {
    window.addEventListener('error',(e) => {
        console.log(e)
    })    
}

/** 常规和异步错误 */
function  handleSyncError() {
    window.onerror =  function(message, source, lineno, colno, error){
        console.log(message)
    }    
}

/** vue错误 */
function handleVueError(app) {
    app.config.errorHandler = function(error){
        setTimeout(() => {
            throw error
        })
    }
}

export const handleError = (app) => {
    handlePromiseError()
    handleSourceError()
    handleSyncError()
    handleVueError(app)
}