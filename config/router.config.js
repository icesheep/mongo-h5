export default [
  // user
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      { path: '/', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
    ],
  },
];
