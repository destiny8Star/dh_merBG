<template>
	<div>
		<div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
			<div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
				<div class="main-feature">
					<div class="main-inner" :style="{height: (getWinHeight-320)+'px'}">
						<h1 class="ly-title-one">资料审核中</h1>
						<p style="font-size: 16px">预计1-3个工作日审核通过，请耐心等待</p>
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
			}
		},
		methods: {
		}
	}
</script>

<style scoped>
	.main-inner {
		padding: 13px 40px;
	}

</style>

