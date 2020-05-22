<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <div class="third-nav-t">创建折扣活动</div>
            </div>
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">
                        <div class="form-list">
                            <el-form label-position="left" ref="form" :model="form" label-width="100px" :rules="rules">
                                <el-form-item label="活动名称" prop="activy_name">
                                    <el-input v-model="form.activy_name" placeholder="请输入活动名称"></el-input>
                                    <p class="ly_hint_text">不超过10个字，例：会员享受8折优惠</p>
                                </el-form-item>
                                <el-form-item label="折扣" prop="discount_rate">
                                    <div class="ly-flex-style">
                                        <p>消费享</p>
                                        <el-input v-model="form.discount_rate"></el-input>
                                        <p>折优惠</p>
                                    </div>
                                    <p class="ly_hint_text">例：消费享8.0折优惠，订单100元，用户只需支付80元</p>
                                </el-form-item>
                                <el-form-item label="活动时间" prop="is_forever">
                                    <el-radio @change="choTime" v-model="form.is_forever" label="0">固定时间</el-radio>
                                    <el-radio @change="choTime" v-model="form.is_forever" label="1">永久</el-radio>
                                </el-form-item>
                                <el-form-item label="固定时间" prop="date" v-if="form.is_forever==0">
                                    <el-date-picker class="id" @change="changeDate" v-model="form.date" type="datetimerange" start-placeholder="开始日期"
                                                    end-placeholder="结束日期" format="yyyy-MM-dd">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="活动说明" prop="activy_explain">
                                    <el-input
                                            type="textarea"
                                            :autosize="{ minRows: 4, maxRows: 4}"
                                            placeholder="请输入活动说明"
                                            v-model="form.activy_explain">
                                    </el-input>
                                    <p class="ly_hint_text">最多输入50字</p>
                                </el-form-item>
                                <el-form-item label="适用门店" prop="store_id">
                                    <el-select v-model="form.store_id" placeholder="请选择门店">
                                        <el-option
                                                v-for="item in shopList"
                                                :key="item.id"
                                                :label="item.value"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="最多优惠金额" prop="max_discount_price">
                                    <div class="ly-flex-style">
                                        <el-input v-model="form.max_discount_price" clearable></el-input>
                                        <p>元</p>
                                    </div>
                                    <p class="ly_hint_text">注：不填或填写0，表示次数无上限</p>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitForm('form')" v-loading="submitState">提交</el-button>
                                    <el-button type="primary" @click="$router.push('/activity/index')">取消</el-button>
                                    <!--<el-button @click="resetForm('form')">重置</el-button>-->
                                    <!--<el-button>取消</el-button>-->
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </div>
                <common-footer></common-footer>
            </div>
        </div>
    </div>
</template>

<script>
    import CommonFooter from "../../../components/CommonFooter";

    export default {
        name: "Discount",
        components: {
            CommonFooter,
        },
        data: function () {
            var checkNull = (rule, value, callback) => {
                if (value.trim() === '') {
                    callback(new Error(rule.message));
                }  else {
                    callback();
                }
            };
            var checkNull2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(rule.message));
                }  else {
                    callback();
                }
            };
            var checkDate = (rule, value, callback) => {
                if (value === '' || !value) {
                    callback(new Error(rule.message));
                }  else {
                    callback();
                }
            };
            var checkDiscount = (rule, value, callback) => {
                let reg = /^\d+(\.\d{1})?$/;
                if (!reg.test(value)) {
                    callback(new Error('请输入正确的折扣格式，(含一位小数)'));
                }  else {
                    callback();
                }
            };
            var checkNum = (rule, value, callback) => {
                let reg = /^\d+(\.\d{1,2})?$/;
                if(value){
                    if (!reg.test(value)) {
                        callback(new Error('请输入正确的金额格式，(含两位小数)'));
                    }  else {
                        callback();
                    }
                }else {
                    callback();
                    return true
                }
            };
            var checkArrNull = (rule, value, callback) => {
                if (value.length === 0) {
                    callback(new Error(rule.message));
                }  else {
                    callback();
                }
            };
            return {
                submitState: false,
                form: {
                    store_id: "",
                    activy_name: "",
                    activy_explain: "",//说明
                    is_forever: "0",//时间
                    date: "",//时间
                    start_time: "",//开始时间
                    end_time: "",//结束时间
                    discount_rate: '',//折扣
                    max_discount_price: '',//最多优惠金额
                },
                rules: {
                    activy_name: [
                        {
                            validator: checkNull,
                            required: true,
                            message: '请输入活动名称',
                            trigger: 'blur'
                        },
                        {
                            min: 1,
                            max: 10,
                            message: '长度在 1 到 10 个字符',
                            trigger: 'blur'
                        }
                    ],
                    discount_rate: [
                        {
                            validator: checkDiscount,
                            required: true,
                            message: '请输入正确的折扣值（含一位小数）',
                            trigger: 'blur'
                        }
                    ],
                    activy_explain: [
                        {

                            required: false,
                            message: '请输入活动说明',
                            trigger: 'blur'
                        },
                        {
                            min: 0,
                            max: 50,
                            message: '长度在 0 到 50 个字符',
                            trigger: 'blur'
                        }
                    ],
                    store_id: [
                        {
                            validator: checkNull2,
                            required: true,
                            message: '请选择门店',
                            trigger: 'change'
                        }
                    ],
                    is_forever: [
                        {
                            validator: checkNull2,
                            required: true,
                            message: '请选择活动时间',
                            trigger: 'change'
                        }
                    ],
                    date: [
                        {
                            validator: checkDate,
                            required: true,
                            message: '请选择固定时间',
                            trigger: 'change'
                        }
                    ],
                    max_discount_price: [
                        {
                            validator: checkNum,
                            required: false,
                            trigger: 'blur'
                        }
                    ],
                },
                list: [],
                shopList: []
            }
        },
        computed: {
            getWinHeight: function () {
                return this.$winHeight;
            }
        },
        methods: {
            /**
             * 选择时间 值有改变
             * @param val 选中的时间
             */
            changeDate(val){
                console.log(val,this.form.date);
                if(val){
                    let start = new Date(val[0]),end = new Date(val[1]);
                    console.log(start,end,Date.parse(start),Date.parse(end));
                    this.form.start_time = start.valueOf();
                    this.form.end_time = end.valueOf();
                    console.log(this.form.start_time,this.form.end_time,this.form)
                }else {
                    this.form.start_time = this.form.end_time = '';
                }
            },
            choTime(val){
                console.log('选择时间改变',val);
            },
            /**
             * 提交
             * @param formName
             */
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log('提交',this.form);
                        this.$confirm('此操作将创建新活动，关闭原有活动, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.submitState = false;
                            this.$axios.post('/mer/activy/add/discount', this.form).then(res => {
                            if (res.data.code === this.$webConfig.httpSuccessStatus) {
                                this.$message({type: 'success', message: '创建成功!'});
                                this.$router.push('/activity/list');
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
                                message: '已取消创建'
                            });
                        });
                    } else {
                        return false;
                    }
                });
            },
            /**
             *  获取门店list
             */
            getShopList(){
                this.$axios.post('/mer/order/choose/store').then(res => {
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        this.shopList = res.data.data;
                        this.shopList.unshift({id: 0, value: "所有门店"})
                    }else {
                        this.$message(res.data.message);
                    }
                })
                    .catch((rej) => {

                    });
            }
        },
        mounted: function () {
            if (this.$route.query.parentId) {
                this.form.parent_id = this.$route.query.parentId
            }
            // 获取门店
            this.getShopList();
        },
    }
</script>

<style scoped>

</style>