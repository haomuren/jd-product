
/*利用Jquery API ,用ajax实现调取登录接口*/

$(function(){
	$("#loginbtn").on("click",function(){
		var username = $("#login-username").val();//获取到用户名框中的 文本内容
		var password = $("#login-password").val();//获取到密码框中的 文本内容
		$.ajax({
			type:"post",
			url:"http://47.104.244.134:8080/userlogin.do",
			data:{'name':username,
				'password':password},   //从数据库中获取name password属性相对应的属性值
			success:function(data){
				console.log(data);    //控制台中打印  查看返回的数据类型  数据值
				if(data.code == 0){   //判断当code=0, 证明登录成功 否之,未登录成功
					alert("登录成功");
					//添加cookie 是为了跳转到首页时,能getCookie时,找到登录的信息  从而赋值到相应的文本框中
					setCookie("name",username,7);  //把name这个属性和属性值添加到cookie中
					setCookie("token",data.data.token,7);
					window.open("./index.html");//跳转首页
				}else{
					alert("登录失败");
				}
			}	
		})
	})
});

