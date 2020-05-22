import Vue from 'vue'
import VueRouter from 'vue-router'

import homeRouter from './router/homeRouter'
import storeRouter from "./router/storeRouter";
import billRouter from "./router/billRouter";//资金管理模块
import accountRouter from "./router/accountRouter";//我的账户模块
import marketingRouter from "./router/marketingRouter";//会员营销【旧称：商家营销】模块
import marketingActivityRouter from "./router/marketingActivityRouter";//营销活动模块
import couponRouter from "./router/couponRouter";//卡券营销模块
import businessRouter from "./router/businessRouter";//商圈管理模块
import userRouter from "./router/userRouter";
import contactRouter from "./router/contactRouter";//联系我们模块


Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '*', name: '404', component: () => import(/* webpackChunkName: "404" */ "./views/NotFound.vue"),
            meta:{
                menu_name:"404",
                file:"views/NotFound.vue",
            }
        },
        {
            path: '/', name: 'logon', component: () => import(/* webpackChunkName: "logon" */ "./views/Logon.vue"),
            meta:{
                menu_name:"登陆",
                file:"views/Logon.vue",
            }
        },
        {
            path: '/getrouters', name: 'getRouters', component: () => import(/* webpackChunkName: "getRouters" */ "./views/GetRouters.vue"),
            meta:{
                menu_name:"...",
                file:"views/GetRouters.vue",
            }
        },
        {
            path: '/merchant',
            name: 'merchant',
            component: () => import(/* webpackChunkName: "Merchant" */ "./views/Merchant.vue"),
            children: [...storeRouter, ...homeRouter, ...billRouter, ...accountRouter, ...userRouter, ...contactRouter, ...marketingRouter, ...couponRouter, ...businessRouter, ...marketingActivityRouter]
        }
    ]
})

/*
   路由守卫
*/
router.beforeEach((to, from, next) => {
    let user = localStorage.getItem(Vue.webConfig.authTokenName) //token
    let pay_channel_type = Vue.ls.get(Vue.webConfig.pay_channel_type) //1：直连；2：拉卡拉
    let lkl_status = Vue.ls.get(Vue.webConfig.lkl_status) //拉卡拉审核状态
    let ali_status = Vue.ls.get(Vue.webConfig.aliStatus)   //支付宝审核状态
    let wx_status = Vue.ls.get(Vue.webConfig.wxStatus)   //微信审核状态
    // let status = JSON.parse(localStorage.getItem(Vue.webConfig.auditStatus))
    console.log('状态',ali_status,wx_status)
    if (!user) {
        if (to.name == 'logon') {
            next()
        } else {
            next({name: 'logon'})
        }
    } else{
        if (pay_channel_type == 1){ //直连
            if (ali_status == 1 || wx_status == 1) {
                    next()
                } else if (ali_status == 2 || wx_status == 2) {
                    if (to.name == 'merchantDefeat' || to.name == 'merchantDeliver' ) {
                        next()
                    } else {
                        next({name: 'merchantDefeat'})
                    }
                } else if (ali_status == 3 || wx_status == 3) {
                    if (to.name == 'merchantAuditing') {
                        next()
                    } else {
                        next({name: 'merchantAuditing'})
                    }
                } else if (ali_status == 4 || wx_status == 4) {
                    if (to.name == 'merchantHint' || to.name == 'merchantDeliver' ) {
                        next()
                    } else {
                        next({name: 'merchantHint'})
                    }
                } else {
                    next()
                }
        }else{  //间联
            if (lkl_status == 1) {
                next()
            } else if (lkl_status == 2) {
                if (to.name == 'merchantDefeat' || to.name == 'merchantDeliverlk') {
                    next()
                } else {
                    next({ name: 'merchantDefeat' })
                }
            } else if (lkl_status == 3) {
                if (to.name == 'merchantAuditing') {
                    next()
                } else {
                    next({ name: 'merchantAuditing' })
                }
            } else if (lkl_status == 4) {
                if (to.name == 'merchantHint' || to.name == 'merchantDeliverlk') {
                    next()
                } else {
                    next({ name: 'merchantHint' })
                }
            } else {
                next()
            }
        }
    }
});

export default router