<template>
	<div>
		<div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
			<div class="third-nav">
				<div class="third-nav-t">账单汇总</div>
			</div>
			<div class="main-content" id="main-content" :style="{height: (getWinHeight-60)+'px'}">
				<div class="main-feature">
					<div class="main-inner">
						<!-- 搜索条件 start -->
						<el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-top: 20px">
							<el-form-item label="日期" class="bill-collect-date">
								<el-date-picker @change="changeDate" v-model="formInline.date" type="datetimerange" start-placeholder="开始日期"
												end-placeholder="结束日期" format="yyyy-MM-dd">
									<!--&lt;!&ndash;:default-time="['12:00:00']"&ndash;&gt;-->
								</el-date-picker>
							</el-form-item>
							<el-form-item label="门店名 / 收银员">
								<el-cascader
										@change="choShop"
										separator=" "
										:options="shopList"
										:props="{ checkStrictly: true ,value: 'id',label:'value'}"
										clearable></el-cascader>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="onSubmit" size="small" v-loading="searchState">查询</el-button>
							</el-form-item>
						</el-form>
						<!-- 搜索条件 end -->
						 <!--搜索条件 start -->
						<!--<el-form :inline="true" :model="formInline" class="demo-form-inline">
							<el-form-item label="日期" class="bill-collect-date">
								<el-date-picker @change="changeDate" v-model="formInline.date" type="datetimerange" start-placeholder="开始日期"
												end-placeholder="结束日期" format="yyyy-MM-dd hh:mm:ss">
									&lt;!&ndash;:default-time="['12:00:00']"&ndash;&gt;
								</el-date-picker>
							</el-form-item>
							<el-row>
								<el-form-item label="门店名">
									<el-select v-model="formInline.store_id" placeholder="门店名">
										<el-option v-for="item in shopList"
												   :key="item.value"
												   :label="item.label"
												   :value="item.value"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="收银员">
									<el-select v-model="formInline.mer_user_id" placeholder="收银员">
										<el-option v-for="item in cashierList"
												   :key="item.value"
												   :label="item.label"
												   :value="item.value"></el-option>
									</el-select>
								</el-form-item>
							</el-row>

							<el-form-item>
								<el-button style="margin-left: 54px" type="primary" @click="onSubmit" size="small">查询</el-button>
							</el-form-item>
						</el-form>-->
						 <!--搜索条件 end -->

						<!-- top数据展示 start -->
						<div class="home-figure show-data" v-if="pay_channel_type==1">
							<el-row :gutter="10" style="margin: 0 0 20px">
								<el-col :sm="4" v-for="(ele,i) in showList" :key="i">
									<div class="grid-content">
										<div class="home-figure-content home-figure-content-act">{{ele.label}}</div>
										<div class="ly-show-data">
											<span>总数</span><span style="color: #409EFF">{{ele.total}}</span>
										</div>
										<div class="ly-show-data">
											<span>支付宝</span><span style="color: #409EFF">{{ele.alipay}}</span>
										</div>
										<div class="ly-show-data">
											<span>微信</span><span style="color: #409EFF">{{ele.wechant}}</span>
										</div>
									</div>
								</el-col>
							</el-row>
						</div>
						<!-- top数据展示 end -->

						<div class="home-figure show-data" v-else-if="pay_channel_type==2">
							<el-row :gutter="10" style="margin: 20px 0">
								<el-col :sm="4" v-for="(ele,i) in showList" :key="i">
									<div class="grid-content">
										<div class="home-figure-content">{{ele.label}}</div>
										<div class="home-figure-num">{{ele.total}}</div>
									</div>
								</el-col>
							</el-row>
						</div>

						<h1 class="ly-title-one" style="margin-bottom: 20px">交易趋势图</h1>

						<div id="myChart" :style="{width: '70%', height: '500px'}"></div>
						<!--<div id="myChart" :style="{width: '70%', height: '500px', margin: '0 15%'}"></div>-->
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
		name: "list",
		components: {
			CommonFooter
		},
		computed: {
			getWinHeight: function () {
				return this.$winHeight;
			}
		},
		data() {
			return {
                pay_channel_type: '',//通道【1：直连；2：间连】
				winHeight: window.innerHeight,
                formInline: {
                    date: [],
                    begin_time: '',
                    end_time: '',
                    store_id: '',
                    mer_user_id: '',
                },
                shopList: [],
                cashierList: [],
                showList: [
					{
					    label: '实收金额（元）',
                        total: '0',
						alipay: '0',
						wechant: '0'
					},
					{
					    label: '交易笔数（笔）',
                        total: '0',
						alipay: '0',
						wechant: '0'
					},
					{
					    label: '手续费（元）',
                        total: '0',
						alipay: '0',
						wechant: '0'
					},
					{
					    label: '实际到账（元）',
                        total: '0',
						alipay: '0',
						wechant: '0'
					},
					{
					    label: '退款金额（元）',
						total: '0',
						alipay: '0',
						wechant: '0'
					},
					{
					    label: '退款笔数（笔）',
                        total: '0',
						alipay: '0',
						wechant: '0'
					}
				],
                date: new Date(),
                searchState: false,
				echartsOption: {
                    // backgroundColor: '#FFF0F5',
                    title: {
                        // text: '折线图', //主标题
                        // subtext: '模拟数据',  //副标题
                        // x: 'center'
                    },
                    legend: {
                        // orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
                        orient: 'horizontal',
                        // x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
                        x: 'center',
                        // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
                        y: 'top',
                        data: ['交易笔数(笔)','实收金额(元)']
                    },

                    //  图表距边框的距离,可选值：'百分比'¦ {number}（单位px）
                    grid: {
                        top: '16%',   // 等价于 y: '16%'
                        left: '3%',
                        right: '8%',
                        bottom: '3%',
                        containLabel: true
                    },

                    // 提示框
                    tooltip: {
                        // trigger: 'axis'
                    },
                    xAxis: {
                        name: '单位/天',
                        type: 'category',
                        axisLine: {
                            lineStyle: {
                                // 设置x轴颜色
                                color: '#303133'
                            }
                        },
                        // 设置X轴数据旋转倾斜
                        axisLabel: {
                            // rotate: 30, // 旋转角度
                            interval: 0  //设置X轴数据间隔几个显示一个，为0表示都显示
                        },
                        // boundaryGap值为false的时候，折线第一个点在y轴上
                        boundaryGap: true,
                        data: ["9.22","9.23","9.24","9.25","9.26","9.27"]
                    },
                    yAxis: {
                        // name: '单位(天)',
                        axisLine: {
                            lineStyle: {
                                // 设置x轴颜色
                                color: '#303133'
                            }
                        },
                    },
                    series: [
                        {
                            name: '交易笔数(笔)',
                            type: 'line',
                            data: [5, 20, 36, 10, 10, 20],
                            // 设置折线上圆点大小
                            symbolSize: 4,
                            itemStyle:{
                                normal:{
                                    // 拐点上显示数值
                                    label : {
                                        show: true
                                    },
                                    // borderColor:'red',  // 拐点边框颜色
                                    // lineStyle:{
                                    //     // width:3,  // 设置线宽
                                    //     type:'dotted'  //'dotted'虚线 'solid'实线
                                    // }
                                }
                            }
                        },
                        {
                            name: '实收金额(元)',
                            data: [20, 32, 41, 34, 16, 130, 20],
                            type: 'line',
                            // 设置折线上圆点大小
                            symbolSize: 4,
                            itemStyle:{
                                normal:{
                                    // 拐点上显示数值
                                    label : {
                                        show: true
                                    },
                                    borderColor:'red',  // 拐点边框颜色
                                    lineStyle:{
                                        // width:3,  // 设置线宽
                                        type:'dotted'  //'dotted'虚线 'solid'实线
                                    }
                                }
                            }
                        },
                    ],
                    color: ['#6698ee', '#FF9F7F']
                }
			}
		},
		methods: {
            /**
             * 获取门店list
             */
            getShopData() {
                //初始化列表
                this.$axios.post('/mer/order/choose/store').then(res => {
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        this.shopList = res.data.data;
                        this.shopList.forEach((item,index)=>{
                            this.$set(this.shopList[index], 'children', [])
                        })
                    }else {
                        this.$message(res.data.message);
                    }
                })
                    .catch(() => {

                    });
            },
            /**
             *  选择门店
             */
            choShop(val){
                console.log(val);
                if(val.length==0){
                    this.formInline.store_id = '';
                    this.formInline.mer_user_id = '';
                    console.log(this.formInline);
                }else if(val.length==1){
                    this.formInline.store_id = val[0];
                    console.log(this.formInline);
                }else  if(val.length==2){
                    this.formInline.mer_user_id = val[1];
                    console.log(this.formInline);
                }
                if(val.length!=0){
                    let value = val[0];
                    this.$axios.post('/mer/order/choose/cashier', {
                        'store_id': value
                    }).then((res) => {
                        let children = res && res.data && res.data.data || [];
                        for(let i = 0; i < this.shopList.length; i++) {
                            if(this.shopList[i].id === value) {
                                this.$set(this.shopList[i], 'children', children);
                                break;
                            }
                        }
                    })
                }
                console.log(this.formInline);
            },
		    /**
			 *  初始化echarts列表
			 */
            drawLine(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart'));
                // 绘制图表
                myChart.setOption( this.echartsOption);
            },
            /**
             * 获取数据
             */
            getData() {
                //初始化列表
                this.$axios.post('/mer/order/billSummary',this.formInline).then(res => {
                    console.log(res);
                    this.searchState = false;
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        let list = res.data.data;
                        this.showList[0].total = list.received_price;
                        this.showList[0].alipay = list.received_ali_price;
                        this.showList[0].wechant = list.received_wx_price;

                        this.showList[1].total = list.received_count;
                        this.showList[1].alipay = list.received_ali_count;
                        this.showList[1].wechant = list.received_wx_count;

                        this.showList[2].total = list.poundage;
                        this.showList[2].alipay = list.poundage_ali;
                        this.showList[2].wechant = list.poundage_wx;

                        this.showList[3].total = list.total_real_price;
                        this.showList[3].alipay = list.total_real_ali_price;
                        this.showList[3].wechant = list.total_real_wx_price;

                        this.showList[4].total = list.refund_price;
                        this.showList[4].alipay = list.refund_ali_price;
                        this.showList[4].wechant = list.refund_wx_price;

                        this.showList[5].total = list.refund_count;
                        this.showList[5].alipay = list.refund_ali_count;
                        this.showList[5].wechant = list.refund_wx_count;

                        this.echartsOption.xAxis.data = list.received_dates;
                        this.echartsOption.series[0].data = list.received_counts;
                        this.echartsOption.series[1].data = list.received_prices;
                        console.log(this.echartsOption);

                        //初始化列表
                        this.drawLine();
                    } else {
                        this.$message(res.data.message);
                    }
                })
                    .catch(() => {
                        this.searchState = false;
                    });
            },
            /**
			 * 选择时间 值有改变
             * @param val 选中的时间
             */
            changeDate(val){
                console.log(val,this.formInline.date);
                if(val){
                    let start = new Date(val[0]),end = new Date(val[1]);
                    console.log(start,end,Date.parse(start),Date.parse(end));
                    this.formInline.begin_time = start.valueOf();
                    this.formInline.end_time = end.valueOf();
                    console.log(this.formInline.begin_time,this.formInline.end_time,this.formInline)
                }else {
                    this.formInline.begin_time = this.formInline.end_time = '';
                }
			},
			onSubmit() {
                this.searchState = true;
				console.log('submit!');
				this.getData();
			},
		},
		mounted(){
            //    获取门店list
            this.getShopData();
		    let time = new Date();
            var preDate = new Date(this.date.getTime() - 24*60*60*1000); //前一天
            var nextDate = new Date(this.date.getTime()); //后一天

		    this.formInline.begin_time = new Date(this.date.getTime() - 24*60*60*1000);
		    this.formInline.end_time = new Date(this.date.getTime() - 24*60*60*1000); //今天
			this.formInline.date.push(this.formInline.begin_time,this.formInline.end_time);
			console.log(this.formInline.date);
			this.changeDate(this.formInline.date);
            //获取数据
			this.getData();

            // //初始化列表
            // this.drawLine();
		},
        created(){
            this.pay_channel_type = this.$ls.get(this.$webConfig.pay_channel_type)
        },
	}
</script>

<style scoped>
	.main-inner {
		padding: 13px 40px;
	}
	.el-date-editor--datetimerange {
		width: 240px!important;
		margin-top: 4px;
	}
	.home-figure-content-act {
		font-size: 16px;
	}
	.home-figure .grid-content {
		height: auto;
	}
	.ly-show-data {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20px;
		color: #8590A9
	}
</style>
