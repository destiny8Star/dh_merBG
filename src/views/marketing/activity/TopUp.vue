<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <div class="third-nav-t">创建充值送活动</div>
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
                                <el-form-item label="充值送规则" prop="rule_list">
                                    <div class="ly-flex-style" v-for="(ele,i) in form.rule_list" :key="i">
                                        <p>充值满</p>
                                        <el-input v-model="ele.recharge_price"></el-input>
                                        <p>元，送</p>
                                        <el-input v-model="ele.give_price"></el-input>
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
        name: "TopUp",
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
            var checkArrNull = (rule, value, callback) => {
                let reg = /^\d+(\.\d{1,2})?$/;
                let num = 0;
                value.forEach((ele,i)=>{
                    if(!ele.recharge_price||!ele.give_price){
                        num ++;
                        console.log('1==========',num);
                       /* callback(new Error('请完善规则(金额保留两位小数)'))*/
                    }
                    else if(!reg.test(ele.recharge_price)||!reg.test(ele.give_price)){
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
                    is_forever: "0",//时间类型【1：永久 ,0：限时】
                    date: "",//时间
                    start_time: "",//开始时间
                    end_time: "",//结束时间
                    rule_list: [
                        {
                            recharge_price: "",//满
                            give_price: "",//送
                        }
                    ]
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
                    rule_list: [
                        {
                            validator: checkArrNull,
                            required: true,
                            message: '请设置活动规则(金额保留两位小数)',
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
             * 添加规则
             */
            addRule(val,index){
                console.log('添加rule',val,index);
                if(this.form.rule_list.length==3){
                    this.$message('规则等级已达上限~')
                }else {
                    this.form.rule_list.splice(index+1,0,{recharge_price: "",give_price: "",})
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
                        this.$confirm('此操作将创建新活动，关闭原有活动, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.submitState = false;
                            this.$axios.post('/mer/activy/add/rechargeGift', this.form).then(res => {
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

<style scoped >
    .ly-flex-style {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }
    .ly-flex-style .el-button {
        margin-left: 15px;
    }
    .ly-flex-style p {
        margin: 0;
    }
</style>