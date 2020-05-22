<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <div class="third-nav-t">创建满减券</div>
            </div>
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">
                        <div class="form-list">
                            <el-form label-position="left" ref="form" :model="form" label-width="160px" :rules="rules">
                                <el-form-item label="领取时间" prop="issueDate">
                                    <el-date-picker class="id" @change="changeIssueDate" v-model="form.issueDate" type="datetimerange" start-placeholder="开始日期"
                                                    end-placeholder="结束日期" format="yyyy-MM-dd">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="卡券名称" prop="coupon_name">
                                    <el-input v-model="form.coupon_name" placeholder="请输入卡券名称"></el-input>
                                    <p class="ly_hint_text">不超过10个字，建议填写优惠券提供的具体服务</p>
                                </el-form-item>
                                <el-form-item label="适用门店" prop="is_all_store">
                                    <el-radio @change="choTime" v-model="form.is_all_store" label="1">所有门店</el-radio>
                                    <el-radio @change="choTime" v-model="form.is_all_store" label="0">选择门店</el-radio>
                                </el-form-item>
                                <el-form-item label="选择门店" prop="mer_store_ids" v-if="form.is_all_store==0">
                                    <el-select v-model="form.mer_store_ids" placeholder="请选择门店" multiple>
                                        <el-option
                                                v-for="item in shopList"
                                                :key="item.id"
                                                :label="item.value"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="使用有效期" prop="use_time_type">
                                    <el-radio @change="choTime" v-model="form.use_time_type" label="1">固定日期</el-radio>
                                    <el-radio @change="choTime" v-model="form.use_time_type" label="2">固定时长</el-radio>
                                </el-form-item>
                                <el-form-item label="固定日期" prop="useDate" v-if="form.use_time_type==1">
                                    <el-date-picker class="id" @change="changeUseDate" v-model="form.useDate" type="datetimerange" start-placeholder="开始日期"
                                                    end-placeholder="结束日期" format="yyyy-MM-dd">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="固定时长" prop="validityDay" v-if="form.use_time_type==2">
                                    <div class="ly-flex-style">
                                        <p>领取</p>
                                        <el-input v-model="form.validityDay.laterDay"></el-input>
                                        <p>天后立即生效，有效期</p>
                                        <el-input v-model="form.validityDay.validityDayNum"></el-input>
                                        <p>天</p>
                                    </div>
                                    <p class="ly_hint_text">注：填0或不填则立即生效</p>
                                </el-form-item>
                                <el-form-item label="优惠内容" prop="content">
                                    <div class="ly-flex-style">
                                        <p>满</p>
                                        <el-input v-model="form.content.fullValue"></el-input>
                                        <p>元，减</p>
                                        <el-input v-model="form.content.subValue"></el-input>
                                        <p>元</p>
                                    </div>
                                    <p class="ly_hint_text">注：数值保留两位小数</p>
                                </el-form-item>
                                <el-form-item label="领券限制" prop="every_user_count">
                                    <div class="ly-flex-style">
                                        <el-input v-model="form.every_user_count"></el-input>
                                        <p>张</p>
                                    </div>
                                    <p class="ly_hint_text">注：每个用户领券的上限，默认为1</p>
                                </el-form-item>
                                <el-form-item label="发行数量" prop="total_send_count">
                                    <div class="ly-flex-style">
                                        <el-input v-model="form.total_send_count"></el-input>
                                        <p>张</p>
                                    </div>
                                    <p class="ly_hint_text">注：最多不可超过100,000张</p>
                                </el-form-item>
                                <el-form-item label="是否与会员活动叠加" prop="is_both_vip_acitvy">
                                    <el-radio @change="choTime" v-model="form.is_both_vip_acitvy" label="0">不可叠加</el-radio>
                                    <el-radio @change="choTime" v-model="form.is_both_vip_acitvy" label="1">可叠加</el-radio>
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

                                <el-form-item>
                                    <el-button type="primary" @click="submitForm('form')" v-loading="submitState">提交</el-button>
                                    <el-button type="primary" @click="$router.push('/coupon/setUp')">取消</el-button>
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
    let reg = /^[+]{0,1}(\d+)$/; //包含0，正整数
    let reg2 = /^[1-9]+\d*$/; //不含0，正整数
    let reg1 = /^\d+(\.\d{1,2})?$/; //两位小数，金额
    export default {
        name: "FullReduction",
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
            //多个门店list
            var checkShopIdList = (rule, value, callback) => {
                if (value.length==0) {
                    callback(new Error(rule.message));
                }  else {
                    callback();
                }
            };
            //发行数量
            var checkIssueNum = (rule, value, callback) => {
                if (!reg.test(value)||value>100000) {
                    this.form.total_send_count = '';
                    callback(new Error(rule.message));
                }  else {
                    callback();
                }
            };
            //限领数量
            var checkAstrictNum = (rule, value, callback) => {
                if (!reg2.test(value)||value>100) {
                    this.form.every_user_count = 1;
                    callback(new Error(rule.message));
                }  else {
                    callback();
                }
            };
            //固定时长
            var checkObjNull = (rule, value, callback) => {
                if(value.laterDay.trim()!=''){
                    if (!reg.test(value.laterDay)||!reg.test(value.validityDayNum)) {
                        callback(new Error(rule.message));
                    }  else {
                        callback();
                    }
                }else if (!reg.test(value.validityDayNum)) {
                    callback(new Error(rule.message));
                }  else {
                    callback();
                }
            };
            //优惠内容
            var checkObjNullOne = (rule, value, callback) => {
                if (!reg1.test(value.fullValue)||!reg1.test(value.subValue)) {
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
            return {
                submitState: false,
                form: {
                    coupon_name: "",
                    activy_explain: "",//说明
                    issueDate: '',//领取(发行)时间
                    receive_stime: '',//领取(发行)时间 - 开始时间【数据联调】
                    receive_etime: '',//领取(发行)时间 - 结束时间【数据联调】
                    useDate: "",//时间
                    use_stime: "",//开始时间【数据联调】
                    use_etime: "",//结束时间【数据联调】
                    is_all_store: '1',//所有or多选门店【1：所有，0：选择】
                    mer_store_ids: [],//多选门店id
                    use_time_type: "1",//使用有效期【1：固定日期；2：固定时长】
                    validityDay: {
                        laterDay: '',//发行推迟天数
                        validityDayNum: '',//有效天数
                    },
                    wait_days: '',//发行推迟天数【数据联调】
                    can_use_days: '',//有效天数【数据联调】
                    content: {
                        fullValue: '',//满
                        subValue: '',//减
                    },
                    discount: '',//优惠内容 - 减【数据联调】
                    min_pay_price: '',//优惠内容 - 满【数据联调】
                    every_user_count: '1',//每人限领
                    total_send_count: '',//发行数量
                    is_both_vip_acitvy: '',//是否叠加【1：是；0：否】
                },
                rules: {
                    issueDate: [
                        {
                            validator: checkDate,
                            required: true,
                            message: '请选择领取时间',
                            trigger: 'change'
                        }
                    ],
                    coupon_name: [
                        {
                            validator: checkNull,
                            required: true,
                            message: '请输入卡券名称',
                            trigger: 'blur'
                        },
                        {
                            min: 1,
                            max: 10,
                            message: '长度在 1 到 10 个字符',
                            trigger: 'blur'
                        }
                    ],
                    useDate: [
                        {
                            validator: checkDate,
                            required: true,
                            message: '请选择固定日期',
                            trigger: 'change'
                        }
                    ],
                    mer_store_ids: [
                        {
                            validator: checkShopIdList,
                            required: true,
                            message: '请选择门店',
                            trigger: 'change'
                        },
                    ],
                    is_all_store: [
                        {
                            validator: checkNull2,
                            required: true,
                            message: '请选择适用门店',
                            trigger: 'blur'
                        },
                    ],
                    is_both_vip_acitvy: [
                        {
                            validator: checkNull2,
                            required: true,
                            message: '请选择是否可与会员活动叠加',
                            trigger: 'blur'
                        },
                    ],
                    total_send_count: [
                        {
                            validator: checkIssueNum,
                            required: true,
                            message: '请输入正确的数值(大于0的正整数)，不超过100,000张',
                            trigger: 'blur'
                        },
                    ],
                    every_user_count: [
                        {
                            validator: checkAstrictNum,
                            required: true,
                            message: '请输入正确的数值(大于0的正整数)，不超过100张',
                            trigger: 'blur'
                        },
                    ],
                    validityDay: [
                        {
                            validator: checkObjNull,
                            required: true,
                            message: '请输入正确的数值',
                            trigger: 'blur'
                        },
                    ],
                    content: [
                        {
                            validator: checkObjNullOne,
                            required: true,
                            message: '请输入正确的金额',
                            trigger: 'blur'
                        },
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
                    use_time_type: [
                        {
                            validator: checkNull2,
                            required: true,
                            message: '请选择使用有效期',
                            trigger: 'change'
                        }
                    ],
                },
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
            changeDate(val,num){
                console.log(val,num,this.form);
                if(val){
                    let start = new Date(val[0]),end = new Date(val[1]);
                    console.log(start,end,Date.parse(start),Date.parse(end));
                    if(num){
                        this.form.receive_stime = start.valueOf();
                        this.form.receive_etime = end.valueOf();
                    }else {
                        this.form.use_stime = start.valueOf();
                        this.form.use_etime = end.valueOf();
                    }
                    console.log(this.form)
                }else {
                    if(num){
                        this.form.receive_stime = this.form.receive_etime = '';
                    }else {
                        this.form.use_stime = this.form.use_etime = '';
                    }
                }
            },
            /**
             * 选择发行(领取)时间 值有改变
             */
            changeIssueDate(val){
                console.log(val,this.form);
                this.changeDate(val,1)
            },
            /**
             * 选择使用有效期(固定日期) 值有改变
             */
            changeUseDate(val){
                console.log(val,this.form);
                this.changeDate(val,0)
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
                        if(this.form.use_time_type == 2){
                            this.form.wait_days = this.form.validityDay.laterDay;
                            this.form.can_use_days = this.form.validityDay.validityDayNum;
                        }
                        this.form.min_pay_price = this.form.content.fullValue;
                        this.form.discount = this.form.content.subValue;
                        console.log('提交',this.form);
                        this.$confirm('此操作将创建该卡券，是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.submitState = false;
                            this.$axios.post('/mer/coupon/add/moneyOff', this.form).then(res => {
                                if (res.data.code === this.$webConfig.httpSuccessStatus) {
                                    this.$message({type: 'success', message: '创建成功!'});
                                    this.$router.push('/coupon/list');
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
            getList(){
                this.$axios.post('/mer/order/choose/store').then(res=>{
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        this.shopList = res.data.data;
                    }else {
                        this.$message(res.data.message);
                    }
                })
            }
        },
        mounted: function () {
            // 获取门店
            this.getList();
        },
    }
</script>

<style scoped>

</style>