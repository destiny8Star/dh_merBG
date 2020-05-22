export default [
    {
        path: '/bill/list',
        name: 'billList',
        component: () => import(/* webpackChunkName: "billList" */  '../views/bill/List.vue'),
        meta: {
            group_name: "资金管理",
            menu_name: "账单列表",
            file: "views/bill/List.vue",
        },
    },
    {
        path: '/bill/collect',
        name: 'billCollect',
        component: () => import(/* webpackChunkName: "billCollect" */  '../views/bill/Collect.vue'),
        meta: {
            group_name: "资金管理",
            menu_name: "账单汇总",
            file: "views/bill/Collect.vue",
        },
    }
]
