<template>
    <div id="categoryList">
        <div class="navbar-div">
            <van-nav-bar title="类别列表"/>
        </div>
        <div>
            <van-row>
                <van-col span="6">
                    <div id="leftNav">
                        <ul>
                            <li @click="clickCategory(index,item.ID)" :class="{categoryActive:categoryIndex==index}"  v-for="(item,index) in category" :key="index">{{item.MALL_CATEGORY_NAME}}</li>
                        </ul>
                    </div>
                </van-col>
                <van-col span="18">
                    <div class="tabCategorySub">
                        <van-tabs v-model="active">
                            <van-tab v-for="(item,index) in categorySub" :key="index" :title="item.MALL_SUB_NAME"></van-tab>
                        </van-tabs>
                        <div id="list-div">
                            <van-pull-refresh v-model="isRefresh" @refresh ="onRefresh">
                                <van-list   v-model="loading"
                                            :finished="finished"
                                            finished-text="没有更多了"
                                            @load="onLoad">
                                   <div class="list-item" v-for="(item,index) in goodList" :key="index" @click="goGoodsInfo(item.ID)">
                                       <div class="list-item-img"><img :src="item.IMAGE1" width="100%" :onerror="errorImg"></div>
                                       <div class="list-item-text">
                                           <div>{{item.NAME}}</div>
                                           <div>￥{{item.ORI_PRICE|toMoney}}</div>
                                       </div>
                                   </div>
                                </van-list>
                            </van-pull-refresh>
                        </div>
                    </div>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import url from '../../serviceAPI.config'
    export default {
        name: 'CategoryList',
        data(){
            return{
                category:[],
                categoryIndex:0,
                categorySub:[],
                list:[],
                active:0,
                loading: false,
                finished: false,
                isRefresh: false,
                page:1,
                goodList:[],
                categorySubId:'',
                errorImg:`this.src="${require('@/assets/images/errorimg.png')}"`
            }
        },
        methods:{
            getCategory(){
                axios({
                    url:url.getCategoryList,
                    method:'get'
                }).then(res=>{
                    if(res.data.code==200&&res.data.message){
                        console.log('取得',res.data.message);
                        this.category=res.data.message
                        this.getCategorySubByCategoryId(this.category[0].ID)
                    }else{
                        this.$toast.fail('服务器错误，数据取得失败')
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
            clickCategory(index,categoryId){
                this.categoryIndex = index;
                this.page=1
                this.finished=false;
                this.goodList=[];
                this.categorySubId='';
                this.getCategorySubByCategoryId(categoryId)
            },
            getCategorySubByCategoryId(categoryId){
                axios({
                    url:url.getCategorySubList,
                    method:'post',
                    data:{
                        categoryId:categoryId,
                        page:this.page
                    }
                }).then(res=>{
                    if(res.data.code=200 && res.data.message){
                        this.categorySub = res.data.message
                        this.onLoad()
                    }else{
                        this.$toast.fail('服务器错误，数据取得失败')
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
            onLoad(){
                setTimeout(() => {
                  this.categorySubId=this.categorySubId?this.categorySubId:this.categorySub[0].ID
                    this.getGoodList()
                }, 500);
            },
            onRefresh(){
                setTimeout(()=>{
                    this.isRefresh = false;
                    this.finished=false;
                    this.goodList=[];
                    this.page=1;
                    this.onLoad()
                },500)
            },
            getGoodList(){
                axios({
                    url:url.getGoodsListByCategorySubID,
                    method:'post',
                    data:{
                        categorySubId:this.categorySubId,
                        page:this.page
                    }
                }).then(res=>{
                    if(res.data.code==200 && res.data.message.length){
                        this.page++
                        this.goodList=this.goodList.concat(res.data.message)
                    }else{
                        this.finished=true;
                    }
                    this.loading=false;
                }).catch(err=>{
                    console.log(err);
                })
            },
            onClickCategorySub(index,title){
                this.categorySubId = this.categorySub[index].ID;
                this.goodList=[];
                this.finished=false;
                this.page=1;
                this.onLoad()
            },
            goGoodsInfo(ID){
                this.$router.push({name:'Goods',query:{goodsId:ID}})
            }
        },
        mounted(){
            let winHeight = document.documentElement.clientHeight;
            let headerHeight = document.getElementById('categoryList').querySelector('.van-nav-bar').clientHeight;
            let tabHeight = document.getElementById('categoryList').querySelector('.van-tabs').clientHeight;
            let footHeight = document.querySelector('.van-hairline--top-bottom').clientHeight;
            document.getElementById('leftNav').style.height=winHeight-headerHeight-footHeight+'px';
            document.getElementById('list-div').style.height=winHeight-headerHeight-tabHeight-footHeight+'px';
        },
        created(){
            this.getCategory()
        }
    }
</script>

<style scoped lang="less">
    #leftNav ul li {
        line-height: 32px;
        border-bottom:1px solid #E4E7ED;
        padding:3px;
        font-size:12px;
        text-align: center;
    }
    .categoryActive{
        background-color: #fff;
    }
    .list-item{
        text-align: center;
        line-height: 80px;
        border-bottom: 1px solid #f0f0f0;
        background-color: #fff;
    }
    #list-div{
        overflow: scroll;
    }
    .list-item{
        display: flex;
        flex-direction: row;
        font-size:0.8rem;
        border-bottom: 1px solid #f0f0f0;
        background-color: #fff;
        padding:5px;
    }
    #list-div{
        overflow: scroll;
    }
    .list-item-img{
        flex:8;
    }
    .list-item-text{
        flex:16;
        margin-top:10px;
        margin-left:10px;
    }
</style>