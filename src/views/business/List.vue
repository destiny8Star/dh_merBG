<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <!-- tab按钮 start -->
            <div class="third-nav">
                <el-menu :default-active="tabIndex" class="el-menu-demo" mode="horizontal" @select="tabSelect">
                    <el-menu-item v-for="(ele,i) in tabList" :key="i" :index="ele.value">{{ele.label}}</el-menu-item>
                </el-menu>
            </div>
            <!-- tab按钮 end -->
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">
                        <!--行业show start-->
                        <div class="industryBox">
                            <p v-if="industry">所属行业： <span>{{industry}}</span></p>
                            <!-- 搜索条件 start -->
                            <el-form v-else :inline="true" label-position="left" ref="form" :model="form" label-width="60px" :rules="rules">
                                <el-form-item label="行业:" prop="trade" required>
                                    <el-cascader
                                            id="industryCho"
                                            :options="industryList"
                                            @change="handleChange"
                                            @active-item-change="handleItemChange"
                                            :props="{label: 'industry_name',value: 'id',children: 'child'}">
                                    </el-cascader>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitForm('form')" size="small" v-loading="submitState">提交</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                        <!--行业show end-->

                        <!-- 表格 start -->
                        <template>
                            <el-table ref="multipleTable" :data="tableData" style="width: 100%;min-width: 780px;">
                                <el-table-column :key="1" type="index" fixed label="序号" width="50">
                                    <template slot-scope="scope">{{ ((pagination.currentPage -1) *
                                        pagination.pageSize) + (scope.$index + 1) }}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="name" label="商圈名称" :key="2">
                                </el-table-column>
                                <el-table-column prop="card_range" label="卡券展示限制" :key="3">
                                    <template slot-scope="scope">
                                        {{astrictType[scope.row.card_range]}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="industry" label="行业" :key="4">
                                </el-table-column>
                                <el-table-column prop="area_scope" label="地域范围" :key="5">
                                </el-table-column>
                                <el-table-column prop="shop_no" label="商户成员" :key="6">
                                </el-table-column>
                                <el-table-column prop="apply_status" label="状态" :key="7" v-if="tabIndex==1">
                                    <template slot-scope="scope">
                                        {{ mapStatus[scope.row.apply_status] }}
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" min-width='115' :key="8">
                                    <template slot-scope="scope">
                                        <el-button type="text" @click="clickClick(scope.row)">详情</el-button>
                                        <el-button type="text" @click="outClick(scope.row,1)" v-if="scope.row.apply_status==0&&tabIndex==1">取消加入</el-button>
                                        <!--<el-button type="text" @click="applyClick(scope.row)" v-if="tabIndex==2||scope.row.apply_status==2">{{scope.row.apply_status==2&&tabIndex==1?'再次申请':'申请加入'}}</el-button>-->
                                        <el-button type="text" @click="applyClick(scope.row)" v-if="tabIndex==2||scope.row.apply_status==2">申请加入</el-button>
                                        <el-button type="text" @click="outClick(scope.row,2)" style="color:red" v-if="scope.row.apply_status==1&&tabIndex==1">退出</el-button>
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
                submitState: false,
                merAuth: '',//获取行业
                industry: '',//行业
                industryList: [],//行业
                form: {
                    trade: '',//行业选择
                },
                rules: {
                    trade: [
                        {
                            required: true,
                            message: "请选择所属行业",
                            trigger: "blur"
                        }
                    ],
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
                    "cursor": 1,//当前第几页-游标
                    "size": 10,//每页条数
                    "type": 1,//商圈类型:1：我加入的圈子2：可加入的圈子
                },
                tabIndex: '1',//tab选中值
                tabList: [
                    {
                        value: '1',
                        label: '我加入的商圈'
                    },
                    {
                        value: '2',
                        label: '可加入的商圈'
                    }
                ],
                tableData: [
                    {}
                ],

                astrictType: {1:'不限类目',2:'同类目互斥'},//卡券展示范围
                mapStatus: { 0:'申请中',1:'已加入',2:'被拒绝' } //0申请待审核，1审核通过，2审核拒绝
            }
        },
        methods: {
            /**
             * tab选择
             * @param key
             * @param keyPath
             */
            tabSelect(key, keyPath) {
                this.tabIndex = this.postData.type = key;
                console.log(key, keyPath,this.tabIndex);
                this.pagination.currentPage = this.postData.cursor = 1;
                this.postData.size = 10;
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
                this.$axios.post('/mer/business/circle/list', this.postData).then(res => {
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
             * 申请加入 - 按钮
             */
            applyClick(val) {
                console.log(val);
                if(this.$refs['form']){
                    this.$refs['form'].validate((valid) => {
                        if (valid) {
                            this.applyC(val);
                        } else {
                            this.$message.warning('请在当前页面左上角选择所属行业');
                            return false;
                        }
                    })
                }else {
                    this.applyC(val);
                }

            },
            /**
             * 申请加入 - 数据联调
             */
            applyC(val){
                this.$confirm('此操作将申请加入该商圈, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('/mer/business/circle/join', {"business_circle_id":val.business_circle_id}).then(res => {
                        if (res.data.code === this.$webConfig.httpSuccessStatus) {
                            this.$message({type: 'success', message: '申请成功!'});
                            this.getData();
                        } else {
                            this.$message(res.data.message);
                        }
                    }).catch(() => {

                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消申请'
                    });
                });
            },
            /**
             * 退出 + 取消
             */
            outClick(val,e) {
                console.log(val,e);
                let text = '';
                if(e==1){
                    text = '取消'
                }else if(e==2){
                    text = '退出'
                }
                this.$confirm('此操作将'+text+'该商圈, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.get('/mer/business/circle/quit?businessCircleId=' + val.business_circle_id).then(res => {
                        if (res.data.code === this.$webConfig.httpSuccessStatus) {
                            this.$message({type: 'success', message: text + '成功!'});
                            this.getData();
                        } else {
                            this.$message(res.data.message);
                        }
                    }).catch(() => {

                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消' + text
                    });
                });
            },

            /**
             * 查看详情
             */
            clickClick(val) {
                console.log(val);
                this.$router.push({path: '/business/detail', query: {businessId: val.business_circle_id}})
            },

            /**
             * 获取行业信息
             */
            getIndustryInfo(){
                this.$axios.get('/mer/business/circle/industry?mer-auth=' + this.merAuth)
                    .then(res => {
                        console.log("获取行业信息", res);
                        let info = res.data.data;
                        if(info.str_industry1 && info.str_industry2 && info.str_industry3){
                            this.industry = info.str_industry1 + ' - ' + info.str_industry2 + ' - ' +info.str_industry3
                        }else if(info.str_industry1 && info.str_industry2) {
                            this.industry = info.str_industry1 + ' - ' + info.str_industry2
                        }
                    })
                    .catch(rej => {
                        this.$message.error('网络异常!');
                        console.log('获取行业信息失败', rej)
                    })
            },
            /**
             * 获取行业 【 一级 】
             */
            getIndustry(){
                this.$axios.get('/mer/industry/getNext?industryPrentId=0&&channel_type=1')
                    .then(res => {
                        this.loading = false
                        this.industryList = res.data.data
                        for (let i = 0; i < this.industryList.length; i++) {
                            this.$set(this.industryList[i], 'child', []);
                        }
                        console.log("获取行业", res)
                    })
                    .catch(rej => {
                        this.loading = false
                        this.$message.error('网络异常!');
                        console.log('获取行业失败', rej)
                    })
            },
            //获取行业 【 二三级 】
            getTrade(id) {
                return this.$axios.get('/mer/industry/getNext?industryPrentId=' + id+'&&channel_type=1')
                    .then(res => {
                        return res.data
                        console.log("获取行业函数", res)
                    })
                    .catch(rej => {
                        console.log('获取行业失败', rej)
                    })
            },
            //选择行业 - change
            handleChange(value) {
                this.form.trade = value.slice(-1)[0];
                console.log('选择', value, this.licence);
            },
            // 动态获取下一级 行业
            handleItemChange(val) {
                console.log("选中", val)
                if (val.length == 1) {
                    // 如果点击的是一级分类
                    let parentId = val[0]
                    this.industryList.map((item, index) => {
                        if (item.id === parentId && item.child.length === 0) {
                            // 当顶级分类的的child为空时才请求数据
                            this.getTrade(parentId).then(res => {
                                console.log("对奥用", res)
                                this.$set(this.industryList[index], 'child', res.data)
                                item.child.map((innerItem, innerIndex) => {
                                    // 二级分类下要设置一个空的child数组，不然点击@active-item-change没反应
                                    if (innerItem.next_no != 0) {
                                        this.$set(item.child[innerIndex], 'child', [])
                                    }
                                })
                            })
                        }
                    })
                } else if (val.length == 2) {
                    let parentId = val[1]
                    this.industryList.map((item, index) => {
                        item.child.map((innerItem, innerIndex) => {
                            if (innerItem.id === parentId && innerItem.child.length === 0) {
                                // 当二级分类的的child为空时才请求一次数据
                                this.getTrade(parentId).then(res => {
                                    this.$set(item.child[innerIndex], 'child', res.data)
                                })
                                console.log('innner', innerItem)
                            }
                        })
                    })
                }
            },
            /**
             * 提交 行业
             */
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log('提交',this.form);
                        this.$confirm('此操作将提交行业选择, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.submitState = false;
                            this.$axios.post('/mer/business/circle/submit/industry',{"industry":this.form.trade} ).then(res => {
                                if (res.data.code === this.$webConfig.httpSuccessStatus) {
                                    this.$message({type: 'success', message: '提交成功!'});
                                    this.getIndustryInfo();
                                } else {
                                    this.$message(res.data.message);
                                }
                                this.submitState = false;
                            }).catch(() => {
                                this.submitState = false;
                            });
                        }).catch(() => {
                            this.submitState = false;
                            this.$message({
                                type: 'info',
                                message: '已取消提交'
                            });
                        });
                    } else {
                        return false;
                    }
                });
            },
        },
        created() {
            // this.getCouponStatus();
            this.merAuth = this.$ls.get(this.$webConfig.authTokenName);
        },
        mounted(){
            // 获取列表数据
            this.getData();
            // 获取行业list
            this.getIndustry();
            // 获取行业信息
            this.getIndustryInfo();
        }
    }
</script>

<style scoped>
    .el-date-editor--datetimerange {
        width: 240px!important;
        margin-top: 4px;
    }
    .industryBox p{
        margin-left: 10px;
        color:#606266;
        font-weight: bold
    }
    .industryBox p span{
        margin-left: 10px;
    }
</style>
