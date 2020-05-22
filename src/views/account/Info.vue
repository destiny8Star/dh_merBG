<template>
	<div>
		<div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
			<div class="main-content" id="main-content" :style="{height: (getWinHeight-60)+'px'}">
				<div class="main-feature">
					<div class="main-inner">
						<h1 class="ly-title-one">基本信息</h1>
						<div class="realBox">
							<p v-for="(ele,i) in infoData" :key="i">{{ele.table}}：<span>{{ele.value}}</span></p>
						</div>
						<h1 class="ly-title-one">实名认证信息</h1>
						<div class="realBox">
							<p v-for="(ele,i) in infoList" :key="i">{{ele.table}}：<span>{{ele.value}}</span></p>
						</div>
						<h1 class="ly-title-one">签约信息</h1>
						<div v-if="pay_channel_type==1">
							<h2>授权</h2>
							<div class="signBox" v-if="auth_status">
								<img src="../../assets/img/account/success@2x.png" alt="">
								<p>已授权开通刷脸收款</p>
							</div>
							<div class="signBox" v-else>
								<img src="../../assets/img/account/warning@2x.png" alt="">
								<p>未授权！<el-button type="text" @click="$router.push('/home/impower')" style="font-size: 16px">请点此授权！</el-button></p>
							</div>
						</div>
						<h2>费率</h2>
						<div v-for="(ele,i) in rateList" :key="i" class="signBox">
							<img :src=" ele.img " alt="">
							<p style="width: 100px">{{ ele.text }}</p>
							<span>{{ ele.type==3 ? '审核中': ele.type==2 ? '审核失败' : ele.type==1 ? `${ele.num} %` : '--'}}</span>
							<el-button v-if="ele.type==2" type="text" style="margin-left: 30px" @click="goError">查看失败原因 <i class="el-icon-d-arrow-right"></i></el-button>
						</div>
					</div>
				</div>
				<common-footer></common-footer>
			</div>
		</div>
	</div>
</template>

<script>
	import CommonFooter from '../../components/CommonFooter.vue'

	const map = {1:'审核通过',2:'审核失败',3:'审核中'};
	export default {
		name: "list",
		components: {
			CommonFooter
		},
		computed: {
			getWinHeight: function () {
				return this.$winHeight;
			}
		},
		data: function () {
			return {
                pay_channel_type: '',//通道【1：直连；2：间连】
                auth_status: 1,//auth_status,支付宝授权状态( 0 失效 ,1 正常)
                infoData: [
					{
					    table: '用户名',
						value: ''
					},
					{
					    table: '手机号',
						value: ''
					},
					{
					    table: '邮箱',
						value: ''
					},
					{
					    table: '创建时间',
						value: ''
					},
				],
                infoList: [
					{
					    table: '姓名',
						value: ''
					},
					{
					    table: '身份证号',
						value: ''
					},
					{
					    table: '银行卡号',
						value: ''
					},
					{
					    table: '开户行',
						value: ''
					},
				],
                rateList: [
					{
                        img: require('../../assets/img/account/zhifubao@2x.png'),
                        text: '支付宝收款',
						num: '',
						type: 1,
					},
					{
					    img: require('../../assets/img/account/weixin@2x.png'),
						text: '微信收款',
						num: '',
						type: 2,
					}
				],
			}
		},
		methods: {
		    /**
			 *  查看失败原因
			 */
            goError(){
              	console.log("跳往失败原因页面");
              	this.$router.push('/home/defeat')
			},
            /**
             * 获取数据
             */
            getData() {
                //初始化列表
                this.$axios.post('/mer/user/basic/info').then(res => {
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        let list = res.data.data;
                        this.auth_status = list.auth_status;
                        this.infoData[0].value = list.user_name;
                        this.infoData[1].value = list.user_tel;
                        this.infoData[2].value = list.email;
                        this.infoData[3].value = new Date(list.create_time).format('yyyy-MM-dd hh:mm:ss');

                        this.infoList[0].value = list.real_name;
                        this.infoList[1].value = list.id_card;
                        this.infoList[2].value = list.settle_bank_account;
                        this.infoList[3].value = list.settle_bank_account_name;

                        this.rateList[0].num = list.ali_rate;
                        this.rateList[1].num = list.wx_rate;
                        this.rateList[0].type = list.ali_status;
                        this.rateList[1].type = list.wx_status;
                    } else {
                        this.$message(res.data.message);
                    }
                })
                    .catch(() => {

                    });
            },
		},
        created(){
            this.pay_channel_type = this.$ls.get(this.$webConfig.pay_channel_type);
        },
		mounted(){
            // 获取数据
		    this.getData();
		}
	}
</script>

<style scoped>
	.main-inner {
		padding: 13px 40px;
	}
	.realBox p{
		font-size: 16px;
		line-height: 32px;
	}
	.realBox span{
		margin-left: 10px;
	}
	h2 {
		font-size: 16px;
		line-height:18px;
		margin-top: 25px;
	}
	.signBox {
		display: flex;
		align-items: center;
		margin: 26px 0 34px;
	}
	.signBox img{
		width: 35px;
		height: 35px;
		margin-right: 18px;
	}
	.signBox p{
		font-size: 16px;
		line-height: 18px;
	}
</style>

