export default [
  {
    path: '/home',
    name: 'merchantHome',
    component: () => import(/* webpackChunkName: "merchantHome" */  '../views/home/Index.vue'),
    meta: {
      group_name:"首页",
      menu_name: "首页",
      file: "views/home/Index.vue",
    },
  },
  //  提交资料页面 - 暂停开发【匀出协同开发】
  {
    path: '/home/deliver',
    name: 'merchantDeliver',
    component: () => import(/* webpackChunkName: "merchantDeliver" */  '../views/home/Deliver.vue'),
    meta: {
      group_name:"首页",
      menu_name: "进件资料",
      file: "views/home/Deliver.vue",
    },
  },
  //拉卡拉间联提交资料
  {
    path: '/home/deliverlk',
    name: 'merchantDeliverlk',
    component: () => import(/* webpackChunkName: "merchantDeliverlk" */  '../views/home/Deliverlk.vue'),
    meta: {
      group_name: "首页",
      menu_name: "进件资料",
      file: "views/home/Deliverlk.vue",
    },
  },
  // {
  //   path: '/home/deliver2',
  //   name: 'merchantDeliver2',
  //   component: () => import(/* webpackChunkName: "merchantDeliver2" */  '../views/home/Deliver2.vue'),
  // },
  //  提示商户提交审核资料页面
  {
    path: '/home/hint',
    name: 'merchantHint',
    component: () => import(/* webpackChunkName: "merchantHint" */  '../views/home/Hint.vue'),
    meta: {
      group_name:"首页",
      menu_name: "提交资料前置流程",
      file: "views/home/Hint.vue",
    },
  },
  //  商户审核中页面
  {
    path: '/home/auditing',
    name: 'merchantAuditing',
    component: () => import(/* webpackChunkName: "merchantAuditing" */  '../views/home/Auditing.vue'),
    meta: {
      group_name:"首页",
      menu_name: "资料审核中",
      file: "views/home/Auditing.vue",
    },
  },
  //  商户审核失败原因页面
  {
    path: '/home/defeat',
    name: 'merchantDefeat',
    component: () => import(/* webpackChunkName: "merchantDefeat" */  '../views/home/Defeat.vue'),
    meta: {
      group_name:"首页",
      menu_name: "资料审核失败",
      file: "views/home/Defeat.vue",
    },
  },
  //  商户授权页面
  {
    path: '/home/impower',
    name: 'merchantImpower',
    component: () => import(/* webpackChunkName: "merchantImpower" */  '../views/home/Impower.vue'),
    meta: {
      group_name:"首页",
      menu_name: "支付宝授权",
      file: "views/home/Impower.vue",
    },
  },
  {
    path: '/home/Index',
    name: 'merchantHome',
    component: () => import(/* webpackChunkName: "merchantHome" */  '../views/home/Index.vue'),
    meta: {
      group_name:"首页",
      menu_name: "首页",
      file: "views/home/Index.vue",
    },
  },
  {
    path: '/download',
    name: 'download',
    component: () => import(/* webpackChunkName: "download" */  '../views/download/Down.vue'),
    meta: {
      group_name:"APP下载",
      menu_name: "APP下载",
      file: "views/download/Down.vue",
    },
  },
]
