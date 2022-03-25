// https://www.npmjs.com/package/cookies-ts
import Cookies from 'cookies-ts';
import config from '/@/config';

const TOKEN_KEY = 'access-token';
const cookies = new Cookies();

export const setToken = (token) => {
  cookies.set(TOKEN_KEY, token, {
    expires: config.cookieExpires,
  });
};

export const getToken = () => {
  return cookies.get(TOKEN_KEY);
};

export const removeToken = () => {
  cookies.remove(TOKEN_KEY);
};

/**
 * @description 设备信息
 * @returns {string} Windows NT 10.0; Win64; x64 | iPhone; CPU iPhone OS 13_2_3 like Mac OS X
 */
export const getEquipmentInfo = () => {
  const baseInfo = navigator.userAgent;
  return baseInfo.slice(baseInfo.indexOf('(') + 1, baseInfo.indexOf(')'));
};

/**
 *
 * @param targetEle 参照dom
 * @param size 重叠占比 0~1
 * @returns IntersectionObserver
 */
export const createIntersectionListen: (
  targetEle: Element | null,
  size: number,
  callBack: (entries?: any, observe?: any) => void,
) => IntersectionObserver = function (targetEle = null, size = 0.1, callBack) {
  const ioInstance = new IntersectionObserver(callBack, {
    root: targetEle || null,
    threshold: size,
  });
  return ioInstance;
};
