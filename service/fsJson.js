const fs=require("fs");
fs.readFile('./data_json/goods.json','utf8',function (err,data) {
    let newData = JSON.parse(data);
    let i=0;
    let pushData=[];
    newData.RECORDS.map((val,index)=>{
        if(val.IMAGE1!=null){
            i++;
            pushData.push(val)
        }
    });
    fs.writeFile('./newGoods.json',JSON.stringify(pushData),function (err) {
        if (err) {
            console.log('写文件操作失败');
        }
        else {
            console.log('写文件操作成功');
        }
    })
});
