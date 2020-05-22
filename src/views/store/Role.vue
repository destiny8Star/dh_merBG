<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <div class="third-nav-t">角色列表</div>
            </div>
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">
                        <el-button @click="$router.push('/store/addRole')" type='primary'>添加角色</el-button>
                        <!-- 表格 start -->
                        <template>
                            <el-table ref="multipleTable" :data="tableData" style="width: 100%;min-width: 780px;margin-top: 20px"
                                      @selection-change="handleSelectionChange">
                                <!--  <el-table-column type="selection">
                                  </el-table-column>-->
                                <el-table-column prop="name" label="角色名">
                                </el-table-column>
                                <el-table-column prop="root_menu_names" label="权限">
                                    <template slot-scope="scope">
                                        <p style="margin: 4px 0" v-for="(ele,i) in scope.row.root_menu_names" :key="i">{{ele}}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" min-width='115'>
                                    <template slot-scope="scope">
                                        <el-button type="text"
                                                   @click="addClick(scope.row)">添加下级角色
                                        </el-button>
                                        <el-button type="text"
                                                   @click="updateClick(scope.row)">修改
                                        </el-button>
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

    export default {
        name: "role",
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
                    "pageCount": [10, 20, 50, 100],
                    "currentPage": 1,
                    "pageSize": 10,
                    "show": '1-5'
                },
                //接口参数
                "postData": {
                    "cursor": 1,//当前第几页-游标
                    "size": 10,//每页条数
                },
                tableData: [],

                sendWidth: '120px',
                showSend: false,
                accountInfo: {
                    tel: '',
                    code: ''
                },
            }
        },
        methods: {
            /**
             * tab选择
             * @param key
             * @param keyPath
             */
            tabSelect(key, keyPath) {
                console.log(key, keyPath);
                this.pagination.currentPage = 1;
                this.postData.cursor = 1;
                this.getData();
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
                this.$axios.post('/mer/role/listRole', this.postData).then(res => {
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        this.tableData = res.data.data.data;
                        this.tableData.forEach(ele=>{
                            if(ele.root_menu_names.length==0){
                                ele.root_menu_names.push('--')
                            }
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
             * 添加下级角色
             */
            addClick(val) {
                console.log(val);
                this.$router.push({path: '/store/addRole', query: {parentId: val.id}})
            },
            /**
             * 修改
             */
            updateClick(val) {
                console.log(val);
                this.$router.push({path: '/store/updateRole', query: {roleId: val.id}})
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
        },
        beforeMount() {
            // 获取列表数据
            this.getData();
        },
    }
</script>

