export default [
    {
        path: '/store/list',
        name: 'storeList',
        component: () => import(/* webpackChunkName: "storeList" */  '../views/store/List.vue'),
        meta: {
            group_name: "门店管理",
            menu_name: "我的门店",
            file: "views/store/List.vue",
        },
    },
    {
        path: '/store/add',
        name: 'storeAdd',
        component: () => import(/* webpackChunkName: "storeAdd" */  '../views/store/Add.vue'),
        meta: {
            group_name: "门店管理",
            menu_name: "添加门店",
            file: "views/store/Add.vue",
        },
    },
    {
        path: '/store/update',
        name: 'storeUpdate',
        component: () => import(/* webpackChunkName: "storeUpdate" */  '../views/store/Update.vue'),
        meta: {
            group_name: "门店管理",
            menu_name: "编辑门店",
            file: "views/store/Update.vue",
        },
    },
    {
        path: '/store/addRole',
        name: 'addRole',
        component: () => import(/* webpackChunkName: "addRole" */  '../views/store/AddRole.vue'),
        meta: {
            group_name: "门店管理",
            menu_name: "添加角色",
            file: "views/store/AddRole.vue",
        },
    },
    {
        path: '/store/updateRole',
        name: 'updateRole',
        component: () => import(/* webpackChunkName: "updateRole" */  '../views/store/UpdateRole.vue'),
        meta: {
            group_name: "门店管理",
            menu_name: "修改角色",
            file: "views/store/UpdateRole.vue",
        },
    },
    {
        path: '/store/role',
        name: 'Role',
        component: () => import(/* webpackChunkName: "Role" */  '../views/store/Role.vue'),
        meta: {
            group_name: "门店管理",
            menu_name: "角色列表",
            file: "views/store/Role.vue",
        },
    }
]
