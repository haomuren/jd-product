$(function() {
	var url = "https://dc.3.cn/category/get?callback=?";
	$.ajax({
		url: url,
		dataType: "jsonp",
		scriptCharset: "gb2312"
	}).then(function(res) {
		var $ul = $('.lists');
		for(var i = 0; i < res.data.length; i++) {
			var menu = res.data[i];

			var $li = $('<li class="list"></li>');
			$ul.append($li);

			//创建二级目录
			var $secondMenuDiv = $('<div class="box"></div>')
			$li.append($secondMenuDiv)

			//二级目录 顶部
			var $topP = $('<p></p>')
			$secondMenuDiv.append($topP);
			for(let n = 0; n < menu.t.length; n++) {
				let tmpArray = menu.t[n].split('|'); //jiadian.jd.com/|家电馆||0
				let $span = $('<span class="tips"></span>');
				$span.html(tmpArray[1]);
				$topP.append($span);
				let $TmpA = $('<a>&gt;</a>');
				$span.append($TmpA);
			}

			//一级目录  家用电器  jiadian.jd.com|家用电器||0
			for(var j = 0; j < menu.s.length; j++) {
				if(j >= 1) {
					$tmp = $('<a class="fgx">/</a>')
					$li.append($tmp)
				}
				var str = menu.s[j].n;
				var firstMenuName = str.split('|')[1];
				var $firstMenuSpan = $('<span class="menu"></span>');
				$firstMenuSpan.html(firstMenuName);
				$li.append($firstMenuSpan);

				//二级目录的第 2,3,4,5,6行

				for(let m = 0; m < menu.s[j].s.length; m++) {
					let $secondP = $('<p></p>')
					$secondMenuDiv.append($secondP);

					//每行的标题
					let obj = menu.s[j].s[m];
					let title = obj.n.split('|')[1];
					$span = $('<span class="title"></span>');
					$span.html(title);
					$secondP.append($span);

					let $tmpA = $('<a>&gt;</a>');
					$span.append($tmpA)

					//二级目录 每行的内容
					let $tagsDiv = $('<div class="tags"></div>');
					$secondP.append($tagsDiv);
					for(let k = 0; k < obj.s.length; k++) {
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
				for(let h = 0; h < menu.b.length; h++) {
					let src = '//img10.360buyimg.com/' + menu.b[h].split('|')[2]
					let $img = $('<img/>');
					$img.attr('src', src);
					$imgBoxDiv.append($img);
				}
			}
		}
	})

	//实现轮播
	var index = 0; //用index记录下标,默认为0
	var lis = $('.slider li');

	//1.右边箭头点击事件
	$('.arrow-right').click(right);

	//右箭头点击事件处理函数
	function right() {
		index++;
		//如果当前是最后一张,此时index=lis.length-1,index++后index=lis.length
		// 此时应让index=0
		if(index == lis.length) {
			index = 0;
		}
		//显示对应下标的图片,让其他兄弟隐藏
		lis.eq(index).fadeIn().siblings().fadeOut();
		//给对应下标的小圆点按钮添加current类名,其他兄弟移除current类名
		$('.focus i').eq(index).addClass('current').siblings().removeClass('current');
	}

	//2.左边箭头点击事件
	$('.arrow-left').click(function() {
		index--;
		//如果当前是第一张(index=0),index--后,index<0,此时应显示最后一张,让index=lis.length-1
		if(index < 0) {
			index = lis.length - 1;
		}
		//显示对应下标的图片,让其他兄弟隐藏
		lis.eq(index).fadeIn().siblings().fadeOut();
		//给对应下标的小圆点按钮添加current类名,其他兄弟移除current类名
		$('.focus i').eq(index).addClass('current').siblings().removeClass('current');
	})

	//3.底部圆点按钮鼠标移入事件
	btns = $('.focus i');
	for(var i = 0; i < btns.length; i++) {
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
	var timeid = setInterval(function() {
		right();
	}, 3000)
	//鼠标移出div时,设置定时器,调用右边箭头的点击事件
	$('.slider').mouseleave(function() {
		timeid = setInterval(function() {
			right();
		}, 3000)
	})
	//鼠标移入p时,清除定时器
	$('.slider').mouseenter(function() {
		clearInterval(timeid)
	})

	//首页计时器
	function countDown(time) {
		//寻找到元素节点
		//var day_elem = $("day-txt");
		var hour_elem = $("#hour-txt");
		var minute_elem = $("#minute-txt");
		var second_elem = $("#second-txt");

		//将传的实参    未来时间 转化为秒数
		var end_time = new Date(time).getTime(); //月份 是是几月份-1

		second_diff = (end_time - new Date().getTime()) / 1000; //求出未来时间和实时时间的差 返回秒数

		var timer1 = setInterval(function() {
			if(second_diff > 1) { //判断剩余的毫秒数小于或者等于1时,清除定时器
				second_diff -= 1; //每次减去1秒
				//var day = Math.floor((second_diff / 3600)/24);//剩余天
				var hour = Math.floor((second_diff / 3600) % 24); //剩余小时
				var minute = Math.floor((second_diff / 60) % 60); //剩余分钟
				var second = Math.floor(second_diff % 60); //剩余秒数

				//day_elem && $(dat_elem).text(day); //计算天
				$(hour_elem).text(hour < 10 ? "0" + hour : hour); //输出小时  当
				$(minute_elem).text(minute < 10 ? "0" + minute : minute); //计算分钟
				$(second_elem).text(second < 10 ? "0" + second : second); //计算小时
			} else {
				clearInterval(timer1);
			}
		}, 1000)
	}
	countDown("2019/3/01 24:00:00");

	//秒杀部分的  实现轮播
	var sk_index = 0; //用index记录下标,默认为0
	var sk_lis = $('.lubo2-main li');

	function skRight() {
		sk_index++;
		//如果当前是最后一张,此时index=lis.length-1,index++后index=lis.length
		// 此时应让index=0
		if(sk_index == sk_lis.length) {
			sk_index = 0;
		}
		//显示对应下标的图片,让其他兄弟隐藏
		sk_lis.eq(sk_index).fadeIn().siblings().fadeOut();
		//给对应下标的小圆点按钮添加current类名,其他兄弟移除current类名
		$('.lubo2-dot span').eq(sk_index).addClass('dot').siblings().removeClass('dot');
	}

	//1.底部圆点按钮 鼠标移入事件
	sk_btns = $('.lubo2-dot span');
	for(var j = 0; j < sk_btns.length; j++) {
		//设置index属性,记录当前下标
		sk_btns.eq(j).attr('index', j);
		//给btn注册鼠标移入事件
		sk_btns.eq(j).mouseenter(skCarousel);
	}
	//2.圆点btn的事件处理函数
	function skCarousel() {
		var index = $(this).attr('index');
		sk_lis.eq(index).fadeIn().siblings().fadeOut();
		$(this).addClass('dot').siblings().removeClass('dot');
	}
	//3.自动轮播
	//先执行一次定时器
	var sk_timeid = setInterval(function() {
		skRight();
	}, 3000)
	//4.鼠标移出div时,设置定时器,调用右边箭头(skRight)的点击事件
	$('.lubo2-main').mouseleave(function() {
		sk_timeid = setInterval(function() {
			skRight();
		}, 3000)
	})
	//5.鼠标移入div时,清除定时器   暂停当前的图片 或者理解为暂停动画
	$('.lubo2-main').mouseenter(function() {
		clearInterval(sk_timeid);
	})

	//会买专辑轮播  ranking 轮播1
	var rk_index = 0; //用index记录下标,默认为0
	var rk_lis = $('.rpmp-lunbo1 li');

	//1.右边箭头点击事件
	$('.rpmp-left').click(Right1);

	//右箭头点击事件处理函数
	function Right1() {
		rk_index++;
		//如果当前是最后一张,此时index=lis.length-1,index++后index=lis.length
		// 此时应让index=0
		if(rk_index == rk_lis.length) {
			rk_index = 0;
		}
		//显示对应下标的图片,让其他兄弟隐藏
		rk_lis.eq(rk_index).fadeIn().siblings().fadeOut();
		//给对应下标的小圆点按钮添加current类名,其他兄弟移除current类名
		$('.rpmp-focus i').eq(rk_index).addClass('rpmp-current').siblings().removeClass('rpmp-current');
	}

	//2.左边箭头点击事件
	$('.rpmp-right').click(function() {
		rk_index--;
		//如果当前是第一张(index=0),index--后,index<0,此时应显示最后一张,让index=lis.length-1
		if(rk_index < 0) {
			rk_index = rk_lis.length - 1;
		}
		//显示对应下标的图片,让其他兄弟隐藏
		rk_lis.eq(rk_index).fadeIn().siblings().fadeOut();
		//给对应下标的小圆点按钮添加current类名,其他兄弟移除current类名
		$('.rpmp-focus i').eq(rk_index).addClass('rpmp-current').siblings().removeClass('rpmp-current');
	})

	//3.底部圆点按钮鼠标移入事件
	rk_btns = $('.rpmp-focus i');
	for(var q = 0; q < rk_btns.length; q++) {
		//设置index属性,记录当前下标
		rk_btns.eq(q).attr('index', q);
		//给btn注册鼠标移入事件
		rk_btns.eq(q).mouseenter(btnFn);
	}
	//btn的事件处理函数
	function btnFn() {
		var index = $(this).attr('index');
		rk_lis.eq(index).fadeIn().siblings().fadeOut();
		$(this).addClass('rpmp-current').siblings().removeClass('rpmp-current');
	}
	//4.自动轮播
	//先执行一次定时器
	var rk_timeid = setInterval(function() {
		Right1();
	}, 2000)
	//鼠标移出div时,设置定时器,调用右边箭头的点击事件
	$('.rpmp-lunbo1').mouseleave(function() {
		rk_timeid = setInterval(function() {
			Right1();
		}, 2000)
	})
	//鼠标移入p时,清除定时器
	$('.rpmp-lunbo1').mouseenter(function() {
		clearInterval(rk_timeid);
	})

	//领劵中心 轮播
	var oIndex = 0; //用index记录下标,默认为0
	var oLis = $('.rpmpt-lunbo2 li');

	function show() {
		oIndex++;
		//如果当前是最后一张,此时index=lis.length-1,index++后index=lis.length
		// 此时应让index=0
		if(oIndex == oLis.length) {
			oIndex = 0;
		}
		//显示对应下标的图片,让其他兄弟隐藏
		oLis.eq(oIndex).fadeIn().siblings().fadeOut();
		//给对应下标的小圆点按钮添加current类名,其他兄弟移除current类名
		$('.rpmpt-dots span').eq(oIndex).addClass('dots1').siblings().removeClass('dots1');
	}

	//1.底部圆点按钮 鼠标移入事件
	oBtns = $('.rpmpt-dots span');
	for(var a = 0; a < oBtns.length; a++) {
		//设置index属性,记录当前下标
		oBtns.eq(a).attr('index', a);
		//给btn注册鼠标移入事件
		oBtns.eq(a).mouseenter(circle);
	}
	//2.圆点btn的事件处理函数
	function circle() {
		var index = $(this).attr('index');
		oLis.eq(index).fadeIn().siblings().fadeOut();
		$(this).addClass('dots1').siblings().removeClass('dots1');
	}
	//3.自动轮播
	//先执行一次定时器
	var show_timeid = setInterval(function() {
		show();
	}, 2000)
	//4.鼠标移出div时,设置定时器,调用右边箭头(skRight)的点击事件
	$('.rpmpt-lunbo2').mouseleave(function() {
		show_timeid = setInterval(function() {
			show();
		}, 2000)
	})
	//5.鼠标移入div时,清除定时器   暂停当前的图片 或者理解为暂停动画
	$('.rpmpt-lunbo2').mouseenter(function() {
		clearInterval(show_timeid);
	})

	//添加用户名信息  已有的cookie值  (登录界面所存的cookie值)
	$('.partfour1-text p').text(getCookie('name'));
	$('.link_login').text(getCookie('name'));
	//点击用户上面的图片来进行点击事件 来判断
	$('.partfour1-img img').click(function() {
		var vals = $('.partfour1-text p').val(); //获取到p标签中添加的cookie.name
		if(vals == getCookie('name')||vals=='Hi~欢迎来到京东！') { //判断p标签中的当前值 是否等于 getCookiename
			alert('用户名已登录'); //等于的话 提示窗口
		} else {
			var r = confirm('是否要退出账户！'); //否则弹出窗口 来判断   true-->确定  false-->取消
			if(r == true) {
				removeCookie('name'); //移除所添加的cookie属性name
				removeCookie('token');
				removeCookie('id');//移除所添加的cookie属性token
				//这时换成初始化的文本内容
				$('.partfour1-text p').text('Hi~欢迎来到京东！');
				$('.link_login').text('你好，请登录');
				$('.sc_righticon').text(0);
			}
		}
	})
})
//滚动条事件
$(window).scroll(function() {
	var topslide = $(window).scrollTop();
	/*$(".floor").each(function(i){
		if(topslide >= $(this).offset().top){
			$(".lift ul li").eq(i).addClass("active").siblings().removeClass("active");
		}
	})*/
	//显示楼梯导航
	/*if(topslide>1600){
		$(".lift").show();
	}else{
		$(".lift").hide();
	}*/
	//显示搜索栏
	if(topslide > 660) {
		$("#search").addClass("search-fix");
		$(".search_box").css({
			"top": "15px",
			"left": "440px"
		});
	} else {
		$("#search").removeClass("search-fix");
		$(".search_box").css({
			"top": "25px",
			"left": "320px",
		})
	}
})