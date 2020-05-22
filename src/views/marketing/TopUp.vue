<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <div class="third-nav-t">会员充值记录</div>
            </div>
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">
                        <div class="home-figure show-data">
                            <el-row :gutter="10" style="margin: 20px 0">
                                <el-col :sm="4" v-for="(ele,i) in showList" :key="i">
                                    <div class="grid-content">
                                        <div class="home-figure-content">{{ele.label}}</div>
                                        <div class="home-figure-num">{{ele.num}}</div>
                                    </div>
                                </el-col>
                            </el-row>
                            <!--<el-row :gutter="10" style="margin: 20px 0">
                                <el-col :sm="4" v-for="(ele,i) in refundList" :key="i">
                                    <div class="grid-content">
                                        <div class="home-figure-content">{{ele.label}}</div>
                                        <div class="home-figure-num">{{ele.num}}</div>
                                    </div>
                                </el-col>
                            </el-row>-->
                        </div>

                        <!-- 搜索条件 start -->
                        <el-form :inline="true" :model="postData" class="demo-form-inline" style="margin-top: 20px">
                            <el-form-item label="充值时间" class="bill-collect-date">
                                <el-date-picker @change="changeDate" v-model="postData.date" type="datetimerange" start-placeholder="开始日期"
                                                end-placeholder="结束日期" format="yyyy-MM-dd">
                                    <!--&lt;!&ndash;:default-time="['12:00:00']"&ndash;&gt;-->
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="类型">
                                <div style="display: flex;align-items: center">
                                    <el-select v-model="postData.search_key" placeholder="搜索类型" clearable>
                                        <el-option v-for="item in searchType"
                                                   :key="item.value"
                                                   :label="item.label"
                                                   :value="item.value"></el-option>
                                    </el-select>
                                    <i>-</i>
                                    <el-input v-model="postData.search_value" placeholder="请输入" clearable style="margin-left: 10px"></el-input>
                                </div>
                            </el-form-item>
                            <el-form-item label="订单状态">
                                <el-select v-model="postData.status" placeholder="订单状态" clearable>
                                    <el-option v-for="item in statusList"
                                               :key="item.value"
                                               :label="item.label"
                                               :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit" size="small" v-loading="searchState">查询</el-button>
                            </el-form-item>
                        </el-form>
                        <!-- 搜索条件 end -->

                        <!-- 表格 start -->
                        <template>
                            <el-table ref="multipleTable" :data="tableData" style="width: 100%;min-width: 780px;"
                                      @selection-change="handleSelectionChange">
                                <!--  <el-table-column type="selection">
                                  </el-table-column>-->
                                <el-table-column prop="mer_store_name" label="门店">
                                </el-table-column>
                                <el-table-column prop="price" label="充值金额（元）">
                                </el-table-column>
                                <el-table-column prop="user_no" label="会员卡号">
                                </el-table-column>
                                <el-table-column prop="order_no" label="订单号">
                                </el-table-column>
                                <el-table-column prop="time" label="充值时间">
                                </el-table-column>
                                <el-table-column prop="give_price" label="赠送金额（元）">
                                    <template slot-scope="scope">
                                        {{scope.row.give_price ? scope.row.give_price : '--'}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="status" label="订单状态">
                                    <template slot-scope="scope">
                                        {{map[scope.row.status]}}
                                    </template>
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

                    </div>
                </div>
                <common-footer></common-footer>
            </div>
        </div>
    </div>
</template>

<script>
    import CommonFooter from '../../components/CommonFooter.vue'

    // const map = {1: '已支付', 2: '未支付',3: '已退款', 4: '支付失败'};

    export default {
        name: "list",
        components: {
            // second_nav,
            CommonFooter
        },
        computed: {
            getWinHeight: function () {
                return this.$winHeight;
            }
        },
        data: function () {
            return {
                map: {1: '已支付', 2: '未支付',3: '已退款', 4: '支付失败'},
                searchState: false,
                //页面所需
                "pagination": {
                    "total": 0,
                    "pageCount": [10, 20, 50, 100],
                    "currentPage": 1,
                    "pageSize": 10,
                    "show": '1-5'
                },
                //接口参数
                "postData": {
                    "cursor": 1,//当前第几页-游标
                    "size": 10,//每页条数
                    "search_value": '',
                    "search_key": '',//搜索类型
                    "date": '',
                    "start_time": '',
                    "end_time": '',
                    "status": '',//状态 1：已支付，2：未支付 3：已退款， 4：支付失败
                },
                showList: [
                    {
                        label: '充值金额（元）',
                        num: 0
                    },
                    {
                        label: '充值笔数（笔）',
                        num: 0
                    }
                ],
                searchType: [
                    {
                        value: 1,
                        label: '门店名'
                    },
                    {
                        value: 2,
                        label: '会员卡号'
                    },
                    {
                        value: 3,
                        label: '订单号'
                    }
                ],
                statusList: [
                    {
                        value: 1,
                        label: '已支付'
                    },
                    {
                        value: 2,
                        label: '未支付'
                    },
                    {
                        value: 3,
                        label: '已退款'
                    },
                    {
                        value: 4,
                        label: '支付失败'
                    }
                ],
                tableData: []
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
             * 分页跳转【当前页】
             */
            jumpPagination(val) {
                console.log(val);
                this.postData.cursor = val;
                this.getData();
            },
            /**
             * 上一页
             */
            prevClick() {
                this.pagination.currentPage--;
                this.postData.cursor--;
                this.getData();
            },
            /**
             * 下一页
             */
            nextClick() {
                this.pagination.currentPage++;
                this.postData.cursor++;
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
             * 获取列表数据
             */
            getData() {
                //初始化列表
                this.$axios.post('/mer/vip/order/recharge/listOrder', this.postData).then(res => {
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        this.tableData = res.data.data.data;
                        this.tableData.forEach(ele => {
                            ele.create_time = new Date(ele.create_time).format('yyyy-MM-dd hh:mm:ss');
                        });
                        this.pagination.total = res.data.data.count;
                        this.pagination.currentPage = res.data.data.cursor;
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
             * 获取顶部数据
             */
            getTopData() {
                //初始化列表
                this.$axios.get('/mer/vip/order/recharge/topTotalData').then(res => {
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        this.showList[0].num = res.data.data.total_price;
                        this.showList[1].num = res.data.data.count;
                    } else {
                        this.$message(res.data.message);
                    }
                })
                    .catch(() => {

                    });
            },
            /**
             * 查询
             */
            onSubmit() {
                console.log('submit!');
                if(this.postData.search_value.trim()){
                    if(this.postData.search_key==''){
                        this.$message('请先选择搜索类型');
                        return false;
                    }
                }
                this.searchState = true;
                this.pagination.currentPage = this.postData.cursor = 1;
                this.getData();
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        },
        beforeMount() {
            // 获取列表数据
            this.getData();
            // 获取顶部展示数据
            this.getTopData();
        },
    }
</script>

<style scoped>
    .el-date-editor--datetimerange {
        width: 240px!important;
        margin-top: 4px;
    }
</style>
