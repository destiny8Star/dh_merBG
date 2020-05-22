<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <!-- <div class="third-nav" >
                <div class="third-nav-t">活动分析</div>
            </div> -->
            <!-- tab按钮 start -->
            <div class="third-nav" >
                <el-menu :default-active="tabIndex" class="el-menu-demo" mode="horizontal" @select="tabSelect">
                    <el-menu-item v-for="(ele,i) in tabList" :key="i" :index="ele.value">{{ele.label}}</el-menu-item>
                </el-menu>
            </div>
            <!-- tab按钮 end -->
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner" v-loading="searchState">
                        <!-- 顶部数据 -->
                        <div class="home-figure show-data">
							<el-row :gutter="10" style="margin: 20px 0">
								<el-col :sm="4" v-for="(ele,i) in showList" :key="i">
									<div class="grid-content">
										<div class="home-figure-content"> {{ele.key}} </div>
										<div class="home-figure-num">{{ele.value}}</div>
									</div>
								</el-col>
							</el-row>
						</div>
                        <!-- 顶部数据结束 -->
                        <!-- 搜索条件 start -->
                        <el-form :inline="true" ref="postData" :model="postData" class="demo-form-inline">
                            <el-form-item label="付款时间">
                                <!--:default-time="['12:00:00']"-->
                                <el-date-picker @change="changeDate" v-model="postData.date" type="datetimerange"
                                                start-placeholder="开始日期"
                                                end-placeholder="结束日期" format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="订单号" >
                                    <el-input v-model="postData.order_no" placeholder="请输入订单号" clearable ></el-input>
                            </el-form-item>
                            <el-form-item label="门店">
                                <el-select v-model="postData.mer_store_id" placeholder="全部" clearable>
                                    <el-option v-for="item in shopList"
                                               :key="item.id"
                                               :label="item.value"
                                               :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit" size="small" >查询</el-button>
                            </el-form-item>
                        </el-form>
                        <!-- 搜索条件 end -->

                        <!-- 表格 start -->
                        <template >
                            <el-table ref="multipleTable" :data="tableData" style="width: 100%;min-width: 780px;" v-show="tabIndex ==1">
                                <el-table-column prop="create_time" label="付款时间">
                                </el-table-column>
                                <el-table-column prop="order_no" label="门店">
                                </el-table-column>
                                <el-table-column prop="order_no" label="订单号">
                                </el-table-column>
                                <el-table-column prop="received_price" label="实收金额(元)">
                                </el-table-column>
                                <el-table-column prop="store_name" label="获得机会">
                                </el-table-column>
                                <el-table-column prop="status" label="参与活动状态">
                                </el-table-column>
                            </el-table>
                            <el-table ref="multipleTable" :data="tableData" style="width: 100%;min-width: 780px;" v-show="tabIndex ==2">
                                <el-table-column prop="win_prize_time" label="中奖时间">
                                </el-table-column>
                                <el-table-column prop="grade" label="中奖等级">
                                </el-table-column>
                                <el-table-column prop="name" label="奖品">
                                </el-table-column>
                                <el-table-column prop="order_pay_time" label="付款时间">
                                </el-table-column>
                                <el-table-column prop="mer_store_name" label="门店">
                                </el-table-column>
                                    <el-table-column prop="order_no" label="订单号">
                                </el-table-column>
                                <el-table-column prop="order_received_price" label="实收金额(元)">
                                </el-table-column>
                            </el-table>
                        </template>
                        <!-- 表格 end -->

                        <template>
                            <div class="block" style="text-align: center;margin-top: 30px;">
                                <el-pagination @size-change="handleSizeChange"
                                               @current-change="jumpPagination"
                                               @prev-click="prevClick"
                                               @next-click="nextClick"
                                               :current-page="pagination.currentPage"
                                               :page-sizes="pagination.pageCount"
                                               :page-size="pagination.pageSize"
                                               layout="total, sizes, prev, pager, next, jumper"
                                               :total="pagination.total">
                                </el-pagination>
                            </div>
                        </template>
            <!-- //底部表格 -->
                    <h1 class="ly-title-one" style="margin-bottom: 20px">中奖次数趋势图</h1>
                    <!-- 搜索条件 start -->
                    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin: 20px 0">
                        <el-form-item label="日期" class="bill-collect-date">
                            <el-date-picker @change="changeDateb" v-model="formInline.date" type="datetimerange" start-placeholder="开始日期"
                                            end-placeholder="结束日期" format="yyyy-MM-dd" clearable>
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmitb" size="small">查询</el-button>
                        </el-form-item>
                    </el-form>
                    <!-- 搜索条件 end -->
					<div id="mainEcharts" :style="{width: '70%', height: '500px'}"></div>

                    </div>
                </div>
                <common-footer></common-footer>
            </div>
        </div>
    </div>
</template>

<script>
    import CommonFooter from '../../components/CommonFooter.vue'
    export default {
        name: "analyze",
        components: {
            CommonFooter
        },
        computed: {
            getWinHeight: function () {
                return this.$winHeight;
            }
        },
        data: function () {
            return {
                searchState: false,
                //页面所需
                "pagination": {
                    "total": 0,
                    "pageCount": [10,20,50,100],
                    "currentPage": 1,
                    "pageSize": 10,
                    "show": '1-5'
                },
                //接口参数
                "postData": {
                    "cursor": 1,//当前第几页-游标
                    "size": 10,//每页条数
                    "start_time": '',
                    "end_time": '',
                    "id": '',//传过来的id
                    "mer_store_id": '',
                    "order_no": '',
                    "date": '',
                },
               formInline : {//底部数据
                    date: [],
                    start_time: '',
                    end_time: '',
                    id:'',
                },
                tabIndex: '2',//tab选中值
                showList: [ //顶部数据
				],
                tabList: [
                    // {
                    //     value: '1',
                    //     label: '活动发放记录'
                    // },
                    {
                        value: '2',
                        label: '中奖记录'
                    }
                ],
                shopList: [],//门店list
                // orderState: [
                //     {
                //         value: '1',
                //         label: '已支付'
                //     },
                // ],
                tableData: [],
                echartsOption: {
                    title: {
                        text: '中奖次数趋势图'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['中奖次数']
                    },
                    grid: {
                        left: '3%',
                        right: '6%',
                        bottom: '3%',
                        top:'15%',
                        containLabel: true
                    },
                    xAxis: {
                        name:'单位/天',
                        nameTextStyle:{color:"#6698ee"}, 
                        type: 'category',
                        boundaryGap: false,
                        data: [],//'周一12','周二234','周三23','周四421','周五','周六','周日'
                    },
                    yAxis: {
                        type: 'value',
                        name:'单位/次',
                        nameTextStyle:{color:"#6698ee"}, 
                    },
                    series: [
                        {
                            name:'中奖次数',
                            type:'line',
                            stack: '总数',
                            data:[]//8, 9, 1, 0, 10, 0, 3
                        }
                    ],
                     color: ['#6698ee']
                },
            }
        },
        methods: {
            /**
             *  选择时间
             */
            changeDate(val) {
                console.log(val, this.postData.date);
                if(val){
                    let start = new Date(val[0]),end = new Date(val[1]);
                    console.log(start,end);
                    this.postData.start_time = start.valueOf();
                    this.postData.end_time = end.valueOf();
                }else {
                    this.postData.start_time = this.postData.end_time = '';
                }
                console.log(this.postData)
            },
            changeDateb(val) {
                console.log(val, this.formInline.date);
                if(val){
                    let start = new Date(val[0]),end = new Date(val[1]);
                    console.log(start,end);
                    this.formInline.start_time = start.valueOf();
                    this.formInline.end_time = end.valueOf();
                    console.log()
                }else {
                    this.formInline.start_time = this.formInline.end_time = '';
                }
                console.log(this.formInline)
            },
            /**
             * 顶部tab选择
             * @param key
             * @param keyPath
             */
            tabSelect(key, keyPath) {
                this.tabIndex = key;
                console.log(key, keyPath,this.tabIndex);
                this.pagination.currentPage = this.postData.cursor = 1;
                this.postData.size = 10;
                // this.postData.begin_time = this.postData.end_time = this.postData.store_name = this.postData.order_no = this.postData.username = this.postData.status = this.postData.date = '';
                // this.getData();
            },
            /**
             *  初始化echarts列表
             */
            drawLine(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('mainEcharts'));
                // 绘制图表
                myChart.setOption( this.echartsOption);
            },
            /**
             * 分页跳转【当前页】
             */
            jumpPagination(val) {
                console.log(val);
                this.pagination.currentPage = this.postData.cursor = val;
                // this.postData.cursor = val;
                this.getData();
            },
            /**
             * 上一页
             */
            prevClick() {
                this.pagination.currentPage --;
                this.postData.cursor --;
                this.getData();
            },
            /**
             * 下一页
             */
            nextClick() {
                this.pagination.currentPage ++;
                this.postData.cursor ++;
                this.getData();
            },
            /**
             * 每页条数
             * @param val
             */
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pagination.size = this.postData.size = val;
                this.getData();
            },
            /**
             * 获取门店list
             */
            getShopData() {
                //初始化列表
                this.$axios.post('/mer/store/all/list').then(res => {
                        // console.log("获取门店列表",res);
                        if (res.data.code === this.$webConfig.httpSuccessStatus) {
                            this.shopList = res.data.data;
                        }else {
                            this.$message(res.data.message);
                        }
                    })
                    .catch((rej) => {
                        this.$message("网络异常");
                    });
            },
            /**
             * 获取顶部数据
             */
            getTopData(){
                this.$axios.post('/mer/marketing/activy/record/topData',{id:this.postData.id}).then(res => {
                    // console.log("顶部数据",res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        this.showList = res.data.data;
                    }else {
                        this.$message(res.data.message);
                    }
                })
                .catch((rej) => {
                    this.$message("网络异常");
                });
            },
            /**
             * 获取底部数据
             */
            getBotData(){
                this.$axios.post('/mer/marketing/activy/record/bottomData',this.formInline).then(res => {
                    console.log("底部数据",res);
                    this.searchState = false;
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        let datas = res.data.data;
                         this.echartsOption.series[0].data = [] 
                         this.echartsOption.xAxis.data = []
                        datas.forEach((e,i)=>{
                           this.echartsOption.xAxis.data.push(e.date)
                           this.echartsOption.series[0].data.push(e.value)
                        })
                        // console.log('数据添加', this.echartsOption.xAxis.data,this.echartsOption.series[0].data)
                        this.drawLine()
                    }else {
                        this.$message(res.data.message);
                    }
                })
                .catch((rej) => {
                    this.searchState = false;
                    console.log('失败',rej)
                    this.$message("网络异常");
                });
            },
            /**
             * 获取列表数据
             */
            getData() {
                console.log(this.postData);
                let api = '';
                // if(this.tabIndex == 1){
                //     api = '/mer/order/ali/face/pay/list'
                // }else {
                    api = '/mer/marketing/activy/record/winPrize'
                // }
                console.log(this.postData,api);
                //初始化列表
                this.$axios.post(api, this.postData).then(res => {
                        console.log("分析列表",res);
                        if (res.data.code === this.$webConfig.httpSuccessStatus) {
                            this.tableData = res.data.data.data;
                            // console.log(this.tableData);
                            this.pagination.total = res.data.data.count;
                            this.pagination.currentPage = res.data.data.cursor;
                        }else{
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
            onSubmitb() {
                console.log('submit!',this.formInline);
                this.searchState = true;
                this.getBotData();
            },
        },
        created(){
           this.formInline.id = this.postData.id = this.$route.query.id
        },
        beforeMount() {
            // 获取列表数据
            this.getData();
            //  获取门店list
            this.getShopData();
            this.getTopData()
            this.getBotData()

        },
        mounted(){

        }
    }
</script>


<style scoped>
    .el-date-editor--datetimerange {
        width: 230px !important;
        margin-top: 4px;
    }
     >>> .el-input__inner{
        width: 100%;
    }
</style>
