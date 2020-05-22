export default [
    {
        path: '/coupon/setUp',
        name: 'couponSetUp',
        component: () => import(/* webpackChunkName: "couponSetUp" */  '../views/coupon/setUp/Index.vue'),
        meta: {
            group_name: "创建卡券",
            menu_name: "创建卡券",
            file: "views/coupon/setUp/Index.vue",
        },
    },
    {
        path: '/coupon/list',
        name: 'couponList',
        component: () => import(/* webpackChunkName: "couponList" */  '../views/coupon/manage/List.vue'),
        meta: {
            group_name: "卡券管理",
            menu_name: "卡券管理",
            file: "views/coupon/manage/List.vue",
        },
    },
    {
        path: '/coupon/detail',
        name: 'couponDetail',
        component: () => import(/* webpackChunkName: "couponDetail" */  '../views/coupon/manage/Detail.vue'),
        meta: {
            group_name: "卡券详情",
            menu_name: "卡券详情",
            file: "views/coupon/manage/Detail.vue",
        },
    },
    {
        path: '/coupon/fullReduction',
        name: 'couponFullReduction',
        component: () => import(/* webpackChunkName: "couponFullReduction" */  '../views/coupon/setUp/FullReduction.vue'),
        meta: {
            group_name: "创建满减券",
            menu_name: "创建满减券",
            file: "views/coupon/setUp/FullReduction.vue",
        },
    },
    {
        path: '/coupon/Discount',
        name: 'couponDiscount',
        component: () => import(/* webpackChunkName: "couponDiscount" */  '../views/coupon/setUp/Discount.vue'),
        meta: {
            group_name: "创建折扣券",
            menu_name: "创建折扣券",
            file: "views/coupon/setUp/Discount.vue",
        },
    },
    {
        path: '/coupon/voucher',
        name: 'couponVoucher',
        component: () => import(/* webpackChunkName: "couponVoucher" */  '../views/coupon/setUp/Voucher.vue'),
        meta: {
            group_name: "创建代金券",
            menu_name: "创建代金券",
            file: "views/coupon/setUp/Voucher.vue",
        },
    },
    {
        path: '/coupon/verification',
        name: 'couponVerification',
        component: () => import(/* webpackChunkName: "couponVerification" */  '../views/coupon/record/Verification.vue'),
        meta: {
            group_name: "核销记录",
            menu_name: "核销记录",
            file: "views/coupon/record/Verification.vue",
        },
    },
]
