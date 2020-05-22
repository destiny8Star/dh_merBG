<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <div class="third-nav-t">营销活动</div>
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
                                        <el-button type="primary" size="mini" @click="jumpPage(ele)">立即创建</el-button>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="home-title">
                            <span class="home-title-t ly-title">规则</span>
                        </div>
                        <p style="padding-left: 15px">营销活动规则：</p>
                        <ol class="ly-introduce-text" style="margin-left: 15px">
                            <li v-for="(ele,i) in featureList" :key="i" style="padding-left: 10px">
                                <p>{{ele.desc}}</p>
                            </li>
                        </ol>
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
                        title: '转盘',desc: '奖品看得见，顾客乐翻天',icon: require('../../assets/img/marketingActivity/zzl@2x.png'),link:'/marketingActivity/SetUp',type: 1
                    },
                    {
                        title: '刮奖',desc: '奖励显神秘，奖品刮出来',icon: require('../../assets/img/marketingActivity/ggl@2x.png'),link:'/marketingActivity/SetUp',type: 2
                    }
                ],
                featureList: [
                    {desc: "同一时间，营销活动仅能生效一个；"},
                    {desc: "若已有活动，创建新活动，则新活动会替换旧活动；"},
                    {desc: "请根据店铺营销需求，合理设置营销活动。"}
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
            jumpPage (data){
                this.$router.push({path:data.link,query:{activityType:data.type}});
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
