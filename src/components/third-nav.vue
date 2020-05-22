<template>
    <div class="third-nav">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">出售中</el-menu-item>
            <el-menu-item index="2">已售罄</el-menu-item>
            <el-menu-item index="3">已下架</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "third-nav",
        data: function(){
            return {
                activeIndex: '1',
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>