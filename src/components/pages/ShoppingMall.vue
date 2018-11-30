<template>
    <div id="home">
        <!--<div class="search-bar">-->
        <!--<div>-->
        <!--<van-search placeholder="请输入搜索关键词" v-model="searchvalue" />-->
        <!--</div>-->
        <!--</div>-->
        <div class="swiper-area">
            <van-swipe :autoplay="2000">
                <van-swipe-item v-for="(item,index) of bannerPicArray" :key="`swiper${index}`">
                    <img :src="item.imageUrl" v-lazy="item.imageUrl">
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="type-bar">
            <div class="type-item" v-for="(cate,index) in category" :key="index">
                <img v-lazy="cate.image">
                <span>{{cate.mallCategoryName}}</span>
            </div>
        </div>
        <div class="recommend-area">
            <div class="recommend-title">
                商品推荐
            </div>
            <div class="recommend-body">
                <swiper :options="swiperOption" class="recommend-item">
                    <swiper-slide v-for="(item,index) in recommendGoods" :key="index">
                        <div class="recommend-item">
                            <img :src="item.image" alt="">
                            <div>{{item.goodsName}}</div>
                            <div>￥{{item.price}}(￥{{item.mallPrice|toMoney}})</div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>

        </div>
        <floorComponent :floor-data="floor1" :floor-title="floorName.floor1"></floorComponent>
        <floorComponent :floor-data="floor2" :floor-title="floorName.floor2"></floorComponent>
        <floorComponent :floor-data="floor3" :floor-title="floorName.floor3"></floorComponent>
        <div class="hot-area">
            <div class="hot-title">热卖商品</div>
            <div class="hot-goods">
                <van-list>
                    <van-row gutter="20">
                        <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
                            <goodsInfo :goods-image="item.image" :goods-name="item.name"
                                       :goods-price="item.price" :goods-id="item.goodsId"></goodsInfo>
                        </van-col>
                    </van-row>
                </van-list>
            </div>
        </div>
    </div>


</template>

<script>
    import axios from 'axios';
    import 'swiper/dist/css/swiper.css'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import floorComponent from '../component/floorComponent'
    import goodsInfo from '../component/goodsInfoComponent'
    import url from '../../serviceAPI.config.js'
    export default {
        name: 'ShoppingMall',
        components: {
            swiper,
            swiperSlide,
            floorComponent,
            goodsInfo,
        },
        data() {
            return {
                msg: 'Shopping Mall',
                searchvalue: '',
                bannerPicArray: [
                    {imageUrl: 'https://img.yzcdn.cn/upload_files/2018/11/21/FiLjIAZtVgXyQW0NbwTmxwC7JO4I.jpg?imageView2/2/w/730/h/0/q/75/format/jpg'},
                    {imageUrl: 'https://img.yzcdn.cn/upload_files/2018/11/21/Fs3BbqKbqJYtlcgZtU_7_67rvygb.jpg?imageView2/2/w/730/h/0/q/75/format/jpg'},
                    {imageUrl: 'https://img.yzcdn.cn/upload_files/2018/11/21/FgbzZk5agy7OtUyvrqsFEQrPspiw.jpg?imageView2/2/w/730/h/0/q/75/format/jpg'},
                    {imageUrl: 'https://img.yzcdn.cn/upload_files/2018/11/03/FpSyWCaZn9zE7AIeY2HniJ2jUT_y.png?imageView2/2/w/730/h/0/q/75/format/png'},
                ],
                category: [],
                recommendGoods: [],
                swiperOption: {
                    slidesPerView: 3,
                },
                floor1: {},
                floor2: {},
                floor3: {},
                floorName: [],
                hotGoods:[]
            };
        },
        created() {
            axios({
                url:url.getShoppingMallInfo,
                method: 'get',
            }).then((res) => {
                if (res.status === 200) {
                    const data = res.data.data;
                    this.category = data.category;
                    this.recommendGoods = data.recommend;
                    this.floor1 = data.floor1;
                    this.floor2 = data.floor2;
                    this.floor3 = data.floor3;
                    this.floorName = data.floorName;
                    this.hotGoods = data.hotGoods;
                }
            });
        },



    };
</script>

<style scoped lang="less">
    @import "./ShoppingMallScoped.less";
</style>
<style lang="less">
    @import "./ShoppingMall.less";
</style>