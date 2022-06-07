import http from '../utils/axios';

export function getMenuList(params) {
  return http.request(
    {
      url: `/local/table/getDemoList`,
      method: 'get',
      params: params,
    },
    { showMessage: 'error' },
  );
}

export function getMenuListError(params) {
  return http.request(
    {
      url: `/local/table/getDemoListError`,
      method: 'get',
      params: params,
    },
    { showMessage: 'error' },
  );
}
