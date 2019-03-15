const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组数据
export const hotList = function(data) {
    console.log(222,data)
    let Hotlist = [];
    for (let i = 0; i < 16; i++) {
        let newListObject = {
            name: Random.cword(5, 8), //  Random.csentence( min, max )
            id: "h"+"00"+(i+1), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
            // author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
            url:"https://p1.meituan.net/movie/616cd50a33550a9225ac781e52d14ae54967551.jpg@160w_220h_1e_1c"
            // date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
        }
        Hotlist.push(newListObject)
    }
 
    return {
        code:"200",
        data: Hotlist
    }
}
export const commingSoonList = function(){
    let commingSoonList = []
    for(let i = 0; i < 10; i++ ){
        let newList = {
            name:Random.cword(5,8),
            id:"c00"+(i+1),
            url:"https://p0.meituan.net/movie/fc4dd6cd0c6f7db566a128cc05c475355664427.jpg@160w_220h_1e_1c"
        }
        commingSoonList.push(newList)
    }
    return {
        code:'200',
        data:commingSoonList
    }
}

export const historyList = function(){
    let historyList = []
    for(let i = 0; i < 10; i++ ){
        let newList = {
            name:Random.cword(5,8),
            id:"h00"+(i+1),
            url:"https://p0.meituan.net/movie/07b4127cff2289cd91b65628f4417ac37666558.jpg@160w_220h_1e_1c"
        }
        historyList.push(newList)
    }
    return {
        code:'200',
        data:historyList
    }
}