export default [
    {
        path: '/marketingActivity/index',
        name: 'marketingActivityIndex',
        component: () => import(/* webpackChunkName: "marketingActivityIndex" */  '../views/marketingActivity/Index.vue'),
        meta: {
            group_name: "营销活动",
            menu_name: "营销活动",
            file: "views/marketingActivity/Index.vue",
        },
    },
    {
        path: '/marketingActivity/setUp',
        name: 'marketingActivitySetUp',
        component: () => import(/* webpackChunkName: "marketingActivitySetUp" */  '../views/marketingActivity/SetUp.vue'),
        meta: {
            group_name: "创建活动",
            menu_name: "创建活动",
            file: "views/marketingActivity/SetUp.vue",
        },
    },
    {
        path: '/marketingActivity/list',
        name: 'marketingActivityList',
        component: () => import(/* webpackChunkName: "marketingActivityList" */  '../views/marketingActivity/List.vue'),
        meta: {
            group_name: "活动列表",
            menu_name: "活动列表",
            file: "views/marketingActivity/List.vue",
        },
    },
    {
        path: '/marketingActivity/detail',
        name: 'marketingActivityDetail',
        component: () => import(/* webpackChunkName: "marketingActivityDetail" */  '../views/marketingActivity/Detail.vue'),
        meta: {
            group_name: "活动详情",
            menu_name: "活动详情",
            file: "views/marketingActivity/Detail.vue",
        },
    },
    {
        path: '/marketingActivity/analyze',
        name: 'marketingActivityAnalyze',
        component: () => import(/* webpackChunkName: "marketingActivityAnalyze" */  '../views/marketingActivity/Analyze.vue'),
        meta: {
            group_name: "活动分析",
            menu_name: "活动分析",
            file: "views/marketingActivity/Analyze.vue",
        },
    },
]
