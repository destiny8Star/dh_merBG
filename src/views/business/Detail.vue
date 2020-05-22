<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <div class="third-nav-t">商圈详情</div>
            </div>
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">
                        <el-button type="primary" @click="$router.push('/business/list')" size="small" style="float: right">返回</el-button>
                        <div class="home-title">
                            <span class="home-title-t ly-title">基本信息</span>
                        </div>
                        <el-card style="width: 50%;margin: 20px 0">
                            <div class="realBox">
                                <p v-for="(ele,i) in infoData" :key="i">{{ele.table}} <span>{{ele.value}}</span> <span style="margin-left: 10px" v-if="ele.unit">{{ele.unit}}</span></p>
                            </div>
                        </el-card>
                        

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    let map ={1:'不限类目',2:'同类目互斥'};
    export default {
        name: "Detail",
        computed: {
            getWinHeight: function () {
                return this.$winHeight;
            }
        },
        data(){
            return {
                businessId: '',
                searchState: false,
                infoData: [
                    {
                        table: '商圈名称：',
                        value: '',
                        unit: null
                    },
                    {
                        table: '商圈行业：',
                        value: '',
                        unit: null
                    },
                    {
                        table: '地域范围：',
                        value: '',
                        unit: null
                    },
                    {
                        table: '卡券展示范围：',
                        value: '',
                        unit: null
                    },
                    {
                        table: '商户成员数：',
                        value: '',
                        unit: '个'
                    },
                    {
                        table: '创建时间：',
                        value: '',
                        unit: null
                    },
                    /*{
                        table: '商圈领券数量：',
                        value: '',
                        unit: '张'
                    },
                    {
                        table: '商圈近7日交易笔数：',
                        value: '',
                        unit: '笔'
                    },
                    {
                        table: '商圈日近7日交易金额：',
                        value: '',
                        unit: '元'
                    },
                    {
                        table: '商圈券使用量：',
                        value: '',
                        unit: '张'
                    },*/
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
                this.$axios.get('/mer/business/circle/detail?businessCircleId=' + this.businessId).then(res => {
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        let info = res.data.data;
                        this.infoData[0].value = info.name;
                        this.infoData[1].value = info.industry;
                        this.infoData[2].value = info.area_scope;
                        this.infoData[3].value = map[info.card_range];
                        this.infoData[4].value = info.shop_no;
                        this.infoData[5].value = info.create_time;
                       /* this.infoData[6].value = info.obtain_coupon_no;
                        this.infoData[7].value = info.pay_no;
                        this.infoData[8].value = info.pay_amount;
                        this.infoData[9].value = info.use_no;*/
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
             * 申请加入
             */
            onSubmit() {
                console.log('submit!');
                this.searchState = true;
                this.$confirm('此操作将申请加入该商圈, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('/mer/business/circle/join', {"business_circle_id":this.businessId}).then(res => {
                        if (res.data.code === this.$webConfig.httpSuccessStatus) {
                            this.$message({type: 'success', message: '申请成功!'});
                            this.$router.push('/business/list');
                        } else {
                            this.$message(res.data.message);
                        }
                    }).catch(() => {

                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消申请'
                    });
                });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        },
        beforeMount() {
            if(this.$route.query.businessId){
                this.businessId = this.$route.query.businessId;
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