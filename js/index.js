/*
* @Author: my
* @Date:   2017-04-12 15:19:41
* @Last Modified by:   my
* @Last Modified time: 2017-04-12 20:17:12
*/
// ajax获取nav数据
$(document).ready(function($) {
    $.ajax({
      //接口
      url:"http://mmb.ittun.com/api/getindexmenu",
      type:jsonp,
      success:function(data){
        //渲染模板
        var html = template('navItem', data);
        $('#navlist').html(html);
          $("#navlist>div:nth-child(8)").on("click",function(){
            $(this).nextAll().toggle(200)
          })
      }
    })
})  
// ajax获取折扣推荐数据
$(document).ready(function($) {
    $.ajax({
      //接口
      url:"http://127.0.0.1:3000/api/getmoneyctrl",
      success:function(data){
        //渲染模板
        var html = template('productItem', data);
        $('#goodList').html(html);
      }

    })
})  


