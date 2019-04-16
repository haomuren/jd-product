$(function() {
	//定义全局变量
	//var flag = false;
	var Name = 0;
	var Word = 0;
	var Emails = 0;
	var Sexs = 0;

	//验证用户名格式
	$("#username").blur(function() {
		var username = $("#username").val();
		if(username.length < 4 || username.length > 20) {
			$("#username-hint").html("用户名长度只能在4~20个字符之间");
		}else{
			$.ajax({
				type:"get",
				url:"http://47.104.244.134:8080/username.do",
				data:{"username":username},
				success:function(data){
					if(data.code == 0){
						$("#username-hint").html("用户名已经被使用");
					}else{
						$("#username-hint").html("用户名可用");
						Name++;
					}
				},
			});
		}
		
	});

	//验证密码格式  
	$("#password").blur(function() {
		var pwd = $("#password").val();
		var reg = /\D/;
		if(pwd == '') {
			$("#password-hint").html("密码不能为空");
		} 
		if(pwd.length < 6 || pwd.length > 20){
			$("#password-hint").html("长度应为6~20个字符");
		}else if(!reg.test(pwd)) {
				$("#password-hint").html("密码不能为纯数字");
			} else {
				$("#password-hint").html("✔");
				Word++;
			}
		
	});

	//验证邮箱格式
	$("#email").blur(function() {
		var email = $('#email').val();
		var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
		var flag = reg.test(email);
		if(email == '') {
			$('#email-hint').html("邮箱不能为空");
		} 
		else if(!flag){
			$('#email-hint').html("Email格式不正确，例如web@sohu.com");
		} else {
				$.ajax({
					type:"GET",
					url:"http://47.104.244.134:8080/username.do",
					data:{"email":email},
					success:function(data){
						console.log(data);
					},
				});
				$('#email-hint').html("✔");
				Emails++;
			};
	});

	//验证性别格式
	$("input[name='sex']").blur(function(){
		$("#gender-hint").html("✔");
		Sexs++;
	});
	
	
	$('#regist-mess').click(function(){
		if(!Name){
			alert("请输入正确的用户名");
		}
		if(!Word){
			alert("请输入正确的密码");
		}
		if(!Emails){
			alert("请输入正确的邮箱");
		}
		if(!Sexs){
			alert("请选择性别");
		}
		console.log(Name+":"+Word+":"+Emails+":"+Sexs);//控制台打印  作为判断依据, 是否存在等于0的值,证明输入有误
		if(Name & Word & Emails & Sexs){
			//取用户名
			var userName = $("#username").val();
			//取密码
			var passWord = $("#password").val();
			//取邮箱
			var Email = $('#email').val();
			//取性别
			var Sex = $("input[name='sex']:checked").val();
			
			console.log(userName+":"+passWord+":"+Email+":"+Sex);
			
			$.ajax({
				type:"POST",
				url:"http://47.104.244.134:8080/usersave.do",
				data:{'username':userName,
					'password':passWord,
					'email':Email,
					'sex':Sex
				},
				success:function(data){
					if(data.msg == "成功"){
						$("#regist-hint").html('注册成功!2s后将自动跳转到登录界面...');
						setTimeout(function(){
							window.open("./login.html");
						},4000);
					}else{
						alert("注册失败！请稍后重试！");
					}
				},
			});
		}
	});
});
