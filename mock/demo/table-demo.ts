import { MockMethod } from 'vite-plugin-mock';
import { resultPageSuccess, resultError } from '../_util';

const demoList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 60; index++) {
    result.push({
      id: `${index}`,
      beginTime: '@datetime',
      endTime: '@datetime',
      address: '@city()',
      avatar: 'https://joeschmoe.io/api/v1/random',
      name: '@cname()',
      name1: '@cname()',
      name2: '@cname()',
      name3: '@cname()',
      name4: '@cname()',
      name5: '@cname()',
      name6: '@cname()',
      name7: '@cname()',
      name8: '@cname()',
      'no|100000-10000000': 100000,
      'status|1': ['normal', 'enable', 'disable'],
    });
  }
  return result;
})();

export default [
  {
    url: '/local/table/getDemoList',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 10 } = query;
      return resultPageSuccess(page, pageSize, demoList);
    },
  },
  {
    url: '/local/table/getDemoListError',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      const {} = query;
      return resultError();
    },
  },
] as MockMethod[];
