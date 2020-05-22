<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <div class="third-nav-t">添加店员</div>
            </div>
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">
                        <div class="form-list">
                            <el-form label-position="left" ref="form" :model="form" label-width="90px" :rules="rules">
                                <el-form-item label="员工姓名" prop="name">
                                    <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
                                </el-form-item>
                                <el-form-item label="手机号码" prop="name">
                                    <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
                                </el-form-item>
                                <el-form-item label="登陆账号" prop="name">
                                    <el-input v-model="form.name" placeholder="请输入账号"></el-input>
                                </el-form-item>
                                <el-form-item label="登陆密码" prop="name">
                                    <el-input v-model="form.name" placeholder="请输入登陆密码"></el-input>
                                </el-form-item>
                                <el-form-item label="确认密码" prop="name">
                                    <el-input v-model="form.name" placeholder="请输入确认密码"></el-input>
                                </el-form-item>
                                <el-form-item label="系统角色" prop="region">
                                    <el-select v-model="form.region" placeholder="请选择角色">
                                        <el-option label="店长" value="shanghai"></el-option>
                                        <el-option label="收营员" value="beijing"></el-option>
                                        <el-option label="服务员" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="选择门店" prop="region">
                                    <el-select v-model="form.region" placeholder="请选择门店">
                                        <el-option label="门店1" value="shanghai"></el-option>
                                        <el-option label="门店2" value="beijing"></el-option>
                                        <el-option label="门店3" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="收银权限" prop="region">
                                    <el-radio-group-group>
                                        <el-radio label="开启"></el-radio>
                                        <el-radio label="不开启"></el-radio>
                                    </el-radio-group-group>
                                </el-form-item>
                                <el-form-item label="退款权限" prop="region">
                                    <el-radio-group-group>
                                        <el-radio label="开启"></el-radio>
                                        <el-radio label="不开启"></el-radio>
                                    </el-radio-group-group>
                                </el-form-item>
                                <el-form-item label="后台权限" prop="region">
                                    <el-radio-group-group>
                                        <el-radio label="A"></el-radio>
                                        <el-radio label="B"></el-radio>
                                    </el-radio-group-group>
                                </el-form-item>

                                <el-form-item>
                                    <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
                                    <el-button @click="resetForm('form')">重置</el-button>
                                    <el-button>取消</el-button>
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

    export default {
        name: "Add",
        components: {CommonFooter},
        computed: {
            getWinHeight: function () {
                return this.$winHeight;
            }
        },
        data: function () {
            return {
                form: {
                    name: null
                },
                rules: {
                    name: [{
                        required: true,
                        message: '请输入账号',
                        trigger: 'blur'
                    },
                        {
                            min: 3,
                            max: 5,
                            message: '长度在 3 到 5 个字符',
                            trigger: 'blur'
                        }
                    ],
                    region: [{
                        required: true,
                        message: '请选择活动区域',
                        trigger: 'change'
                    }],
                    type: [{
                        type: 'array',
                        required: true,
                        message: '请至少选择一个活动性质',
                        trigger: 'change'
                    }],
                    resource: [{
                        required: true,
                        message: '请选择活动资源',
                        trigger: 'change'
                    }],
                    desc: [{
                        required: true,
                        message: '请填写活动形式',
                        trigger: 'blur'
                    }]
                },
            }
        },

    }
</script>

<style scoped>

</style>