<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <div class="third-nav-t">会员活动列表</div>
            </div>
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">

                        <!-- 搜索条件 start -->
                        <el-form :inline="true" :model="postData" class="demo-form-inline" style="margin-top: 20px">
                            <el-form-item label="活动名称">
                                <el-input v-model="postData.activy_name" placeholder="请输入活动名称" clearable style="margin-left: 10px"></el-input>
                            </el-form-item>
                            <el-form-item label="活动类型">
                                <el-select v-model="postData.activy_type" placeholder="请选择活动类型" clearable>
                                    <el-option v-for="item in typeList"
                                               :key="item.key"
                                               :label="item.value"
                                               :value="item.key"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="活动状态">
                                <el-select v-model="postData.activy_status" placeholder="请选择活动状态" clearable>
                                    <el-option v-for="item in statusList"
                                               :key="item.value"
                                               :label="item.label"
                                               :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="门店">
                                <el-select v-model="postData.store_id" placeholder="请选择适用门店" clearable>
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
                                <el-table-column prop="activy_name" label="活动名称">
                                </el-table-column>
                                <el-table-column prop="activy_type" label="活动类型">
                                </el-table-column>
                                <el-table-column prop="activy_rule" label="活动内容">
                                    <template slot-scope="scope">
                                        {{scope.row.activy_rule ? scope.row.activy_rule : '--'}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="activy_time" label="活动时间">
                                </el-table-column>
                                <el-table-column prop="activy_condition_desc" label="活动限制">
                                    <template slot-scope="scope">
                                        {{scope.row.activy_condition_desc ? scope.row.activy_condition_desc : '--'}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="store_name" label="适用门店">
                                    <template slot-scope="scope">
                                        {{scope.row.store_name ? scope.row.store_name : '--'}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="activy_status" label="状态">
                                    <template slot-scope="scope">
                                        {{ mapStatus[scope.row.activy_status] }}
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" min-width='115'>
                                    <template slot-scope="scope">
                                        <el-button v-if="scope.row.activy_status" type="text" @click="offClick(scope.row)">关闭</el-button>
                                        <p v-else>--</p>
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

    // const mapStatus = {1: '使用中', 0: '已结束'};
    const mapType = {1: '充值送', 2: '满减', 3: '消费送', 4: '会员折扣'};//1:充值送 2:满减 3:消费送 4:会员折扣

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
                    "activy_name": '',
                    "activy_type": '',//活动类型
                    "activy_status": '',//活动状态【1:使用中 0:已结束】
                    "store_id": '',//门店
                },
                mapStatus: { 1:'使用中', 0:'已结束'},
                typeList: [
                    /*{
                        value: 1,
                        label: '充值送'
                    },
                    {
                        value: 2,
                        label: '消费送'
                    },
                    {
                        value: 3,
                        label: '满减'
                    },
                    {
                        value: 4,
                        label: '折扣'
                    }*/
                ],
                statusList: [
                    {
                        value: 1,
                        label: '使用中'
                    },
                    {
                        value: 0,
                        label: '已结束'
                    }
                ],
                shopList: [],
                tableData: []
            }
        },
        methods: {
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
                this.$axios.post('/mer/activy/listActivy', this.postData).then(res => {
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        this.tableData = res.data.data.data;
                        this.tableData.forEach(ele => {
                            // ele.activy_time = new Date(ele.activy_time).format('yyyy-MM-dd hh:mm:ss');
                            ele.activy_type = mapType[ele.activy_type];
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
            offClick(data) {
                console.log(data);
                this.$confirm('此操作将永久关闭该活动, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('/mer/activy/close', {"activy_id":data.activy_id}).then(res => {
                        console.log(res);
                        if (res.data.code === this.$webConfig.httpSuccessStatus) {
                            this.$message({type: 'success', message: '关闭成功!'});
                            this.getData();
                        } else {
                            this.$message(res.data.message);
                        }
                        this.searchState = false;
                    })
                        .catch(() => {
                            this.searchState = false;
                        });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消关闭'
                    });
                });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            /**
             * 获取门店list
             */
            getShopData(){
                this.$axios.post('/mer/order/choose/store').then(res => {
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        this.shopList = res.data.data;
                    }else {
                        this.$message(res.data.message);
                    }
                })
                    .catch((rej) => {

                    });
            },
            /**
             * 获取活动类型list
             */
            getTypeList(){
                //初始化列表
                this.$axios.get('/agent/sys/lkl/activyType').then(res => {
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        this.typeList = res.data.data;
                    }else {
                        this.$message(res.data.message);
                    }
                })
                    .catch((rej) => {

                    });
            },
        },
        beforeMount() {
            // 获取列表数据
            this.getData();
            //    获取门店list
            this.getShopData();
            //    获取活动类型list
            this.getTypeList();
        },
    }
</script>

<style scoped>
    .el-date-editor--datetimerange {
        width: 240px!important;
        margin-top: 4px;
    }
</style>
