// 成功后的返回
export function resultSuccess(data, { msg = 'ok' } = {}) {
  return {
    code: 200,
    data,
    msg,
    type: 'success',
  };
}

// 分页查询
export function resultPageSuccess<T = any>(
  page: number,
  pageSize: number,
  list: T[],
  { msg = 'success' } = {},
) {
  const pageData = pagination(page, pageSize, list);
  return {
    ...resultSuccess({
      list: pageData,
      total: list.length,
    }),
    msg,
  };
}

// 请求失败
export function resultError(msg = 'Request failed', { code = -1, data = null } = {}) {
  return {
    code,
    data,
    msg,
    type: 'error',
  };
}

export function pagination<T = any>(pageNo: number, pageSize: number, array: T[]): T[] {
  // 妈的处理分页
  const offset = (pageNo - 1) * Number(pageSize);
  const res =
    offset + Number(pageSize) >= array.length
      ? array.slice(offset, array.length)
      : array.slice(offset, offset + Number(pageSize));
  return res;
}
