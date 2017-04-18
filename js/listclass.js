
// ajax获取产品数据
$(document).ready(function($) {
    //调取外层数据
    $.ajax({
      //外层数据接口
      url:"http://127.0.0.1:3000/api/getcategorytitle",
      async:false,
      success:function(data){
        //渲染模板
        var html = template('classification', data);
        $('#productList').html(html);
      }
    })
    //点击每个item调取内部数据

    $(".item").on("click",function(){
      var that = this;
      $(that).siblings('.item').children('ul.productCategory').hide('200');
      var thisItem = $(this).attr("data-titleId");
      //内部数据接口
      $.ajax({
      url:"http://127.0.0.1:3000/api/getcategory",
      data:{titleid:thisItem},
      success:function(data){
        //渲染模板
        var html = template('innercate', data);
        $(that).children('ul.productCategory').html(html).toggle(200).children('li').on("click",function(e){
          //这样做有bug cookie存的永远是最新的值 打开多个页面刷新之前的页面会刷新到最新页面
          //点击每一个分类时将categoryid存到cookie中
          document.cookie="categoryid="+$(this).attr("data-categoryid");
          //点击时将该分类名称存到cookie中
          document.cookie="category="+$(this).html();//获取当前点击的文本
          e.stopPropagation();/*点击每一个分元素阻止冒泡*/
          window.open("getcategorybyid.html")
        });
      }
    })
    })
}) 
