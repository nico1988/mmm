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
          url:"http://127.0.0.1:3000/api/getbrandtitle",
          success:function(data){
            var content = template("brand_title",data);
            $(".brand_range ul").html(content);
            //点击某个品牌显示该类名十大品牌
            $(".brand_range ul li").on("click",function(){
              //单击以后显示该点击元素的标题
              $(".brand_range div.title").html("<h4>"+$(this).text().slice(0,-4)+"哪个好</h4>");
              $.ajax({
                //接口,需要将分类id传进去，这里的id需要根据点击时候动态获取
                url:"http://127.0.0.1:3000/api/getbrand",
                data:{"brandtitleid":0},
                success:function(data){
                  var content = template("top10",data);
                  $(".brand_range ul").html(content);
                  //点击某一个品牌排行显示对应的品牌信息
                  $(".brand_range ul li").on("click",function(e){
                    $(".brand_range div.title").html("<h4>"+$(this).find("div.tab_title").html()+"产品销量排行</h4>");
                    $.ajax({
                      //接口,需要将分类id传进去，这里的id需要根据点击时候动态获取
                      url:"http://127.0.0.1:3000/api/getbrandproductlist",
                      data:{"brandtitleid":0,"pagesize":4},
                      success:function(data){
                        console.log(data);
                        var content = template("sales_range",data);
                        $(".brand_range ul").html(content);
                      }
                    })
                  })
                }
              })
            })
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
  product.totop();//点击回到顶部回到顶部
  //点击area_list中的每一项
})


