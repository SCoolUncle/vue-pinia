import axios, { AxiosRequestConfig } from 'axios';
import { requestOptions } from './types';
import { message } from 'ant-design-vue';
import { getToken } from '../libs/utils';
import config from '/@/config';
import { handleStatus } from './statusHandle';
import { collectHttpError } from '/@/logics/request-error';

class HttpRequest {
  private baseUrl: String;
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      timeout: 10000, // 默认10s，不建议重设
    };
    return config;
  }

  setInterceptors(instance, options) {
    instance.interceptors.request.use(
      (config) => {
        config.headers['Authorization'] = getToken();
        config.headers['access-token'] = getToken();
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    instance.interceptors.response.use(
      (response) => {
        // if(response.status % 100 === 2){}
        const { data } = response;
        return this.handleCode(data, options);
        // 无论对错都会返回 有null或者undefined的可能，后续再说
        // return data
      },
      (error) => {
        handleStatus(error);
        collectHttpError(error);
      },
    );
  }

  // 接口数据返回成功失败是否显示提示
  handleCode(res: any, options) {
    const { code, msg, data } = res;
    const isSuccess = res && Reflect.has(res, 'code') && (code === 0 || code === 200);
    if (isSuccess) {
      if (options?.showMessage === 'success') {
        message.success({
          content: msg || options?.showMessage,
          duration: 2,
        });
      }
      return res;
    } else if (!isSuccess) {
      if (options?.showMessage === 'error') {
        message.error({
          content: msg || options?.showMessage,
          duration: 2,
        });
      }
      return Promise.reject(res);
    }
  }

  cancelRequest(options: AxiosRequestConfig, that) {
    return axios.request({
      ...options,
      cancelToken: new axios.CancelToken(function executor(c) {
        that.cancelHttp = c;
      }),
    });
  }

  request(options: AxiosRequestConfig, customs?: requestOptions) {
    const instance = axios.create();
    options = Object.assign(this.getInsideConfig(), options);
    this.setInterceptors(instance, customs);
    return instance(options);
  }
}

const http = new HttpRequest(config.baseUrl);
export default http;
