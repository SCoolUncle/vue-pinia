import http from '/@/utils/axios';
import type { httpErrorInfo } from './types';

const prefix = '/yai';
const local = '/local';

export const uploadHttpErrorLog = (params: httpErrorInfo) => {
  return http.request({
    url: `${prefix}/error/httplog`,
    params,
    method: 'get',
  });
};

export const uploadJavascriptErrorLog = (data) => {
  return http.request({
    url: `${prefix}/error/javascriptlog`,
    data,
    method: 'post',
  });
};
