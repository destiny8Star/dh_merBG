export default [
    {
        path: '/contact',
        name: 'contactIndex',
        component: () => import(/* webpackChunkName: "contactIndex" */  '../views/contact/index.vue'),
        meta: {
            group_name: "联系我们",
            menu_name: "联系我们",
            file: "views/contact/index.vue",
        },
    }
]
