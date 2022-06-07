import axios, { AxiosRequestConfig } from 'axios';
import { requestOptions, UploadFileParams } from './types';
import { message } from 'ant-design-vue';
import { getToken } from '../tool/utils';
import config from '/@/config';
import { handleStatus } from './statusHandle';
import { collectHttpError } from '../../logics/error-send';

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
        console.log(error);

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
      return data;
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

  uploadFile(options: AxiosRequestConfig, params: UploadFileParams) {
    const formData = new window.FormData();
    // 多文件有点问题貌似
    if (params.data) {
      Object.keys(params.data).forEach((key) => {
        if (!params.data) return;
        const item = params.data[key];
        if (Array.isArray(item)) {
          item.forEach((val) => {
            formData.append(`${key}[]`, val);
          });
          return;
        }
        formData.append(key, params.data[key]);
      });
    }
    formData.append(params.name || 'file', params.file, params.filename);
    return this.request({
      ...options,
      method: 'post',
      data: formData,
      headers: {
        'Content-type': 'multipart/form-data;charset=UTF-8',
      },
    });
  }
}

const http = new HttpRequest(config.baseUrl);
export default http;
