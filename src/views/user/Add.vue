<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-60)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">
                        <h1 class="ly-title-one" style="margin-bottom: 40px">{{title}}</h1>
                        <div class="form-list" v-loading='loading'>
                            <el-form label-position="left" ref="form" :model="form" label-width="90px" :rules="rules">
                                <el-form-item label="员工姓名" prop="real_name">
                                    <el-input v-model="form.real_name" placeholder="请输入姓名"></el-input>
                                </el-form-item>
                                <el-form-item label="手机号码" prop="user_tel" >
                                    <el-input v-model="form.user_tel" placeholder="请输入手机号" type='number'></el-input>
                                </el-form-item>
                                <el-form-item label="登陆账号" prop="user_name">
                                    <el-input v-model="form.user_name" :disabled="$route.query.id" placeholder="请输入账号"></el-input>
                                </el-form-item>
                                <el-form-item label="登陆密码" prop="password"  v-if="!this.form.id">
                                    <el-input v-model="form.password" placeholder="请输入登陆密码" type='password'></el-input>
                                </el-form-item>
                                <el-form-item label="确认密码" prop="checkPass"  v-if="!this.form.id">
                                    <el-input v-model="form.checkPass" placeholder="请输入确认密码" type='password'></el-input>
                                </el-form-item>
                                <!-- <el-form-item label="系统角色" prop="region">
                                    <el-select v-model="form.region" placeholder="请选择角色">
                                        <el-option label="店长" value="shanghai"></el-option>
                                        <el-option label="收营员" value="beijing"></el-option>
                                        <el-option label="服务员" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item> -->
                                <el-form-item label="选择门店" prop="mer_store_id">
                                    <el-select v-model="form.mer_store_id" placeholder="请选择门店">
                                         <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.value"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="选择角色" prop="role_id">
                                    <el-select v-model="form.role_id" placeholder="请选择角色">
                                         <el-option
                                            :disabled="item.disabled ? true : false"
                                            v-for="item in roleList"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id"
                                            >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <!-- <el-form-item label="收银权限" prop="region">
                                    <el-radio-group>
                                        <el-radio label="开启"></el-radio>
                                        <el-radio label="不开启"></el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="退款权限" prop="region">
                                    <el-radio-group>
                                        <el-radio label="开启"></el-radio>
                                        <el-radio label="不开启"></el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="后台权限" prop="region">
                                    <el-radio-group>
                                        <el-radio label="A"></el-radio>
                                        <el-radio label="B"></el-radio>
                                    </el-radio-group>
                                </el-form-item> -->

                                <el-form-item>
                                    <el-button type="primary" @click="submitForm('form')">{{btnText}}</el-button>
                                    <el-button type="primary" @click="$router.push('/user/list')">取消</el-button>
                                    <!-- <el-button @click="resetForm('form')">重置</el-button> -->
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
                 var checkNull = (rule, value, callback) => {
                        if (value.trim() === '') {
                            callback(new Error('请填写非空格字符'));
                        }  else {
                            callback();
                        }
                    };
                var validatePass = (rule, value, callback) => {
                    if (value === '') {
                       callback(new Error('请输入密码'));
                    } else {
                    if (this.form.checkPass !== '') {
                        this.$refs.form.validateField('checkPass');
                    }
                    callback();
                    }
                };
                var validatePass2 = (rule, value, callback) => {
                    if (value === '') {
                      callback(new Error('请再次输入密码'));
                    } else if (value !== this.form.password) {
                       callback(new Error('两次输入密码不一致!'));
                    } else {
                       callback();
                    }
                };
            return {
                loading:false,
                title:'添加店员',//标题
                btnText:'立即创建',//按钮
                options:'',//门店列表
                roleList:'',//角色列表
                form: {
                    id:'',
                    // manager_use_permissions: "",//后台使用权限
                    password: "",
                    real_name: "",//用户名
                    // receipt_permissions: 0,
                    // role_id: 0,
                    user_name: "",//账户
                    user_tel: "",//手机号
                    checkPass:'',//二次密码
                    mer_store_id:'',
                    role_id:'',//角色id
                },
                rules: {
                    real_name: [{
                        required: true,
                        validator: checkNull,
                        message: '请输入姓名',
                        trigger: 'blur'
                      }
                    ],
                    user_tel:[
                       {
                           required:true,
                           message:"请输入手机号",

                           trigger:"blur"
                       },
                       {
                           min: 1,
                           max: 11,
                           message:"请输入正确手机号",
                           trigger:"blur"
                       }
                    ],
                     user_name:[
                        {
                           required:true,
                           validator: checkNull,
                           message:"请输入账号",
                           trigger:"blur"
                       }
                    ],
                     password: [
                        { required:true,validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        {required:true, validator: validatePass2, trigger: 'blur' }
                    ],
                    mer_store_id:[
                         {
                           required:true,
                           message:"请选择门店",
                           trigger:"blur"
                       }
                    ],
                    role_id:[
                         {
                           required:true,
                           message:"请选择角色",
                           trigger:"blur"
                       }
                    ]

                },
            }
        },
        methods:{
            /**
             * 获取角色list
             * @param formName
             */
            getRole(){
                this.$axios.post('/mer/user/role').then(res=>{
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        this.roleList = res.data.data;
                    }
                }).catch(rej=>{
                    console.log('失败',rej);
                    this.$message.error('网络异常!')
                })
            },
            //提交
            submitForm(formName){
                console.log("form",this.form);
                 this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading=true;
                        this.$axios.post('/mer/user/add/merUser',this.form)
                        .then(res=>{
                          this.loading=false;
                              console.log('结果',res);
                            if(res.data.code==200){
                                this.$message.success('操作成功');
                                this.$router.push({name:'userList'})
                            }else{
                             this.$message.error(res.data.message)
                            }
                           console.log('修改',res)
                        })
                        .catch(rej=>{
                           this.loading=false;

                           this.$message.error("网络异常")
                                console.log('失败',rej)
                        })
                    }else{
                        console.log(valid)
                    }
                })
            }
        },
        created(){
            // 获取角色列表
            this.getRole();
            //获取门店列表
            this.$axios.post('/mer/store/all/list')
            .then(res=>{
                console.log('获取门店',res)
                if(res.data.code==200){
                    this.options=res.data.data
                }
            })
            .catch(rej=>{
                console.log('失败',rej)
                this.$message.error('网络异常!')
            })
               let id=this.$route.query.id
            if(id){
                this.title='修改信息';
                this.btnText='修改';
                this.loading=true
                this.$axios.get('/mer/user/detail?id='+id)
                .then(res=>{
                    this.loading=false
                    console.log("获取详情",res)
                    if(res.data.code==200){
                        this.form=res.data.data
                    }else{
                        this.$message.error("网络异常")
                    }
                    console.log("获取详情",res)
                 })
                 .catch(rej=>{
                     this.loading=false
                     console.log("失败",rej)
                     this.$message.error("网络异常")
                 })
                }
        }

    }
</script>

<style >
  input[type=number] {
    -moz-appearance: textfield;
  }
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>