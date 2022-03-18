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
