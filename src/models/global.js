import { queryList, querySinger } from '@/services/api';

export default {
  namespace: 'global',

  state: {
    list: {},
    singerInfo: {},
  },

  effects: {
    *webview({ payload }, { call, put }) {
      const data = yield call(queryList, payload);
      yield put({
        type: 'saveList',
        payload: (data && data.biz) || {},
      });
    },
    *singer({ payload }, { call, put }) {
      const data = yield call(querySinger, payload);
      yield put({
        type: 'saveSinger',
        payload: (data && data.biz) || {},
      });
    },
  },

  reducers: {
    saveList(state, { payload }) {
      return {
        ...state,
        list: payload,
      };
    },
    saveSinger(state, { payload }) {
      return {
        ...state,
        singerInfo: payload,
      };
    },
  },

  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
