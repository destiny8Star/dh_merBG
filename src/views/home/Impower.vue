<template>
	<div>
		<div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
			<div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
				<div class="main-feature">
					<div class="main-inner" :style="{height: (getWinHeight-320)+'px'}">
						<h1 class="ly-title-one">支付宝授权</h1>
						<p style="font-size: 16px">请用支付宝扫码下方二维码授权</p>
						<div id="qrCode" ref="qrCodeDiv"></div>
					</div>
				</div>
				<common-footer></common-footer>
			</div>
		</div>
	</div>
</template>

<script>
	import CommonFooter from '../../components/CommonFooter.vue'
    import QRCode from 'qrcodejs2';

	export default {
		name: "auditing",
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
                timer: '',
				code: '',
				status: '',
				qrCodeObj:{
                    text: 'https://www.baidu.com',
                    width: 200,
                    height: 200,
                    colorDark: "#333333", //二维码颜色
                    colorLight: "#ffffff", //二维码背景色
                    correctLevel: QRCode.CorrectLevel.L//容错率，L/M/H
                }
			}
		},
        methods: {
            bindQRCode: function () {
                new QRCode(this.$refs.qrCodeDiv, this.qrCodeObj)
            },
			getCode(){
                this.$axios.post('/mer/alipay/generateAuthUrl',{}).then(res => {
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        this.qrCodeObj.text = res.data.data.auth_url;
                        this.code = res.data.data.code;
                        this.bindQRCode();
                        this.timer = setTimeout(this.getResult, 2000);
                    }else {
                        this.$message(res.data.message);
                    }
                })
                    .catch(() => {

                    });
			},
            /**
			 * 获取授权结果
             */
            getResult(){
				this.$axios.get('/mer/alipay/getAuthResultByToken?token='+this.code).then(res => {
					console.log(res);
					this.status = res.data.code;
					if (res.data.code > this.$webConfig.httpSuccessStatus || res.data.code === this.$webConfig.httpSuccessStatus) {
						this.$message(res.data.message);
					}else {
						// this.$message(res.data.message);
                        this.timer = setTimeout(this.getResult, 2000);
					}
				})
					.catch(() => {

					});
				console.log('每隔2秒钟执行一次')
			}
        },
        mounted () {
            // 生成二维码js必须在 this.$nextTick(function(){调用})或setTimeout(() => { 调用 }, 100)，是为了确保二维码容器DOM已经存在。
            // this.$nextTick(function () {
            //     this.bindQRCode();
            // });

			this.getCode();
        },
		destroyed(){
			clearTimeout(this.timer);
		}
	}
</script>

<style scoped>
	.main-inner {
		padding: 13px 40px;
	}

</style>

