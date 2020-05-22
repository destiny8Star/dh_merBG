<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <div class="third-nav-t">备用【没用】</div>
            </div>
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">
                        <div class="form-list">
                            <el-form label-position="left" ref="form" :model="form" label-width="100px" :rules="rules">
                                <el-form-item label="活动名称" prop="name">
                                    <el-input v-model="form.name" placeholder="请输入活动名称"></el-input>
                                    <p class="ly_hint_text">不超过10个字，例：会员充值满100元送10元</p>
                                </el-form-item>
                                <el-form-item label="消费送规则" prop="wayId">
                                    <el-select v-model="form.wayId" placeholder="请选择消费送方式">
                                        <el-option
                                                v-for="item in wayList"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <p class="ly_hint_text">提示：<br>
                                        1、等比例送：设置一个比例，按设置比例送，无上限，每消费XX元送XX元；<br>
                                        2、按等级送：设置三个等级，有上限，每满XX元送XX元；<br>
                                        3、百分比送：按消费金额的百分比送，无上限。
                                    </p>
                                </el-form-item>
                                <el-form-item label="按比例送" prop="ratio" v-if="form.wayId==1">
                                    <div class="ly-flex-style">
                                        <p>消费每满</p>
                                        <el-input v-model="form.ratio[0].fullValue"></el-input>
                                        <p>元，送</p>
                                        <el-input v-model="form.ratio[0].sendValue"></el-input>
                                        <p>元</p>
                                    </div>
                                </el-form-item>

                                <el-form-item label="按等级送" prop="ruleList" v-if="form.wayId==2">
                                    <div class="ly-flex-style" v-for="(ele,i) in form.ruleList" :key="i">
                                        <p>充值满</p>
                                        <el-input v-model="ele.fullValue"></el-input>
                                        <p>元，送</p>
                                        <el-input v-model="ele.sendValue"></el-input>
                                        <p>元</p>
                                        <el-button type="text" @click="addRule(ele,i)" >添加</el-button>
                                        <el-button type="text" style="color:red" @click="delRule(ele,i)">删除</el-button>
                                    </div>
                                    <p class="ly_hint_text">注：最多添加三个等级门槛，数值保留两位小数</p>
                                </el-form-item>

                                <el-form-item label="百分比送" prop="percent" v-if="form.wayId==3">
                                    <div class="ly-flex-style">
                                        <p>消费百分比</p>
                                        <el-input v-model="form.percent"></el-input>
                                        <p>%</p>
                                    </div>
                                </el-form-item>
                                <el-form-item label="使用有效期" prop="timeId">
                                    <el-radio @change="choTime" v-model="form.timeId" label="1">固定时间</el-radio>
                                    <el-radio @change="choTime" v-model="form.timeId" label="2">永久</el-radio>
                                </el-form-item>
                                <el-form-item label="固定时间" prop="date" v-if="form.timeId==1">
                                    <el-date-picker class="id" @change="changeDate" v-model="form.date" type="datetimerange" start-placeholder="开始日期"
                                                    end-placeholder="结束日期" format="yyyy-MM-dd">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="活动限制" prop="restrict">
                                    <div class="ly-flex-style">
                                        <p>活动期间单个会员消费送次数最多</p>
                                        <el-input v-model="form.restrict" clearable></el-input>
                                        <p>次</p>
                                    </div>
                                    <p class="ly_hint_text">注：不填或填写0，表示消费送次数无上限</p>
                                </el-form-item>
                                <el-form-item label="活动说明" prop="explain">
                                    <el-input
                                            type="textarea"
                                            :autosize="{ minRows: 4, maxRows: 4}"
                                            placeholder="请输入活动说明"
                                            v-model="form.explain">
                                    </el-input>
                                    <p class="ly_hint_text">最多输入50字</p>
                                </el-form-item>
                                <el-form-item label="适用门店" prop="shopId">
                                    <el-select v-model="form.shopId" placeholder="请选择门店">
                                        <el-option
                                                v-for="item in shopList"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
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

    export default {
        name: "Expense",
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
            var checkNum = (rule, value, callback) => {
                let reg = /^(0|\+?[1-9][0-9]*)$/;
                if(value){
                    if (!reg.test(value)) {
                        callback(new Error('请输入正整数'));
                    }  else {
                        callback();
                    }
                }else {
                    callback();
                    return true
                }
            };
            var checkPercent = (rule, value, callback) => {
                let reg = /^(0|\+?[1-9][0-9]*)$/;
                if (!reg.test(value)) {
                    callback(new Error('请输入正整数'));
                }  else {
                    callback();
                }
            };
            var checkArrNull = (rule, value, callback) => {
                value.forEach((ele,i)=>{
                    if(ele.fullValue==''||ele.sendValue==''){
                        callback(new Error('请完善规则'))
                    } else {
                        callback();
                    }
                })
            };
            return {
                submitState: false,
                form: {
                    shopId: "",
                    name: "",
                    explain: "",//说明
                    timeId: "1",//时间
                    date: "",//时间
                    start_time: "",//开始时间
                    end_time: "",//结束时间
                    restrict: "",//活动限制
                    wayId: "",//规则方式
                    // 按比例送
                    ratio: [
                        {
                            fullValue: "",//满
                            sendValue: "",//送
                        }
                    ],
                    // 按等级送
                    ruleList: [
                        {
                            fullValue: "",//满
                            sendValue: "",//送
                        }
                    ],
                    percent: '',//百分比
                },
                rules: {
                    name: [
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
                    explain: [
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
                    restrict: [
                        {
                            validator: checkNum,
                            required: false,
                            trigger: 'blur'
                        }
                    ],
                    percent: [
                        {
                            validator: checkPercent,
                            required: true,
                            message: '请输入正确的百分比（正整数）',
                            trigger: 'blur'
                        }
                    ],
                    shopId: [
                        {
                            validator: checkNull2,
                            required: true,
                            message: '请选择门店',
                            trigger: 'change'
                        }
                    ],
                    wayId: [
                        {
                            validator: checkNull2,
                            required: true,
                            message: '请选择消费送方式',
                            trigger: 'change'
                        }
                    ],
                    ratio: [
                        {
                            validator: checkArrNull,
                            required: true,
                            message: '请设置按比例送活动规则',
                            trigger: 'blur'
                        }
                    ],
                    ruleList: [
                        {
                            validator: checkArrNull,
                            required: true,
                            message: '请设置按等级送活动规则',
                            trigger: 'blur'
                        }
                    ],
                    timeId: [
                        {
                            validator: checkNull2,
                            required: true,
                            message: '请选择使用有效期',
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
                wayList: [
                    {
                        value: 1,
                        label: '等比例送'
                    },
                    {
                        value: 2,
                        label: '按等级送'
                    },
                    {
                        value: 3,
                        label: '百分比送'
                    }
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
             * 添加规则
             */
            addRule(val,index){
                console.log('添加rule',val,index);
                if(this.form.ruleList.length==3){
                    this.$message('规则等级已达上限~')
                }else {
                    this.form.ruleList.splice(index+1,0,{fullValue: "",sendValue: "",})
                }
            },
            /**
             * 删除规则
             */
            delRule(val,index){
                console.log('删除rule',val,index);
                if(this.form.ruleList.length==1){
                    this.$message('规则等级至少设置一级~')
                }else {
                    this.form.ruleList.splice(index, 1)
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
                            /*this.$axios.post('/mer/role/saveRole', this.form).then(res => {
                                if (res.data.code === this.$webConfig.httpSuccessStatus) {
                                    this.$message({type: 'success', message: '创建成功!'});
                                    this.$router.push('/store/role');
                                } else {
                                    this.$message(res.data.message);
                                }
                                this.submitState = false;
                            }).catch(() => {
                                this.submitState = false;
                            });*/
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
                this.$axios.get('/mer/role/getRoleMenu').then(res=>{
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
            if (this.$route.query.parentId) {
                this.form.parent_id = this.$route.query.parentId
            }
            // 获取门店
            // this.getList();
        },
    }
</script>

<style scoped>

</style>