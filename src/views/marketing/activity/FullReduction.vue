<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <div class="third-nav-t">创建满减活动</div>
            </div>
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">
                        <div class="form-list">
                            <el-form label-position="left" ref="form" :model="form" label-width="100px" :rules="rules">
                                <el-form-item label="活动名称" prop="activy_name">
                                    <el-input v-model="form.activy_name" placeholder="请输入活动名称"></el-input>
                                    <p class="ly_hint_text">不超过10个字，例：会员消费满100元送10元</p>
                                </el-form-item>
                                <el-form-item label="满减规则" prop="rule_list">
                                    <div class="ly-flex-style" v-for="(ele,i) in form.rule_list" :key="i">
                                        <p>消费满</p>
                                        <el-input v-model="ele.pay_price"></el-input>
                                        <p>元，减</p>
                                        <el-input v-model="ele.discount_price"></el-input>
                                        <p>元</p>
                                        <el-button type="text" @click="addRule(ele,i)" >添加</el-button>
                                        <el-button type="text" style="color:red" @click="delRule(ele,i)">删除</el-button>
                                    </div>
                                    <p class="ly_hint_text">注：最多添加三个等级门槛，数值保留两位小数</p>
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

                                <el-form-item label="限制条件" prop="condition_type">
                                    <el-select v-model="form.condition_type" placeholder="请选择限制条件">
                                        <el-option
                                                v-for="item in restrictList"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="限制内容" prop="contentId" v-if="form.condition_type==1||form.condition_type==2">
                                    <div class="ly-flex-style" v-for="(ele,i) in form.condition_type==1?dayRestrictList:form.condition_type==2?timeRestrictList:[]" :key="i">
                                        <el-radio v-model="form.contentId" :label="ele.id" @change="choContent(ele,i)">
                                            <p>{{ele.text1}}</p>
                                            <el-input v-model="ele.top_times"></el-input>
                                            <p>{{ele.text2}}</p>
                                            <el-input v-model="ele.user_times" v-show="i==1"></el-input>
                                            <p>{{ele.text3}}</p>
                                        </el-radio>
                                    </div>
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
            var checkNull2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(rule.message));
                }  else {
                    callback();
                }
            };
            var checkNull3 = (rule, value, callback) => {
                console.log(value);
                let reg = /^[+]{0,1}(\d+)$/; //包含0，正整数
                if (value === '') {
                    callback(new Error(rule.message));
                }else {
                    let list = [];
                    if(this.form.condition_type == '1'){
                        list = this.dayRestrictList;
                    }else if(this.form.condition_type == '2'){
                        list = this.timeRestrictList;
                        /*if(value === '1'){
                            if(list[0].top_times == ''||!reg.test(list[0].top_times)) {
                                callback(new Error(rule.message));
                            }else {
                                callback();
                                return true;
                            }
                        }else if(value === '2'){
                            if(list[1].top_times == ''||list[1].user_times == ''||!reg.test(list[1].top_times)||!reg.test(list[1].user_times)) {
                                callback(new Error(rule.message));
                            }else {
                                callback();
                                return true;
                            }
                        }else if(value === '3'){
                            if(list[2].top_times == ''||!reg.test(list[2].top_times)) {
                                callback(new Error(rule.message));
                            }else {
                                callback();
                                return true;
                            }
                        }*/
                    }
                    if(value == '1'){
                        if(list[0].top_times == ''||!reg.test(list[0].top_times)) {
                            callback(new Error(rule.message));
                        }else {
                            callback();
                            return true;
                        }
                    }else if(value == '2'){
                        if(list[1].top_times == ''||list[1].user_times == ''||!reg.test(list[1].top_times)||!reg.test(list[1].user_times)) {
                            callback(new Error(rule.message));
                        }else {
                            callback();
                            return true;
                        }
                    }else if(value == '3'){
                        if(list[2].top_times == ''||!reg.test(list[2].top_times)) {
                            callback(new Error(rule.message));
                        }else {
                            callback();
                            return true;
                        }
                    }
                }
            };
            var checkDate = (rule, value, callback) => {
                if (value === '' || !value) {
                    callback(new Error(rule.message));
                }  else {
                    callback();
                }
            };
            var checkArrNull = (rule, value, callback) => {
                let reg = /^\d+(\.\d{1,2})?$/;
                let num = 0;
                value.forEach((ele,i)=>{
                    if(!ele.pay_price||!ele.discount_price){
                        num ++;
                        console.log('1==========',num);
                        /* callback(new Error('请完善规则(金额保留两位小数)'))*/
                    }
                    else if(!reg.test(ele.pay_price)||!reg.test(ele.discount_price)){
                        num ++;
                        console.log('1==========',num);
                        // callback(new Error('金额保留两位小数'))
                    }
                });
                if(num>0){
                    callback(new Error('请完善规则(金额保留两位小数)'))
                }else {
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
                    // 按等级送
                    rule_list: [
                        {
                            pay_price: "",//满
                            discount_price: "",//送
                        }
                    ],
                    condition_type: '',//限制条件id
                    contentId: '',//限制内容id
                    top_times: '',//笔数
                    user_times: '',//次数
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
                    condition_type: [
                        {
                            validator: checkNull2,
                            required: true,
                            message: '请选择限制条件',
                            trigger: 'change'
                        }
                    ],
                    contentId: [
                        {
                            validator: checkNull3,
                            required: true,
                            message: '请选择限制内容，并完善内容（正整数）',
                            trigger: 'change'
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
                    rule_list: [
                        {
                            validator: checkArrNull,
                            required: true,
                            message: '请设置满减活动规则(金额保留两位小数)',
                            trigger: 'blur'
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
                },
                list: [],
                restrictList: [
                    {
                        value: 0,
                        label: '无限制'
                    },
                    {
                        value: 1,
                        label: '每日限制'
                    },
                    {
                        value: 2,
                        label: '期间限制'
                    }
                ],
                dayRestrictList: [
                    {
                        id: '1',
                        top_times: '',
                        user_times: '1',
                        text1: '每日前',
                        text2: '笔订单享受满减，每个会员',
                        text3: '仅有一次机会'
                    },
                    {
                        id: '2',
                        top_times: '',
                        user_times: '',
                        text1: '每日前',
                        text2: '笔订单享受满减，每个会员可享有',
                        text3: '次满减'
                    },
                    {
                        id: '3',
                        top_times: '',
                        user_times: '',
                        text1: '每日前',
                        text2: '笔订单享受满减，每个会员',
                        text3: '满减次数不限'
                    },
                ],
                timeRestrictList: [
                    {
                        id: '1',
                        top_times: '',
                        user_times: '1',
                        text1: '活动期间，前',
                        text2: '笔订单享受满减，每个会员',
                        text3: '仅有一次机会'
                    },
                    {
                        id: '2',
                        top_times: '',
                        user_times: '',
                        text1: '活动期间，前',
                        text2: '笔订单享受满减，每个会员可享有',
                        text3: '次满减'
                    },
                    {
                        id: '3',
                        top_times: '',
                        user_times: '',
                        text1: '活动期间，前',
                        text2: '笔订单享受满减，每个会员',
                        text3: '满减次数不限'
                    },
                ],
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
             * 选择限制内容
             */
            choContent(val,index){
                console.log('添加rule',val,index);
                if(this.form.condition_type==1){
                    this.resetContent(this.dayRestrictList,index);
                   /* if(index==0){
                        this.dayRestrictList[1].top_times = this.dayRestrictList[1].user_times = this.dayRestrictList[2].top_times = ''
                    }else if(index==1){
                        this.dayRestrictList[0].top_times = this.dayRestrictList[2].top_times = ''
                    }else if(index==2){
                        this.dayRestrictList[0].top_times = this.dayRestrictList[1].top_times = this.dayRestrictList[1].user_times = '';
                    }*/
                }else if(this.form.condition_type==2){
                    this.resetContent(this.timeRestrictList,index);
                    /*if(index==0){
                        this.timeRestrictList[1].top_times = this.timeRestrictList[1].user_times = this.timeRestrictList[2].top_times = ''
                    }else if(index==1){
                        this.timeRestrictList[0].top_times = this.timeRestrictList[2].top_times = ''
                    }else if(index==2){
                        this.timeRestrictList[0].top_times = this.timeRestrictList[1].top_times = this.timeRestrictList[1].user_times = '';
                    }*/
                }
            },
            /**
             *  选择限制内容 --- 重置input框
             */
            resetContent(list,i){
                if(i==0){
                    list[1].top_times = list[1].user_times = list[2].top_times = ''
                }else if(i==1){
                    list[0].top_times = list[2].top_times = ''
                }else if(i==2){
                    list[0].top_times = list[1].top_times = list[1].user_times = '';
                }
            },
            /**
             * 添加规则
             */
            addRule(val,index){
                console.log('添加rule',val,index);
                if(this.form.rule_list.length==3){
                    this.$message('规则等级已达上限~')
                }else {
                    this.form.rule_list.splice(index+1,0,{pay_price: "",discount_price: "",})
                }
            },
            /**
             * 删除规则
             */
            delRule(val,index){
                console.log('删除rule',val,index);
                if(this.form.rule_list.length==1){
                    this.$message('规则等级至少设置一级~')
                }else {
                    this.form.rule_list.splice(index, 1)
                }
            },
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
                        let ii = this.form.contentId;
                        if(this.form.condition_type==0){
                            this.form.top_times = this.form.user_times = '';
                        }else if(this.form.condition_type==1){
                            this.form.top_times = this.dayRestrictList[ii-1].top_times;
                            this.form.user_times = this.dayRestrictList[ii-1].user_times
                        }else if(this.form.condition_type==2){
                            this.form.top_times = this.timeRestrictList[ii-1].top_times;
                            this.form.user_times = this.timeRestrictList[ii-1].user_times
                        }
                        this.$confirm('此操作将创建新活动，关闭原有活动, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.submitState = false;
                            this.$axios.post('/mer/activy/add/moneyOff', this.form).then(res => {
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