<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
           <!-- <div class="third-nav" v-if="pay_channel_type==2">
                <div class="third-nav-t">账单列表</div>
            </div>-->
            <!-- tab按钮 start -->
            <!--<div class="third-nav" v-else-if="pay_channel_type==1">-->
            <div class="third-nav">
                <el-menu :default-active="tabIndex" class="el-menu-demo" mode="horizontal" @select="tabSelect">
                    <el-menu-item v-for="(ele,i) in tabList" :key="i" :index="ele.value">{{ele.label}}</el-menu-item>
                </el-menu>
            </div>
            <!-- tab按钮 end -->
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">
                        <!-- 搜索条件 start -->
                        <el-form :inline="true" ref="postData" :model="postData" class="demo-form-inline">
                            <el-form-item label="日期">
                                <!--:default-time="['12:00:00']"-->
                                <el-date-picker @change="changeDate" v-model="postData.date" type="datetimerange"
                                                start-placeholder="开始日期"
                                                end-placeholder="结束日期" format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                            <!--<el-form-item label="门店名">
                                <el-select v-model="postData.store_name" placeholder="门店名">
                                    <el-option v-for="item in shopList"
                                               :key="item.id"
                                               :label="item.value"
                                               :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>-->
                            <el-form-item label="门店名 / 收银员">
                                <el-cascader
                                        @change="choShop"
                                        separator=" "
                                        :options="shopList"
                                        :props="{ checkStrictly: true ,value: 'id',label:'value'}"
                                        clearable></el-cascader>
                            </el-form-item>
                            <el-form-item label="订单号">
                                <el-input v-model="postData.order_no" placeholder="请输入订单号" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="订单状态">
                                <el-select v-model="postData.status" placeholder="订单状态" clearable>
                                    <el-option v-for="item in orderState"
                                               :key="item.value"
                                               :label="item.label"
                                               :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                           <!-- <el-form-item label="收银员">
                                <el-select v-model="postData.username" placeholder="收银员">
                                    <el-option v-for="item in cashierList"
                                               :key="item.id"
                                               :label="item.value"
                                               :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>-->
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit" size="small" v-loading="searchState">查询</el-button>
                            </el-form-item>
                        </el-form>
                        <!-- 搜索条件 end -->

                        <!-- 表格 start -->
                        <template>
                            <el-table ref="multipleTable" :data="tableData" style="width: 100%;min-width: 780px;"
                                      @selection-change="handleSelectionChange">
                                <el-table-column prop="create_time" label="交易时间">
                                </el-table-column>
                                <el-table-column prop="order_no" label="订单号">
                                </el-table-column>
                                <el-table-column prop="received_price" label="实收金额(元)">
                                </el-table-column>
                                <el-table-column prop="store_name" label="门店名">
                                </el-table-column>
                                <el-table-column prop="user_name" label="收银员">
                                </el-table-column>
                                <el-table-column prop="status" label="订单状态">
                                </el-table-column>
                                <el-table-column label="操作" min-width='50'>
                                    <template slot-scope="scope">
                                        <a class="table-func" @click="refund()">
                                            退款
                                        </a>
                                        <el-button type="text" @click="refresh(scope.row)">刷新</el-button>
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
    const map = {1:'已支付',2:'未支付', 3:'已退款', 4:'订单关闭'};//订单状态
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
                pay_channel_type: '',//通道【1：直连；2：间连】
                unlink: true,
                searchState: false,
                date: new Date(),
                //页面所需
                "pagination": {
                    "total": 0,
                    "pageCount": [10,20,50,100],
                    "currentPage": 1,
                    "pageSize": 10,
                    "show": '1-5'
                },
                //接口参数
                "postData": {
                    "cursor": 1,//当前第几页-游标
                    "size": 10,//每页条数
                    "begin_time": '',
                    "end_time": '',
                    "store_name": '',
                    "order_no": '',
                    "username": '',
                    "status": '',
                    "date": '',
                    "pay_method": '1',//【1-支付宝，2-微信】
                },
                choShops: {},//选择的店铺
                choCashier: {},//选择的收银员
                tabIndex: '1',//tab选中值
                tabList: [
                    {
                        value: '1',
                        label: '支付宝'
                    },
                    {
                        value: '2',
                        label: '微信'
                    }
                ],
                shopList: [],
                orderState: [
                    {
                        value: '1',
                        label: '已支付'
                    },
                    {
                        value: '2',
                        label: '未支付'
                    },
                    // {
                    //     value: '3',
                    //     label: '已退款'
                    // }，
                    // {
                    //     value: '4',
                    //     label: '订单关闭'
                    // }
                ],
                cashierList: [
                    {
                        value: '1',
                        label: '小二'
                    }
                ],
                tableData: [],
            }
        },
        methods: {
            /**
             *  选择时间
             */
            changeDate(val) {
                console.log(val, this.postData.date);
                if(val){
                    let start = new Date(val[0]),end = new Date(val[1]);
                    console.log(start,end);
                    this.postData.begin_time = start.valueOf();
                    this.postData.end_time = end.valueOf();
                    console.log()
                }else {
                    this.postData.begin_time = this.postData.end_time = '';
                }
                console.log(this.postData)
            },
            /**
             * tab选择
             * @param key
             * @param keyPath
             */
            tabSelect(key, keyPath) {
                this.tabIndex = key;
                this.postData.pay_method = key;
                console.log(key, keyPath,this.tabIndex);
                this.pagination.currentPage = this.postData.cursor = 1;
                this.postData.size = 10;
                this.postData.begin_time = this.postData.end_time = this.postData.store_name = this.postData.order_no = this.postData.username = this.postData.status = this.postData.date = '';
                this.getData();
            },
            /**
             * 分页跳转【当前页】
             */
            jumpPagination(val) {
                console.log(val);
                this.pagination.currentPage = this.postData.cursor = val;
                // this.postData.cursor = val;
                this.getData();
            },
            /**
             * 上一页
             */
            prevClick() {
                this.pagination.currentPage --;
                this.postData.cursor --;
                this.getData();
            },
            /**
             * 下一页
             */
            nextClick() {
                this.pagination.currentPage ++;
                this.postData.cursor ++;
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
             * 获取门店list
             */
            getShopData() {
                //初始化列表
                this.$axios.post('/mer/order/choose/store').then(res => {
                        console.log(res);
                        if (res.data.code === this.$webConfig.httpSuccessStatus) {
                            this.shopList = res.data.data;
                            this.shopList.forEach((item,index)=>{
                                // this.shopList[index].cities = [] // 视图未更新
                                this.$set(this.shopList[index], 'children', []) // right
                            })
                        }else {
                            this.$message(res.data.message);
                        }
                    })
                    .catch(() => {

                    });
            },
            /**
             *  选择门店
             */
            choShop(val){
                console.log(val);
                if(val.length==0){
                    this.postData.store_name = '';
                    this.postData.username = '';
                    console.log(this.postData);
                }else if(val.length==1){
                    this.postData.store_name = val[0];
                    console.log(this.postData);
                }else  if(val.length==2){
                    this.postData.username = val[1];
                    console.log(this.postData);
                }
                if(val!=[]){
                    let value = val[0];
                    this.$axios.post('/mer/order/choose/cashier', {
                        'store_id': value
                    }).then((res) => {
                        let children = res && res.data && res.data.data || [];
                        for(let i = 0; i < this.shopList.length; i++) {
                            if(this.shopList[i].id === value) {
                                this.$set(this.shopList[i], 'children', children);
                                break;
                            }
                        }
                    })
                }
                console.log(this.postData);
            },
            /**
             * 获取列表数据
             */
            getData() {
                console.log(this.postData);
                let api = '';
                if(this.pay_channel_type == 1){
                    if(this.tabIndex == 1){
                        api = '/mer/order/ali/face/pay/list'
                    }else {
                        api = '/mer/order/wx/face/pay/list'
                    }
                }else if(this.pay_channel_type == 2) {
                    api = '/mer/order/lkl/face/pay/list'
                }
                console.log(this.postData,api);
                //初始化列表
                this.$axios.post(api, this.postData).then(res => {
                        console.log(res);
                        if (res.data.code === this.$webConfig.httpSuccessStatus) {
                            this.tableData = res.data.data.data;
                            this.tableData.forEach(ele=>{
                                ele.status = map[ele.status];
                                ele.create_time = new Date(ele.create_time).format('yyyy-MM-dd hh:mm:ss');
                            });
                            console.log(this.tableData);
                            this.pagination.total = res.data.data.count;
                            this.pagination.currentPage = res.data.data.cursor;
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
            open() {
                this.$confirm('确定删除此商品吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            refund(){
                this.$message({
                    type: 'info',
                    message: '暂未开通，请联系客服开通退款功能'
                });
            },
            /**
             * 刷新某账单
             */
            refresh(data){
                console.log(data);
                //刷新某订单
                this.$axios.post('/mer/order/checkOrder',{"order_no": data.order_no}).then(res => {
                    console.log('刷新列表',res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        this.$message({type: 'info', message: '刷新成功'});
                        this.getData();
                    } else {
                        this.$message(res.data.message);
                    }
                })
                    .catch((rej) => {
                        console.log('错误',rej);
                        this.$message('网络异常!');
                    });
            }
        },
        created(){
            this.pay_channel_type = this.$ls.get(this.$webConfig.pay_channel_type)
        },
        beforeMount() {
            // 获取列表数据
            this.getData();
        //    获取门店list
            this.getShopData();
        },
    }
</script>


<style scoped>
    .el-date-editor--datetimerange {
        width: 230px !important;
        margin-top: 4px;
    }
</style>
