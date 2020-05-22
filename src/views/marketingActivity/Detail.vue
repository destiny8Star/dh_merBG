<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <div class="third-nav-t">营销活动详情</div>
            </div>
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">
                        <el-button type="primary" @click="$router.go(-1)" size="small" style="float: right">返回</el-button>
                        <div class="home-title">
                            <span class="home-title-t ly-title">基本设置</span>
                        </div>
                        <el-card style="width: 50%;margin: 20px 0">
                            <div class="realBox">
                                <p v-for="(ele,i) in infoData" :key="i">{{ele.table}} <span>{{ele.value}}</span> <span style="margin-left: 10px" v-if="ele.unit">{{ele.unit}}</span></p>
                            </div>
                        </el-card>

                         <div class="home-title">
                            <span class="home-title-t ly-title">活动规则</span>
                        </div>
                        <el-card style="width: 50%;margin: 20px 0">
                            <div class="realBox">
                                <!-- <p v-for="(ele,i) in infoDataM" :key="i">{{ele.table}} <span style="margin-left: 10px" v-if="ele.unit">{{ele.unit}}</span><span>{{ele.value}}</span> <span style="margin-left: 10px" v-if="ele.unit">{{ele.unit}}</span></p> -->
                                 <p>{{infoDataM[0].table}} <span>单次消费满 {{infoDataM[0].value}} 元即可参与活动 </span></p>
                                 <p>{{infoDataM[1].table}} <span>单次消费每满 {{infoDataM[1].value}} 元获得1次机会，每次消费最多有 {{infoDataM[1].value2}} 次机会</span></p>
                                 <p>{{infoDataM[2].table}} <span v-if="infoDataM[2].isF == 0">无限制 </span></p>
                                 <p style="margin-left:20px;color:red" v-if="infoDataM[2].isF == 1">活动上限次数:  <span>{{infoDataM[2].value}} </span>次</p>
                                 <p style="margin-left:20px;color:red" v-if="infoDataM[2].isF == 1">单人使用次数： <span>每人最多使用 {{infoDataM[2].value2}} 次，每日最多有 {{infoDataM[2].value3}} 次机会 </span></p>
                            </div>
                        </el-card>

                        <div class="home-title">
                            <span class="home-title-t ly-title">设备页面</span>
                        </div>
                        <el-card style="width: 50%;margin: 20px 0">
                            <div class="realBox">
                                <!-- <p v-for="(ele,i) in infoDataM" :key="i">{{ele.table}} <span style="margin-left: 10px" v-if="ele.unit">{{ele.unit}}</span><span>{{ele.value}}</span> <span style="margin-left: 10px" v-if="ele.unit">{{ele.unit}}</span></p> -->
                                 <p>{{infoDataH[0].table}} <span> {{infoDataH[0].value}} %</span></p>
                                 <p>{{infoDataH[1].table}} <span>每人最多中奖 {{infoDataH[1].value}} 次 </span></p>
                                 <p>{{infoDataH[2].table}} </p>
                                 <div style="margin-left:40px;color:#409EFF" v-for="(ele,i) in infoDataH[2].value" :key="i">
                                     <span>奖项{{i+1}}:</span>
                                     <p>奖项等级:<span >{{ele.grade}} </span></p>
                                     <p>奖品名称:<span >{{ele.name}} </span></p>
                                     <p>奖品数量:<span >{{ele.count}} </span></p>
                                     <p>中奖概率:<span >{{ele.prize_rate}} %</span></p>
                                 </div>
                            </div>
                        </el-card>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>
<script>
    export default {
        name: "Detail",
        computed: {
            getWinHeight: function () {
                return this.$winHeight;
            }
        },
        data(){
            return {
                id: '',//传递过来的id
                searchState: false,
                infoData: [//基本信息
                    {
                        table: '活动名称:',
                        value: '',
                        unit: null
                    },
                    {
                        table: '活动标语:',
                        value: '',
                        unit: null
                    },
                    {
                        table: '活动时间:',
                        value: '',
                        unit: null
                    },
                    {
                        table: '适用门店:',
                        value: '',
                        unit: null
                    }
                ],
                infoDataM: [ //活动规则
                    {
                        table: '参与条件:',
                        value: '',
                        unit: null
                    },
                    {
                        table: '参与规则:',
                        value: '', //消费满多少可1次
                        value2: '', //每次消费
                        unit: null
                    },
                    {
                        table: '参与限制:',
                        isF:'', //是否限制 0 无限制 1有限制
                        value: '', //活动上线次数
                        value2:'',//每人做多使用次数
                        value3:'',//每日次数
                        unit: null
                    }
                ],
           
                infoDataH: [ //设备页面
                    {
                        table: '总中奖概率:',
                        value: '',
                        unit: null
                    },
                    {
                        table: '每人中奖次数:',
                        value: '', 
                        unit: null
                    },
                    {
                        table: '奖项明细:',
                        value: '', //活动上线次数
                        unit: null
                    }
                ],
                mapCouponType: {},
            }
        },
        methods: {
            /**
             * 获取信息详情
             */
            getDetail() {
                //初始化列表
                this.$axios.post('/mer/marketing/activy/marketingActivyInfo' ,{id:this.id}).then(res => {
                    console.log("获取详情",res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        let info = res.data.data;
                        //基本
                        this.infoData[0].value = info.name;
                        this.infoData[1].value = info.slogan;
                        this.infoData[2].value = info.activy_time;
                        this.infoData[3].value = info.mer_store_name;
                        //规则
                        this.infoDataM[0].value = info.every_times_price
                        this.infoDataM[1].value = info.every_times_price
                        this.infoDataM[1].value2 = info.every_times_max
                        this.infoDataM[2].isF = info.limit_condition
                        this.infoDataM[2].value = info.max_times
                        this.infoDataM[2].value2 = info.every_user_max_times
                        this.infoDataM[2].value3 = info.every_user_day_max_times
                        //h5页面
                        this.infoDataH[0].value = info.prize_rate
                        this.infoDataH[1].value = info.every_user_price_times
                        this.infoDataH[2].value = info.awards_setting_item

                    } else {
                        this.$message(res.data.message);
                    }
                    this.searchState = false;
                })
                    .catch(() => {
                        this.searchState = false;
                    });
            },
         
        },
        beforeMount() {
            if(this.$route.query.id){
                this.id = this.$route.query.id;
            }
            // 获取信息
            this.getDetail();
        },
    }
</script>

<style scoped>
    .el-date-editor--datetimerange {
        width: 240px!important;
        margin-top: 4px;
    }
    .realBox p{
        /*font-size: 16px;*/
        line-height: 32px;
        padding-left: 30px;
    }
    .realBox span{
        margin-left: 10px;
    }
    .ly-title {
        /*font-size: 16px;*/
        /*font-weight: 900;*/
    }
</style>