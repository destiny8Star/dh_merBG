<template>
	<div>
		<div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
			<div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
				<div class="main-feature">
					<div class="main-inner" :style="{minHeight: (getWinHeight-320)+'px'}">
						<h1 class="ly-title-one">商户资料审核失败</h1>
						<p style="font-size: 16px">失败原因：</p>
						<!-- <p class="error" v-for="(ele,i) in errorList" :key="i">{{i+1}}、{{ele}}；</p> -->
						<p class="error">{{reason}}</p>
						<div class="line"></div>
						<el-button type="danger" @click="toUpdate">修改资料<i class="el-icon-right"></i></el-button>
					</div>
				</div>
				<common-footer></common-footer>
			</div>
		</div>
	</div>
</template>

<script>
	import CommonFooter from '../../components/CommonFooter.vue'

	export default {
		name: "defeat",
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
                winHeight: window.innerHeight,
				errorList: ['不合格规划','uyguykgyku','不干胶易购','GuyfgytUI有','谷雨图片i'],
				reason:'',//失败原因
				type:'',//1：直连；2：拉卡拉
			}
		},
        mounted () {
			let reason=JSON.parse(localStorage.getItem('reason'))
			let pay_channel_type = this.$ls.get(this.$webConfig.pay_channel_type) //1：直连；2：拉卡拉
			this.reason=reason.value
			this.type = pay_channel_type
        },
        methods: {
            toUpdate(){
			   let type = this.type
			   console.log(type)
			   if(type == 1)this.$router.push({name:'merchantDeliver'});
			   if(type == 2)this.$router.push({name:'merchantDeliverlk'});

			} 
        }
	}
</script>

<style scoped>
	.main-inner {
		padding: 13px 40px;
	}
	.error {
		color: #FF0000;
		font-size: 20px;
	}
	.line {
		/*width: 640px;*/
		height: 1px;
		background: rgba(204,204,204,1);
		margin-bottom: 20px;
	}
</style>

