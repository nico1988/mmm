/*
* @Author: my
* @Date:   2017-04-13 10:58:45
* @Last Modified by:   my
* @Last Modified time: 2017-04-14 15:34:40
*/

$(document).ready(function($) {
    //获取cookie字符串 
  var strCookie=document.cookie; 
  //将多cookie切割为多个名/值对 
  var arrCookie=strCookie.split("; "); //这里有空格
  //分类id，id值，分类名称，名称
  var categoryid_v,categoryid_v,category,category_v; 
  //遍历cookie数组，处理每个cookie对 
  for(var i=0;i<arrCookie.length;i++){ 
    var arr=arrCookie[i].split("="); 
    //找到名称为categoryid和category的cookie，并返回它的值 
    if("categoryid"==arr[0] ){ 
      categoryid_v=arr[1]; 
      }else if("category" == arr[0]){
        category_v = arr[1];
      }
  }
  //获取cookie字符串 
  var thiscategoryid_v = categoryid_v || "";
  //设置分类页面分类名称
  document.querySelector('.active a').innerHTML=category_v;
  var selct_html;//动态渲染下拉页面
  var selectId = 1;//每次加载默认设置加载第一页
  var total;//页面总个数，根据动态加载的赋值
  var productId;
  ajax_c();//调用ajax
  change_page();//调用选择页面函数,绑定事件 
    /*点击商品跳转事件*/
  function product_click(){
    $("div.media").on("click",function(){
      // console.log($(this));
      
      // window.open("product-details.html")
    })
  }

    function ajax_c(){
        // ajax获取分类列表数据   
        $.ajax({
          //接口,需要将分类id传进去，这里的id需要根据点击时候动态获取
          url:"http://127.0.0.1:3000/api/getproductlist",
          data:{categoryid:thiscategoryid_v,pageid:selectId},
          success:function(data){
            //渲染模板
            console.log(data);
            var html = template('catelist', data);
            $('#medialist').html(html);
            var count = data.totalCount;//数据条数
            total = Math.ceil(count/data.pagesize);//页面个数，向上取整
            //如果select下拉框已经动态渲染(值存在)，就不重新渲染
            if(!selct_html){//selct_html存在下面的代码不执行
              for(var i = 1; i<=total;i++){
                selct_html += '<option value="第一页" alt="'+i+'">第'+i+'页/共'+total+'页</option>'
              }
              $("#select_page").html(selct_html)
            } 
            product_click();
          }
        })  
    }
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


})

