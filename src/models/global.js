import { queryList, querySinger, queryZhifou } from '@/services/api';

export default {
  namespace: 'global',

  state: {
    list: {},
    singerInfo: {},
    queryZhifou: {},
  },

  effects: {
    *webview({ payload, callback }, { call, put }) {
      const data = yield call(queryList, payload);
      yield put({
        type: 'saveList',
        payload: (data && data.biz) || {},
      });
      if(callback) callback();
    },
    *singer({ payload, callback }, { call, put }) {
      const data = yield call(querySinger, payload);
      yield put({
        type: 'saveSinger',
        payload: (data && data.biz) || {},
      });
      if(callback) callback();
    },
    *zhifou({ payload, callback }, { call, put }) {
      const data = yield call(queryZhifou, payload);
      yield put({
        type: 'saveZhifou',
        payload: (data && data.biz) || {},
      });
      if(callback) callback();
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
    saveZhifou(state, { payload }) {
      return {
        ...state,
        queryZhifou: payload,
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
