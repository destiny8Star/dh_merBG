<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <div class="third-nav-t">创建卡券</div>
            </div>
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">
                        <div class="home-title">
                            <span class="home-title-t ly-title">创建卡券</span>
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
                        <p style="color:red;padding-left: 15px">提示：未加入商圈，您的卡券只展示在自己的蜻蜓设备上，请赶快加入商圈</p>
                        <div class="home-title">
                            <span class="home-title-t ly-title">规则</span>
                        </div>
                        <p style="padding-left: 15px">卡券核销规则：</p>
                        <ol class="ly-introduce-text" style="margin-left: 15px">
                            <li v-for="(ele,i) in featureList" :key="i" style="padding-left: 10px">
                                <p>{{ele.desc}}</p>
                            </li>
                        </ol>

                        <p style="color:red;padding-left: 15px">注意：请根据店铺实际需求创建合理卡券活动，刺激用户消费。</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        computed: {
            getWinHeight: function () {
                return this.$winHeight;
            }
        },
        data() {
            return {
                activityList: [
                    {
                        title: '满减券',desc: '合理控制活动成本',icon: require('../../../assets/img/coupon/manjian@2x.png'),link:'/coupon/fullReduction'
                    },
                    {
                        title: '折扣券',desc: '提高店铺销量',icon: require('../../../assets/img/coupon/zhekou@2x.png'),link:'/coupon/Discount'
                    },
                    {
                        title: '代金券',desc: '带来更多客源',icon: require('../../../assets/img/coupon/daijin@2x.png'),link:'/coupon/voucher'
                    }
                ],
                featureList: [
                    {desc: "卡券可创建多张，卡券每笔订单仅可核销一张；"},
                    {desc: "卡券每笔订单自动核销有效期内最优惠的一张优惠。"}
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
