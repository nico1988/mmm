/*
* @Author: my
* @Date:   2017-04-14 15:00:26
* @Last Modified by:   my
* @Last Modified time: 2017-04-14 20:33:03
*/
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
var product_id = getQueryString("productid");
// location.search.slice(1).split("=")[1]
$(function(){
   var product = {
      ajax1:function(){
        $.ajax({
        //接口,需要将分类id传进去，这里的id需要根据点击时候动态获取
        url:"http://127.0.0.1:3000/api/getproduct",
        data:{"productid":product_id},
        success:function(data){
          //渲染模板
          var html = template('product_det', data);
          //给product动态添加数据
          $("#product").html(html);
          //第二个单元格左对齐
          $("#product table td:nth-child(2)").css({"textAlign":"left"})
          //动态设置三级标题
          $(".active").html(data.result[0].productName.split(" ")[0]);
        }
      }) 
    },
    ajax2:function(){
      $.ajax({
        //接口,需要将分类id传进去，这里的id需要根据点击时候动态获取
        url:"http://127.0.0.1:3000/api/getproductcom",
        data:{"productid":product_id},
        success:function(data){
          //渲染模板
          console.log(data)
          var product_info = template('product_info', data);
          $(".product_info").html(product_info);

        }
      })
    },
    more:function(){
      $(".more_info input.more").on("click",function(){
        $("alert-warning").toggle(200)
      })
    }

  }
  product.ajax1();
  product.ajax2();
  product.more();
})
