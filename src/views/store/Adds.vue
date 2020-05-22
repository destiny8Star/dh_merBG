<template>
	<div>
		<div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
<!--			<third_nav></third_nav>-->
			<div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
				<div class="main-feature">
					<div class="main-inner">
						<div class="form-list">
							<el-form label-position="left" ref="form" :model="form" label-width="90px" :rules="rules">
								<el-form-item label="门店名" prop="name">
									<el-input v-model="form.name" placeholder="请输入门店名"></el-input>
								</el-form-item>
								<el-form-item label="电话" prop="tel">
									<el-input v-model="form.tel" placeholder="请输入电话"></el-input>
								</el-form-item>
								<el-form-item label="地址" prop="address">
									<el-input v-model="form.address" placeholder="请输入地址"></el-input>
								</el-form-item>
								<el-form-item label="活动区域" prop="region">
									<el-select v-model="form.region" placeholder="请选择活动区域">
										<el-option label="区域一" value="shanghai"></el-option>
										<el-option label="区域二" value="beijing"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="联级选择" prop="options">
									<el-cascader expand-trigger="hover" :options="form.options" v-model="selectedOptions" @change="handleChange" filterable>
									</el-cascader>
								</el-form-item>
								<el-form-item label="日期" prop="date1">
									<el-date-picker v-model="form.date1" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00']">
									</el-date-picker>
								</el-form-item>
								<el-form-item label="即时配送" prop="delivery">
									<el-switch v-model="form.delivery"></el-switch>
								</el-form-item>
								<el-form-item label="活动性质" prop="type">
									<el-checkbox-group v-model="form.type">
										<el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
										<el-checkbox label="地推活动" name="type"></el-checkbox>
										<el-checkbox label="线下主题活动" name="type"></el-checkbox>
										<el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
									</el-checkbox-group>
								</el-form-item>
								<el-form-item label="特殊资源" prop="resource">
									<el-radio-group v-model="form.resource">
										<el-radio label="线上品牌商赞助"></el-radio>
										<el-radio label="线下场地免费"></el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="活动形式" prop="desc">
									<el-input type="textarea" v-model="form.desc"></el-input>
								</el-form-item>
								<el-form-item label="上传图片">
									<el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview"
									    :on-remove="handleRemove">
										<i class="el-icon-plus"></i>
									</el-upload>
									<el-dialog :visible.sync="dialogVisible">
										<img width="100%" :src="dialogImageUrl" alt="">
									</el-dialog>
								</el-form-item>
								<el-form-item>
									<el-button type="primary" @click="submitForm('form')">立即创建</el-button>
									<el-button @click="resetForm('form')">重置</el-button>
									<el-button>取消</el-button>
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
		name: "list",
		components: {
			// third_nav,
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
				form: {
					name: '',
					tel: '',
					address: '',
					delivery: false,
					type: [],
					resource: '',
					desc: '',
					options: [
					    {
						value: 'zhinan',
						label: '指南',
						children: [{
							value: 'shejiyuanze',
							label: '设计原则',
							children: [{
								value: 'yizhi',
								label: '一致'
							}, {
								value: 'fankui',
								label: '反馈'
							}, {
								value: 'xiaolv',
								label: '效率'
							}, {
								value: 'kekong',
								label: '可控'
							}]
						}, {
							value: 'daohang',
							label: '导航',
							children: [{
								value: 'cexiangdaohang',
								label: '侧向导航'
							}, {
								value: 'dingbudaohang',
								label: '顶部导航'
							}]
						}]
					}, {
						value: 'zujian',
						label: '组件',
						children: [{
							value: 'basic',
							label: 'Basic',
							children: [{
								value: 'layout',
								label: 'Layout 布局'
							}, {
								value: 'color',
								label: 'Color 色彩'
							}, {
								value: 'typography',
								label: 'Typography 字体'
							}, {
								value: 'icon',
								label: 'Icon 图标'
							}, {
								value: 'button',
								label: 'Button 按钮'
							}]
						}, {
							value: 'form',
							label: 'Form',
							children: [{
								value: 'radio',
								label: 'Radio 单选框'
							}, {
								value: 'checkbox',
								label: 'Checkbox 多选框'
							}, {
								value: 'input',
								label: 'Input 输入框'
							}, {
								value: 'input-number',
								label: 'InputNumber 计数器'
							}, {
								value: 'select',
								label: 'Select 选择器'
							}, {
								value: 'cascader',
								label: 'Cascader 级联选择器'
							}, {
								value: 'switch',
								label: 'Switch 开关'
							}, {
								value: 'slider',
								label: 'Slider 滑块'
							}, {
								value: 'time-picker',
								label: 'TimePicker 时间选择器'
							}, {
								value: 'date-picker',
								label: 'DatePicker 日期选择器'
							}, {
								value: 'datetime-picker',
								label: 'DateTimePicker 日期时间选择器'
							}, {
								value: 'upload',
								label: 'Upload 上传'
							}, {
								value: 'rate',
								label: 'Rate 评分'
							}, {
								value: 'form',
								label: 'Form 表单'
							}]
						}, {
							value: 'data',
							label: 'Data',
							children: [{
								value: 'table',
								label: 'Table 表格'
							}, {
								value: 'tag',
								label: 'Tag 标签'
							}, {
								value: 'progress',
								label: 'Progress 进度条'
							}, {
								value: 'tree',
								label: 'Tree 树形控件'
							}, {
								value: 'pagination',
								label: 'Pagination 分页'
							}, {
								value: 'badge',
								label: 'Badge 标记'
							}]
						}, {
							value: 'notice',
							label: 'Notice',
							children: [{
								value: 'alert',
								label: 'Alert 警告'
							}, {
								value: 'loading',
								label: 'Loading 加载'
							}, {
								value: 'message',
								label: 'Message 消息提示'
							}, {
								value: 'message-box',
								label: 'MessageBox 弹框'
							}, {
								value: 'notification',
								label: 'Notification 通知'
							}]
						}, {
							value: 'navigation',
							label: 'Navigation',
							children: [{
								value: 'menu',
								label: 'NavMenu 导航菜单'
							}, {
								value: 'tabs',
								label: 'Tabs 标签页'
							}, {
								value: 'breadcrumb',
								label: 'Breadcrumb 面包屑'
							}, {
								value: 'dropdown',
								label: 'Dropdown 下拉菜单'
							}, {
								value: 'steps',
								label: 'Steps 步骤条'
							}]
						}, {
							value: 'others',
							label: 'Others',
							children: [{
								value: 'dialog',
								label: 'Dialog 对话框'
							}, {
								value: 'tooltip',
								label: 'Tooltip 文字提示'
							}, {
								value: 'popover',
								label: 'Popover 弹出框'
							}, {
								value: 'card',
								label: 'Card 卡片'
							}, {
								value: 'carousel',
								label: 'Carousel 走马灯'
							}, {
								value: 'collapse',
								label: 'Collapse 折叠面板'
							}]
						}]
					}, {
						value: 'ziyuan',
						label: '资源',
						children: [{
							value: 'axure',
							label: 'Axure Components'
						}, {
							value: 'sketch',
							label: 'Sketch Templates'
						}, {
							value: 'jiaohu',
							label: '组件交互文档'
						}]
					}]

				},
				rules: {
					name: [{
							required: true,
							message: '请输入活动名称',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 5,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur'
						}
					],
					region: [{
						required: true,
						message: '请选择活动区域',
						trigger: 'change'
					}],
					type: [{
						type: 'array',
						required: true,
						message: '请至少选择一个活动性质',
						trigger: 'change'
					}],
					resource: [{
						required: true,
						message: '请选择活动资源',
						trigger: 'change'
					}],
					desc: [{
						required: true,
						message: '请填写活动形式',
						trigger: 'blur'
					}]
				},
				dialogImageUrl: '',
				dialogVisible: false,
				selectedOptions: [],
				activeIndex: '1',
			}
		},
		methods: {
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
			handleChange(value) {
				console.log(value);
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('submit!');
					} else {
						console.log('error submit!!');
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



