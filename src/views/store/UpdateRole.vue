<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <div class="third-nav-t">修改角色</div>
            </div>
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">
                        <div class="form-list">
                            <el-form label-position="left" ref="form" :model="form" label-width="90px" :rules="rules">
                                <el-form-item label="角色名" prop="name">
                                    <el-input v-model="form.name" placeholder="请输入角色名"></el-input>
                                </el-form-item>
                                <el-form-item label="选择权限" prop="role_list">
                                    <el-cascader
                                            v-model="form.role_list"
                                            :options="roleList"
                                            :props="props"
                                            @change="roleChange"
                                            placeholder="请输入角色权限"
                                            clearable></el-cascader>
                                </el-form-item>
                                <el-form-item label="是否启用" prop="status">
                                    <el-switch
                                            v-model="form.status"
                                            @change="updateStatus"
                                            active-text="启用"
                                            inactive-text="禁用"
                                            active-value="1"
                                            inactive-value="0">
                                    </el-switch>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitForm('form')" v-loading="submitState">提交</el-button>
                                    <el-button type="primary" @click="$router.push('/store/role')">取消</el-button>
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
    let map = {1:'1',0:'0'};
    export default {
        name: "AddRole",
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
            var checkArrNull = (rule, value, callback) => {
                if (value.length === 0) {
                    callback(new Error(rule.message));
                }  else {
                    callback();
                }
            };
            return {
                roleList: [],
                props: {
                    multiple: true,
                    value: 'id',
                    label: 'name',
                },
                submitState: false,
                form: {
                    id: "",
                    name: "",
                    menu_ids: [],
                    role_list: [],
                    status: 1,
                },
                rules: {
                    name: [
                        {
                            validator: checkNull,
                            required: true,
                            message: '请输入角色名',
                            trigger: 'blur'
                        },
                        {
                            min: 1,
                            max: 15,
                            message: '长度在 1 到 15 个字符',
                            trigger: 'blur'
                        }
                    ],
                    role_list: [
                        {
                            validator: checkArrNull,
                            required: true,
                            message: '请选择权限',
                            trigger: 'change'
                        }
                    ],
                },
                role_list: [],
            }
        },
        computed: {
            getWinHeight: function () {
                return this.$winHeight;
            }
        },
        methods: {
            /**
             *  是否禁用
             */
            updateStatus(){
                console.log(this.form.status);
            },
            /**
             *  权限选择
             */
            roleChange(){
                console.log(this.form.role_list);
            },
            /**
             * 提交
             * @param formName
             */
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let list = JSON.stringify(this.form.role_list);
                        this.submitState = true;
                        // this.form.menu_ids = this.form.role_list.flat();
                        for(var i=0;i<this.form.role_list.length;i++){
                            this.form.menu_ids = this.form.menu_ids.concat(this.form.role_list[i])
                        }
                        this.form.role_list = JSON.parse(list);
                        this.$axios.post('/mer/role/saveRole', this.form).then(res => {
                            if (res.data.code === this.$webConfig.httpSuccessStatus) {
                                this.$message('修改成功');
                                this.$router.push('/store/role');
                            } else {
                                this.form.role_list = JSON.parse(list);
                                this.$message(res.data.message);
                            }
                            this.submitState = false;
                        }).catch(() => {
                            this.submitState = false;
                            this.form.role_list = JSON.parse(list);
                        })
                    } else {
                        return false;
                    }
                });
            },
            /**
             *  获取权限list
             */
            getList(){
                this.$axios.get('/mer/role/getRoleMenu').then(res=>{
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        this.roleList = res.data.data;
                    }else {
                        this.$message(res.data.message);
                    }
                })
            },
            /**
             *  获取角色详情
             */
            getDetail(){
                this.$axios.post('/mer/role/getRoleMenuPermissions',{"role_id":this.form.id}).then(res=>{
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        this.form.name = res.data.data.role_name;
                        this.form.role_list = res.data.data.menus;
                        this.form.status = map[res.data.data.status];
                    }else {
                        this.$message(res.data.message);
                    }
                })
            }
        },
        mounted: function () {
            if (this.$route.query.roleId) {
                this.form.id = this.$route.query.roleId
            }
            // 获取权限选择器list
            this.getList();
            // 获取详情
            this.getDetail();
        },
    }
</script>

<style scoped>

</style>