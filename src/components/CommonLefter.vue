<template>
    <div class="first-nav" id="first-nav" v-bind:style="{height: (getWinHeight-60)+'px' }">
        <div class="first-nav-main">
            <el-row class="tac">
                <el-col>
                    <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen"
                             @close="handleClose" :unique-opened="false" :router="uniqueOpened"
                             :default-openeds="defaultOpeneds">
                        <template v-for="navItem in navData">
                            <el-menu-item   v-if="!navItem.children && navItem.url==='#'"   class="special-item">
                                <template slot="title" >
                                    <span >{{navItem.name}}</span>
                                </template>
                            </el-menu-item>
                            <el-menu-item :index="navItem.url" v-else-if="!navItem.children && navItem.url!=='#'" >
                                <template slot="title">
                                    <img :src="require(`../assets/img/nav/${navItem.ico_url}`)" class="title-icon-svg">
                                    <span>{{navItem.name}}</span>
                                </template>
                            </el-menu-item>
                            <el-submenu :index="navItem.depth+'-'+navItem.id" v-else>
                                <template slot="title">
                                    <img :src="require(`../assets/img/nav/${navItem.ico_url}`)" class="title-icon-svg">
                                    <span>{{navItem.name}}</span>
                                </template>
                                <template v-for="childItem in navItem.children">
                                    <el-menu-item :index="childItem.url" v-if="!childItem.children">{{childItem.name}}
                                    </el-menu-item>
                                    <el-submenu :index="childItem.depth+'-'+childItem.id" v-else>
                                        <template slot="title">{{childItem.name}}</template>
                                        <el-menu-item :index="childChildItem.url"
                                                      v-for="childChildItem in childItem.children">
                                            {{childChildItem.name}}
                                        </el-menu-item>
                                    </el-submenu>
                                </template>
                            </el-submenu>
                        </template>
                    </el-menu>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import ico_sc from '../assets/img/sc.svg'
    import ico_mp from '../assets/img/mp.svg'
    import ico_wm from '../assets/img/wm.svg'

    export default {
        name: "CommonLefter",
        data: function () {
            return {
                uniqueOpened: true,
               /* navData: [
                    {
                        "id": 1,
                        "menu_order": 0,
                        "depth": 1,
                        "parent_id": 0,
                        "name": "首页",
                        "url": "/home",
                        "menu_type": 1,
                        "ico_url": "mshanghu@2x.png",
                    },
                    {
                        "id": 2,
                        "menu_order": 1,
                        "depth": 1,
                        "parent_id": 0,
                        "name": "资金管理",
                        "url": "",
                        "menu_type": 1,
                        "ico_url": "zijin@2x.png",
                        "children": [
                            {
                                "id": 3,
                                "menu_order": 1,
                                "depth": 2,
                                "parent_id": 2,
                                "name": "账单列表",
                                "url": "/bill/list",
                                "menu_type": 1,
                                "ico_url": ""
                            },
                            {
                                "id": 4,
                                "menu_order": 1,
                                "depth": 2,
                                "parent_id": 2,
                                "name": "账单汇总",
                                "url": "/bill/collect",
                                "menu_type": 1,
                                "ico_url": ""
                            }
                        ],
                    },
                    {
                        "id": 5,
                        "menu_order": 1,
                        "depth": 1,
                        "parent_id": 0,
                        "name": "门店管理",
                        "url": "",
                        "menu_type": 1,
                        "ico_url": "mendian@2x.png",
                        "children": [
                            {
                                "id": 6,
                                "menu_order": 1,
                                "depth": 2,
                                "parent_id": 5,
                                "name": "我的门店",
                                "url": "/store/list",
                                "menu_type": 1,
                                "ico_url": ""
                            },
                            {
                                "id": 7,
                                "menu_order": 1,
                                "depth": 2,
                                "parent_id": 5,
                                "name": "添加门店",
                                "url": "/store/add",
                                "menu_type": 1,
                                "ico_url": ""
                            },
                            {
                                "id": 8,
                                "menu_order": 1,
                                "depth": 2,
                                "parent_id": 5,
                                "name": "员工管理",
                                "url": "/user/list",
                                "menu_type": 1,
                                "ico_url": ""
                            },
                            {
                                "id": 14,
                                "menu_order": 1,
                                "depth": 2,
                                "parent_id": 5,
                                "name": "角色管理",
                                "url": "/store/role",
                                "menu_type": 1,
                                "ico_url": ""
                            }
                        ]
                    },
                    {
                        "id": 20,
                        "menu_order": 0,
                        "depth": 1,
                        "parent_id": 0,
                        "name": "会员营销",
                        "url": "",
                        "menu_type": 1,
                        "ico_url": "mshanghu@2x.png",
                        "children": [
                            {
                                "id": 21,
                                "menu_order": 0,
                                "depth": 2,
                                "parent_id": 20,
                                "name": "轻会员",
                                "url": "/marketing/introduce",
                                "menu_type": 1,
                                "ico_url": ""
                            },
                            {
                                "id": 22,
                                "menu_order": 0,
                                "depth": 2,
                                "parent_id": 20,
                                "name": "我的会员",
                                "url": "/member/list",
                                "menu_type": 1,
                                "ico_url": ""
                            },
                            {
                                "id": 23,
                                "menu_order": 0,
                                "depth": 2,
                                "parent_id": 20,
                                "name": "会员卡设置",
                                "url": "/member/setUp",
                                "menu_type": 1,
                                "ico_url": ""
                            },
                            {
                                "id": 24,
                                "menu_order": 0,
                                "depth": 2,
                                "parent_id": 20,
                                "name": "创建会员活动",
                                "url": "/activity/index",
                                "menu_type": 1,
                                "ico_url": ""
                            },
                            {
                                "id": 25,
                                "menu_order": 0,
                                "depth": 2,
                                "parent_id": 20,
                                "name": "会员活动列表",
                                "url": "/activity/list",
                                "menu_type": 1,
                                "ico_url": ""
                            },
                            {
                                "id": 26,
                                "menu_order": 0,
                                "depth": 2,
                                "parent_id": 20,
                                "name": "会员充值记录",
                                "url": "/member/topUp",
                                "menu_type": 1,
                                "ico_url": ""
                            },
                            {
                                "id": 27,
                                "menu_order": 0,
                                "depth": 2,
                                "parent_id": 20,
                                "name": "会员消费记录",
                                "url": "/member/pay",
                                "menu_type": 1,
                                "ico_url": ""
                            }
                        ]
                    },
                    {
                        "id": 60,
                        "menu_order": 0,
                        "depth": 1,
                        "parent_id": 0,
                        "name": "卡券营销",
                        "url": "",
                        "menu_type": 1,
                        "ico_url": "card@2x.png",
                        "children": [
                            {
                                "id": 61,
                                "menu_order": 0,
                                "depth": 2,
                                "parent_id": 60,
                                "name": "创建卡券",
                                "url": "/coupon/setUp",
                                "menu_type": 1,
                                "ico_url": ""
                            },
                            {
                                "id": 62,
                                "menu_order": 0,
                                "depth": 2,
                                "parent_id": 20,
                                "name": "卡券管理",
                                "url": "/coupon/list",
                                "menu_type": 1,
                                "ico_url": ""
                            },
                            {
                                "id": 63,
                                "menu_order": 0,
                                "depth": 2,
                                "parent_id": 20,
                                "name": "核销记录",
                                "url": "/coupon/verification",
                                "menu_type": 1,
                                "ico_url": ""
                            }
                        ]
                    },
                    {
                        "id": 80,
                        "menu_order": 0,
                        "depth": 1,
                        "parent_id": 0,
                        "name": "营销活动",
                        "url": "",
                        "menu_type": 1,
                        "ico_url": "bussiness@2x.png",
                        "children": [
                            {
                                "id": 81,
                                "menu_order": 0,
                                "depth": 2,
                                "parent_id": 60,
                                "name": "创建活动",
                                "url": "/marketingActivity/index",
                                "menu_type": 1,
                                "ico_url": ""
                            },
                            {
                                "id": 82,
                                "menu_order": 0,
                                "depth": 2,
                                "parent_id": 20,
                                "name": "活动列表",
                                "url": "/marketingActivity/list",
                                "menu_type": 1,
                                "ico_url": ""
                            }
                        ]
                    },
                    {
                        "id": 70,
                        "menu_order": 0,
                        "depth": 1,
                        "parent_id": 0,
                        "name": "商圈管理",
                        "url": "",
                        "menu_type": 1,
                        "ico_url": "mallmange@2x.png",
                        "children": [
                            {
                                "id": 71,
                                "menu_order": 0,
                                "depth": 2,
                                "parent_id": 70,
                                "name": "我的商圈",
                                "url": "/business/list",
                                "menu_type": 1,
                                "ico_url": ""
                            }
                        ]
                    },
                    {
                        "id": 9,
                        "menu_order": 1,
                        "depth": 1,
                        "parent_id": 0,
                        "name": "我的账户",
                        "url": "",
                        "menu_type": 1,
                        "ico_url": "wode@2x.png",
                        "children": [
                            {
                                "id": 10,
                                "menu_order": 1,
                                "depth": 2,
                                "parent_id": 9,
                                "name": "商户信息",
                                "url": "/account/info",
                                "menu_type": 1,
                                "ico_url": ""
                            },
                            {
                                "id": 11,
                                "menu_order": 1,
                                "depth": 2,
                                "parent_id": 9,
                                "name": "设备管理",
                                "url": "/account/list",
                                "menu_type": 1,
                                "ico_url": ""
                            }
                        ]
                    },
                    {
                        "id": 12,
                        "menu_order": 1,
                        "depth": 1,
                        "parent_id": 0,
                        "name": "联系我们",
                        "url": "/contact",
                        "menu_type": 1,
                        "ico_url": "kefu@2x.png"
                    },
                    {
                        "id": 33,
                        "menu_order": 1,
                        "depth": 1,
                        "parent_id": 0,
                        "name": "APP下载",
                        "url": "/download",
                        "menu_type": 1,
                        "ico_url": "download@2x.png"
                    }
                ],*/
                navData: [],
                defaultOpeneds: [],
            }
        },
        //计算属性，可缓存值，没有变化不会重新计算结果
        computed: {
            getWinHeight() {
                return this.$winHeight;
            }
        },
        mounted: function () {
            this.loadMenu();
        },
        methods: {
            loadMenu() {
                this.$axios.get("/mer/menu/getMenu").then(res => {
                    if (res.data.code==this.$webConfig.httpSuccessStatus) {
                        this.navData = res.data.data;
                        this.navData.unshift({
                            // "id": 1,
                            "menu_order": 130,
                            "depth": 1,
                            "parent_id": 0,
                            "name": "首页",
                            "url": "/home",
                            "menu_type": 1,
                            "ico_url": "shouye@2x.png"
                        },)
                        if (this.navData) {
                            this.navData.forEach(item => {
                                if (item.children) {
                                    this.defaultOpeneds.push(item.depth + '-' + item.id);
                                }
                            })
                        }
                    }

                })
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>
<style type="text/css" scoped>
    .special-item{background: #108ee9;font-size: 18px;font-weight: bold;}
    .special-item span{color:#ffffff;}
    .special-item:hover{background: #108ee9;}
    .special-item:focus{background: #108ee9;}
</style>