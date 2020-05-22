<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <div class="third-nav-t">员工管理</div>
            </div>
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">
                        <el-button>添加员工</el-button>
<!--                        <el-form-->
<!--                                :inline="true"-->
<!--                                :model="searchForm"-->
<!--                                class="demo-form-inline"-->
<!--                                @submit.native.prevent-->
<!--                        >-->
<!--                            <el-form-item label="手机号">-->
<!--                                <el-input-->
<!--                                        v-model="searchForm.phone"-->
<!--                                        placeholder="请输入手机号"-->
<!--                                        @blur="setNull(searchForm,'phone')"-->
<!--                                        style="width: 150px;"-->
<!--                                ></el-input>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="注册时间">-->
<!--                                <el-date-picker-->
<!--                                        style="width:360px;"-->
<!--                                        v-model="timeRange"-->
<!--                                        type="datetimerange"-->
<!--                                        :picker-options="pickerOptions"-->
<!--                                        range-separator="至"-->
<!--                                        start-placeholder="开始日期"-->
<!--                                        end-placeholder="结束日期"-->
<!--                                        align="center"-->
<!--                                        value-format="timestamp"-->
<!--                                ></el-date-picker>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item>-->
<!--                                <el-button-->
<!--                                        type="primary"-->
<!--                                        @click="submitSearch('searchForm')"-->
<!--                                        size="medium"-->
<!--                                        :loading="searchState"-->
<!--                                >查询-->
<!--                                </el-button>-->
<!--                            </el-form-item>-->
<!--                        </el-form>-->
                        <template>
                            <el-table ref="multipleTable" :data="tableData" style="width: 100%;min-width: 780px;">
                                <el-table-column prop="user_name" label="账号"></el-table-column>
                                <el-table-column prop="name" label="姓名"></el-table-column>
                                <el-table-column prop="role_name" label="角色"></el-table-column>
                                <el-table-column prop="store_name" label="门店"></el-table-column>
                                <el-table-column label="状态" width="80">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.status==1" style="color:limegreen;">正常</span>
                                        <span v-else>锁定</span>
                                    </template>
                                </el-table-column>
<!--                                <el-table-column label="注册时间" width="160px">-->
<!--                                    <template-->
<!--                                            slot-scope="scope"-->
<!--                                    >{{new Date(scope.row.create_time * 1000).format("yyyy-MM-dd hh:mm:ss")}}-->
<!--                                    </template>-->
<!--                                </el-table-column>-->
                                <el-table-column label="操作" width="115">
                                    <template slot-scope="scope" width="70px">
                                        <a class="table-func" >删除</a>
                                        <a class="table-func" >修改</a>
                                        <!--<a class="table-func">-->
                                        <!--<el-dropdown>-->
                                        <!--<span class="el-dropdown-link">更多</span>-->
                                        <!--<el-dropdown-menu slot="dropdown">-->
                                        <!--<el-dropdown-item><a @click="open">删除</a></el-dropdown-item>-->
                                        <!--<el-dropdown-item><a>复制</a></el-dropdown-item>-->
                                        <!--</el-dropdown-menu>-->
                                        <!--</el-dropdown>-->
                                        <!--</a>-->
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                        <template>
                            <div class="block" style="text-align: center;margin-top: 30px;">
                                <el-pagination
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page="currentPage"
                                        :page-sizes="[20, 50, 100]"
                                        :page-size="pageSize"
                                        layout="total, sizes, prev, pager, next, jumper"
                                        :total="pageTotal"
                                ></el-pagination>
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
    import CommonFooter from "../../components/CommonFooter";

    export default {
        name: "List",
        components: {
            CommonFooter,
        },
        computed: {
            getWinHeight: function () {
                return this.$winHeight;
            }
        },
        data: function () {
            return {
                searchForm: {
                    phone: null,
                    student_id: null
                },
                pickerOptions: {
                    shortcuts: [
                        {
                            text: "最近一周",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                picker.$emit("pick", [start, end]);
                            }
                        },
                        {
                            text: "最近一个月",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                picker.$emit("pick", [start, end]);
                            }
                        },
                        {
                            text: "最近三个月",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                picker.$emit("pick", [start, end]);
                            }
                        }
                    ]
                },
                searchState: false,
                timeRange: [],
                tableData: [],
                currentPage: 1,
                pageSize: 20,
                pageTotal: 0,
                alleyWays: [],
                successData: {},
                showOrdercount: true
            };
        },
        mounted: function () {
            // let de = new Date();
            // let today = de.getFullYear() + "/" + (de.getMonth() + 1) + "/" + de.getDate();
            // de.setDate(de.getDate() + 1);
            // let tomorrow = de.getFullYear() + "/" + (de.getMonth() + 1) + "/" + de.getDate();
            // this.timeRange.push(new Date(today).getTime());
            // this.timeRange.push(new Date(tomorrow).getTime());
            this.tableData=[{"user_name":"administrator","name":"张店长","role_name":"店长","store_name":"杭州店","status":"1"}];
            this.loadUserList(this.getSearchParms());
        },
        methods: {
            loadUserList(parms) {
                //初始化列表
                this.$axios
                    .post(
                        "/mer/user/user_page",
                        Object.assign(
                            {
                                page_index: this.currentPage,
                                page_size: this.pageSize
                            },
                            parms
                        )
                    )
                    .then(response => {
                        if (response.data.code === this.$webConfig.httpSuccessStatus) {
                            this.tableData = response.data.data.list;
                            this.pageTotal = response.data.data.total;
                        }
                        this.searchState = false;
                    })
                    .catch(() => {
                        this.searchState = false;
                    });
            },

            handleSizeChange(psize) {
                this.pageSize = psize;
                this.loadOrderList(this.getSearchParms());
            },
            handleCurrentChange(currp) {
                this.currentPage = currp;
                this.loadOrderList(this.getSearchParms());
            },
            submitSearch() {
                this.searchState = true;
                this.currentPage = 1;
                this.loadOrderList(this.getSearchParms());
            },
            getSearchParms() {
                let parms = this.searchForm;
                if (this.timeRange !== null && this.timeRange.length === 2) {
                    let startTime = this.timeRange[0] / 1000;
                    let endTime = this.timeRange[1] / 1000;
                    Object.assign(parms, {start_time: startTime, end_time: endTime});
                } else {
                    Object.assign(parms, {start_time: null, end_time: null});
                }
                return parms;
            },
            setNull(item, key) {
                if (item[key] == "") {
                    item[key] = null;
                }
            },
            open() {
                this.$confirm("确定删除此厂商吗?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        this.$message({
                            type: "success",
                            message: "删除成功!"
                        });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消删除"
                        });
                    });
            }
        }
    };
</script>

<style scoped>

</style>