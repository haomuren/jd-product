$(function(){
	//下面定义的变量是 用来获取到 每一件数据库中商品的id值
	/*var aa = window.location.search;
	var c = aa.indexOf("=");
	var d = aa.substring(c + 1);*/
	$.ajax({
		type:"get",
		url:"http://47.104.244.134:8080/goodsbyid.do",
		data:{"id":4},
		success:function(data){
			console.log(data.id);
			setCookie('id',data.id,7);
			$('.small-img img').attr({src:data.picurl});
			$('.images-cover img').attr({src:data.picurl});
			var $oTitle1 = `<div class="detail-tile">${data.name}</div>`;
			var $oPubdate = `<div class="detail-tile1">生产日期&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;${data.pubdate}</div>`;
			var $oShop = `<div class="detail-tile2">商铺&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;${data.info}</div>`;
			var $oPrice = `<div class="detail-tile3">商品价格&nbsp;&nbsp;:&nbsp;¥&nbsp;${data.price}</div>`;
			
			
			$(".detail-shop").append($oTitle1);
			$(".detail-shop").append($oPubdate);
			$(".detail-shop").append($oShop);
			$(".detail-shop").append($oPrice);
		}
	})
	
	$(function() {
	var magnifierConfig = {
		magnifier : "#magnifier1",//最外层的大容器
		width : 500,//承载容器宽
		height : 500,//承载容器高
		moveWidth : null,//如果设置了移动盒子的宽度，则不计算缩放比例
		zoom : 5//缩放比例
	};		
	var _magnifier = magnifier(magnifierConfig);
	/*magnifier的内置函数调用*/
	/*
	//设置magnifier函数的index属性
	_magnifier.setIndex(1);
			
	//重新载入主图,根据magnifier函数的index属性
	_magnifier.eqImg();
	*/
	});
		
	/*var btn = document.getElementById("detailbtn");//点击购物车按钮,跳转到购物车页面
	btn.onclick = function(){
		window.location.href="http://127.0.0.1:8020/jd-project/cart.html";
	}*/
	$.get('http://47.104.244.134:8080/cartlist.do',{'token':getCookie('token')},function(data){
		console.log(data)
		$('.sc_righticon').text(data[0].count);
		setCookie('id',data[0].id,7);
		
	})
	$('#detailbtn').click(function(){
		$.get('http://47.104.244.134:8080/cartsave.do',{'gid':13,'token':getCookie('token')},function(data){
			console.log(data);
			if(data.msg=='成功'){
				alert('加入购物车成功！');
			    window.open("http://127.0.0.1:8020/jd-project/cart.html");
			}
//			$('.sc_righticon').text(data[0].count);
		})
	})
});
