<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <div class="third-nav-t">轻会员</div>
            </div>
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">
                        <div class="home-title">
                            <span class="home-title-t ly-title">产品概述</span>
                        </div>
                        <div class="ly-introduce-text">
                            <p style="text-indent: 2em;">轻会员是一款基于花呗和芝麻信用两大能力的会员营销工具。可令用户 <span>“先享受权益，后支付会员费”</span>，体验作为轻会员和普通会员之间的差异化服务。使用户切实享受会员带来的实惠、打消资金安全和消费陷阱顾虑；<span>使商家会员经营更简单，促进会员留存和复购。</span>
                            </p>
                        </div>
                        <div class="home-title">
                            <span class="home-title-t ly-title">产品特色</span>
                        </div>
                        <ul class="ly-introduce-text">
                            <li v-for="(ele,i) in featureList" :key="i">
                                <p><span>{{ele.title}}：</span>{{ele.desc}}</p>
                            </li>
                        </ul>
                        <div class="home-title">
                            <span class="home-title-t ly-title">使用展示</span>
                        </div>
                        <el-row>
                            <img src="../../assets/img/marketing/introduce.jpg" alt="" class="introduce">
                        </el-row>
                        <el-button type="primary" @click="apply" style="margin-left: 30px">立即申请</el-button>
                        <!--<el-button type="text" style="margin-left: 30px">联系我们 <i class="el-icon-d-arrow-right"></i></el-button>-->

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
                featureList: [
                    {title: "会员营销能力", desc: "作为差异化会员营销工具，用户通过芝麻信用或者花呗额度冻结，可以先享受会员权益，后付会员费，有利于降低新客决策门槛提转化，锁定用户消费频次。"},
                    {title: "支付宝权益发放能力", desc: "支持配置支付宝“全场代金券”和“全场折扣券”，且可进入支付宝卡包查看，增加商家影响力和用户回购率。"},
                    {title: "会员结算能力", desc: "会员周期到期后帮商家结算，首扣花呗，商家无后顾之忧。"},
                    {title: "经营数据能力", desc: "提供全方面轻会员营销数据，帮助商家决策。"},
                    {title: "用户触达能力", desc: "支付宝触达提醒，帮助商家触达用户获得二次交易。"},
                    {title: "低成本接入", desc: "后台简易配置，会员营销随时上线。"}
                ]
            }
        },
        methods: {
            apply() {
                this.$message('敬请期待…')
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

    .introduce {
        width: 60%;
        margin: 24px;
    }

    .ly-introduce-text {
        width: 60%;
        line-height: 22px;
    }

    .ly-introduce-text span {
        font-weight: 600;
    }

    ul {
        list-style-type: circle;
    }
</style>
