<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <div class="third-nav-t">首页</div>
            </div>
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-60)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">
                        <div class="home-title">
                            <span class="home-title-t">今日实时数据（{{today}}）</span>
                        </div>
                        <div class="home-figure">
                            <el-row :gutter="10">
                                <el-col :sm="4" v-for="(ele,i) in todayDataList" :key="i">
                                    <div class="grid-content">
                                        <div class="home-figure-num">{{ele.num}}</div>
                                        <div class="home-figure-content">{{ele.label}}</div>
                                    </div>
                                </el-col>
                            </el-row>
                            <p class="goBill">更多详细数据，请前往 <el-link type="primary" @click="$router.push('bill/list')">账单</el-link>查看</p>
                        </div>
                        <div class="home-title">
                            <span class="home-title-t">昨日收款数据（{{yesterday}}）</span>
                        </div>
                        <div class="home-figure">
                            <el-row :gutter="10">
                                <el-col :sm="4" v-for="(ele,i) in yesterdayDataList" :key="i">
                                    <div class="grid-content">
                                        <div class="home-figure-num">{{ele.num}}</div>
                                        <div class="home-figure-content">{{ele.label}}</div>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="home-title">
                            <span class="home-title-t">软件下载</span>
                        </div>
                        <el-row>
                            <img src="../../assets/img/home/ruanjian@2x.png" alt="" class="download">
                        </el-row>
                        <el-button type="primary" @click="downloadClick">下载收银插件</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "home",
        computed: {
            getWinHeight: function () {
                return this.$winHeight;
            }
        },
        data() {
            return {
                today: '',
                yesterday: '',
                todayDataList: [
                    {
                        label: '实收金额(元)',
                        num: 0
                    },
                    {
                        label: '交易笔数(笔)',
                        num: 0
                    },
                    {
                        label: '退款笔数(笔)',
                        num: 0
                    },
                    {
                        label: '退款金额(元)',
                        num: 0
                    }
                ],
                yesterdayDataList: [
                    {
                        label: '实收金额(元)',
                        num: 0
                    },
                    {
                        label: '交易笔数(笔)',
                        num: 0
                    },
                    {
                        label: '退款笔数(笔)',
                        num: 0
                    },
                    {
                        label: '退款金额(元)',
                        num: 0
                    }
                ],

                options1: [
                    {
                        value: '选项1',
                        label: '今天'
                    }, {
                        value: '选项2',
                        label: '昨天'
                    }, {
                        value: '选项3',
                        label: '前天'
                    }, {
                        value: '选项4',
                        label: '一周前'
                    }
                ],
                options2: [
                    {
                        value: '选项1',
                        label: '近7天'
                    }, {
                        value: '选项2',
                        label: '近14天'
                    }, {
                        value: '选项3',
                        label: '近30天'
                    }
                ],
                value1: '选项1',
                value2: '选项1'
            }
        },
        methods:{
            /**
             * 下载插件
             */
            downloadClick(){
                window.location.href='http://files.pay.dianjishenghuo.cn/AI%E6%94%B6%E9%93%B6%E5%8F%B0-2.0.exe';
            },
            /**
             * 获取列表数据
             */
            getData(api,e) {
                //初始化列表
                this.$axios.post(api).then(res => {
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        let list = res.data.data;
                        let dataList;
                        if(e){
                            dataList = this.todayDataList;
                        }else {
                            dataList = this.yesterdayDataList;
                        }
                        dataList[0].num = list.received_price || 0;
                        dataList[1].num = list.pay_no || 0;
                        dataList[2].num = list.refund_no || 0;
                        dataList[3].num = list.refund_price || 0;
                        /*if(e){
                            dataList = this.todayDataList;

                            this.todayDataList[0].num = list.received_price || 0;
                            this.todayDataList[1].num = list.pay_no || 0;
                            this.todayDataList[2].num = list.refund_no || 0;
                            this.todayDataList[3].num = list.refund_price || 0;
                        }else {
                            this.yesterdayDataList[0].num = list.received_price || 0;
                            this.yesterdayDataList[1].num = list.pay_no || 0;
                            this.yesterdayDataList[2].num = list.refund_no || 0;
                            this.yesterdayDataList[3].num = list.refund_price || 0;
                        }*/
                    } else {
                        this.$message(res.data.message);
                    }
                })
                    .catch(() => {

                    });
            },

        },
        mounted(){
            let time=(new Date).getTime()-24*60*60*1000;
            this.today = new Date(new Date()).format('yyyy-MM-dd');
            this.yesterday = new Date(new Date(time)).format('yyyy-MM-dd');

            //获取数据
            this.getData('/mer/home/today/data',1);//今日
            this.getData('/mer/home/yesterday/data',0);//昨日
        }
    }
</script>

<style scoped>
    .goBill {
        color: #666;
        margin: 20px 0;
        display: flex;
        align-items: center;
    }
    .el-link {
        margin: 0 4px;
    }
    .download {
        width: 54px;
        height: 65px;
        margin: 24px;
    }
</style>
