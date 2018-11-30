const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
let router = new Router();
const mongoose = require('mongoose');
const fs = require('fs');

router.get('/insterAllGoodsInfo',async(ctx)=>{
   fs.readFile('./newGoods.json','utf8',(err,data)=>{
       data = JSON.parse(data);
       let saveCount = 0 ;
       const Goods = mongoose.model('Goods');
      data.map((value,index)=>{
        let newGoods = new Goods(value);
        newGoods.save().then(()=>{
           saveCount++
            console.log('成功' + saveCount);
        }).catch((err)=>{
            console.log('失败', err);
        })

      })
   })
    ctx.body='开始导入数据'
})

router.get('/insertAllCategory',async(ctx)=>{
   fs.readFile('./data_json/category.json','utf8',(err,data)=>{
       data=JSON.parse(data);
       let saveCount = 0 ;
       const Category = mongoose.model('Category');
       data.RECORDS.map((val,index)=>{
           console.log(val);
           let newCategory = new Category(val)
           newCategory.save().then(()=>{
               saveCount++;
               console.log('成功', saveCount);
           }).catch(err=>{
               console.log('失败', err);
           })
       })


   });
    ctx.body='开始导入数据'
});
router.get('/insertAllCategorySub',async(ctx)=>{
    fs.readFile('./data_json/category_sub.json','utf8',(err,data)=>{
        data=JSON.parse(data);
        let saveCount = 0;
        let categorySub = mongoose.model('CategorySub');
        data.RECORDS.map((val,index)=>{
            console.log(val);
            let newCategorySub = new categorySub(val)
            newCategorySub.save().then((err,data)=>{
                saveCount++;
                console.log('成功', saveCount);
            }).catch(err=>{
                console.log('失败', err);
            })
        })
    })
});
//获取商品详细信息的接口
router.post('/getDetailGoodsInfo',async(ctx)=>{
   try{
       let goodsId = ctx.request.body.goodsId;
       const Goods = mongoose.model('Goods');
       const result = await Goods.findOne({ID:goodsId}).exec();

           ctx.body={
               code:200,
               message:result||{}
           }


   }catch (e) {
       ctx.body={
           code:500,
           message:e
       }
   }


})
//读取大类
router.get('/getCategoryList',async(ctx)=>{
    try{
        const Category = mongoose.model('Category')
        const result = await Category.find().exec()
        ctx.body={
            code:200,
            message:result
        }
    }
    catch(e){
        ctx.body={
            code:500,
            message:e
        }
    }
})
//读取小类
router.post('/getCategorySubList',async(ctx)=>{
    try{
        let categoryId = ctx.request.body.categoryId;
        const CategorySub = mongoose.model('CategorySub')
        let result = await CategorySub.find({MALL_CATEGORY_ID:categoryId}).exec();
        ctx.body={
            code:200,
            message:result
        }
    }
    catch (e) {
        ctx.body={
            code:500,
            message:e
        }
    }
})
//根据小类货的商品详情
router.post('/getGoodsListByCategorySubID',async(ctx)=> {
    try {
        let categorySubID = ctx.request.body.categorySubId;
        console.log(categorySubID);
        let page = ctx.request.body.page;
        let num=10;//每页显示数量
        let start = (page-1)*num;
        const Goods = mongoose.model('Goods');
        let result = await Goods.find({SUB_ID:categorySubID}).skip(start).limit(num).exec();
        console.log("result", result);
        ctx.body={
            code:200,
            message:result
        }
    }
    catch (e) {
        ctx.body={
            code:500,
            message:e
        }
    }

})

module.exports = router;