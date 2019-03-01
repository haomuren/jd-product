$(function () {
    var url = "https://dc.3.cn/category/get?callback=?";
    $.ajax({
		url:url,
		dataType:"jsonp",
		scriptCharset:"gb2312"
	}).then(function(res){
        var $ul = $('.lists');
        for(var i = 0; i < res.data.length; i++){
            var menu = res.data[i];

            var $li = $('<li class="list"></li>');
            $ul.append($li);


            //创建二级目录
            var $secondMenuDiv = $('<div class="box"></div>')
            $li.append($secondMenuDiv)

            //二级目录 顶部
            var $topP = $('<p></p>')
            $secondMenuDiv.append($topP);
            for(let n = 0; n < menu.t.length; n++){
                let tmpArray = menu.t[n].split('|');//jiadian.jd.com/|家电馆||0
                let $span = $('<span class="tips"></span>');
                $span.html(tmpArray[1]);
                $topP.append($span);
                let $TmpA = $('<a>&gt;</a>');
                $span.append($TmpA);
            }

            //一级目录  家用电器  jiadian.jd.com|家用电器||0
            for(var j = 0; j < menu.s.length; j++){
                if(j >= 1){
                    $tmp = $('<a class="fgx">/</a>')
                    $li.append($tmp)
                }
                var str =  menu.s[j].n;
                var firstMenuName = str.split('|')[1];
                var $firstMenuSpan = $('<span class="menu"></span>');
                $firstMenuSpan.html(firstMenuName);
                $li.append($firstMenuSpan);

                //二级目录的第 2,3,4,5,6行

                for(let m = 0; m < menu.s[j].s.length; m++){
                    let $secondP = $('<p></p>')
                    $secondMenuDiv.append($secondP);

                    //每行的标题
                    let obj =  menu.s[j].s[m];
                    let title = obj.n.split('|')[1];
                    $span = $('<span class="title"></span>');
                    $span.html(title);
                    $secondP.append($span);

                    let $tmpA = $('<a>&gt;</a>');
                    $span.append($tmpA)


                    //二级目录 每行的内容
                    let $tagsDiv = $('<div class="tags"></div>');
                    $secondP.append($tagsDiv);
                    for(let k = 0; k < obj.s.length; k++){
                        let secondContentObj = obj.s[k];
                        let title = secondContentObj.n.split('|')[1];
                        let $span = $('<span class="tag"></span>');
                        $span.html(title);
                        $tagsDiv.append($span);
                    }
                }

                //二级目录 后面的图片
                let $imgBoxDiv = $('<div class="imgBox"></div>');
                $secondMenuDiv.append($imgBoxDiv);
                for(let h = 0; h < menu.b.length; h++){
                    let src = '//img10.360buyimg.com/' + menu.b[h].split('|')[2]
                    let $img = $('<img/>');
                    $img.attr('src',src);
                    $imgBoxDiv.append($img);
                }
            }
        }
    })
	
	//实现轮播
	var index = 0;//用index记录下标,默认为0
    var lis = $('.slider li');

    //1.右边箭头点击事件
    $('.arrow-right').click(right);

    //右箭头点击事件处理函数
    function right() {
        index++; 
        //如果当前是最后一张,此时index=lis.length-1,index++后index=lis.length
        // 此时应让index=0
        if (index == lis.length) {
          index = 0;
        }
        //显示对应下标的图片,让其他兄弟隐藏
        lis.eq(index).fadeIn().siblings().fadeOut();
        //给对应下标的小圆点按钮添加current类名,其他兄弟移除current类名
        $('.focus i').eq(index).addClass('current').siblings().removeClass('current');
    }
    
    //2.左边箭头点击事件
    $('.arrow-left').click(function () {
        index--;
        //如果当前是第一张(index=0),index--后,index<0,此时应显示最后一张,让index=lis.length-1
        if (index < 0) {
        	index = lis.length - 1;
        }
        //显示对应下标的图片,让其他兄弟隐藏
        lis.eq(index).fadeIn().siblings().fadeOut();
        //给对应下标的小圆点按钮添加current类名,其他兄弟移除current类名
        $('.focus i').eq(index).addClass('current').siblings().removeClass('current');
    })

    //3.底部圆点按钮鼠标移入事件
    btns = $('.focus i');
    for (var i = 0; i < btns.length; i++) {
        //设置index属性,记录当前下标
        btns.eq(i).attr('index', i);
        //给btn注册鼠标移入事件
        btns.eq(i).mouseenter(fn);
    }
    //btn的事件处理函数
    function fn() {
        var index = $(this).attr('index');
        lis.eq(index).fadeIn().siblings().fadeOut();
        $(this).addClass('current').siblings().removeClass('current');
    }
    //4.自动轮播
    //先执行一次定时器
    var timeid = setInterval(function () {
        right();
    }, 3000)
	//鼠标移出div时,设置定时器,调用右边箭头的点击事件
    $('.slider').mouseleave(function () {
        timeid = setInterval(function () {
			right();
        }, 3000)
    })
    //鼠标移入p时,清除定时器
    $('.slider').mouseenter(function(){
		clearInterval(timeid)
    })
    
    
    //利用ajax从数据库 添加商品数据信息
    $(function() {
 		$.ajax({
	 		type: "get",
	 		url: "http://47.104.244.134:8080/goodsbytid.do",
	 		data: {
	 			"tid": 13,
	 			"page": 1,
	 			"limit": 9
	 		},
	 		success: function(rel) {
	 			console.log(rel.data);
	 			
	 			for(let i = 1; i < rel.data.length; i++) {//遍历    取到的所有商品    每个商品都有相同的data下的属性
	
	 				var $oLi = $("<li class='details-li'></li>");//将获取到的每件商品的数据都添加到li标签中
	 				var $oImg = `<img src=${rel.data[i].picurl} class='list-img'/>`;//商品图片
	 				var $oA = `<a href="#" class="list-text" target="_blank">${rel.data[i].name}</a>`;//对应的商品名称
	 				var $oSpan = `<span class="list-price">￥${rel.data[i].price}</span>`;//商品价格
	 				var $oBtn = `<input type="button" id=${rel.data[i].id} class="list-submit" value="加入购物车">`;//获取到每件商品的id
	 				
	 				//把添加的标签都添加到li标签里面
	 				$oLi.append($oImg);
	 				$oLi.append($oA);
	 				$oLi.append($oSpan);
	 				$oLi.append($oBtn);
	 				$(".details-ul").append($oLi);//再把li标签添加到已有的ul标签下
	 			}
	 			for(let j = 0; j < $(".list-submit").length; j++) {
	 				$(".list-submit").eq(j).on("click", function() {
	 				   	window.open('http://127.0.0.1:8020/jd-project/detail.html');
	 				  				    
	 					/*setCookie('id',rel.data[1].id,7);
	 					var oId = $(".list-submit").eq(j).attr('id');*/
	 					//window.location.href = "http://127.0.0.1:8020/jd-project/detail.html?aid=" + oId;
	 				});
	 			}
	 		}
	 	});
    });
    $.get('http://47.104.244.134:8080/cartlist.do',{'token':getCookie('token')},function(data){
		$('.sc_righticon').text(data[0].count);
	})

})