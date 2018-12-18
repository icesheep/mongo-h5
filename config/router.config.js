export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      { path: '/', redirect: '/activity/Live' },
      { path: '/activity/activities', component: './Live/Activities' },
      { path: '/activity/live', component: './Live/Live' },
    ],
  },
];
