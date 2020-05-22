<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <!--			<third_nav></third_nav>-->
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">
                        <div class="form-list" v-show='status==2' style="margin-top: 30px" v-loading="loading">
                            <p class="error">提示：{{reason}}</p>
                        </div>
                        <el-form label-position="left" ref="form1" :model="form" label-width="140px">
                         <!-- 基本资料 -->
                        <h1 class="ly-title-one">基本信息</h1>
                        <div class="form-list" style="margin-top: 30px" v-loading="loading">
                                <el-form-item label="有无营业执照:" prop="channel_type" required :rules='rules.channel_type'>
                                    <el-radio v-model="form.channel_type" label="TP_MERCHANT">有营业执照</el-radio>
                                    <el-radio v-model="form.channel_type" label="TP_PERSONAL">无营业执照</el-radio>
                                </el-form-item>
                                <el-form-item label="法人姓名:" prop="real_name" :rules='rules.real_name'>
                                    <el-input v-model="form.real_name" placeholder="请输入法人姓名"></el-input>
                                </el-form-item>
                                <el-form-item label="身份证号:" prop="idcard" :rules='rules.idcard'>
                                    <el-input v-model="form.idcard" placeholder="请输入身份证号"></el-input>
                                </el-form-item>
                                <!-- id_card_expire -->
                                <el-form-item label="身份证有效期:" prop="dateID"  :rules='rules.dateID'>
                                    <el-radio v-model="form.dateID" label="1">选择时间</el-radio>
                                    <el-date-picker
                                            v-show="form.dateID==1"
                                            v-model="valueID"
                                            @change='pickTime'
                                            type="daterange"
                                            range-separator="至"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期">
                                    </el-date-picker>
                                    <el-radio v-model="form.dateID" label="0">永久</el-radio>
                                </el-form-item>
                                <el-form-item label="身份证—头像照:" required>
                                    <div class="tip">信息必须清晰可见</div>
                                    <el-upload
                                            class="avatar-uploader"
                                            :action="this.$webConfig.qnUploadHost"
                                            :data="qn"
                                            :show-file-list="false"
                                            :on-preview="handlePictureCardPreview"
                                            :on-success="handleAvatarSuccess"
                                            :before-upload="beforeAvatarUpload">
                                        <img v-if="id_card_positive_pic" :src="id_card_positive_pic" class="avatar"
                                             @click="getToken('id_card_positive_pic')">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"
                                           @click="getToken('id_card_positive_pic')"></i>
                                    </el-upload>
                                    <img class="imgDemo" src="../../assets/img/home/idP.png" alt="示例图" title="示例图">
                                </el-form-item>
                                <el-form-item label="身份证—国徽照:" required>
                                    <div class="tip">信息必须清晰可见</div>
                                    <el-upload
                                            class="avatar-uploader"
                                            :action="this.$webConfig.qnUploadHost"
                                            :data="qn"
                                            :show-file-list="false"
                                            :on-preview="handlePictureCardPreview"
                                            :on-remove="handleRemove"
                                            :on-success="handleAvatarSuccess"
                                            :before-upload="beforeAvatarUpload">
                                        <img v-if="id_card_negative_pic" :src="id_card_negative_pic" class="avatar"
                                             @click="getToken('id_card_negative_pic')">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"
                                           @click="getToken('id_card_negative_pic')"></i>
                                    </el-upload>
                                    <img class="imgDemo" src="../../assets/img/home/idF.png" alt="示例图" title="示例图">
                                </el-form-item>
                                <!-- <el-form-item label="手持身份证照:" required>
                                    <div class="tip">必须本人手持身份证照片</div>
                                    <el-upload
                                            class="avatar-uploader"
                                            :action="this.$webConfig.qnUploadHost"
                                            :data="qn"
                                            :show-file-list="false"
                                            :on-preview="handlePictureCardPreview"
                                            :on-remove="handleRemove"
                                            :on-success="handleAvatarSuccess"
                                            :before-upload="beforeAvatarUpload">
                                        <img v-if="holding_certificate_pic" :src="holding_certificate_pic"
                                             class="avatar" @click="getToken('holding_certificate_pic')">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"
                                           @click="getToken('holding_certificate_pic')"></i>
                                    </el-upload>
                                    <img class="imgDemo" src="../../assets/img/home/idH.png" alt="示例图" title="示例图">
                                </el-form-item> -->
                        </div>
                        <!-- 银行卡信息 -->
                        <h1 class="ly-title-one">银行卡信息</h1>
                        <div class="form-list" style="margin-top: 30px" v-loading="loading">
                                <el-form-item label="结算银行卡号:" prop="iccard" :rules='rules.iccard'>
                                    <el-input v-model="form.iccard" placeholder="请输入结算银行卡号"></el-input>
                                </el-form-item>
                                <el-form-item label="持卡人姓名:" prop="icname" :rules='rules.icname'>
                                    <el-input v-model="form.icname" placeholder="请输入持卡人姓名"></el-input>
                                </el-form-item>
                                <el-form-item label="开户行:" prop="settle_bank"  :rules='rules.bank'>
                                    <el-input v-model="form.settle_bank" placeholder="请输入开户行"></el-input>
                                </el-form-item>
                                <!-- <el-form-item label="开户银行支行:" prop="settle_bank_branch"  :rules='rules.subbank'>
                                    <el-input v-model="form.settle_bank_branch" placeholder="请输入开户银行支行"></el-input>
                                </el-form-item> -->
                                <el-form-item label="开户银行支行:" prop="settle_bank_branch"  :rules='rules.subbank'>
                                    <el-select
                                        v-model="form.settle_bank_branch"
                                        filterable
                                        remote
                                        reserve-keyword
                                        placeholder="请输入银行支行"
                                        @change='changeBD'
                                        :remote-method="remoteMethod"
                                        :loading="loadingBD">
                                        <el-option
                                            v-for="item in optionsBD"
                                            :key="item.opening_bank"
                                            :label="item.bank_name"
                                            :value="item"> 
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="账户类型:" prop="account_kind" v-if="form.channel_type == 'TP_MERCHANT'" :rules='rules.account_kind'>
                                     <el-select v-model="form.account_kind" placeholder="请选择账户类型">
                                        <el-option
                                            v-for="item in optionsGS"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="上传开户许可证:" required v-show="form.account_kind == 57">
                                    <el-upload
                                            class="avatar-uploader"
                                            :action="this.$webConfig.qnUploadHost"
                                            :data="qn"
                                            :show-file-list="false"
                                            :on-preview="handlePictureCardPreview"
                                            :on-remove="handleRemove"
                                            :on-success="handleAvatarSuccess"
                                            :before-upload="beforeAvatarUpload">
                                        <img v-if="permits_accounts_pic" :src="permits_accounts_pic"
                                             class="avatar" @click="getToken('permits_accounts_pic')">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"
                                           @click="getToken('permits_accounts_pic')"></i>
                                    </el-upload>
                                    <img class="imgDemo" src="../../assets/img/home/open.png" alt="示例图" title="示例图">
                                </el-form-item>
                                <el-form-item label="银行卡正面照:" required>
                                    <div class="tip">必须包含完整卡号信息</div>
                                    <el-upload
                                            class="avatar-uploader"
                                            :action="this.$webConfig.qnUploadHost"
                                            :data="qn"
                                            :show-file-list="false"
                                            :on-preview="handlePictureCardPreview"
                                            :on-remove="handleRemove"
                                            :on-success="handleAvatarSuccess"
                                            :before-upload="beforeAvatarUpload">
                                        <img v-if="bank_card_pic" :src="bank_card_pic" class="avatar"
                                             @click="getToken('bank_card_pic')">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"
                                           @click="getToken('bank_card_pic')"></i>
                                    </el-upload>
                                    <img class="imgDemo" src="../../assets/img/home/ic.png" alt="示例图" title="示例图">
                                </el-form-item>
                        </div>
                        <!-- 商铺资料 -->
                        <h1 class="ly-title-one">商铺资料</h1>
                        <div class="form-list" style="margin-top: 30px" v-loading="loading">
                               <el-form-item label="商铺名称:" prop="mer_short_name" :rules='rules.sname'>
                                    <el-input v-model="form.mer_short_name" placeholder="请输入商铺名称"></el-input>
                                </el-form-item>
                                <el-form-item label="上传营业执照:" required v-if="form.channel_type == 'TP_MERCHANT'">
                                    <div class="tip">营业执照经营者必须与用户真实姓名一致</div>
                                    <el-upload
                                            class="avatar-uploader"
                                            :action="this.$webConfig.qnUploadHost"
                                            :data="qn"
                                            :show-file-list="false"
                                            :on-preview="handlePictureCardPreview"
                                            :on-remove="handleRemove"
                                            :on-success="handleAvatarSuccess"
                                            :before-upload="beforeAvatarUpload">
                                        <img v-if="business_license_pic_url" :src="business_license_pic_url"
                                             class="avatar" @click="getToken('business_license_pic_url')">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"
                                           @click="getToken('business_license_pic_url')"></i>
                                    </el-upload>
                                    <img class="imgDemo" src="../../assets/img/home/yyzz.png" alt="示例图" title="示例图">
                                </el-form-item>
                                <el-form-item label="统一社会信用代码:" prop="yenum" :rules='rules.yenum' v-if="form.channel_type == 'TP_MERCHANT'">
                                    <el-input v-model="form.yenum" placeholder="请输入统一社会信用代码"></el-input>
                                </el-form-item>
                                <el-form-item label="营业执照注册名称:" prop="yename" :rules='rules.yename' v-if="form.channel_type == 'TP_MERCHANT'">
                                    <el-input v-model="form.yename" placeholder="请输入营业执照注册名称"></el-input>
                                </el-form-item>
                                <!-- <el-form-item label="营业执照有效期:" prop="dateT" required :rules='rules.dateT'>
                                    <el-radio v-model="form.dateT" label="1">选择时间</el-radio>
                                    <el-date-picker
                                            v-show="form.dateT==1"
                                            v-model="value6"
                                            @change='pickTimeyy'
                                            type="daterange"
                                            range-separator="至"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期">
                                    </el-date-picker>
                                    <el-radio v-model="form.dateT" label="0">永久</el-radio>
                                </el-form-item> -->
                                <el-form-item label="区域:" prop="area" required :rules='rules.area'>
                                    <el-cascader
                                            :options="optionsCt"
                                            @change="handleCtChange"
                                            @active-item-change="handleCtChangeAc"
                                            :props="propsCt"
                                    ></el-cascader>
                                </el-form-item>
                                <el-form-item label="详细地址:" prop="address"  :rules='rules.address'>
                                    <el-input v-model="form.address" placeholder="请输入详细地址"></el-input>
                                </el-form-item>
                                <el-form-item label="行业:" prop="trade" :rules='rules.trade' required>
                                    <el-cascader
                                            :options="options2"
                                            @change="handleChange"
                                            @active-item-change="handleItemChange"
                                            :props="props">
                                    </el-cascader>
                                </el-form-item>
                                <el-form-item label="经营内容:" prop="biz_content" :rules='rules.biz_content'>
                                    <el-select v-model="form.biz_content" placeholder="请选择经营内容">
                                        <el-option
                                            v-for="item in optionscont"
                                            :key="item.code"
                                            :label="item.name"
                                            :value="item.code">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="上传经营许可证:" required v-show="imgNeed!=0">
                                    <div class="tip">{{licence}}</div>
                                    <el-upload
                                            class="avatar-uploader"
                                            :action="this.$webConfig.qnUploadHost"
                                            :data="qn"
                                            :show-file-list="false"
                                            :on-preview="handlePictureCardPreview"
                                            :on-remove="handleRemove"
                                            :on-success="handleAvatarSuccess"
                                            :before-upload="beforeAvatarUpload">
                                        <img v-if="certification_requirements_pic" :src="certification_requirements_pic"
                                             class="avatar" @click="getToken('certification_requirements_pic')">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"
                                           @click="getToken('certification_requirements_pic')"></i>
                                    </el-upload>

                                </el-form-item>
                                <el-form-item label="门头照:" required>
                                    <el-upload
                                            class="avatar-uploader"
                                            :action="this.$webConfig.qnUploadHost"
                                            :data="qn"
                                            :show-file-list="false"
                                            :on-preview="handlePictureCardPreview"
                                            :on-remove="handleRemove"
                                            :on-success="handleAvatarSuccess"
                                            :before-upload="beforeAvatarUpload">
                                        <img v-if="shop_sign_board_pic" :src="shop_sign_board_pic" class="avatar"
                                             @click="getToken('shop_sign_board_pic')">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"
                                           @click="getToken('shop_sign_board_pic')"></i>
                                    </el-upload>
                                    <img class="imgDemo" src="../../assets/img/home/door.png" alt="示例图" title="示例图">
                                </el-form-item>
                                <el-form-item label="收银台照片:" required>
                                    <el-upload
                                            class="avatar-uploader"
                                            :action="this.$webConfig.qnUploadHost"
                                            :data="qn"
                                            :show-file-list="false"
                                            :on-preview="handlePictureCardPreview"
                                            :on-remove="handleRemove"
                                            :on-success="handleAvatarSuccess"
                                            :before-upload="beforeAvatarUpload">
                                        <img v-if="cashier_desk_pic" :src="cashier_desk_pic" class="avatar"
                                             @click="getToken('cashier_desk_pic')">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"
                                           @click="getToken('cashier_desk_pic')"></i>
                                    </el-upload>
                                    <img class="imgDemo" src="../../assets/img/home/syt.png" alt="示例图" title="示例图">
                                </el-form-item>
                                <el-form-item label="店内环境照:" required>
                                    <el-upload
                                            class="avatar-uploader"
                                            :action="this.$webConfig.qnUploadHost"
                                            :data="qn"
                                            :show-file-list="false"
                                            :on-preview="handlePictureCardPreview"
                                            :on-remove="handleRemove"
                                            :on-success="handleAvatarSuccess"
                                            :before-upload="beforeAvatarUpload">
                                        <img v-if="shop_scene_pic" :src="shop_scene_pic" class="avatar"
                                             @click="getToken('shop_scene_pic')">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"
                                           @click="getToken('shop_scene_pic')"></i>
                                    </el-upload>
                                    <img class="imgDemo" src="../../assets/img/home/sceen.png" alt="示例图" title="示例图">
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitForm('form1')">提交</el-button>
                                </el-form-item>
                        </div>
                        </el-form>

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
        name: "deliver",
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
            var checkNull = (rule, value, callback) => {
                if (value.trim() === '') {
                    callback(new Error('请填写非空格字符'));
                } else {
                    callback();
                }
            };
            return {
                loadingBD:false, //搜索银行支行的时候用
                valueBD:{}, //选择支行
                optionsBD:[],
                status: '',//审核状态
                reason: '',//失败原因
                loading: false,
                winHeight: window.innerHeight,
                // radio:"", //营业执照期限单选
                value6: '',//营业执照期限选择
                valueID: '',//身份证期限选择
                onFN: "", //当前选择的参数
                imgNeed: '',//是否需要安全许可证
                licence: '',//许可证名称
                qn: {
                    token: "",
                    key: ""
                },
                subImg: {
                    id_card_positive_pic: '',//身份证正面
                    id_card_negative_pic: '',//身份证反面
                    // holding_certificate_pic: '',//手持身份证
                    bank_card_pic: '',//银行卡正面
                    business_license_pic_url: '',//营业执照
                    shop_sign_board_pic: '',//门头照
                    shop_scene_pic: '',//店内环境照
                    cashier_desk_pic: '',//收银台照片
                    certification_requirements_pic: "",//食品安全证件
                    permits_accounts_pic:'',//开户许可证，商户对公结算时必传
                },
                id_card_positive_pic: '',//身份证正面
                id_card_negative_pic: '',//身份证反面
                // holding_certificate_pic: '',//手持身份证
                bank_card_pic: '',//银行卡正面
                business_license_pic_url: '',//营业执照
                shop_sign_board_pic: '',//门头照
                shop_scene_pic: '',//店内环境照
                cashier_desk_pic: '',//收银台照片
                certification_requirements_pic: "",//食品安全证件
                permits_accounts_pic:'',//开户许可证
                options2: [],//行业
                optionsCt: [],//城市
                optionscont: [], //经营内容
                optionsGS:[  //对公对私
                    {
                        label:'对公',
                        value:57,
                    },{
                        label:'对私',
                        value:58   
                    }
                ],
                props: {
                    label: 'industry_name',
                    value: 'id',
                    children: 'child'
                },
                propsCt: {
                    label: 'value',
                    value: 'id',
                    children: 'citys'
                },
                selectedOptions2: '',
                form: {
                    id: '',//id
                    channel_type:'TP_MERCHANT', //是否有营业执照 有：TP_MERCHANT  无：TP_PERSONAL
                    account_kind:58,  //账户性质  57对公  58对私
                    real_name: '', //法人姓名
                    address: '',//地址
                    yenum: '',//营业执照标号
                    yename: '',//营业执照名称
                    // dateT: '',//营业期限
                    dateID:'',//身份证期限
                    trade: '',//行业选择
                    biz_content:'',//经营内容
                    idcard: '',//身份证
                    iccard: '',//银行卡
                    icname: '',//结算开户名
                    pro: '',//省份
                    city: '',//城市
                    area: '',//区域
                    settle_bank: '', //开户行
                    settle_bank_branch: '', //结算银行支行
                    settle_bank_branch_code:'', //开户行号
                    settle_clearing_bank_code:'' ,//清算行号
                    mer_short_name:'', //商品名称
                },
                imageUrl: '',
                dialogImageUrl: '',
                dialogVisible: false,
                rules: {
                    sname: [
                        {
                            required: true,
                            validator: checkNull,
                            message: '请输入商铺名称',
                            trigger: 'blur'
                        }
                    ],
                    channel_type:[
                        {
                            required: true,
                            message: '请选择',
                            trigger: 'blur'
                        },
                    ],
                    idcard: [
                        {
                            required: true,
                            validator: checkNull,
                            message: '请输入身份证号',
                            trigger: 'blur'
                        },
                        {
                            min: 10,
                            max: 20,
                            message: '请输入正确身份证号',
                            trigger: 'blur'
                        }
                    ],
                    iccard: [
                        {
                            required: true,
                            validator: checkNull,
                            message: '请输入银行卡号',
                            trigger: 'blur'
                        },
                        {
                            min: 10,
                            message: '请输入正确银行卡号',
                            trigger: 'blur'
                        }
                    ],
                    real_name: [
                        {
                            required: true,
                            validator: checkNull,
                            message: "请输入法人姓名",
                            trigger: "blur"
                        }
                    ],
                    icname: [
                        {
                            required: true,
                            validator: checkNull,
                            message: "请输入持卡人姓名",
                            trigger: "blur"
                        }
                    ],
                    bank:[
                        {
                           required:true,
                           validator: checkNull,
                           message:"请输入开户行",
                           trigger:"blur"
                       }
                    ],
                    subbank:[
                        {
                           required:true,
                        //    validator: checkNull,
                           message:"请输入开户银行支行",
                           trigger:"blur"
                       }
                    ],
                    account_kind: [
                        {
                            required: true,
                            message: "请选择账户类型",
                            trigger: "blur"
                        }
                    ],
                    dateT: [
                        {
                            required: true,
                            message: "请选择营业期限",
                            trigger: "blur"
                        }
                    ],
                    dateID: [
                        {
                            required: true,
                            message: "请选择身份证期限",
                            trigger: "blur"
                        }
                    ],
                    trade: [
                        {
                            required: true,
                            message: "请选择所属行业",
                            trigger: "blur"
                        }
                    ],
                    biz_content:[
                         {
                            required: true,
                            message: "请选择经营内容",
                            trigger: "blur"
                        }
                    ],
                    yenum: [
                        {
                            required: true,
                            validator: checkNull,
                            message: "请输入统一社会信用代码",
                            trigger: "blur"
                        }
                    ],
                    yename: [
                        {
                            required: true,
                            validator: checkNull,
                            message: "请输入营业执照注册名称",
                            trigger: "blur"
                        }
                    ],
                    address: [
                        {
                            required: true,
                            validator: checkNull,
                            message: '请输入详细地址',
                            trigger: 'blur'
                        },
                    ],
                    area: [
                        {
                            required: true,
                            message: '请选择地址',
                            trigger: 'blur'
                        },
                    ]
                },
            }
        },
        created() {
            this.loading = true
            this.$axios.get('/mer/industry/getNext?industryPrentId=0&&channel_type=2')
                .then(res => {
                    this.loading = false
                    this.options2 = res.data.data
                    for (let i = 0; i < this.options2.length; i++) {
                        this.$set(this.options2[i], 'child', []);
                    }
                    console.log("获取行业", res)
                })
                .catch(rej => {
                    this.loading = false
                    this.$message.error('网络异常!');
                    console.log('获取行业失败', rej)
                })
            //获取个人信息
            // let status = JSON.parse(localStorage.getItem(this.$webConfig.auditStatus)) //获取状态
            let lkl_status = this.$ls.get(this.$webConfig.lkl_status)
            let reason = JSON.parse(localStorage.getItem('reason'))//失败原因
            this.$axios.post('/mer/user/material/detail')
                .then(res => {
                    console.log("获取个人信息", res)
                    if (res.data.code == 200) {
                        this.form.id = res.data.data.id
                        if (lkl_status == 2) {
                            this.status = 2;
                            this.reason = reason.value
                            this.handlerFixed(res.data.data)
                        }
                    }
                })
                .catch(rej => {
                    console.log("获取个人信息失败", rej)
                })
            //获取省市区
            this.$axios.get('/mer/city/province?areaParentId=1&&channel_type=2')
                .then(res => {
                    this.optionsCt = res.data.data
                    for (let i = 0; i < this.optionsCt.length; i++) {
                        this.$set(this.optionsCt[i], 'citys', []);
                    }
                    console.log('获取省市区', res)
                })
                .catch(rej => console.log('省市区失败', rej))
             //获取经营内容
             this.$axios.post('/agent/sys/lkl/bizContent')
               .then(res=>{
                   console.log('获取经营内容',res)
                   this.optionscont = res.data.data
               })   
               .catch(rej=>{
                   console.log('获取经营内容失败',rej)
               })
        },
        methods: {
            //选择支行
            changeBD(e){
                console.log('eee',e)
                this.form.settle_bank_branch = e.bank_name
                this.form.settle_bank_branch_code = e.opening_bank
                this.form.settle_clearing_bank_code = e.clearing_bank
                this.optionsBD = []
            },
            //审核失败的函数
            handlerFixed(datas) {
                this.form.id=datas.id
                this.channel_type=datas.channel_type  //是否有营业执照
                this.form.real_name=datas.real_name
                this.form.yenum=datas.business_license_no
                this.form.yename=datas.business_license_name
                this.form.idcard=datas.id_card
                this.form.address=datas.address
                this.form.iccard=datas.settle_bank_account
                this.form.icname=datas.settle_bank_account_name
                this.form.settle_bank=datas.settle_bank
                // this.form.settle_bank_branch=datas.settle_bank_branch
                // this.form.settle_bank_branch_code=datas.settle_bank_branch_code
                // this.form.settle_clearing_bank_code=datas.settle_clearing_bank_code
                this.form.biz_content=datas.biz_content
                this.form.mer_short_name=datas.mer_short_name
                this.form.account_kind=datas.account_kind

                this.id_card_positive_pic=datas.id_card_positive_pic//身份证正面
                this.id_card_negative_pic=datas.id_card_negative_pic//身份证反面
                // this.holding_certificate_pic=datas.holding_certificate_pic//手持身份证
                this.bank_card_pic=datas.bank_card_pic//银行卡正面
                this.business_license_pic_url=datas.business_license_pic_url//营业执照
                this.shop_sign_board_pic=datas.shop_sign_board_pic//门头照
                this.shop_scene_pic=datas.shop_scene_pic//店内环境照
                this.cashier_desk_pic=datas.cashier_desk_pic//收银台照片 
                this.certification_requirements_pic=datas.certification_requirements_pic//食品安全证件
                this.permits_accounts_pic=datas.permits_accounts_pic //开户许可证
                for(let key in this.subImg){
                    this.subImg[key]=datas[key]
                }
                console.log("获取图片", this.subImg,this.form)
            },
            //获取行业
            getTrade(id) {
                return this.$axios.get('/mer/industry/getNext?industryPrentId=' + id+'&&channel_type=2')
                    .then(res => {
                        return res.data
                        console.log("获取行业函数", res)
                    })
                    .catch(rej => {
                        console.log('获取行业失败', rej)
                    })
            },
            //获取省市区
            getCity(id) {
                return this.$axios.get('/mer/city/province?areaParentId=' + id+'&&channel_type=2')
            },
            //提交函数
            handSub(datas, imgs) {
                let data = {...imgs}
                if(datas.dateID==1){
                    console.log('this.valueID[1]',this.valueID)
                    if(this.valueID){
                        data.id_card_expire=new Date(this.valueID[1]).getFullYear()+'-'+new Date(this.valueID[1]).format('M')+'-'+new Date(this.valueID[1]).format('d')
                    }else{
                        console.log('选择期限')
                        this.$message.error('请选择身份证期限')
                        return false
                    }
                } else {
                    data.id_card_expire = '2999-12-31'
                }

                if (this.imgNeed) {
                    if (!imgs.certification_requirements_pic) {
                        this.$message.error('请上传相关证件')
                        return false
                    }
                }
                if (datas.account_kind == 57){
                    if (!imgs.permits_accounts_pic) {
                        this.$message.error('请上传开户许可证')
                        return false
                    }
                }
                if (datas.channel_type == 'TP_MERCHANT'){
                    if (!imgs.business_license_pic_url) {
                        this.$message.error('请上传营业执照')
                        return false
                    }
                }
                
                if(datas.dateT==1){
                    if(this.value6[1]){
                        data.date_limitation=new Date(this.value6[1]).getTime()
                    }else{
                        console.log('选择期限')
                        this.$message.error('请选择营业执照期限')
                        return false
                    }
                } else {
                    data.date_limitation = datas.dateT
                }
             
                data.id = datas.id
                data.channel_type = datas.channel_type
                data.real_name = datas.real_name
                data.business_license_no = datas.yenum
                data.mcc_code  = datas.trade
                data.biz_content = datas.biz_content
                data.business_license_name = datas.yename
                data.id_card = datas.idcard
                data.settle_bank_account = datas.iccard
                data.settle_bank_account_name = datas.icname
                data.address = datas.address
                data.province_code = datas.pro
                data.city_code = datas.city
                data.area_code = datas.area
                data.settle_bank = datas.settle_bank
                data.settle_bank_branch = datas.settle_bank_branch
                data.settle_bank_branch_code = datas.settle_bank_branch_code
                data.settle_clearing_bank_code = datas.settle_clearing_bank_code
                data.mer_short_name = datas.mer_short_name
                data.account_kind = datas.account_kind
                return data
                console.log("修改数据", data)
            },
            //获取token
            getToken(id) {
                console.log("aaa", id)
                this.onFN = id
                this.$axios.post('/mer/file/getUploadAuth')
                    .then(res => {
                        this.qn.token = res.data.data.file_upload_auth
                        console.log("获取token", res)
                    })
                    .catch(rej => {
                        console.log("失败", rej)
                    })
            },
            //选择时间
            pickTime(v) {
                console.log("选择时间", new Date(v[1]).getFullYear(), )
            },
            //选择行业
            handleChange(value) {
                //判断的need_pic
                if (value.length == 2) {
                    this.options2.map((item, index) => {
                        item.child.map((initem, inindex) => {
                            if (initem.id == value[1]) {
                                this.imgNeed = initem.need_pic
                                this.licence = initem.certification_requirements
                            }
                        })
                    })
                }
                if (value.length == 3) {
                    this.options2.map((item, index) => {
                        item.child.find(e => {
                            if (e.id == value[1]) {
                                e.child.find(ine => {
                                    if (ine.id == value[2]) {
                                        this.imgNeed = ine.need_pic
                                        this.licence = ine.certification_requirements
                                    }
                                })
                            }
                        })
                    })
                }
                this.form.trade = value.slice(-1)[0]
                console.log('选择', value, this.licence);
            },

            handleItemChange(val) {
                console.log("选中", val)
                if (val.length == 1) {
                    // 如果点击的是一级分类
                    let parentId = val[0]
                    this.options2.map((item, index) => {
                        if (item.id === parentId && item.child.length === 0) {
                            // 当顶级分类的的child为空时才请求数据
                            this.getTrade(parentId).then(res => {
                                console.log("对奥用", res)
                                this.$set(this.options2[index], 'child', res.data)
                                item.child.map((innerItem, innerIndex) => {
                                    // 二级分类下要设置一个空的child数组，不然点击@active-item-change没反应
                                    if (innerItem.next_no != 0) {
                                        this.$set(item.child[innerIndex], 'child', [])
                                    }
                                })
                            })
                        }
                    })
                } else if (val.length == 2) {
                    let parentId = val[1]
                    this.options2.map((item, index) => {
                        item.child.map((innerItem, innerIndex) => {
                            if (innerItem.id === parentId && innerItem.child.length === 0) {
                                // 当二级分类的的child为空时才请求一次数据
                                this.getTrade(parentId).then(res => {
                                    this.$set(item.child[innerIndex], 'child', res.data)
                                })
                                console.log('innner', innerItem)
                            }
                        })
                    })
                }
            },
            //选择省市区
            handleCtChange(value) {
                console.log('选择省市的', value);
                this.form.pro = value[0]
                this.form.city = value[1]
                this.form.area = value[2]
            },
            //选择省市区
            handleCtChangeAc(val) {
                console.log("选中", val)
                if (val.length == 1) {
                    // 如果点击的是一级分类
                    let parentId = val[0]
                    this.optionsCt.map((item, index) => {
                        if (item.id === parentId && item.citys.length === 0) {
                            // 当顶级分类的的child为空时才请求数据
                            this.getCity(parentId).then(res => {
                                console.log("对奥用", index, res)
                                this.$set(this.optionsCt[index], 'citys', res.data.data)
                                item.citys.map((innerItem, innerIndex) => {
                                    // 二级分类下要设置一个空的citys数组，不然点击@active-item-change没反应
                                    this.$set(item.citys[innerIndex], 'citys', [])
                                })
                            })
                        }
                    })
                } else if (val.length == 2) {
                    let parentId = val[1]
                    this.optionsCt.map((item, index) => {
                        item.citys.map((innerItem, innerIndex) => {
                            if (innerItem.id === parentId && innerItem.citys.length === 0) {
                                // 当二级分类的的child为空时才请求一次数据
                                this.getCity(parentId).then(res => {
                                    this.$set(item.citys[innerIndex], 'citys', res.data.data)
                                })
                                console.log('innner', innerItem)
                            }
                        })
                    })
                }
            },
            //选择支行
             remoteMethod(query) {
                if (query !== '') {
                    this.loadingBD = true;
                    this.$axios.post('/agent/sys/bank/info/lkl',{bank_name:query})
                    .then(res => {
                        if(res.data.data.length !=0){
                         this.optionsBD = res.data.data;
                         }else{
                             this.optionsBD = [];
                         }
                        this.loadingBD = false;
                    })
                    .catch(rej =>{
                        this.loadingBD = false;
                        console.log('失败', rej);
                    })
                    // setTimeout(() => {
                    //     this.loadingBD = false;
                    //     this.optionsBD = this.list.filter(item => {
                    //     return item.label.toLowerCase()
                    //         .indexOf(query.toLowerCase()) > -1;
                    //     });
                    // }, 200);
                } else {
                  this.optionsBD = [];
                }
            },
            onSubmit() {
                console.log('submit!');
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },

            handleAvatarSuccess(res, file) {
                this[this.onFN] = URL.createObjectURL(file.raw);
                this.subImg[this.onFN] = this.$webConfig.apiHosts + this.qn.key
                console.log("file", res, file, this.subImg)

            },
            beforeAvatarUpload(file) {
                // this.qn.key = new Date().getTime() + file.name;  //上传到七牛的key
                this.qn.key = new Date().getTime() +Math.ceil(Math.random()*10);  //上传到七牛的key
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
                const isLt5M = file.size / 1024 / 1024 < 5;
                console.log("获取token成功",this.onFN,this.qn)
                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt5M) {
                    this.$message.error('上传头像图片大小不能超过 5MB!');
                }
                return isJPG && isLt5M;
            },

            submitForm(formName) {
                console.log('提交参数',this.form)
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // alert('submit!');
                        let data = this.handSub(this.form, this.subImg)
                        if (!data) return
                        console.log('调用接口')
                        this.loading = true
                        this.$axios.post('/mer/lkl/jj', data)
                            .then(res => {
                                this.loading = false
                                console.log("提交请求", res)
                                if (res.data.code == 200) {
                                    this.$confirm('预计1-3个工作日审核通过，请耐心等待', '提交成功', {
                                        confirmButtonText: '下一步',
                                        showCancelButton: false,
                                        type: 'success',
                                        showClose: false,
                                        closeOnClickModal: false,
                                        center: true
                                    }).then(() => {
                                        this.$ls.set(this.$webConfig.lkl_status, 3);
                                        this.$router.push({name: 'merchantAuditing'})
                                    })
                                } else if (res.data.code == 400) {
                                    this.$message.error("请将资料填写完整!")
                                }else{
                                     this.$message.error(res.data.message)
                                }
                            })
                            .catch(rej => {
                                this.loading = false
                                console.log('res', rej)
                                this.$message.error("网络异常!")
                            })
                        console.log("form", this.form, this.subImg)
                        
                    } else {
                        console.log('error submit!!');
                        this.$message.error('请填写完整!')
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style>
    .error {
        color: #FF0000;
        font-size: 20px;
    }

    .tip {
        font-size: 14px;
        color: #8c939d
    }

    .avatar-uploader {
        display: inline;
    }

    .imgDemo {
        width: 200px;
        height: 140px;
        margin-left: 30px
    }

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

