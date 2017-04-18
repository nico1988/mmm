/*
* @Author: my
* @Date:   2017-04-14 21:08:23
* @Last Modified by:   my
* @Last Modified time: 2017-04-14 21:54:18
*/

$(function(){
   var product = {
      ajax1:function(){
        $.ajax({
          //接口,需要将分类id传进去，这里的id需要根据点击时候动态获取
          url:"http://127.0.0.1:3000/api/getmoneyctrl",
          // data:{"productid":product_id},
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
    /*切换页面组件*/
    function change_page(){
        $("#select_page").on('change',function(){
            selectId = $(this).find("option:selected").attr("alt");//改变selectId的值
            ajax_c();//每次改变调用ajax获取数据
            $("#select_page").find("option").eq(selectId-1).attr({
              selected: 'selected',
            }).siblings().removeAttr("selected");
        })
        /*点击回到上一页*/
        $(".pre").on('click',function(){
          if(selectId>1){
            selectId--;//每次点击改变页面id
            ajax_c();//每次改变调用ajax获取数据
            // 由于页面数(selectId的值)和alt值是一致的
            //让select组件里alt值微selectID(页数)的option选中,点击上下页让select组件一起变动
            $("#select_page").find("option").eq(selectId-1).attr({
              selected: 'selected',
            }).siblings().removeAttr("selected");
          }else{
          }        
        })
        /*点击到下一页*/
        $(".next").on('click',function(){
          //注意判断条件
          if(selectId>=1 && selectId<total){
            $("#select_page").find("option").eq(selectId).attr({
              selected: 'selected',
            });
            $("#select_page").find("option").eq(selectId).attr({
              selected: 'selected',
            }).siblings().removeAttr("selected");
            selectId++;//每次点击改变页面id
            ajax_c();//每次改变调用ajax获取数据 
          }else{
          }        
        })
    }
    /*切换页面组件*/