// js 执行错误， 资源加载错误数据类型
export interface ErrorType {
  kind: string; // 大类
  type: string; // 小类
  errorType: string; // 错误类型
  fileName: string; // 访问的文件名
  tagName?: string; // 标签名
  timeStamp?: string; // 时间戳
  selector?: string; // 出错的选择器
  stack?: string; // 出错的堆栈
  position?: string; // 0:0 行列信息
  message?: string;
}

// 接口异常错误
export interface ApiErrorType {
  title?: string;
  url?: string;
  timestamp?: string | number;
  userAgent?: string;
  kind: string;
  type: string;
  eventType?: string;
  pathName?: string;
  status?: string;
  duration?: string | number;
  response?: string;
  params?: string;
  message?: string;
}
