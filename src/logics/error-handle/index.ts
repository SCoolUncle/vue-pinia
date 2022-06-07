import { uploadJavascriptErrorLog } from '/@/api/logs';
import { ordinaryError } from '../error-send';
import { filterError, filterPromiseError } from './filterError';

/** 临时console */
/** promise */
function handlePromiseError(): void {
  window.addEventListener('unhandledrejection', (error) => {
    console.log(error);
    ordinaryError(filterPromiseError(error));
  });
}

/** 资源错误 */
function handleSourceError() {
  window.addEventListener('error', (error) => {
    ordinaryError(filterError(error));
  });
}

/** 常规和异步错误 */
function handleSyncError() {
  window.onerror = function (message, source, lineno, colno, error) {
    console.log('window.onerror-message', message);
    console.log('window.onerror-source', source);
    console.log('window.onerror-lineno', lineno);
    console.log('window.onerror-colno', colno);
    console.log('window.onerror', error);
    return true;

    // try {
    //   reportErrorMessage(message, source, lineno, colno, error);
    // } catch (error) {
    //   console.log(error);
    // }
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
