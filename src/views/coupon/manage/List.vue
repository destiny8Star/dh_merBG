<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <div class="third-nav-t">卡券管理</div>
            </div>
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">

                        <!-- 搜索条件 start -->
                        <el-form :inline="true" :model="postData" class="demo-form-inline" style="margin-top: 20px">
                            <el-form-item label="日期" class="bill-collect-date">
                                <el-date-picker @change="changeDate" v-model="postData.date" type="datetimerange" start-placeholder="开始日期"
                                                end-placeholder="结束日期" format="yyyy-MM-dd">
                                    <!--&lt;!&ndash;:default-time="['12:00:00']"&ndash;&gt;-->
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="卡券名称">
                                <el-input v-model="postData.coupon_name" placeholder="请输入卡券名称" style="margin-left: 10px"></el-input>
                            </el-form-item>
                            <el-form-item label="卡券类型">
                                <el-select v-model="postData.coupon_type" placeholder="选择类型" clearable>
                                    <el-option v-for="item in couponType"
                                               :key="item.key"
                                               :label="item.value"
                                               :value="item.key"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="投放状态">
                                <el-select v-model="postData.receive_status" placeholder="选择状态" clearable>
                                    <el-option v-for="item in couponStatus"
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
                                <el-table-column prop="create_time" label="创建时间">
                                    <template slot-scope="scope">
                                        {{scope.row.create_time ? scope.row.create_time : '--'}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="coupon_type" label="卡券类型">
                                    <template slot-scope="scope">
                                        {{ mapCouponType[scope.row.coupon_type] }}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="coupon_name" label="卡券名称">
                                </el-table-column>
                                <el-table-column prop="receive_time" label="领取时间">
                                </el-table-column>
                                <el-table-column prop="use_time" label="使用有效期">
                                </el-table-column>
                                <el-table-column prop="receive_status" label="投放状态">
                                    <template slot-scope="scope">
                                        {{ mapCouponStatus[scope.row.receive_status] }}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="remaining_count" label="库存">
                                </el-table-column>
                                <el-table-column label="操作" min-width='115'>
                                    <template slot-scope="scope">
                                        <el-button type="text" @click="offClick(scope.row)" v-show="scope.row.receive_status!=2">关闭</el-button>
                                        <el-button type="text" @click="clickClick(scope.row)">详情</el-button>
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
    import CommonFooter from '../../../components/CommonFooter.vue'

    const map = {1: '营业中', 2: '停止营业'};
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
                    "coupon_name": '',
                    "coupon_type": '',//卡券类型
                    "receive_status": '',//卡券状态
                    "date": '',
                    "start_time": '',
                    "end_time": '',
                },
                couponType: [

                ],
                mapCouponType: {},
                mapCouponStatus: { 0:'未开始', 1:'进行中', 2:'已结束' },
                couponStatus: [
                    {
                        value: '未开始',
                        key: 0
                    },
                    {
                        value: '进行中',
                        key: 1
                    },
                    {
                        value: '已结束',
                        key: 2
                    }
                ],
                tableData: []
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
                        this.couponType = res.data.data;
                        this.couponType.forEach(ele=>{
                            this.mapCouponType[ele.key] = ele.value
                        });
                        console.log(this.mapCouponType)
                    }else {
                        this.$message(res.data.message);
                    }
                }).then(res=>{
                    this.getData();
                })
                    .catch((rej) => {

                    });
            },
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
                this.$axios.post('/mer/coupon/listCoupon', this.postData).then(res => {
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        this.tableData = res.data.data.data;
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
             * 查询
             */
            onSubmit() {
                console.log('submit!');
                this.searchState = true;
                this.pagination.currentPage = this.postData.cursor = 1;
                this.getData();
            },
            /**
             * 关闭
             */
            offClick(val) {
                console.log(val);
                this.$confirm('此操作将关闭该卡券, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('/mer/coupon/close', {"id":val.id}).then(res => {
                        if (res.data.code === this.$webConfig.httpSuccessStatus) {
                            this.$message({type: 'success', message: '关闭成功!'});
                            this.getData();
                        } else {
                            this.$message(res.data.message);
                        }
                    }).catch(() => {

                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消关闭'
                    });
                });
            },
            /**
             * 查看详情
             */
            clickClick(val) {
                console.log(val);
                this.$router.push({path: '/coupon/detail', query: {couponId: val.id}})
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            /**
             * 获取卡券投放状态
             */
            getCouponStatus(){
                //初始化列表
                this.$axios.post('/admin/sys/getLevel').then(res => {
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        this.couponStatus = res.data.data;
                    }else {
                        this.$message(res.data.message);
                    }
                })
                    .catch((rej) => {

                    });
            },
        },
        created() {
            //获取卡券状态
            this.getCouponType();
            // this.getCouponStatus();

        },
        mounted(){
            // 获取列表数据 -- [在获取卡券状态后]
            // this.getData();
        }
    }
</script>

<style scoped>
    .el-date-editor--datetimerange {
        width: 240px!important;
        margin-top: 4px;
    }
</style>
