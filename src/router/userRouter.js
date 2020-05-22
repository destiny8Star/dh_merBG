export default [
    {
        path: '/user/list',
        name: 'userList',
        component: () => import(/* webpackChunkName: "userList" */  '../views/user/List.vue'),
        meta: {
            group_name: "员工管理",
            menu_name: "员工管理",
            file: "views/user/List.vue",
        },
    }
    , {
        path: '/user/add',
        name: 'userAdd',
        component: () => import(/* webpackChunkName: "userAdd" */  '../views/user/Add.vue'),
        meta: {
            group_name: "员工管理",
            menu_name: "添加员工",
            file: "views/user/Add.vue",
        },
    }
]
