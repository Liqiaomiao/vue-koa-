<template>
    <div class="goods">
        <div class="navbar-div">
            <van-nav-bar
                    title="商品详情"
                    left-text="返回"
                    left-arrow
                    @click-left="onClickLeft"
            ></van-nav-bar>
        </div>
        <div class="topimage-div">
            <img :src="goodsInfo.IMAGE1" alt="">
        </div>
        <div class="goods-name">{{goodsInfo.NAME}}</div>
        <div class="goods-price">价格：{{goodsInfo.PRESENT_PRICE|toMoney}}</div>
        <div>
            <van-tabs swipeable sticky>
                <van-tab title="商品详情">
                    <div class="detail" v-html="goodsInfo.DETAIL"></div>
                </van-tab>
                <van-tab title="评价">
                    正在制作中
                </van-tab>
            </van-tabs>
        </div>
        <div class="goods-bottom">
            <div>
                <van-button size="large" @click="addGoodsToChart" type="primary">加入购物车</van-button>
            </div>
            <div>
                <van-button size="large" type="danger">直接购买</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import url from '../../serviceAPI.config.js';
    export default {
        name: 'Goods',
        data(){
            return {
                goodsId:'775e575ce28a4f89b1dfe2c99eb08ae8',
                goodsInfo:{},//商品详细数据
            }
        },
        created(){
            this.goodsId = this.$route.query.goodsId;
            this.getInfo()
        },
        methods:{
            getInfo(){
                axios({
                    url:url.getDetailGoodsInfo,
                    method:'post',
                    data:{
                        goodsId:this.goodsId
                    }
                }).then(res=>{
                    if(res.data.code===200 && res.data.message){
                        this.goodsInfo =res.data.message;
                    }else{
                        this.$toast.fail('服务器错误，数据取得失败')
                    }

                }).catch(err=>{
                    console.log(err);
                })
            },
            addGoodsToChart(){
                let cartInfo = localStorage.cartInfo==undefined?[]:JSON.parse(localStorage.cartInfo);
                let isHaveGoods = cartInfo.find(cart=>{return cart.goodsId==this.goodsId});
                if(!isHaveGoods){
                    let newGoodsInfo = {
                        goodsId:this.goodsInfo.ID,
                        Name:this.goodsInfo.NAME,
                        price:this.goodsInfo.PRESENT_PRICE,
                        image:this.goodsInfo.IMAGE1,
                        count:1
                    }
                    cartInfo.push(newGoodsInfo);
                    localStorage.cartInfo = JSON.stringify(cartInfo)
                    this.$toast.success('添加成功')
                }else{
                    this.$toast.success('已有此商品')
                }
                this.$router.push({name:'Cart'})
            },
            onClickLeft(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped lang="less">
    .detail{
        font-size:0px;
    }
    .goods-name{
        background-color: #fff;
    }
    .goods-price{
        background-color: #fff;
    }
    .topimage-div{
        img{
            width: 100%;
        }
    }
    .goods-bottom{
        position: fixed;
        bottom:0px;
        left:0px;
        background-color: #FFF;
        width:100%;
        display: flex;
        flex-direction: row;
        flex-flow: nowrap;
    }
    .goods-bottom > div{
        flex:1;
        padding:5px;
    }
    .goods{
        padding-bottom: 60px;
    }
</style>