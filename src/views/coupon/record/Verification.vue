<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <div class="third-nav-t">核销记录</div>
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
                            <el-form-item label="卡券类型">
                                <el-select v-model="postData.coupon_type" placeholder="选择类型" clearable>
                                    <el-option v-for="item in couponType"
                                               :key="item.key"
                                               :label="item.value"
                                               :value="item.key"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="核销门店">
                                <el-select v-model="postData.store_id" placeholder="选择门店" clearable>
                                    <el-option v-for="item in shopList"
                                               :key="item.id"
                                               :label="item.value"
                                               :value="item.id"></el-option>
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
                                <el-table-column prop="coupon_type_desc" label="卡券类型">
                                </el-table-column>
                                <el-table-column prop="coupon_name" label="卡券名称">
                                </el-table-column>
                                <el-table-column prop="user_phone" label="核销人手机号">
                                </el-table-column>
                                <el-table-column prop="coupon_discount" label="核销金额">
                                </el-table-column>
                                <el-table-column prop="use_time" label="核销时间">
                                </el-table-column>
                                <el-table-column prop="store_name" label="核销门店">
                                </el-table-column>
                                <el-table-column prop="mer_user_name" label="收银员">
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
        name: "Verification",
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
                    "coupon_type": '',//卡券类型
                    "store_id": '',//门店
                    "data": '',
                    "start_time": '',
                    "end_time": '',
                },
                couponType: [],
                shopList: [],
                tableData: [
                    {}
                ]
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
                this.$axios.post('/mer/coupon/listUsageRecord', this.postData).then(res => {
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        this.tableData = res.data.data.data;
                        // this.tableData.forEach(ele => {
                        //     ele.create_time = new Date(ele.create_time).format('yyyy-MM-dd hh:mm:ss');
                        // });
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
             * 查看详情
             */
            clickClick(val) {
                console.log(val);
                this.$router.push({path: '/member/detail', query: {vipNo: val.user_no}})
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
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
                })
                    .catch((rej) => {

                    });
            },
            /**
             * 获取门店
             */
            getShop(){
                this.$axios.post('/mer/order/choose/store').then(res=>{
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        this.shopList = res.data.data;
                    }else {
                        this.$message(res.data.message);
                    }
                })
            },
        },
        beforeMount() {
            // 获取列表数据
            this.getData();
            this.getCouponType();
            this.getShop();
        },
    }
</script>

<style scoped>
    .el-date-editor--datetimerange {
        width: 240px!important;
        margin-top: 4px;
    }
</style>
