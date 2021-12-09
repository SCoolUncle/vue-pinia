import { uploadJavascriptErrorLog } from '/@/api/logs';

/** 临时console */
/** promise */
function handlePromiseError(): void {
  window.addEventListener('unhandledrejection', (error) => {
    throw error.reason;
  });
}

/** 资源错误 */
function handleSourceError() {
  window.addEventListener('error', (error) => {
    throw error;
  });
}

/** 常规和异步错误 */
function handleSyncError() {
  window.onerror = function (message, source, lineno, colno, error) {
    try {
      reportErrorMessage(message, source, lineno, colno, error);
    } catch (error) {
      console.log(error);
    }
  };
}

/** vue错误 */
function handleVueError(app) {
  app.config.errorHandler = function (error) {
    setTimeout(() => {
      throw error;
    });
  };
}

export const handleError = (app) => {
  handlePromiseError();
  handleSourceError();
  handleSyncError();
  handleVueError(app);
};

/**
 * 直接上报，不进行本地存储
 * 上报参数
 * path: url
 * msg: 错误消息
 * file: 错误文件
 * line: 错误行
 * column: 错误列
 * stack: 错误堆栈
 */
async function reportErrorMessage(msg, file, line, column, stack) {
  const params = {
    pageUrl: window.location.href,
    msg,
    file,
    line,
    column,
  };
  try {
    await uploadJavascriptErrorLog(params);
  } catch (e) {
    console.log('错误上报接口异常！');
  }
}
