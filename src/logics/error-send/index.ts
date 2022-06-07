import { AxiosError } from 'axios';
// import {uploadHttpErrorLog} from '/@/api/logs'

export const collectHttpError = (error: AxiosError) => {
  console.log('http request error', error);
};

export const ordinaryError = (errorData) => {
  console.log('上报异常：', errorData);
};
