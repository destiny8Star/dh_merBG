<template>

</template>

<script>
    export default {
        name: "GetRouters",
        data: function () {
            return {
                pages: [],
            }
        },
        mounted() {
            let routers = this.$router.options.routes;
            console.log(routers);
            routers.forEach(item => {
                let tmp = {menu_name: "", file_path: "", children: []};
                if (item.meta) {
                    tmp.menu_name = item.meta.menu_name;
                    tmp.file_path = item.meta.file;
                    tmp.children = [];
                }
                if (item.children) {
                    item.children.forEach(m => {
                        if (m.meta) {
                            let tmp2 = {menu_name: m.meta.menu_name, file_path: m.meta.file, group_name: m.meta.group_name};
                            tmp.children.push(tmp2);
                        }

                    });
                }
                this.pages.push(tmp);
            });

            // let itemName;
            // this.pages.children.forEach(item => {
            //    itemName = item.group_name;
            //    let group = {group_name:item.group_name,children:[]};
            // });
            //
            // let datas = this.pages.children;
            // itemName = datas[0];
            // for (let i=0;i<datas.length;i++){
            //     if(datas[i].group_name==itemName){
            //
            //     }
            // }

            console.log(JSON.stringify(this.pages));
        },
        methods: {}
    }
</script>
