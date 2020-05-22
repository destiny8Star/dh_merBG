<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <div class="third-nav-t">卡券详情</div>
            </div>
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">
                        <el-button type="primary" @click="$router.push('/coupon/list')" size="small" style="float: right">返回</el-button>
                        <div class="home-title">
                            <span class="home-title-t ly-title">基本信息</span>
                        </div>
                        <el-card style="width: 50%;margin: 20px 0">
                            <div class="realBox">
                                <p v-for="(ele,i) in infoData" :key="i">{{ele.table}} <span>{{ele.value}}</span> <span style="margin-left: 10px" v-if="ele.unit">{{ele.unit}}</span></p>
                            </div>
                        </el-card>

                        <!-- 搜索条件 start -->
                        <!--<el-form :inline="true" :model="postData" class="demo-form-inline" style="margin-top: 20px">
                            <el-form-item label="日期" class="bill-collect-date">
                                <el-date-picker @change="changeDate" v-model="postData.date" type="datetimerange" start-placeholder="开始日期"
                                                end-placeholder="结束日期" format="yyyy-MM-dd">
                                    &lt;!&ndash;&lt;!&ndash;:default-time="['12:00:00']"&ndash;&gt;&ndash;&gt;
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit" size="small" v-loading="searchState">查询</el-button>
                            </el-form-item>
                        </el-form>-->
                        <!-- 搜索条件 end -->
                        <!--<div class="home-figure show-data">
                            <el-row :gutter="10" style="margin: 20px 0">
                                <el-col :sm="4" v-for="(ele,i) in showList" :key="i">
                                    <div class="grid-content">
                                        <div class="home-figure-content">{{ele.label}}</div>
                                        <div class="home-figure-num">{{ele.num}}</div>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>-->

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
                couponId: '',
                searchState: false,
                showList: [
                    {
                        label: '充值总额（元）',
                        num: 0
                    },
                    {
                        label: '支付总额（元）',
                        num: 0
                    }
                ],
                infoData: [
                    {
                        table: '领取时间：',
                        value: '',
                        unit: null
                    },
                    {
                        table: '卡券类型：',
                        value: '',
                        unit: null
                    },
                    {
                        table: '卡券名称：',
                        value: '',
                        unit: null
                    },
                    {
                        table: '适用门店：',
                        value: '',
                        unit: null
                    },
                    {
                        table: '有效日期：',
                        value: '',
                        unit: null
                    },
                    {
                        table: '优惠内容：',
                        value: '',
                        unit: null
                    },
                    /*{
                        table: '使用条件： 订单满',
                        value: '',
                        unit: '元'
                    },*/
                    {
                        table: '每人限领：',
                        value: '',
                        unit: '张'
                    },
                    {
                        table: '发行数量：',
                        value: '',
                        unit: '张'
                    },
                    {
                        table: '是否与会员活动叠加：',
                        value: '',
                        unit: null
                    },
                ],
                searchType: [
                    {
                        value: 1,
                        label: '会员充值'
                    },
                    {
                        value: 2,
                        label: '会员消费'
                    },
                    {
                        value: 3,
                        label: '消费送'
                    },
                    {
                        value: 4,
                        label: '充值送'
                    }
                ],
                tableData: [],
                mapCouponType: {},
            }
        },
        methods: {
            /**
             * 选择时间 值有改变
             * @param val 选中的时间
             */
            changeDate(val){
                console.log(val,this.postData.date);
                if(val){
                    let start = new Date(val[0]),end = new Date(val[1]);
                    console.log(start,end,Date.parse(start),Date.parse(end));
                    this.postData.start_time = start.valueOf();
                    this.postData.end_time = end.valueOf();
                    console.log(this.postData.start_time,this.postData.end_time,this.postData)
                }else {
                    this.postData.start_time = this.postData.end_time = '';
                }
            },
            /**
             * 获取卡券类型
             */
            getCouponType(){
                this.$axios.get('/agent/sys/coupon/type').then(res => {
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        let couponType = res.data.data;
                        couponType.forEach(ele=>{
                            this.mapCouponType[ele.key] = ele.value
                        });
                        console.log(this.mapCouponType)
                    }else {
                        this.$message(res.data.message);
                    }
                }).then(res=>{
                    this.getDetail();
                })
                    .catch((rej) => {

                    });
            },
            /**
             * 获取信息详情
             */
            getDetail() {
                //初始化列表
                this.$axios.post('/mer/coupon/getCouponInfo',{"id":this.couponId}).then(res => {
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        let info = res.data.data.info;
                        this.infoData[0].value = info.receive_time || '--';
                        this.infoData[1].value = info.mer_coupon_type_desc || '--';
                        this.infoData[2].value = info.coupon_name || '--';
                        this.infoData[3].value = info.mer_store_name || '--';
                        this.infoData[4].value = info.use_time || '--';
                        this.infoData[5].value = info.discount || '--';
                        this.infoData[6].value = info.every_user_count || '--';
                        this.infoData[7].value = info.total_send_count || '--';
                        this.infoData[8].value = info.is_both_vip_acitvy || '--';
                    } else {
                        this.$message(res.data.message);
                    }
                    this.searchState = false;
                })
                    .catch(() => {
                        this.searchState = false;
                    });
            },
            /**
             * 查询
             */
            onSubmit() {
                console.log('submit!');
                this.searchState = true;
                this.pagination.currentPage = this.postData.cursor = 1;
                this.getData();
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        },
        beforeMount() {
            if(this.$route.query.couponId){
                this.couponId = this.$route.query.couponId;
            }

            // 获取信息
            this.getDetail();
            // this.getCouponType();
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