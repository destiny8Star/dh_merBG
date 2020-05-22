<template>
    <div>
        <common-header></common-header>
        <common-lefter></common-lefter>
        <div class="main" id="main">
            <transition name="custom-classes-transition" enter-active-class="fadeIn" leave-active-class="bounceOutRight"
                        mode="out-in" :duration="{ enter: 350, leave: 200 }">
                <keep-alive v-if="$route.meta.keepAlive">
                    <router-view class="animated"></router-view>
                </keep-alive>
                <router-view class="animated" v-else></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
    import CommonLefter from "../components/CommonLefter.vue";
    import CommonHeader from "../components/CommonHeader.vue";

    export default {
        name: "Merchant",
        components: {
            CommonLefter,
            CommonHeader
        }
    };
</script>
