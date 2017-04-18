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
$(function(){
   var product = {
      ajax1:function(){
        $.ajax({
          //接口,需要将分类id传进去，这里的id需要根据点击时候动态获取
          url:"http://127.0.0.1:3000/api/getcouponproduct",
          data:{"couponid":coupon_id},
          success:function(data){
            var content = template("couponproduct",data);
            $(".coupons ul").html(content);
            // 点击优惠券后显示对应的优惠券标题
      			var arr = ["肯德基",["必胜客"],["棒约翰"],["哈根达斯"]];
      			$("header .head .title").html(arr[coupon_id]+"优惠券");
            carousel();
            //点击图片显示轮播图
            $("li.coup").on("click",function(e){
              $(".carousel_out").fadeIn(400);
              e.stopPropagation();/*阻止点击事件向上冒泡*/
            });
            $("body").on("click",function(){
              $(".carousel_out").fadeOut(400);
              $("body li.item").on("click",function(e){
                e.stopPropagation();/*点击文档时，阻止点击事件向上冒泡*/
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
  $(".goback").on("click",function(){//点击回到上一页
  	window.history.back();//点击回到上一页,三种方法
 	// window.history.go(-1);  //返回上一页
	// window.history.back();  //返回上一页
	// //如果要强行刷新的话就是：window.history.back();location.reload();
	// window.location.go(-1); //刷新上一页
  })
  //轮播图
  function carousel(){
      //1,实现轮播图框架
      //数据加载成功后，让轮播图的图片地址与优惠券图片对应
      //先遍历得到的图片的src，将得到的src渲染到 模板中
      var imgs_src = {};//存储图片地址对象
      imgs_src.result =[];
      $(".coupons .left img").each(function(i,v){
        imgs_src.result[i] = {src:$(v).attr("src")};//将每一个图片的地址存到对象中
      })
      //渲染图片轮播模板
      // console.log(imgs_src);
      var img_src_cont = template("img_carousel",imgs_src);
      $(".carousel_inner").html(img_src_cont );
      // 设置li的宽度
      $(".carousel_inner li").width($("body").innerWidth())
      // 获取li的总长度，从而设置ul的总长度
      var banner = $('.carousel_out');
      /*图片的宽度  或者说  轮播图大盒子的宽度*/
      var width = banner.width();
      /*图片盒子*/
      var imageBox = $('ul.carousel_inner');
      imageBox.width($('ul.carousel_inner li').length*width);
      //获取li的宽度
      var index = 1;
      //2实现点击效果
      // 定义公用的方法
      var addTransition = function(){
          imageBox.css({"-webkit-transition":'all .4s'});
      }
      var removeTransition = function(){
          imageBox.css({"-webkit-transition":'none'});
      }
      var setTranslateX = function(x){
          imageBox.css({"-webkit-transform":'translateX('+x+'px)'});
      }
      //左边点击
      var timer = setInterval(function(){
          index ++ ;
          /*让图片动画的滚动  translateX  transition 来实现动画*/
          /*给imageBox加上过度*/
          addTransition();
          /*给imageBox设置当前的位置 */
          setTranslateX(-index*width);
      },2000);

  }
})

