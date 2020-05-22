<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <!--            <third_nav></third_nav>-->
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">
                        <el-form :inline="true" :model="formInline" class="demo-form-inline">
                            <el-form-item label="按门店">
                                <el-input v-model="formInline.name1" placeholder="请输入门店名称"></el-input>
                            </el-form-item>
                            <el-form-item label="商品查询">
                                <el-select v-model="formInline.type1" placeholder="商品查询">
                                    <el-option label="名称" value="nc"></el-option>
                                    <el-option label="货号" value="hh"></el-option>
                                    <el-option label="商品价" value="spj"></el-option>
                                </el-select>
                                <el-form-item label="">
                                    <el-input v-model="formInline.name2" placeholder="请输入名称搜索"></el-input>
                                </el-form-item>
                            </el-form-item>
                            <el-form-item label="商品类目">
                                <el-select v-model="formInline.type2" placeholder="商品类目">
                                    <el-option label="全部" value="all"></el-option>
                                    <el-option label="女士服装" value="nsfz"></el-option>
                                    <el-option label="家具建材" value="jjjc"></el-option>
                                    <el-option label="食品生鲜" value="scsx"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="商品类别">
                                <el-select v-model="formInline.type3" placeholder="商品类别">
                                    <el-option label="全部" value="all"></el-option>
                                    <el-option label="实体商品" value="stsp"></el-option>
                                    <el-option label="虚拟货币" value="xnhb"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="按名称">
                                <el-input v-model="formInline.name3" placeholder="按名称搜索"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit" size="small">查询</el-button>
                            </el-form-item>
                        </el-form>
                        <template>
                            <el-table ref="multipleTable" :data="tableData" style="width: 100%;min-width: 780px;"
                                      @selection-change="handleSelectionChange">
                                <el-table-column type="selection">
                                </el-table-column>
                                <el-table-column label="商品">
                                    <template slot-scope="scope">
                                        <img src="../../assets/img/goods-img.png" class="table-img">
                                    </template>
                                </el-table-column>
                                <el-table-column prop="name" label="商品名">
                                </el-table-column>
                                <el-table-column label="价格">
                                    <template slot-scope="scope">
                                        ￥{{scope.row.price}}

                                    </template>
                                </el-table-column>
                                <el-table-column prop="brand" label="品牌">
                                </el-table-column>
                                <el-table-column prop="stock" label="库存" sortable>
                                </el-table-column>
                                <el-table-column prop="sales" label="销量" sortable>
                                </el-table-column>
                                <el-table-column label="流量">
                                    <template slot-scope="scope">
                                        <div class="table-div">
                                            <div>UV:{{scope.row.flowUV}}</div>
                                            <div>PV:{{scope.row.flowPV}}</div>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="salesAmount" label="销售额" sortable min-width="86">
                                </el-table-column>
                                <el-table-column prop="turnover" label="成交顾客" sortable min-width="100">
                                </el-table-column>
                                <el-table-column prop="returnAmount" label="退货数">
                                </el-table-column>
                                <el-table-column prop="category" label="商品类别">
                                </el-table-column>
                                <el-table-column label="操作" min-width='115'>
                                    <template slot-scope="scope">
                                        <a class="table-func">
                                            编辑
                                        </a>
                                        <a class="table-func">
                                            下架
                                        </a>
                                        <a class="table-func">
                                            <el-dropdown>
                                           	<span class="el-dropdown-link">
                                           		更多
                                           	</span>
                                                <el-dropdown-menu slot="dropdown">
                                                    <el-dropdown-item><a @click="open">删除</a></el-dropdown-item>
                                                    <el-dropdown-item><a>复制</a></el-dropdown-item>
                                                </el-dropdown-menu>
                                            </el-dropdown>
                                        </a>

                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                        <el-row style="margin-top: 30px;">
                            <el-button size="medium">下架</el-button>
                            <el-button size="medium">移入未上架</el-button>
                            <el-button size="medium" @click="open">删除</el-button>
                            <el-button size="medium">复制</el-button>
                            <el-button size="medium">导出商品列表</el-button>
                            <el-button size="medium">导出价格/库存</el-button>
                            <el-button size="medium">导出商品二维码</el-button>
                        </el-row>
                        <template>
                            <div class="block" style="text-align: center;margin-top: 30px;">
                                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                               :current-page="currentPage1" :page-sizes="[10, 20, 30, 40]"
                                               :page-size="10" layout="total, sizes, prev, pager, next, jumper"
                                               :total="400">
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
    // import third_nav from '../../components/third-nav.vue'
    import CommonFooter from '../../components/CommonFooter.vue'

    export default {
        name: "list",
        components: {
            // second_nav,
            // third_nav,
            CommonFooter
        },
        computed: {
            getWinHeight: function () {
                return this.$winHeight;
            }
        },
        data: function () {
            return {
                formInline: {
                    name1: '',
                    name2: '',
                    name3: '',
                    type1: '',
                    type2: '',
                    type3: ''
                },
                tableData: [{
                    img: 'img/goods-img.png',
                    name: '商品一',
                    price: '1.00',
                    brand: '无',
                    stock: '1517',
                    sales: '5',
                    flowUV: '0',
                    flowPV: '0',
                    salesAmount: '0',
                    turnover: '0',
                    returnAmount: '0',
                    category: '实体商品'
                }, {
                    img: 'img/logo.png',
                    name: '商品二',
                    price: '2.00',
                    brand: '无',
                    stock: '1519',
                    sales: '3',
                    flowUV: '0',
                    flowPV: '0',
                    salesAmount: '0',
                    turnover: '0',
                    returnAmount: '0',
                    category: '实体商品'
                }, {
                    img: 'img/goods-img.png',
                    name: '商品一',
                    price: '1.00',
                    brand: '无',
                    stock: '1517',
                    sales: '5',
                    flowUV: '0',
                    flowPV: '0',
                    salesAmount: '0',
                    turnover: '0',
                    returnAmount: '0',
                    category: '实体商品'
                }, {
                    img: 'img/logo.png',
                    name: '商品二',
                    price: '2.00',
                    brand: '无',
                    stock: '1519',
                    sales: '3',
                    flowUV: '0',
                    flowPV: '0',
                    salesAmount: '0',
                    turnover: '0',
                    returnAmount: '0',
                    category: '实体商品'
                }, {
                    img: 'img/goods-img.png',
                    name: '商品一',
                    price: '1.00',
                    brand: '无',
                    stock: '1517',
                    sales: '5',
                    flowUV: '0',
                    flowPV: '0',
                    salesAmount: '0',
                    turnover: '0',
                    returnAmount: '0',
                    category: '实体商品'
                }, {
                    img: 'img/logo.png',
                    name: '商品二',
                    price: '2.00',
                    brand: '无',
                    stock: '1519',
                    sales: '3',
                    flowUV: '0',
                    flowPV: '0',
                    salesAmount: '0',
                    turnover: '0',
                    returnAmount: '0',
                    category: '实体商品'
                }],
                currentPage1: 5,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4,
                checkAll: false,
                isIndeterminate: true
            }
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            onSubmit() {
                console.log('submit!');
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
            }
        }
    }
</script>