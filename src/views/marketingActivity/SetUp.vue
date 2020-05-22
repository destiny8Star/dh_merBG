<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <div class="third-nav-t">{{ form.activy_type == 1 ? '创建转盘活动' : '创建刮奖活动' }}</div>
            </div>
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">
                        <div class="form-list">
                            <el-form label-position="left" ref="form" :model="form" label-width="120px" :rules="rules">
                                <div class="home-title">
                                    <span class="home-title-t ly-title">基础设置</span>
                                </div>
                                <el-form-item label="活动名称" prop="name">
                                    <el-input v-model="form.name" placeholder="请输入活动名称"></el-input>
                                    <p class="ly_hint_text">不超过5个字，例：抽抽乐、刮刮乐、礼品大转盘</p>
                                </el-form-item>
                                <el-form-item label="活动标语" prop="slogan">
                                    <el-input v-model="form.slogan" placeholder="请输入活动标语"></el-input>
                                    <p class="ly_hint_text">不超过10个字，例：支付后抽好礼、支付后刮好礼</p>
                                </el-form-item>
                                <el-form-item label="活动时间" prop="date">
                                    <el-date-picker class="id" @change="changeDate" v-model="form.date" type="datetimerange" start-placeholder="开始日期"
                                                    end-placeholder="结束日期" format="yyyy-MM-dd">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="适用门店" prop="mer_store_id">
                                    <el-select v-model="form.mer_store_id" placeholder="请选择门店">
                                        <el-option
                                                v-for="item in shopList"
                                                :key="item.id"
                                                :label="item.value"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>

                                <div class="home-title">
                                    <span class="home-title-t ly-title">活动规则</span>
                                </div>
                                <el-form-item label="参与规则" prop="ruleContent">
                                    <div class="ly-flex-style">
                                        <p>单次消费每满</p>
                                        <el-input v-model="form.ruleContent.fullValue"></el-input>
                                        <p>元获得1次机会，每次消费最多有</p>
                                        <el-input v-model="form.ruleContent.num"></el-input>
                                        <p>次机会</p>
                                    </div>
                                    <p class="ly_hint_text">例：设置每满100元获得1次机会。顾客消费300元，可获得3次机会</p>
                                </el-form-item>
                                <el-form-item label="参与限制" prop="limit_condition">
                                    <el-radio @change="choTime" v-model="form.limit_condition" label="0">无限制</el-radio>
                                    <el-radio @change="choTime" v-model="form.limit_condition" label="1">增加限制条件</el-radio>
                                </el-form-item>
                                <el-form-item label="活动上限次数" prop="max_times" v-if="form.limit_condition==1">
                                    <div class="ly-flex-style">
                                        <el-input v-model="form.max_times"></el-input>
                                        <p>次</p>
                                    </div>
                                    <p class="ly_hint_text">参与活动机会总次数，超过次数则活动结束</p>
                                </el-form-item>
                                <el-form-item label="单人使用次数" prop="onePeople" v-if="form.limit_condition==1">
                                    <div class="ly-flex-style">
                                        <p>每人最多使用</p>
                                        <el-input v-model="form.onePeople.manNum"></el-input>
                                        <p>次，每日最多</p>
                                        <el-input v-model="form.onePeople.dayNum"></el-input>
                                        <p>次机会</p>
                                    </div>
                                </el-form-item>
                                <div class="home-title">
                                    <span class="home-title-t ly-title">设备活动页设置</span>
                                </div>
                                <el-form-item label="总中奖概率" prop="prize_rate">
                                    <div class="ly-flex-style">
                                        <el-input v-model="form.prize_rate"></el-input>
                                        <p> %</p>
                                    </div>
                                </el-form-item>
                                <el-form-item label="每人中奖次数" prop="every_user_price_times">
                                    <div class="ly-flex-style">
                                        <p>每人最多中奖</p>
                                        <el-input v-model="form.every_user_price_times"></el-input>
                                        <p>次</p>
                                    </div>
                                </el-form-item>
                                <el-card style="margin-bottom: 32px;">
                                    <el-form-item label="奖项设置">
                                        <p class="ly_hint_text ly_hint_text_color">（ 默认至少有三个奖项，若营销奖品不足3个，请根据情况填写一等奖、二等奖，并将对应中奖概率设置为0即可 ）</p>
                                    </el-form-item>
                                    <el-card class="box-card" style="margin-bottom: 32px;box-shadow: none;" v-for="(ele,i) in form.awards_setting_item" :key="i">
                                        <div slot="header" class="clearfix">
                                            <span>{{`奖项${map[i]}`}}</span>
                                            <el-button style="float: right" type="danger" size="mini" v-if="i>2" @click="delRule(ele,i)">删除</el-button>
                                        </div>
                                        <div class="text item">
                                            <el-form-item style="margin: 20px 0" label="奖项等级" :prop="`awards_setting_item.${i}.grade`" :rules="ele.rules1.grade">
                                                <el-input v-model="ele.grade" placeholder="请输入奖项等级"></el-input>
                                            </el-form-item>
                                            <el-form-item style="margin: 20px 0" label="奖品名称" :prop="`awards_setting_item.${i}.name`" :rules="ele.rules1.name">
                                                <el-input v-model="ele.name" placeholder="请输入奖品名称"></el-input>
                                            </el-form-item>
                                            <el-form-item style="margin: 20px 0" label="奖品数量" :prop="`awards_setting_item.${i}.count`" :rules="ele.rules1.count">
                                                <el-input v-model="ele.count"></el-input>
                                            </el-form-item>
                                            <el-form-item style="margin: 20px 0" label="抽中概率" :prop="`awards_setting_item.${i}.prize_rate`" :rules="ele.rules1.prize_rate">
                                                <div class="ly-flex-style">
                                                    <el-input v-model="ele.prize_rate"></el-input>
                                                    <p> %</p>
                                                </div>
                                            </el-form-item>
                                            <el-form-item style="margin: 20px 0" label="每日最多中奖" :prop="`awards_setting_item.${i}.every_user_day_times`" :rules="ele.rules1.every_user_day_times">
                                                <div class="ly-flex-style">
                                                    <el-input v-model="ele.every_user_day_times"></el-input>
                                                    <p>次</p>
                                                </div>
                                            </el-form-item>
                                        </div>
                                    </el-card>
                                    <p>若需增加更多奖项，请点击<el-button type="text" @click="addRule()">添加</el-button>（最多可设置5个奖项）</p>
                                </el-card>

                                <p style="color: red">提示：请合理设置奖项，以达到活动效果最大化，切勿设置所有奖项中奖概率为0。</p>
                                <el-form-item>
                                    <el-button type="primary" @click="submitForm('form')" v-loading="submitState">提交</el-button>
                                    <el-button type="primary" @click="$router.push('/marketingActivity/index')">取消</el-button>
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
    import CommonFooter from "../../components/CommonFooter";
    let reg = /^[+]{0,1}(\d+)$/; //包含0，正整数
    let reg2 = /^[1-9]+\d*$/; //不含0，正整数
    let reg1 = /^\d+(\.\d{1,2})?$/; //两位小数，金额
    export default {
        name: "SetUp",
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
            var checkIdNull = (rule, value, callback) => {
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
            //活动规则
            var checkRuleNull = (rule, value, callback) => {
                if (!reg1.test(value.fullValue)||!reg2.test(value.num)) {
                    callback(new Error(rule.message));
                }  else {
                    callback();
                }
            };
            //活动上限次数
            var checkMaxNull = (rule, value, callback) => {
                if (!reg2.test(value)) {
                    callback(new Error(rule.message));
                }  else {
                    callback();
                }
            };
            //单人使用次数
            var checkUseNull = (rule, value, callback) => {
                if (!reg2.test(value.manNum)||!reg2.test(value.dayNum)) {
                    callback(new Error(rule.message));
                }  else {
                    callback();
                }
            };
            //中奖概率
            var checkRateNull = (rule, value, callback) => {
                if (!reg1.test(value)||value>100 ){
                    callback(new Error(rule.message));
                }  else {
                    callback();
                }
            };
            //每人中奖次数
            var checkNumNull = (rule, value, callback) => {
                if (!reg.test(value)){
                    callback(new Error(rule.message));
                }  else {
                    callback();
                }
            };
            return {
                submitState: false,
                map: {0:'一',1:'二',2:'三',3:'四',4:'五',5:'六'},
                form: {
                    activy_type: 1,//活动类型
                    name: '',//活动名称
                    slogan: '',//活动标语
                    date: "",//时间
                    stime: "",//开始时间
                    etime: "",//结束时间
                    mer_store_id: '',//适用门店
                    ruleContent: {
                        fullValue: '',//门槛金额
                        num: '',//抽奖次数
                    },
                    every_times_price: '',//门槛金额【数据联调】
                    every_times_max: '',//抽奖次数【数据联调】
                    limit_condition: '0',//【参与限制：0-无限制，1-有限制】
                    max_times: '',//活动上限次数
                    onePeople: {
                        manNum: '',//每人最多使用次数
                        dayNum: '',//每日最多次数
                    },
                    every_user_max_times: '',//每人最多使用次数【数据联调】
                    every_user_day_max_times: '',//每日最多次数【数据联调】
                    prize_rate: '',//总中奖概率
                    every_user_price_times: '',//每人重奖次数
                    awards_setting_item: [
                        {
                            grade: '一等奖',
                            name: "",//
                            count: "",//
                            prize_rate: "",//
                            every_user_day_times: "",//
                            rules1: {
                                grade: [
                                    {
                                        validator: checkNull,
                                        required: true,
                                        message: '请输入奖项等级',
                                        trigger: 'blur'
                                    },
                                    {
                                        min: 1,
                                        max: 5,
                                        message: '长度在 1 到 5 个字符',
                                        trigger: 'blur'
                                    }
                                ],
                                name: [
                                    {
                                        validator: checkNull,
                                        required: true,
                                        message: '请输入奖项名称（最长10个字）',
                                        trigger: 'blur'
                                    },
                                    {
                                        min: 1,
                                        max: 10,
                                        message: '长度在 1 到 10 个字符',
                                        trigger: 'blur'
                                    }
                                ],
                                count: [
                                    {
                                        validator: checkMaxNull,
                                        required: true,
                                        message: '请输入奖品数量（正整数）',
                                        trigger: 'blur'
                                    }
                                ],
                                prize_rate: [
                                    {
                                        validator: checkRateNull,
                                        required: true,
                                        message: '请输入抽奖概率（保留两位小数）',
                                        trigger: 'blur'
                                    }
                                ],
                                every_user_day_times: [
                                    {
                                        validator: checkMaxNull,
                                        required: true,
                                        message: '请输入每日最多中奖次数（正整数）',
                                        trigger: 'blur'
                                    }
                                ],
                            }
                        },
                        {
                            grade: '二等奖',
                            name: "",//
                            count: "",//
                            prize_rate: "",//
                            every_user_day_times: "",//
                            rules1: {
                                grade: [
                                    {
                                        validator: checkNull,
                                        required: true,
                                        message: '请输入奖项等级',
                                        trigger: 'blur'
                                    },
                                    {
                                        min: 1,
                                        max: 5,
                                        message: '长度在 1 到 5 个字符',
                                        trigger: 'blur'
                                    }
                                ],
                                name: [
                                    {
                                        validator: checkNull,
                                        required: true,
                                        message: '请输入奖项名称（最长10个字）',
                                        trigger: 'blur'
                                    },
                                    {
                                        min: 1,
                                        max: 10,
                                        message: '长度在 1 到 10 个字符',
                                        trigger: 'blur'
                                    }
                                ],
                                count: [
                                    {
                                        validator: checkMaxNull,
                                        required: true,
                                        message: '请输入奖品数量（正整数）',
                                        trigger: 'blur'
                                    }
                                ],
                                prize_rate: [
                                    {
                                        validator: checkRateNull,
                                        required: true,
                                        message: '请输入抽奖概率（保留两位小数）',
                                        trigger: 'blur'
                                    }
                                ],
                                every_user_day_times: [
                                    {
                                        validator: checkMaxNull,
                                        required: true,
                                        message: '请输入每日最多中奖次数（正整数）',
                                        trigger: 'blur'
                                    }
                                ],
                            }
                        },
                        {
                            grade: '三等奖',
                            name: "",//
                            count: "",//
                            prize_rate: "",//
                            every_user_day_times: "",//
                            rules1: {
                                grade: [
                                    {
                                        validator: checkNull,
                                        required: true,
                                        message: '请输入奖项等级',
                                        trigger: 'blur'
                                    },
                                    {
                                        min: 1,
                                        max: 5,
                                        message: '长度在 1 到 5 个字符',
                                        trigger: 'blur'
                                    }
                                ],
                                name: [
                                    {
                                        validator: checkNull,
                                        required: true,
                                        message: '请输入奖项名称（最长10个字）',
                                        trigger: 'blur'
                                    },
                                    {
                                        min: 1,
                                        max: 10,
                                        message: '长度在 1 到 10 个字符',
                                        trigger: 'blur'
                                    }
                                ],
                                count: [
                                    {
                                        validator: checkMaxNull,
                                        required: true,
                                        message: '请输入奖品数量（正整数）',
                                        trigger: 'blur'
                                    }
                                ],
                                prize_rate: [
                                    {
                                        validator: checkRateNull,
                                        required: true,
                                        message: '请输入抽奖概率（保留两位小数）',
                                        trigger: 'blur'
                                    }
                                ],
                                every_user_day_times: [
                                    {
                                        validator: checkMaxNull,
                                        required: true,
                                        message: '请输入每日最多中奖次数（正整数）',
                                        trigger: 'blur'
                                    }
                                ],
                            }
                        }
                    ]

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
                            max: 5,
                            message: '长度在 1 到 5 个字符',
                            trigger: 'blur'
                        }
                    ],
                    slogan: [
                        {
                            validator: checkNull,
                            required: true,
                            message: '请输入活动标语',
                            trigger: 'blur'
                        },
                        {
                            min: 1,
                            max: 10,
                            message: '长度在 1 到 10 个字符',
                            trigger: 'blur'
                        }
                    ],
                    date: [
                        {
                            validator: checkDate,
                            required: true,
                            message: '请选择活动时间',
                            trigger: 'change'
                        }
                    ],
                    mer_store_id: [
                        {
                            validator: checkIdNull,
                            required: true,
                            message: '请选择门店',
                            trigger: 'change'
                        }
                    ],
                    ruleContent: [
                        {
                            validator: checkRuleNull,
                            required: true,
                            message: '请输入参与规则',
                            trigger: 'blur'
                        },
                    ],
                    limit_condition: [
                        {
                            validator: checkIdNull,
                            required: true,
                            message: '请选择参与限制',
                            trigger: 'change'
                        }
                    ],
                    max_times: [
                        {
                            validator: checkMaxNull,
                            required: true,
                            message: '请设置活动上限次数',
                            trigger: 'blur'
                        }
                    ],
                    onePeople: [
                        {
                            validator: checkUseNull,
                            required: true,
                            message: '请输入正确的单人使用次数(正整数)',
                            trigger: 'blur'
                        },
                    ],
                    prize_rate: [
                        {
                            validator: checkRateNull,
                            required: true,
                            message: '请输入正确的中奖概率(≤100并保留两位小数)',
                            trigger: 'blur'
                        },
                    ],
                    every_user_price_times: [
                        {
                            validator: checkNumNull,
                            required: true,
                            message: '请输入正确的每人中奖次数(正整数)',
                            trigger: 'blur'
                        },
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
             * 添加奖项
             */
            addRule(){
                console.log('添加奖项');
                if(this.form.awards_setting_item.length==5){
                    this.$message('奖项设置已达上限~')
                }else {
                    let list = {
                        grade: '',
                        name: "",
                        count: "",
                        prize_rate: "",
                        every_user_day_times: "",
                        rules1: {
                            grade: [
                                {
                                    validator: (rule, value, callback) => {
                                        if (value.trim() === '') {
                                            callback(new Error(rule.message));
                                        }  else {
                                            callback();
                                        }
                                    },
                                    required: true,
                                    message: '请输入奖项等级',
                                    trigger: 'blur'
                                },
                                {
                                    min: 1,
                                    max: 5,
                                    message: '长度在 1 到 5 个字符',
                                    trigger: 'blur'
                                }
                            ],
                            name: [
                                {
                                    validator: (rule, value, callback) => {
                                        if (value.trim() === '') {
                                            callback(new Error(rule.message));
                                        }  else {
                                            callback();
                                        }
                                    },
                                    required: true,
                                    message: '请输入奖项名称（最长10个字）',
                                    trigger: 'blur'
                                },
                                {
                                    min: 1,
                                    max: 10,
                                    message: '长度在 1 到 10 个字符',
                                    trigger: 'blur'
                                }
                            ],
                            count: [
                                {
                                    validator: (rule, value, callback) => {
                                        if (!reg2.test(value)) {
                                            callback(new Error(rule.message));
                                        }  else {
                                            callback();
                                        }
                                    },
                                    required: true,
                                    message: '请输入奖品数量（正整数）',
                                    trigger: 'blur'
                                }
                            ],
                            prize_rate: [
                                {
                                    validator: (rule, value, callback) => {
                                        if (!reg1.test(value)||value>100 ){
                                            callback(new Error(rule.message));
                                        }  else {
                                            callback();
                                        }
                                    },
                                    required: true,
                                    message: '请输入抽奖概率（保留两位小数）',
                                    trigger: 'blur'
                                }
                            ],
                            every_user_day_times: [
                                {
                                    validator: (rule, value, callback) => {
                                        if (!reg2.test(value)) {
                                            callback(new Error(rule.message));
                                        }  else {
                                            callback();
                                        }
                                    },
                                    required: true,
                                    message: '请输入每日最多中奖次数（正整数）',
                                    trigger: 'blur'
                                }
                            ],
                        }
                    };
                    this.form.awards_setting_item.push(list);
                    // this.$set(this.form.awards_setting_item,this.form.awards_setting_item.length, list);
                    // this.form.awards_setting_item.splice(this.form.awards_setting_item.length, 0, list);
                    console.log(this.form.awards_setting_item);
                }
            },
            /**
             * 删除奖项
             */
            delRule(val,index){
                console.log('删除奖项',val,index);
                if(this.form.awards_setting_item.length==3){
                    this.$message('至少设置三个奖项~')
                }else {
                    this.form.awards_setting_item.splice(index, 1)
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
                    this.form.stime = start.valueOf();
                    this.form.etime = end.valueOf();
                    console.log(this.form.stime,this.form.etime,this.form)
                }else {
                    this.form.stime = this.form.etime = '';
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
                        this.form.every_times_price = this.form.ruleContent.fullValue;
                        this.form.every_times_max = this.form.ruleContent.num;
                        this.form.every_user_max_times = this.form.onePeople.manNum;
                        this.form.every_user_day_max_times = this.form.onePeople.dayNum;
                        this.$confirm('此操作将创建新活动，关闭原有活动, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.submitState = false;
                            this.$axios.post('/mer/marketing/activy/createMarketingActivy', this.form).then(res => {
                                if (res.data.code === this.$webConfig.httpSuccessStatus) {
                                    this.$message({type: 'success', message: '创建成功!'});
                                    this.$router.push('/marketingActivity/list');
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
            if (this.$route.query.activityType) {
                this.form.activy_type = this.$route.query.activityType
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
    .home-title {
        margin: 30px 0;
        font-weight: bold;
    }
    .home-title:first-child {
        margin: 0 0 30px;
        font-weight: bold;
    }
    .ly_hint_text_color {
        margin-top: 6px;
        color: red
    }
</style>