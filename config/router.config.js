export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      { path: '/', redirect: '/activity/activities' },
      { path: '/activity/activities', component: './Live/Activities' },
      { path: '/activity/live', component: './Live/Live' },
    ],
  },
];
