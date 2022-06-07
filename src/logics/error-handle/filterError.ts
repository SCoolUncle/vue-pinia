import { ErrorType, ApiErrorType } from './types';

/**
 *
 * @param event 错误事件对象
 * @returns errorData  格式化后的数据
 */
const filterError: (event: any) => ErrorType = function (event) {
  let errorData: ErrorType;
  // 有event.target.src(href) 默认为资源加载错误
  if (event.target && (event.target.src || event.target.href)) {
    errorData = {
      kind: 'stability',
      type: 'error',
      errorType: 'resourceError',
      fileName: event.target.src || event.target.href,
      tagName: event.target.tagName,
      timeStamp: event.timeStamp,
    };
  } else {
    errorData = {
      kind: 'stability',
      type: 'error',
      errorType: 'jsError',
      message: event.message,
      fileName: event.filename,
      position: event.lineNo + ':' + event.colno,
      stack: event.error.stack,
    };
  }
  return errorData;
};

/**
 *
 * @param event 事件对象
 * @returns
 */
const filterPromiseError: (event: any) => ErrorType = function (event) {
  const errorData: ErrorType = {
    kind: 'stability',
    type: 'error',
    errorType: 'promiseError',
    message: '',
    fileName: '',
    position: '',
    stack: '',
  };
  if (event.reason && typeof event.reason === 'string') {
    errorData.message = event.reason;
  } else if (event.reason && typeof event.reason === 'object') {
    errorData.message = event.reason.message;
    if (event.reason.stack) {
      errorData.stack = event.reason.stack;
      errorData.fileName = event.reason.stack.split(': ')[2];
    }
  }
  return errorData;
};

const filterRequestError = function (error) {
  const errorData: ApiErrorType = {
    kind: 'stability',
    type: 'api',
    status: '',
    pathName: '',
    duration: '',
    response: '',
    params: '',
    message: '',
  };
  if (typeof error === 'string') {
    errorData.message = error;
  }
};

const perFormance = function () {};

export { filterError, filterPromiseError, filterRequestError };
