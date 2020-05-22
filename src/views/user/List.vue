<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <div class="third-nav-t">员工管理</div>
            </div>
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner" v-loading='loading'>
                        <el-button @click="$router.push({name:'userAdd'})" type='primary'>添加员工</el-button>
                        <template>
                            <el-table ref="multipleTable" :data="tableData" style="width: 100%;min-width: 780px;">
                                <el-table-column prop="user_name" label="账号"></el-table-column>
                                <el-table-column prop="real_name" label="姓名"></el-table-column>
                                <!-- <el-table-column prop="role_name" label="角色"></el-table-column> -->
                                <el-table-column prop="store_name" label="门店"></el-table-column>
                                <el-table-column prop="role_name" label="角色"></el-table-column>
                                <!-- <el-table-column label="状态" width="80">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.status==1" style="color:limegreen;">正常</span>
                                        <span v-else>锁定</span>
                                    </template>
                                </el-table-column> -->

                                <el-table-column label="操作" width="265">
                                    <template slot-scope="scope" width="70px">
                                        <el-button @click="lookClick(scope.row)" type="text">收款二维码</el-button>
                                        <el-button @click="handleClick(scope.row)" type="text" style="color:#F56C6C">
                                            删除
                                        </el-button>
                                        <el-button type="text"
                                                   @click="$router.push({name:'userAdd',query: { id: scope.row.id }})">
                                            修改
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-dialog :title="peopleName" :visible.sync="lookQRCode" width="500px" id="codeBox" destroy-on-close>
                                <div id="qrCode" ref="qrCodeDiv" class="download"></div>
                            </el-dialog>
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
    import QRCode from 'qrcodejs2';

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
                loading: false,
                timeRange: [],
                tableData: [],
                currentPage: 1,
                pageSize: 20,
                pageTotal: 0,
                alleyWays: [],
                successData: {},
                showOrdercount: true,
                lookQRCode: false,//打开收款二维码的弹框
                peopleName: '',
            };
        },
        mounted: function () {
            this.loadUserList();
        },
        methods: {
            loadUserList(parms) {
                //初始化列表
                this.loading = true
                this.$axios.post("/mer/user/merUser/list", Object.assign(
                    {
                        cursor: this.currentPage,
                        size: this.pageSize
                    },
                    )
                )
                    .then(response => {
                        this.loading = false
                        console.log("获取数据", response)
                        if (response.data.code === this.$webConfig.httpSuccessStatus) {
                            this.tableData = response.data.data.data;
                            this.pageTotal = response.data.data.count;
                        } else {
                            this.$message.error(response.data.message)
                        }
                    })
                    .catch(() => {
                        this.loading = false
                        this.$message.error('网络异常')
                    });
            },

            handleSizeChange(psize) {
                this.pageSize = psize;
                this.loadUserList();
            },
            handleCurrentChange(currp) {
                this.currentPage = currp;
                this.loadUserList();
            },
            // getSearchParms() {
            //     let parms = this.searchForm;
            //     if (this.timeRange !== null && this.timeRange.length === 2) {
            //         let startTime = this.timeRange[0] / 1000;
            //         let endTime = this.timeRange[1] / 1000;
            //         Object.assign(parms, {start_time: startTime, end_time: endTime});
            //     } else {
            //         Object.assign(parms, {start_time: null, end_time: null});
            //     }
            //     return parms;
            // },
            /**
             * 删除
             * @param row
             */
            handleClick(row) {
                console.log('rowww', row)
                this.$confirm('确定删除该员工吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.loading = true
                    this.$axios.get('/mer/user/delete/merUser?id=' + row.id)
                        .then(res => {
                            this.loading = false
                            console.log('闪烁出', res)

                            if (res.data.code == 200) {
                                this.loadUserList()
                                this.$message.success("删除成功")
                            } else {
                                this.$message.error('删除失败')
                            }
                        })
                        .catch(rej => {
                                console.log('失败', rej)
                                this.loading = false;
                                this.$message.error("网络异常")
                            }
                        )
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            /**
             * 查看 收款二维码
             * @param row
             */
            lookClick(row) {
                console.log(row);
                this.peopleName = '收款二维码（' + row.user_name + '）';
                console.log(this.peopleName);
                let parent = document.getElementById("codeBox");
                let newNode = document.createElement("div");
                newNode.setAttribute('ref', 'qrCodeDiv');//为新节点设置属性
                newNode.setAttribute('id', 'qrCode');//为新节点设置属性
                parent.appendChild(newNode);
                console.log('far',parent);
                this.lookQRCode = true;
                let that = this;
                setTimeout(function () {
                    // 生成二维码
                    new QRCode(that.$refs.qrCodeDiv, {
                        text: row.qr_code_url,
                        width: 240,
                        height: 240,
                        colorDark: "#333333", //二维码颜色
                        colorLight: "#ffffff", //二维码背景色
                        correctLevel: QRCode.CorrectLevel.L//容错率，L/M/H
                    })
                }, 100)

            },
        }
    };
</script>

<style scoped>
    .download {
        width: 240px;
        height: 240px;
        margin: 10px auto 40px;
        box-shadow: 0 0 12px 19px rgba(51, 51, 51, 0.08);
    }
</style>