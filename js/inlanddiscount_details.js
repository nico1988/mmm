/*
* @Author: my
* @Date:   2017-04-14 22:03:38
* @Last Modified by:   my
* @Last Modified time: 2017-04-14 22:04:10
*/
function getQueryString(name) { //pageid
    // name="xxxx"& 
    // i,不严格区分大小写  
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        // console.log(r);
        return unescape(r[2]);//解码
    }
    return null;
}
var product_id = getQueryString("productid");
'use strict';
$(function(){
   var product = {
      ajax1:function(){
        $.ajax({
          //接口,需要将分类id传进去，这里的id需要根据点击时候动态获取
          url:"http://127.0.0.1:3000/api/getmoneyctrlproduct",
          data:{"productid":product_id},
          success:function(data){
            //渲染模板
            console.log(data)
            var pages = Math.ceil(data.totalCount/data.pagesize);
            console.log(pages)
            var content = template("medialist",data);
            $(".product_info").html(content);
          }
        }) 
      }
    }
  product.ajax1();
})