import { stringify } from 'qs';
import request from '@/utils/request';

const URL = "dev-fm.tingdao.com";
export async function queryList(params) {
  return request('https://'+URL+'/thridpartyapi/live/proxy?c=7004&v=1.0&sid=0000', {
    method: 'POST',
    body: params,
  });
}
export async function querySinger(params) {
  return request('https://'+URL+'/thridpartyapi/h5/get_singer_page_info', {
    method: 'POST',
    body: params,
  });
}
export async function queryZhifou(params) {
  return request('https://'+URL+'/thridpartyapi/h5/get_zhifou_themelist', {
    method: 'POST',
    body: params,
  });
}
