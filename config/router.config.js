export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      { path: '/', redirect: '/activity/live' },
      // { path: '/activity/activities', component: './Live/Activities' },
      { path: '/activity/live', component: './Live/Live' }, //直播页
      { path: '/activity/share', component: './Share/Share' }, //h5中间页
      { path: '/activity/share-player', component: './Share/PlayShare' }, //播放器分享
      { path: '/activity/share-audio', component: './Share/VideoShare' }, //广播分享
      { path: '/activity/singer', component: './Live/Singer' }, 
      { path: '/zhifou', component: './ZhiFou/List' }, 
      // { path: '/activity/singer-live', component: './Live/singer/Live' }, 
      // { path: '/activity/singer-end', component: './Live/singer/End' }, 
      // { path: '/activity/singer-list', component: './Live/singer/LastList' }, 
      // { path: '/activity/singer-prelive', component: './Live/singer/PreLive' }, 
    ],
  },
];
