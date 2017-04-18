// 获取url地址栏？后面的内容
$(function(coupon_id){
	var shop_id,area_id;
   var product = {
      ajax1:function(){
        $.ajax({
          //接口,需要将分类id传进去，这里的id需要根据点击时候动态获取
          url:"http://127.0.0.1:3000/api/getsitenav",
          success:function(data){
            console.log(data);
            var content = template("nav_list",data);
            $(".sites ul").html(content);
          }
        })
      },
      totop:function(){//点击回到顶部
        $(".totop").on("click",function(){
          $("html body").animate({scrollTop:"0px"});
        })
      },

  }
  product.ajax1();//加载导航数据，点击加载分页数据
})


