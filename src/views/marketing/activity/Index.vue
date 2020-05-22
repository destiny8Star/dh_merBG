<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <div class="third-nav-t">会员活动</div>
            </div>
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">
                        <div class="home-title">
                            <span class="home-title-t ly-title">创建活动</span>
                        </div>
                        <div class="home-figure show-data">
                            <el-row :gutter="10" style="margin: 20px 0">
                                <el-col :sm="4" v-for="(ele,i) in activityList" :key="i">
                                    <div class="grid-content">
                                        <h1>{{ele.title}}</h1>
                                        <p>{{ele.desc}}</p>
                                        <img :src="ele.icon" alt="">
                                        <el-button type="primary" size="mini" @click="jumpPage(ele.link)">立即创建</el-button>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="home-title">
                            <span class="home-title-t ly-title">规则</span>
                        </div>
                        <p style="padding-left: 15px">若同时创建多个活动，门店会员活动生效规则：</p>
                        <ol class="ly-introduce-text" style="margin-left: 15px">
                            <li v-for="(ele,i) in featureList" :key="i" style="padding-left: 10px">
                                <p>{{ele.desc}}</p>
                            </li>
                        </ol>

                        <p style="color:red;padding-left: 15px">注意：请根据店铺实际需求创建合理会员活动，刺激用户消费。</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Introduce",
        computed: {
            getWinHeight: function () {
                return this.$winHeight;
            }
        },
        data() {
            return {
                activityList: [
                    {
                        title: '充值送',desc: '充值即到账，快速回笼资金',icon: require('../../../assets/img/marketing/chongzhi@2x.png'),link:'/activity/topUp'
                    },
                    {
                        title: '消费送',desc: '消费送余额，刺激二次消费',icon: require('../../../assets/img/marketing/xiaofei@2x.png'),link:'/activity/expense'
                    },
                    {
                        title: '满减',desc: '满减优惠，刺激会员消费',icon: require('../../../assets/img/marketing/manjian@2x.png'),link:'/activity/fullReduction'
                    },
                    {
                        title: '折扣',desc: '折扣刺激，促进会员成交',icon: require('../../../assets/img/marketing/zhekou@2x.png'),link:'/activity/discount'
                    }
                ],
                featureList: [
                    {desc: "【充值送】、【消费送】活动可与【满减】、【会员折扣】共同生效；"},
                    {desc: "满减、会员折扣仅能有一种活动生效，新活动会替换旧活动；"},
                    {desc: "消费送根据会员支付金额计算赠送金额。"}
                ]
            }
        },
        methods: {
            apply() {
                this.$message('敬请期待…')
            },
            /**
             *  跳转页面
             */
            jumpPage (url){
                this.$router.push(url);
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>
    .ly-title {
        /*font-size: 16px;*/
        font-weight: 900;
    }
    .grid-content {
        height: auto;
        text-align: center;
        color: #8590a9;
        padding: 30px 0;
    }
    .grid-content h1,.grid-content p {
        margin: 0;
    }
    .grid-content h1 {
        font-size: 16px;
        color: #333;
    }
    .grid-content img {
        width: 110px;
        height: 110px;
        display: block;
        margin: 10px auto;
    }
</style>
