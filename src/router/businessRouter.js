export default [
    {
        path: '/business/list',
        name: 'businessList',
        component: () => import(/* webpackChunkName: "businessList" */  '../views/business/List.vue'),
        meta: {
            group_name:"商圈管理",
            menu_name: "我的商圈",
            file: "views/business/List.vue",
        },
    },
    {
        path: '/business/detail',
        name: 'businessDetail',
        component: () => import(/* webpackChunkName: "businessDetail" */  '../views/business/Detail.vue'),
        meta: {
          group_name:"商圈管理",
            menu_name: "商圈详情",
            file: "views/business/Detail.vue",
        },
    }
]
