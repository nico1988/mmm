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
          url:"http://127.0.0.1:3000/api/getbaicaijiatitle",
          success:function(data){
            //渲染模板
            var content = template("medialist",data);
            // 渲染标题栏
            $(".tab_head ul").html(content);
            $(".tab_head ul li").on("click",function(){
              //点击某一个标签现实特殊样式，其他元素不显示样式
              $(this).addClass("active").siblings().removeClass("active");
              var title_id = $(this).attr("data-titleid");
              $.ajax({
                  //接口,每次点击获取对应titleid的页面
                  url:"http://127.0.0.1:3000/api/getbaicaijiaproduct",
                  data:{"titleid":title_id},//如果没有默认是0
                  success:function(data){
                    //渲染模板
                    var cont = template("baicaijiaproduct",data);
                    $("#product_list").html(cont);
                    var percent = $(".media-body .bar i span").html().slice(0,-1);
                    //点击获取成功后，获取百分比的值
                    $("progress").attr("value",percent);
                    //设置进度条百分比                    
                    $(".prog span.fl").html(percent+"%");
                    product.touch();//动态完成数据加载既可以触摸导航条
                  }
                })
              })
            }
          })
      },
      totop:function(){//点击回到顶部
        $(".totop").on("click",function(){
          $("html body").animate({scrollTop:"0px"})
        })
      },
      touch:function(event){
        //算的时候一定要带单位
        var maxX = 0;
        var sum_li = 0;//li的总长度
        $(".nav_items li").each(function(){//
            sum_li += $(this).innerWidth();
            return sum_li;
        })
        var minX = -(sum_li-$(window).width()+100);//能向右移动的距离(负数)
        var range = 100;//可以缓冲的距离100
        var rangeMax = maxX+100;
        var rangeMin = minX-100;
        //让菜单滑动
        var startX = 0;
        var moveX =0;
        var distanceX = 0;
        var isMove = false;
        var currX = 0;//记录当前的定位，全局，相当于每次滑动到哪个位置
        
        /*定义公用的方法*/
        var addTransition = function(){
            $("ul.nav_items li").css({"-webkit-transition":'all .4s'});
        }
        var removeTransition = function(){
            $("ul.nav_items li").css({"-webkit-transition":'none'});
        }
        var setTranslateX = function(y){
            $("ul.nav_items li").css({"-webkit-transform":'translateX('+y+'px)'});
        }
        $("div.tab_head").on("touchstart",function(e){
        /*jquery e 返回的  originalEvent 就是原生js当中的 touchEvent*/
          /*每次开始的点事开始位置+上次位置(负数)*/
          startX = e.originalEvent.touches[0].clientX - distanceX;
        })
        $("div.tab_head").on("touchmove",function(e){
          moveX = e.originalEvent.touches[0].clientX;
          distanceX = moveX - startX;
          removeTransition();
          isMove = true;
          /*这里要注意要加px*/
          /*每次移动需要清除上一次 的过渡事件*/

          if((currX+distanceX)<rangeMax && (currX+distanceX)>rangeMin){
            setTranslateX(currX+distanceX);//如果没有超出边界，就移动
          }
          
        })
        $("div.tab_head").on("touchend",function(e){
              //判断是否在定位区间中，
              //如果不在，让当前的位置等于最大或最小的位置，同时吸附回去
              if((currX+distanceX)>maxX){
                  currX = maxX;
                  addTransition();
                  setTranslateX(currX);
              }else if((currX+distanceX)<minX){
                  currX = minX;
                  addTransition();
                  setTranslateX(currX);
              }else{
                currX += distanceX;
              }
              /*每次触摸事件完成后，让参数重置*/
              startX = 0;
              moveX = 0;
              distanceX = 0;
              isMove = false;
        })
      }
  }
  product.ajax1();//加载导航数据，点击加载分页数据
  product.totop();//点击回到顶部
  //800ms后触发导航条的点击事件,自动渲染页面
  setTimeout(function(){//800毫秒后加载分页数据
    $(".tab_head ul li:nth-child(1)").trigger("click");//触发第一个li标签的点击事件
  }, 800)
})

