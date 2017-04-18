// 获取url地址栏？后面的内容
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
var coupon_id = getQueryString("couponId");
$(function(coupon_id){
	var shop_id,area_id;
   var product = {
      ajax1:function(){
        $.ajax({
          //接口,需要将分类id传进去，这里的id需要根据点击时候动态获取
          url:"http://127.0.0.1:3000/api/getgsshop",
          success:function(data){
            var content = template("shop_list",data);
            $(".shop_list ul").html(content);
            // 点击li显示/隐藏响应区域
            $("ul.hd li:first-child").on("click",function(){
            	//显示时让其他隐藏
            	$(".list .shop_list").toggle(400).siblings().hide();
            });
            //点击店铺列表中某一项
            //点击shoplist中的任意一项，让店铺的内容变成当前的文本
            $(".shop_list>ul>li").on("click",function(){
            	$("ul.hd li:nth-child(1) i").text($(this).text());
            	// 点击对应的店铺，让当前店铺打上对勾，取消其他对勾同时加类名ok
            	//同时让当前span加上类名ok，去除其他span的类名ok
            	$(this).addClass("ok").find("span").toggle().end().siblings().removeClass("ok").find("span").hide();
            	//触发标题的点击事件
            	$("ul.hd li:nth-child(1)").trigger("click");
            	// shop_id是有class属性属性名为ok的那个li的data-shopid属性值
            	//遍历li让shop_id=有class类名为ok的li的data-shopid属性值
            	$(".shop_list>ul>li").each(function(i,v){
            		if($(v).attr("class") == "ok"){
            			shop_id = $(this).attr("data-shopid");
            		}
            	})
            	//调用ajax
            	$.ajax({
		        	//商品列表信息；
		          //根据店铺的id和区域的id获取该店铺该区域的商品列表信息
		          url:"http://127.0.0.1:3000/api/getgsproduct",
		          //如果没有选中任何元素，代表没有任何li有class=ok值,shopid为undefined
		          data:{"shopid":shop_id||0,"areaid":area_id||0},//默认显示京东和华北
		          success:function(data){
		            var content = template("product_list",data);
		            $(".coudan_body ul").html(content);
		          }
		        })
            })
          }
        })
      },
      ajax2:function(){
        $.ajax({
        	//获取凑单品的区域的信息 并渲染到区域的下拉列表
          url:"http://127.0.0.1:3000/api/getgsshoparea",
          success:function(data){
            var content = template("shop_area",data);
            $(".area_list ul").html(content);
            // 点击li显示/隐藏响应区域
            $("ul.hd li:nth-child(2)").on("click",function(){
            	//显示时让其他隐藏
            	$(".list .area_list").toggle(400).siblings().hide();
            })
            //点击价格显示/隐藏相应区域
            $("ul.hd li:last-child").on("click",function(){
            	//显示时让其他隐藏
            	$(".list .price_list").toggle(400).siblings().hide();
            })
            //点击任意一个li让自己的箭头向上，其他的箭头向下
            $("ul.hd li").on("click",function(){
            	var classname = "glyphicon glyphicon glyphicon-triangle-bottom glyphicon-triangle-top";
            	$(this).find("span").toggleClass(classname).end().siblings().find("span").attr("class","glyphicon glyphicon-triangle-bottom");
            });
            //点击area_list中的每一项
			$(".area_list>ul>li").on("click",function(){
            	$("ul.hd li:nth-child(2) i").text($(this).text().slice(0,2));
            	// 点击对应的区域，让当前区域打上对勾，取消其他对勾
            	//同时让当前li加上类名ok，去除其他span的类名ok
            	$(this).addClass("ok").find("span").toggle().end().siblings().removeClass("ok").find("span").hide();
            	//点击任何一项触发标题的点击事件
            	$("ul.hd li:nth-child(2)").trigger("click");
            	area_id = $(this).attr("data-areaid");
            	//遍历li让area_id=有class类名为ok的li的data-areaid属性值
            	$(".area_list>ul>li").each(function(i,v){
            		if($(v).attr("class") == "ok"){
            			area_id = $(this).attr("data-areaid");
            		}
            	})
            	//调用ajax
            	$.ajax({
		        	//商品列表信息；
		          //根据店铺的id和区域的id获取该店铺该区域的商品列表信息
		          url:"http://127.0.0.1:3000/api/getgsproduct",
		          data:{"shopid":shop_id,"areaid":area_id||0},//默认显示京东和华北
		          success:function(data){
		            var content = template("product_list",data);
		            $(".coudan_body ul").html(content);
		          }
		        })
            })
            //点击价格列表中的每一项变换标题让当前的文字
            $(".price_list>ul>li").on("click",function(){
            	//价格标题 变换文本
            	$("ul.hd li:nth-child(3) i").text($(this).text());
            	// 点击对应的价格，让当前区域打上对勾，取消其他对勾
            	//同时让当前li加上类名ok，去除其他span的类名ok
            	$(this).addClass("ok").find("span").toggle().end().siblings().removeClass("ok").find("span").hide();
            	$("ul.hd li:nth-child(3)").trigger("click");
            })
          }
        })
      },
      ajax3:function(){
        $.ajax({
        	//商品列表信息；
          //根据店铺的id和区域的id获取该店铺该区域的商品列表信息
          url:"http://127.0.0.1:3000/api/getgsproduct",
          data:{"shopid":0,"areaid":0},//默认显示京东和华北
          success:function(data){
            var content = template("product_list",data);
            $(".coudan_body ul").html(content);
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
  product.ajax2();//加载点击弹出框数据
  product.ajax3();//加载商品列表数据
  product.totop();//点击回到顶部回到顶部
  //点击area_list中的每一项
})


