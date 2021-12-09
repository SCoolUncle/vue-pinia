import { AxiosError } from 'axios';
// import {uploadHttpErrorLog} from '/@/api/logs'

export const collectHttpError = (error: AxiosError) => {
  console.log(error);
};
