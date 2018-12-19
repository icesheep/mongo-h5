import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryList(params) {
  console.log(params)
  return request('https://fm.tingdao.com/thridpartyapi/live/proxy?c=7004&v=1.0&sid=0000', {
    method: 'POST',
    body: params,
  });
}
