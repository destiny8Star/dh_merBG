<template>
	<div>
		<div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
			<div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
				<div class="main-feature">
					<div class="main-inner">
						<h1 class="ly-title-one">请提交资料申请商户</h1>
						<div class="realBox">
							<p v-for="(ele,i) in list" :key="i">{{ele.value}}</p>
						</div>
						<!-- `checked` 为 true 或 false -->
						<div class="agree">
							<!--<el-checkbox v-model="checked"></el-checkbox>
							<span>我已阅读并同意</span>
							<el-button type="text" @click="read">《商家入驻协议》</el-button>-->
						</div>
						<el-button type="primary" @click="apply">立即申请</el-button>

					</div>
				</div>
				<common-footer></common-footer>
			</div>
		</div>
		<!-- //弹框 -->
		<!-- <el-dialog
			title="请选择商户类型"
			:visible.sync="centerDialogVisible"
			width="30%"
			:close-on-press-escape = false
			:close-on-click-modal = false
			center>
			<span slot="footer" class="dialog-footer">
				<el-button type="success" @click="isbusLicense(1)">有营业执照</el-button>
				<el-button type="primary" @click="isbusLicense(0)">无营业执照</el-button>
			</span>
		</el-dialog> -->
	</div>
</template>

<script>
	import CommonFooter from '../../components/CommonFooter.vue'

	export default {
		name: "list",
		components: {
			CommonFooter
		},
		created(){
		   let pay_channel_type = this.$ls.get(this.$webConfig.pay_channel_type)
		   this.pay_channel_type = pay_channel_type
		},
		computed: {
			getWinHeight: function () {
				return this.$winHeight;
			}
		},
		data: function () {
			return {
				// centerDialogVisible:false,//是否显示
				pay_channel_type:'', //1：直连；2：拉卡拉
                list: [
					{
						value: '需准备资料有：'
					},
					{
						value: '①身份证（必备）'
					},
					{
						value: '②手持身份证照片（必备）'
					},
					{
						value: '③营业执照（必备）'
					},
					{
						value: '④经营许可证（食品、烟酒等商品必备）'
					},
					{
						value: '⑤门头照、收银台照、店内环境照（必备）'
					},
					{
						value: '⑥银行卡（必备）'
					},
				],
                checked: true,
				text: '<div class="blueBox"><h3>标题一</h3><h4>标题二</h4><p>段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本</p><h3>标题一</h3><h4>标题二</h4><p>段落文本段落文本段落文本段落段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本文本段落文本段落文本段落文本段落文本段落文本</p><h3>标题一</h3><h4>标题二</h4><p>段落文本段落文本段落文本段落文本段段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本落文本段落文本段落文本段落文本段落文本</p><h3>标题一</h3><h4>标题二</h4><p>段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本</p></div>',

                winHeight: window.innerHeight,
			}
		},
		methods: {
            read() {
                this.$alert(`${this.text}`, '商家入驻协议', {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: '已知晓',
					// center: true
                });
			},
			// //选择是否有营业执照
			// isbusLicense(num){
            //    this.$router.push({name:'merchantDeliverlk'})
			// },
		    /**
			 * 弹窗
			 */
            open(title,text) {
                this.$alert(text, title, {
                    confirmButtonText: '确定',
                });
            },
            /**
			 * 申请
             */
            apply() {
				let pay_channel_type = this.pay_channel_type
				console.log(pay_channel_type);
				if(pay_channel_type == 1){
					this.$router.push({name:'merchantDeliver'})
				}else{
                    this.$router.push({name:'merchantDeliverlk'})
				}
                // 协议暂无，保存预留判断 - 无妨
				// if(this.checked){
				// 	// this.$router.push({name:'merchantDeliver'})
				// }else {
				//     this.open('提示','请先阅读并同意《商家入驻协议》')
				// }
			},
		}
	}
</script>

<style scoped>
	.main-inner {
		padding: 13px 40px 30px;
	}
	.realBox {
		border-bottom: 1px solid #ccc;
		padding: 10px 0;
	}
	.realBox p {
		font-size: 16px;
	}
	.agree {
		display: flex;
		align-items: center;
		margin: 15px 0;
	}
	.agree span {
		margin-left: 5px;
	}
</style>

