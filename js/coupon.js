/*
* @Author: my
* @Date:   2017-04-14 22:03:38
* @Last Modified by:   my
* @Last Modified time: 2017-04-14 22:04:10
*/

$(function(){
   var product = {
      ajax1:function(){
        $.ajax({
          //接口,需要将分类id传进去，这里的id需要根据点击时候动态获取
          url:"http://127.0.0.1:3000/api/getcoupon",
          success:function(data){
            var content = template("coupons",data);
            $(".coupons ul").html(content);
            product.ajax2();//点击回到顶部回到顶部
          }
        })
      },
      ajax2:function(){
        //点击li发送ajax请求
        $(".coupons ul li").on("click",function(){
          $.ajax({
            //接口,需要将分类id传进去，这里的id需要根据点击时候动态获取
            url:"http://127.0.0.1:3000/api/getcouponproduct",
            success:function(data){

            }
          })
        })
        
      },
      totop:function(){//点击回到顶部
        $(".totop").on("click",function(){
          $("html body").animate({scrollTop:"0px"});
        })
      }
  }
  product.ajax1();//加载导航数据，点击加载分页数据
  product.totop();//点击回到顶部回到顶部
})

