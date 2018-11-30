<template>
    <div>
        <div class="main-div">
            <keep-alive>
                <router-view/>
            </keep-alive>

        </div>
        <van-tabbar v-model="active" @change="changeTabber(active)">
            <van-tabbar-item icon="shop">首页</van-tabbar-item>
            <van-tabbar-item icon="records">列表页</van-tabbar-item>
            <van-tabbar-item icon="cart">购物车页</van-tabbar-item>

        </van-tabbar>
    </div>
</template>

<script>
    export default {
        name: 'Main',
        data(){
            return {
                active: 0,
                routers:['ShoppingMall','CategoryList','Cart','']
            }
        },
        created(){
            this.changeTabberActive()
        },
        methods:{
            changeTabber(active){
                this.$router.push({name:this.routers[this.active]})
            },
            changeTabberActive(){
                let nowPath = this.$route.name;
                this.active = this.routers.indexOf(nowPath);
                console.log(nowPath);
            }
        }
    }
</script>

<style scoped>
.main-div{
    padding-bottom: 60px;
}
</style>