<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <div class="third-nav-t">我的门店</div>
            </div>
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">
                        <!-- 搜索条件 start -->
                        <el-form :inline="true" :model="postData" class="demo-form-inline">
                            <el-form-item label="门店名">
                                <el-input v-model="postData.store_name" placeholder="请输入门店名" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="门店状态">
                                <el-select v-model="postData.store_status" placeholder="门店状态" clearable>
                                    <el-option v-for="item in shopState"
                                               :key="item.value"
                                               :label="item.label"
                                               :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            <!--<el-form-item label="审核状态">
                                <el-select v-model="postData.auditType" placeholder="审核状态">
                                    <el-option v-for="item in auditState"
                                               :key="item.value"
                                               :label="item.label"
                                               :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>-->
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit" size="small" v-loading="searchState">查询
                                </el-button>
                            </el-form-item>
                        </el-form>
                        <!-- 搜索条件 end -->

                        <!-- 表格 start -->
                        <template>
                            <el-table ref="multipleTable" :data="tableData" style="width: 100%;min-width: 780px;"
                                      @selection-change="handleSelectionChange">
                                <!--  <el-table-column type="selection">
                                  </el-table-column>-->
                                <el-table-column label="门店logo">
                                    <template slot-scope="scope">
                                        <img :src="scope.row.store_logo" class="table-img">
                                    </template>
                                </el-table-column>
                                <el-table-column prop="store_name" label="门店名">
                                </el-table-column>
                                <el-table-column prop="sotre_phone" label="电话">
                                </el-table-column>
                                <el-table-column prop="store_address" label="地址">
                                </el-table-column>
                                <el-table-column prop="store_status" label="门店状态">
                                    <template slot-scope="scope">
                                        {{scope.row.store_status==1 ? '营业中' :scope.row.store_status==2 ? '停止营业' : '--'}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="device_no" label="激活码">
                                    <template slot-scope="scope">
                                        {{scope.row.device_no ? scope.row.device_no : '--'}}
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" min-width='115'>
                                    <template slot-scope="scope">
                                        <el-button v-if="scope.row.store_status==1" type="text" style="color:red"
                                                   @click="offClick(scope.row,0)">关闭
                                        </el-button>
                                        <el-button v-if="scope.row.store_status==2" type="text"
                                                   @click="offClick(scope.row,1)">开启
                                        </el-button>
                                        <el-button type="text" @click="updateClick(scope.row)">修改</el-button>
                                        <!--<el-button type="text" v-if="scope.row.device_no" style="color:red" @click="untie(scope.row)">
                                            解绑激活码
                                        </el-button>-->
                                        <!--<el-button type="text" v-else @click="updateClick(scope.row)">配置激活码</el-button>-->
                                        <el-dialog :modal-append-to-body='false' title="解绑验证" :visible.sync="showSend">
                                            <el-form :model="accountInfo">
                                                <el-form-item label="手机号" :label-width="sendWidth">
                                                    <el-input v-model="accountInfo.tel"
                                                              autocomplete="off"></el-input>
                                                </el-form-item>
                                                <el-form-item label="验证码" :label-width="sendWidth">
                                                    <el-input v-model="accountInfo.code"
                                                              autocomplete="off"></el-input>
                                                </el-form-item>
                                                <el-button @click="sendCode" style="margin: 0 120px " size="small"
                                                           type="primary">发送验证码
                                                </el-button>
                                            </el-form>
                                            <div slot="footer" class="dialog-footer">
                                                <el-button @click="showSend = false">取 消</el-button>
                                                <el-button type="primary" @click="untieClick(scope.row)">确 定</el-button>
                                            </div>
                                        </el-dialog>
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
    // import second_nav from '../../components/second-nav.vue'
    import CommonFooter from '../../components/CommonFooter.vue'

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
                    "store_name": '',
                    "store_status": '',//门店状态 1:营业中 2:停止营业
                    // "auditState": '',
                },
                tabIndex: 1,//tab选中值
                tabList: [
                    {
                        value: 1,
                        label: '支付宝'
                    },
                    {
                        value: 2,
                        label: '微信'
                    }
                ],
                shopState: [
                    {
                        value: '1',
                        label: '营业中'
                    },
                    {
                        value: '2',
                        label: '停止营业'
                    }
                ],
                // auditState: [
                //     {
                //         value: '1',
                //         label: '审核中'
                //     },
                //     {
                //         value: '2',
                //         label: '审核通过'
                //     },
                //     {
                //         value: '选项1',
                //         label: '审核失败'
                //     }
                // ],
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
                this.$axios.post('/mer/store/list', this.postData).then(res => {
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        this.tableData = res.data.data.data;
                        this.tableData.forEach(ele => {
                            // ele.store_status = map[ele.store_status];
                        });
                        console.log(this.tableData);
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
             *  解绑
             */
            untie(ele) {

                this.$confirm('解绑后设备将无法使用, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'error'
                }).then(() => {
                    this.$axios.post('/mer/store/update/merDevice', {
                        "code": "123456",
                        "id": ele.id
                    }).then(res => {
                        console.log(res);
                        if (res.data.code === this.$webConfig.httpSuccessStatus) {
                            this.$message({
                                type: 'success',
                                message: '解绑成功!'
                            });
                            this.getData();
                        } else {
                            this.$message(res.data.message);
                        }
                    })
                        .catch(() => {

                        });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消解绑'
                    });
                });
                // this.showSend = true;
                // ele.showSend = true;

            },
            /**
             * 关闭 or 开启
             */
            offClick(val, e) {
                console.log(val, e);

                let text = '', hint = '', status = '';
                if (e) {
                    text = '开启';
                    hint = 'warning';
                    status = 1;
                } else {
                    text = '关闭';
                    hint = 'error';
                    status = 2;
                }
                console.log(text, e);
                this.$confirm(text + '该门店, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: hint
                }).then(() => {
                    this.$axios.post('/mer/store/update/status', {
                        "id": val.id,
                        "store_status": status
                    }).then(res => {
                        console.log(res);
                        if (res.data.code === this.$webConfig.httpSuccessStatus) {
                            this.$message({
                                type: 'success',
                                message: text + '成功!'
                            });
                            this.getData();
                        } else {
                            this.$message(res.data.message);
                        }
                    })
                        .catch(() => {

                        });

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消' + text
                    });
                });
            },
            /**
             * 修改
             */
            updateClick(val) {
                console.log(val);
                this.$router.push({path: '/store/update', query: {shopId: val.id}})
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            /**
             * 发送验证码
             */
            sendCode() {


            },
        },
        beforeMount() {
            // 获取列表数据
            this.getData();
        },
    }
</script>

