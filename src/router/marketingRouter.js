export default [
    {
        path: '/marketing/introduce',
        name: 'marketingIntroduce',
        component: () => import(/* webpackChunkName: "marketingIntroduce" */  '../views/marketing/Introduce.vue'),
        meta: {
            group_name: "轻会员",
            menu_name: "轻会员",
            file: "views/marketing/Introduce.vue",
        },
    },
    {
        path: '/member/list',
        name: 'memberList',
        component: () => import(/* webpackChunkName: "memberList" */  '../views/marketing/myMember/List.vue'),
        meta: {
            group_name: "我的会员",
            menu_name: "我的会员",
            file: "views/marketing/myMember/List.vue",
        },
    },
    {
        path: '/member/detail',
        name: 'memberDetail',
        component: () => import(/* webpackChunkName: "memberDetail" */  '../views/marketing/myMember/Detail.vue'),
        meta: {
            group_name: "会员详情",
            menu_name: "会员详情",
            file: "views/marketing/myMember/Detail.vue",
        },
    },
    {
        path: '/member/topUp',
        name: 'memberTopUp',
        component: () => import(/* webpackChunkName: "memberTopUp" */  '../views/marketing/TopUp.vue'),
        meta: {
            group_name: "会员充值记录",
            menu_name: "会员充值记录",
            file: "views/marketing/record/TopUp.vue",
        }
    },
    {
        path: '/member/setUp',
        name: 'memberSetUp',
        component: () => import(/* webpackChunkName: "memberSetUp" */  '../views/marketing/SetUp.vue'),
        meta: {
            group_name: "会员卡设置",
            menu_name: "会员卡设置",
            file: "views/marketing/SetUp.vue",
        },
    },
    {
        path: '/activity/index',
        name: 'activityIndex',
        component: () => import(/* webpackChunkName: "activityIndex" */  '../views/marketing/activity/Index.vue'),
        meta: {
            group_name: "会员活动",
            menu_name: "会员活动",
            file: "views/marketing/activity/Index.vue",
        },
    },
    {
        path: '/activity/topUp',
        name: 'activityTopUp',
        component: () => import(/* webpackChunkName: "activityTopUp" */  '../views/marketing/activity/TopUp.vue'),
        meta: {
            group_name: "创建充值送活动",
            menu_name: "创建充值送活动",
            file: "views/marketing/activity/TopUp.vue",
        },
    },
    {
        path: '/activity/fullReduction',
        name: 'activityFullReduction',
        component: () => import(/* webpackChunkName: "activityFullReduction" */  '../views/marketing/activity/FullReduction.vue'),
        meta: {
            group_name: "创建满减活动",
            menu_name: "创建满减活动",
            file: "views/marketing/activity/FullReduction.vue",
        },
    },
    {
        path: '/activity/expense',
        name: 'activityExpense',
        component: () => import(/* webpackChunkName: "activityExpense" */  '../views/marketing/activity/Expense.vue'),
        meta: {
            group_name: "创建消费送活动",
            menu_name: "创建消费送活动",
            file: "views/marketing/activity/Expense.vue",
        },
    },
    {
        path: '/activity/discount',
        name: 'activityDiscount',
        component: () => import(/* webpackChunkName: "activityDiscount" */  '../views/marketing/activity/Discount.vue'),
        meta: {
            group_name: "创建折扣活动",
            menu_name: "创建折扣活动",
            file: "views/marketing/activity/Discount.vue",
        },
    },
    {
        path: '/activity/list',
        name: 'activityList',
        component: () => import(/* webpackChunkName: "activityList" */  '../views/marketing/activity/List.vue'),
        meta: {
            group_name: "会员活动列表",
            menu_name: "会员活动列表",
            file: "views/marketing/activity/List.vue",
        },
    },
    {
        path: '/member/topUp',
        name: 'memberTopUp',
        component: () => import(/* webpackChunkName: "memberTopUp" */  '../views/marketing/TopUp.vue'),
        meta: {
            group_name: "会员充值记录",
            menu_name: "会员充值记录",
            file: "views/marketing/record/TopUp.vue",
        },
    },
    {
        path: '/member/pay',
        name: 'memberPay',
        component: () => import(/* webpackChunkName: "memberPay" */  '../views/marketing/Pay.vue'),
        meta: {
            group_name: "会员消费记录",
            menu_name: "会员消费记录",
            file: "views/marketing/record/Pay.vue",
        },
    }
]
