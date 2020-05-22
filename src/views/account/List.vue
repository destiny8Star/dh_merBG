<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <div class="third-nav-t">设备管理</div>
            </div>
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">

                        <!-- 表格 start -->
                        <template>
                            <el-table ref="multipleTable" :data="tableData" style="width: 100%;min-width: 780px;"
                                      @selection-change="handleSelectionChange">
                                <el-table-column label="图片">
                                    <template slot-scope="scope">
                                        <img :src="scope.row.device_pic" class="table-img">
                                    </template>
                                </el-table-column>
                                <el-table-column prop="device_no" label="设备SN">
                                </el-table-column>
                                <el-table-column prop="device_name" label="名称">
                                </el-table-column>
                                <el-table-column prop="create_time" label="激活时间">
                                </el-table-column>
                                 <el-table-column label="操作" min-width='115'>
                                     <template slot-scope="scope">
                                         <el-button type="text" style="color:#96999f" @click="handleClick(scope.row,0)">退回</el-button>
                                         <el-button type="text" style="color:red" v-if="scope.row.mer_stroe_id" @click="handleClick(scope.row,1)">解绑</el-button>
                                         <el-button type="text" v-else @click="sendClick(scope.row)">分发</el-button>
                                         <el-dialog :modal-append-to-body='false' title="分发" :visible.sync="showSend" width="500px">
                                             <el-form label-position="center" ref="form" :model="form" label-width="130px" :rules="rules">
                                                 <el-form-item label="关联门店" prop="shopId">
                                                     <el-select v-model="form.shopId" placeholder="请选择门店" clearable>
                                                         <el-option v-for="item in shopList"
                                                                    :key="item.id"
                                                                    :label="item.value"
                                                                    :value="item.id"></el-option>
                                                     </el-select>
                                                 </el-form-item>
                                             </el-form>
                                             <div slot="footer" class="dialog-footer">
                                                 <el-button @click="showSend = false">取 消</el-button>
                                                 <el-button type="primary" @click="distributeClick()">确 定</el-button>
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
        data() {
            var checkIdNull = (rule, value, callback) => {
                // console.log(rule,'==',value,'==',callback)
                if (value === '') {
                    callback(new Error(rule.message));
                }  else {
                    callback();
                }
            };
            return {
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
                shopList: [],
                tableData: [],
                "showSend": false,//是否展示分发
                "form": {
                    "shopId": '',
                },
                rules: {
                    shopId: [
                        {
                            validator: checkIdNull,
                            required: true,
                            message: '请选择关联门店',
                            trigger: 'change'
                        }
                    ]
                },
                sendObj: {},//暂存的分发对象
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
                this.$axios.post('/mer/device/deviceList', this.postData).then(res => {
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        this.tableData = res.data.data.data;
                        this.tableData.forEach(ele => {
                            ele.create_time = new Date(ele.create_time).format('yyyy-MM-dd hh:mm:ss');
                        });
                        console.log(this.tableData);
                        this.pagination.total = res.data.data.count;
                        this.pagination.currentPage = res.data.data.cursor;
                    } else {
                        this.$message(res.data.message);
                    }
                })
                    .catch(() => {

                    });
            },
            /**
             * 分发
             */
            sendClick(value){
                console.log(value,"打开弹窗");
                this.showSend = true;
                this.sendObj = value;
            },
            /**
             * 分发确定
             */
            distributeClick(data) {
                console.log(data,"弹窗确认");
                if(!data){
                    data = this.sendObj;
                }
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        console.log('submit!!');
                        this.$axios.post('/mer/device/binding',{"id":data.id,"mer_store_id":this.form.shopId}).then(res => {
                            console.log(res);
                            if (res.data.code === this.$webConfig.httpSuccessStatus) {
                                this.showSend = false;
                                this.sendObj = {};
                                this.getData();
                                this.$message({type: 'success', message: '分发成功!'});
                            }else {
                                this.sendObj = {};
                                this.$message(res.data.message);
                            }
                        })
                            .catch(() => {
                                this.sendObj = {};
                            });
                    }else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            /**
             * 操作 【退回 or 解绑】
             */
            handleClick(data,num) {
                console.log(data,num);
                let text = '',text1 = '',api = '';
                if(num){
                    text = '设备解绑后，该门店无法继续使用，确认解绑？';
                    text1 = '解绑';
                    api = '/mer/device/unbind'
                }else {
                    if(data.mer_stroe_id){
                        this.$message({type: 'info', message: '需先行解绑关联门店，再退回!'});
                        return false;
                    }
                    text = '设备退回后，您将无法使用，确认退回？';
                    text1 = '退回';
                    api = '/mer/device/send/back'
                }
                this.$confirm(text, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post(api,{"id":data.id}).then(res => {
                        console.log(res);
                        if (res.data.code === this.$webConfig.httpSuccessStatus) {
                            this.getData();
                            this.$message({type: 'success', message: text1 + '成功!'});
                        }else {
                            this.$message(res.data.message);
                        }
                    })
                        .catch(() => {

                        });
                }).catch(() => {
                    this.$message({type: 'info', message: '已取消' + text1});
                });
            },
            /**
             * 获取门店list
             */
            getShopList() {
                this.$axios.post('/mer/store/all/list').then(res => {
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        this.shopList = res.data.data;
                    }else {
                        this.$message(res.data.message);
                    }
                })
                    .catch(() => {

                    });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        },
        beforeMount() {
            // 获取列表数据
            this.getData();
            // 获取门店list
            this.getShopList();
        },
    }
</script>

