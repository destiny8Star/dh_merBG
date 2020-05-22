<template>
	<div class="main-top">
		<div class="first-nav-logo">
			<img :src="oemData.pc_back_logo ? oemData.pc_back_logo : logoUrl" class="nav-logo">
		</div>
		<!--<div class="search" id="search">
			<div class="search-content">
				<i class="el-icon-search" style="color: #838383; font-size: 20px;padding-top: 19px;"></i>
				<input type="text" class="input-search" placeholder="搜索" value="" />
			</div>
		</div>-->
		<div class="tool">
			<!--<div class="tool-icon">
				<i class="el-icon-setting"></i>
			</div>
			<div class="tool-icon">
				<i class="el-icon-bell"></i>
				&lt;!&ndash; <el-badge :value="5" class="item">
                    <i class="el-icon-bell"></i>
                </el-badge> &ndash;&gt;
			</div>
			<div class="tool-icon">
				<i class="el-icon-message"></i>
			</div>-->
			<div class="tool-msg">
<!--				<img src="../assets/img/tx.png" class="logo-img">-->
				<span class="tool-msg-t">欢迎您：{{ name ? name : '商家' }}</span>
				<el-dropdown @command="handleCommand">
					<span class="el-dropdown-link">
						<i class="el-icon-arrow-down el-icon--right"></i>
						<i style="display: inline-block;width: 10px;height: 10px;"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="a">修改密码</el-dropdown-item>
						<!--<el-dropdown-item command="b">退出登录</el-dropdown-item>-->
					</el-dropdown-menu>
				</el-dropdown>
			</div>
			<el-link @click="outLog" :underline="false"  style="margin: 0 20px 0 0;">退出</el-link>
		</div>

	</div>
</template>

<script>
	export default {
		name: "CommonHeader",
		data(){
		    return {
                name:  this.$ls.get("accountName"),
                oemData: this.$ls.get(this.$webConfig.oemData) || {},
                logoUrl: require('../assets/img/home/default_logo.png'),
			}
		},
		methods:{
            handleCommand(command) {
                console.log('click on item ' + command);
                if(command == 'a'){
                    this.$router.push('/account/change');
				}
            },
			/**
			 *  退出登录
			 */
            outLog() {
                console.log('退出登录');
                var that = this,text = "退出账号";
                console.log("退出登录");
                that.$confirm("此操作将退出账号 , 是否继续 ?", "提示", {
                    "confirmButtonText": "确定",
                    "cancelButtonText": "取消",
                    "type": "warning",
                }).then(() => {
                	this.$ls.clear();
					this.$ls.remove(this.$webConfig.authTokenName);
					this.$router.push('/');
                    // this.$axios.post('/mer/user/login/out').then(res => {
                    // 	this.$ls.remove(this.$webConfig.authTokenName);
                    //     console.log(res);
                    //     if (res.data.code === this.$webConfig.httpSuccessStatus) {
                    //         this.$message('退出成功');
                    //         localStorage.clear();
                    //         this.$router.push('/');
                    //     }else {
                    //         this.$message(res.data.message);
                    //     }
                    // }).catch(()=>{
					//
                    // })

                }).catch(() => {
                    that.$message({ center: true, type: "info", message: "已取消".concat(text).concat("操作") });
                });
            }
		},
	}
</script>
<style>
	.tool-msg-t {
		width: auto;
	}
</style>
