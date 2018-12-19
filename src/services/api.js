import { stringify } from 'qs';
import request from '@/utils/request';

export async function getList(params) {
  return request(`/webview?${stringify(params)}`, {
    method: 'POST',
  });
}

export async function queryList(params) {
  console.log(params)
  return request('/webview?c=7004&v=1.0&sid=0000', {
    method: 'POST',
    body: params,
  });
}
