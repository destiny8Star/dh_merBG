<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-60)+'px'}">
                <div class="main-feature">
                    <div class="main-inner" :style="{height: (getWinHeight-280)+'px'}">
                        <h1 class="ly-title-one">联系我们</h1>
                        <!--<img src="../../assets/img/home/logo.png" alt="" class="logo">-->
                        <p class="text">服务商公司名：<span>{{info.name}}</span></p>
                        <p class="text">服务商联系电话：<span>{{info.agent_service_tel}}</span></p>
<!--                        <p class="text">技术支持：点击生活</p>-->
                        <!--<h1 class="ly-title-one">意见反馈</h1>-->

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
        data: function () {
            return {
                winHeight: window.innerHeight,
                info: {
                    agent_service_tel: '',
                    name: ''
                }
            }
        },
        methods: {
            getData() {
                return this.$axios.post('/mer/agent/server')
                    .then(res => {
                        console.log("获取服务商信息", res);
                        if (res.data.code === this.$webConfig.httpSuccessStatus) {
                            this.info = res.data.data;
                        } else {
                            this.$message(res.data.message);
                        }
                    })
                    .catch(rej => {
                        console.log('获取服务商失败', rej)
                    })
            },
        },
        mounted(){
            this.getData();
        }
    }
</script>

<style scoped>
    .main-inner {
        padding: 13px 40px 30px;
    }
    .logo {
        width: 304px;
        height: 84px;
        margin: 30px 0;
    }
    .text {
        font-size: 16px;
    }
    .text span{
        font-weight: bold;
    }
</style>

