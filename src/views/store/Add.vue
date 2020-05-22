<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-60)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">
                        <h1 class="ly-title-one" style="margin-bottom: 40px">添加门店</h1>
                        <div class="form-list">
                            <el-form label-position="left" ref="form" :model="form" label-width="90px" :rules="rules">
                                <el-form-item label="门店名" prop="store_name">
                                    <el-input v-model="form.store_name" placeholder="请输入门店名"></el-input>
                                </el-form-item>
                                <el-form-item label="电话" prop="sotre_phone">
                                    <el-input v-model="form.sotre_phone" placeholder="请输入电话"></el-input>
                                </el-form-item>
                                <el-form-item label="地址" prop="store_address">
                                    <el-input v-model="form.store_address" placeholder="请输入地址"></el-input>
                                </el-form-item>
                               <!-- <el-form-item label="激活码配置" prop="device_no">
                                    <el-select v-model="form.device_no" placeholder="请选择激活码">
                                        <el-option v-for="item in codeList"
                                                   :key="item.id"
                                                   :label="item.value"
                                                   :value="item.id"></el-option>
                                    </el-select>
                                </el-form-item>-->
                                <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                                <el-form-item label="门店logo" prop="imgUrl">
                                    <el-upload
                                            class="avatar-uploader"
                                            :action="this.$webConfig.qnUploadHost"
                                            :data="qn"
                                            :show-file-list="false"
                                            :on-success="handleAvatarSuccess"
                                            :before-upload="beforeAvatarUpload">
                                        <img v-if="form.imgUrl" :src="form.imgUrl" class="avatar" @click="getToken()">
                                        <i v-else class="el-icon-plus avatar-uploader-icon" @click="getToken()"></i>
                                    </el-upload>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitForm('form')" v-loading="submitState">提交</el-button>
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
    // import third_nav from '../../../components/third-nav.vue'
    import CommonFooter from '../../components/CommonFooter.vue'

    export default {
        name: "add",
        components: {
            // third_nav,
            CommonFooter
        },
        computed: {
            getWinHeight: function () {
                return this.$winHeight;
            }
        },
        data() {
            var checkShopName = (rule, value, callback) => {
                if (value.trim() === '') {
                    callback(new Error('门店名必填，20字以内'));
                }  else {
                    callback();
                }
            };
            var checkTel = (rule, value, callback) => {
                let reg = /^([0-9]{3,4}-)?[0-9]{7,8}|800[0-9]{7}|1(3|4|7|5|6|9|8)([0-9]{9})|0[0-9]{2,3}-[0-9]{8}$|\d{3,4}-\d{3,4}-\d{3,4}/;
                const isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/; // 0571-86295197
                const isPhone02 = /^\d{3,4}-\d{3,4}-\d{3,4}$/; // 4001-550-520
                const isMob=/^1[0-9]{10}$/;
                if (value.trim() === '') {
                    callback(new Error('联系电话必填，手机号或座机'));
                } else {
                    callback();
                }
            };
            var checkAddress = (rule, value, callback) => {
                if (value.trim() === '') {
                    callback(new Error('地址必填'));
                }  else {
                    callback();
                }
            };
            return {
                qn: {
                    token: "",
                    key: ""
                },
                submitState: false,
                codeList: [],//激活码list
                winHeight: window.innerHeight,
                form: {
                    store_name: '',
                    sotre_phone: '',
                    store_address: '',
                    // device_no: '',
                    store_logo: '',
                    imgUrl: ''
                },
                store_logo: '',
                rules: {
                    store_name: [
                        {
                            validator: checkShopName,
                            required: true,
                            message: '请输入门店名',
                            trigger: 'blur'
                        }
                    ],
                    sotre_phone: [
                        {
                            validator: checkTel,
                            required: true,
                            message: '请输入联系电话',
                            trigger: 'blur'
                        }
                    ],
                    store_address: [
                        {
                            validator: checkAddress,
                            required: true,
                            message: '请输入地址',
                            trigger: 'blur'
                        }
                    ]
                },
            }
        },
        methods: {
            //获取token
            getToken(id){
                console.log("aaa",id);
                this.$axios.post('/mer/file/getUploadAuth')
                    .then(res=>{
                        this.qn.token = res.data.data.file_upload_auth;
                        console.log("获取token",res)
                    })
                    .catch(rej=>{
                        console.log("失败",rej)
                    })
            },
            /**
             * 获取激活码列表
             */
            getCodeList() {
                this.$axios.post('/mer/store/merDevice/list').then(res => {
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        this.codeList = res.data.data;
                    }else {
                        this.$message(res.data.message);
                    }
                })
                    .catch(() => {

                    });
            },
            onSubmit() {
                console.log('submit!');
            },
            /**
             *  上传成功
             */
            handleAvatarSuccess(res, file) {
                this.form.imgUrl = URL.createObjectURL(file.raw);
                this.form.store_logo = this.$webConfig.apiHosts + this.qn.key;
            },
            /**
             *  上传前判断
             */
            beforeAvatarUpload(file) {
                this.qn.key = new Date().getTime()+file.name;  //上传到七牛的key
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;
                console.log("获取token成功",this.qn);
                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            /**
             * 提交
             * @param formName
             */
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log('submit!');
                        this.submitState = true;
                        this.$axios.post('/mer/store/saveOrUpdate',this.form).then(res => {
                            console.log(res);
                            if (res.data.code === this.$webConfig.httpSuccessStatus) {
                                this.$message('添加成功');
                                this.$router.push('/store/list');
                            }else {
                                this.$message(res.data.message);
                            }
                            this.submitState = false;
                        }).catch(()=>{
                            this.submitState = false;
                        })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        mounted() {
            // 获取激活码列表
            // this.getCodeList();
        }
    }
</script>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 140px;
        height: 140px;
        line-height: 140px;
        text-align: center;
    }

    .avatar {
        width: 140px;
        height: 140px;
        display: block;
    }
</style>

