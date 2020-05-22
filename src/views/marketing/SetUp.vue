<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <div class="third-nav-t">会员卡设置</div>
            </div>
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">
                        <div class="form-list">
                            <el-form label-position="left" ref="form" :model="form" label-width="100px" :rules="rules">
                                <div class="home-title">
                                    <span class="home-title-t ly-title">会员卡信息</span>
                                </div>
                                <el-form-item label="会员卡名称" prop="card_name">
                                    <el-input v-model="form.card_name" maxlength="10" placeholder="请输入会员卡名称"></el-input>
                                    <p class="ly_hint_text">最多输入10个字，例：肯德基优享会员</p>
                                </el-form-item>
                                <el-form-item label="宣传语" prop="card_slogan">
                                    <el-input v-model="form.card_slogan" maxlength="15" placeholder="请输入宣传语"></el-input>
                                    <p class="ly_hint_text">最多输入15个字，例：享受极致购物体验</p>
                                </el-form-item>
                                <el-form-item label="会员卡样式" prop="card_style">
                                    <el-radio v-model="form.card_style" :label="ele.id" v-for="(ele,i) in cardStyle"
                                              :key="i">
                                        <img :src="ele.url" alt="" style="width: 192px;height: 108px;">
                                    </el-radio>
                                </el-form-item>
                                <el-form-item label="会员卡数量" prop="card_count">
                                    <div class="ly-flex-style">
                                        <el-input v-model="form.card_count"></el-input>
                                        <p>张</p>
                                    </div>
                                    <p class="ly_hint_text">注：不填或填写0，则为不限数量</p>
                                </el-form-item>

                                <el-form-item label="联系电话" prop="card_phone">
                                    <el-input v-model="form.card_phone"></el-input>
                                </el-form-item>
                                <div class="home-title">
                                    <span class="home-title-t ly-title">会员卡状态</span>
                                </div>
                                <el-form-item label="会员卡状态" prop="card_status">
                                    <el-radio v-model="form.card_status" :label="ele.value" v-for="(ele,i) in cardStatus"
                                              :key="i">{{ele.label}}</el-radio>
                                </el-form-item>

                                <el-form-item>
                                    <el-button type="primary" @click="submitForm('form')" v-loading="submitState">提交
                                    </el-button>
                                    <!--<el-button type="primary" @click="$router.push('/activity/index')">取消</el-button>-->
                                    <!--<el-button @click="resetForm('form')">重置</el-button>-->
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SetUp",
        computed: {
            getWinHeight: function () {
                return this.$winHeight;
            }
        },
        data() {
            var checkNull = (rule, value, callback) => {
                if (value.trim() === '') {
                    callback(new Error(rule.message));
                } else {
                    callback();
                }
            };
            var checkNull2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(rule.message));
                } else {
                    callback();
                }
            };
            var checkNum = (rule, value, callback) => {
                let reg = /^[+]{0,1}(\d+)$/; //包含0，正整数
                if (!reg.test(value)) {
                    callback(new Error(rule.message));
                } else {
                    callback();
                    return true
                }
            };
            return {
                submitState: false,
                form: {
                    card_name: "",
                    card_slogan: "",//宣传语
                    card_style: 1,//样式【1：样式一 |2：样式二 |3：样式三 | 4：样式四】
                    card_count: "",//发行数量
                    card_status: 1,//会员卡状态【1：启用，0：禁用】
                    card_phone: "",//联系电话
                },
                rules: {
                    card_name: [
                        {
                            validator: checkNull,
                            required: true,
                            message: '请输入会员卡名称',
                            trigger: 'blur'
                        },
                        {
                            min: 1,
                            max: 10,
                            message: '长度在 1 到 10 个字符',
                            trigger: 'blur'
                        }
                    ],
                    card_phone: [
                        {
                            validator: checkNull,
                            required: true,
                            message: '请输入联系电话',
                            trigger: 'blur'
                        }
                    ],
                    card_style: [
                        {
                            validator: checkNull2,
                            required: true,
                            message: '请选择会员卡样式',
                            trigger: 'change'
                        }
                    ],
                    card_status: [
                        {
                            validator: checkNull2,
                            required: true,
                            message: '请选择会员卡状态',
                            trigger: 'change'
                        }
                    ],
                    card_count: [
                        {
                            validator: checkNum,
                            required: false,
                            message: '请输入正整数',
                            trigger: 'blur'
                        }
                    ]
                },
                cardStyle: [
                    {
                        id: 1,
                        url: require('../../assets/img/member/card1.png')
                    },
                    {
                        id: 2,
                        url: require('../../assets/img/member/card2.png')
                    },
                    {
                        id: 3,
                        url: require('../../assets/img/member/card3.png')
                    },
                    {
                        id: 4,
                        url: require('../../assets/img/member/card4.png')
                    }
                ],
                cardStatus: [
                    {
                        value: 1,
                        label: '开启'
                    },
                    {
                        value: 0,
                        label: '禁用'
                    }
                ]
            }
        },
        methods: {
            /**
             *  获取会员卡信息
             */
            getDetail() {
                this.$axios.post('/mer/vipCard/getConf').then(res => {
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        this.form = res.data.data;
                        // this.$message({type: 'success', message: '获取成功!'});
                    } else {
                        this.$message(res.data.message);
                    }
                }).catch(() => {

                });
            },
            /**
             * 提交
             * @param formName
             */
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.submitState = true;
                        console.log('提交', this.form);
                        this.$confirm('此操作将提交会员卡设置, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.$axios.post('/mer/vipCard/saveConf', this.form).then(res => {
                                if (res.data.code === this.$webConfig.httpSuccessStatus) {
                                    this.$message({type: 'success', message: '设置成功!'});
                                    this.getDetail();
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
        mounted() {
            //获取会员卡信息
            this.getDetail();
        }
    }
</script>

<style scoped>
    .el-radio {
        width: 240px;
        margin: 0 10px 30px;
    }

    .home-title {
        margin-bottom: 20px;
    }

    .ly-title {
        /*font-size: 16px;*/
        font-weight: 900;
    }
</style>
