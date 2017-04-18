/*
* @Author: my
* @Date:   2017-04-14 22:03:38
* @Last Modified by:   my
* @Last Modified time: 2017-04-14 22:04:10
*/

$(function(){
   var product = {
      data2:{},
      data1:{},
      pageY:[],
      ajax1:function(){
        $.ajax({
          //接口,需要将分类id传进去，这里的id需要根据点击时候动态获取
          url:"http://127.0.0.1:3000/api/getinlanddiscount",
          success:function(data){
            //渲染模板
            product.data1.result = data.result.splice(0,data.result.length-4);
            product.data2.result = data.result.splice(-4);
            var content = template("medialist",product.data1);
            $("#product_list").html(content);
            $(window).scroll(function(){
              var aaa =  $(".product:last-child").offset().top
              if(($(document).scrollTop()+$(window).height())>=$(".product:last-child").offset().top){
                console.log('加载最后四条数据啦');
                var content1 = template("medialist",product.data2);
                $("#product_list").html(content+content1);
              }
            })
          }
        }) 
      },
      totop:function(){
        $(".totop").on("click",function(){
          window.scrollTo( 0, 0);
        })
      }
    }
  product.ajax1();
  product.totop();

})

