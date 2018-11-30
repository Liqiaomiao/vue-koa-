<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar title="购物车"></van-nav-bar>
        </div>
        <div class="cart-list">
            <div class="pang-row" v-for="(item,index) in cartInfo" :key="index">
                <div class="pang-img"><img :src="item.image" width="100%" alt=""></div>
                <div class="pang-text">
                    <div class="pang-goods-name">{{item.Name}}</div>
                    <div class="pang-control">
                        <van-stepper v-model="item.count"/>
                    </div>
                </div>
                <div class="pang-goods-price">
                    <div >
                        ￥{{item.price|toMoney}}
                    </div>
                    <div>
                        ×{{item.count}}
                    </div>
                    <div class="allPrice">
                        ￥{{item.price*item.count|toMoney}}
                    </div>
                </div>
            </div>
        </div>
        <div class="totalMoney">
            商品总价：￥{{totalMoney|toMoney}}
        </div>
        <div class="cart-title">
            <van-button size="small" type="danger" @click="clearCart" plain>清空购物车</van-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'cart',
        data(){
            return {
                cartInfo:[],
                isEmpty:false,//购物车是否为空，空false
            }
        },
        computed:{
            totalMoney(){
                let allMoney = 0;
                this.cartInfo.forEach((item,index)=>{
                    allMoney+=item.price*item.count
                })
                return allMoney
            }
        },
        created(){
            this.getCartInfo()
        },
        methods:{
            getCartInfo(){

                if(localStorage.cartInfo){
                    this.cartInfo=JSON.parse(localStorage.cartInfo)
                }
                this.isEmpty = this.cartInfo.length>0?true:false;
            },
            clearCart(){
                localStorage.removeItem('cartInfo');
                this.cartInfo=[];
            }
        }
    }
</script>

<style scoped>
    .cart-list{
        background-color: #fff;
    }
    .pang-row{
        display: flex;
        flex-direction: row;
        flex-wrap:nowrap;
        padding:8px;
        font-size:14px;
        border-bottom:1px solid #E4E7ED;
    }
    .pang-img{
        flex:6;
    }
    .pang-text{
        flex:14;
        padding-left:10px;
    }
    .pang-control{
        padding-top: 10px;
    }
    .pang-goods-price{
        flex:4;
        text-align: right;
    }
    .totalMoney{
        text-align: right;
        background-color: #fff;
        border-bottom:1px solid #E4E7ED;
        padding: 5px;
    }
    .card-title{
        height: 2rem;
        line-height:2rem;
        background-color: #fff;
        border-bottom:1px solid #E4E7ED;
        padding:5px;
        text-align: right;
    }
</style>