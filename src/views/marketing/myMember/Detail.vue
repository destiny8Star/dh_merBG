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
                            <span class="home-title-t ly-title">基本信息</span>
                        </div>
                        <div class="home-figure show-data">
                            <el-row :gutter="10" style="margin: 20px 0">
                                <el-col :sm="4" v-for="(ele,i) in showList" :key="i">
                                    <div class="grid-content">
                                        <div class="home-figure-content">{{ele.label}}</div>
                                        <div class="home-figure-num">{{ele.num}}</div>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="realBox">
                            <p v-for="(ele,i) in infoData" :key="i">{{ele.table}}：<span>{{ele.value}}</span></p>
                        </div>
                        <div class="home-title">
                            <span class="home-title-t ly-title">余额变更记录</span>
                        </div>
                        <!-- 搜索条件 start -->
                        <el-form :inline="true" :model="postData" class="demo-form-inline" style="margin-top: 20px">
                            <el-form-item label="日期" class="bill-collect-date">
                                <el-date-picker @change="changeDate" v-model="postData.date" type="datetimerange" start-placeholder="开始日期"
                                                end-placeholder="结束日期" format="yyyy-MM-dd">
                                    <!--&lt;!&ndash;:default-time="['12:00:00']"&ndash;&gt;-->
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="类型">
                                <el-select v-model="postData.type" placeholder="搜索类型" clearable>
                                    <el-option v-for="item in searchType"
                                               :key="item.key"
                                               :label="item.value"
                                               :value="item.key"></el-option>
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
                                <el-table-column prop="money" label="变动金额（元）">
                                    <template slot-scope="scope">
                                        <!--style="color: #67c23a"-->
                                        <!--<p v-if="scope.row.type" style="color: #409EFF">{{ '+' + scope.row.money }}</p>-->
                                        <!--<p v-else style="color: red">{{ - scope.row.money }}</p>-->
                                        <p>{{scope.row.money }}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="type" label="类型">
                                    <template slot-scope="scope">
                                        <p>{{ map[scope.row.type] }}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="order_no" label="订单号">
                                </el-table-column>
                                <el-table-column prop="create_time" label="时间">
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
                map: {
                    // 1:'会员充值',2:'会员消费',3:'消费送',4:'充值送'
                },
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
                    "user_no": '',
                    "cursor": 1,//当前第几页-游标
                    "size": 10,//每页条数
                    "type": '',//搜索类型
                    "data": '',
                    "start_time": '',
                    "end_time": '',
                },
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
                        table: '会员卡号',
                        value: ''
                    },
                    {
                        table: '余额',
                        value: ''
                    },
                    {
                        table: '姓名',
                        value: ''
                    },
                    {
                        table: '手机号',
                        value: ''
                    },
                    {
                        table: '生日',
                        value: ''
                    },
                    {
                        table: '激活时间',
                        value: ''
                    },
                ],
                searchType: [
                    /*{
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
                    }*/
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
                this.$axios.post('/mer/terminal/user/listUserBalanceLog', this.postData).then(res => {
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
             * 获取信息详情
             */
            getDetail() {
                //初始化列表
                this.$axios.get('/mer/terminal/user/userInfo?user_no=' + this.postData.user_no).then(res => {
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        this.showList[0].num = res.data.data.total_recharge;
                        this.showList[1].num = res.data.data.total_pay;

                        this.infoData[0].value = res.data.data.user_no || '--';
                        this.infoData[1].value = res.data.data.money || '--';
                        this.infoData[2].value = res.data.data.name || '--';
                        this.infoData[3].value = res.data.data.phone || '--';
                        this.infoData[4].value = res.data.data.birthday || '--';
                        this.infoData[5].value = new Date(res.data.data.create_time).format('yyyy-MM-dd hh:mm:ss') || '--';
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
            },
            /**
             * 获取类型list
             */
            getTypeList(){
                //初始化列表
                this.$axios.get('/agent/sys/mer/vipCard/blanceLog/changeType').then(res => {
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        this.searchType = res.data.data;
                        this.searchType.forEach( ele =>{
                            this.map[ele.key] = ele.value;
                        });
                        console.log(this.map);
                    }else {
                        this.$message(res.data.message);
                    }
                })
                    .catch((rej) => {

                    });
            }
        },
        beforeMount() {
            if(this.$route.query.vipNo){
                this.postData.user_no = this.$route.query.vipNo;
            }

            // 获取类型list
            this.getTypeList();
            // 获取列表数据
            this.getData();
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
    }
    .realBox span{
        margin-left: 10px;
    }
    .ly-title {
        /*font-size: 16px;*/
        /*font-weight: 900;*/
    }
</style>