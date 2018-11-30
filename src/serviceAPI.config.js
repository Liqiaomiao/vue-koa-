const BASEURL = ' https://easy-mock.com/mock/5ae533bab188f2152c952d86/SmileVue/';
const LOCALURL = 'http://localhost:3000/';
const URL = {
    getShoppingMallInfo:BASEURL + 'index',
    getGoodsInfo: BASEURL+'getGoodsInfo',
    regionUser:LOCALURL +'user/register',
    loginUser:LOCALURL+'user/login',
    getDetailGoodsInfo:LOCALURL+'goods/getDetailGoodsInfo',//商品详细数据
    getCategoryList:LOCALURL+'goods/getCategoryList',//大类商品
    getCategorySubList:LOCALURL+'goods/getCategorySubList',//小类商品
    getGoodsListByCategorySubID:LOCALURL+'goods/getGoodsListByCategorySubID',//小类商品详情
};
module.exports = URL;
