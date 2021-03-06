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
      { path: '/activity/singer-end', component: './Live/singer/End' }, 
      { path: '/activity/singer-list', component: './Live/singer/LastList' }, 
      { path: '/activity/singer-prelive', component: './Live/singer/PreLive' }, 
      { path: '/activity/singer-live', component: './Live/singer/Live' }, 
      { path: '/zhifou', component: './ZhiFou/List' }, 
      { path: '/zhifou/player', component: './ZhiFou/Player' }, 
      { path: '/newyear', component: './NewYear/Singer' }, 
      { path: '/newyear/prelive', component: './NewYear/singer/Ready' }, 
      { path: '/newyear/live', component: './NewYear/singer/Live' }, 
      { path: '/static', component: './Static/Bg1' }, 
    ],
  },
];
