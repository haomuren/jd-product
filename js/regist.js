$(function() {
	//定义全局变量
	//var flag = false;

	//验证用户名格式
	$("#username").blur(function() {
		var flag = false;
		var username = $("#username").val();
		var reg = /^[A-Z]\w{5,}$/;
		if(username == '') {
			$("#username-hint").html("账号不能为空");
			return false;
		} else {
			if(reg.test(username)) {
				$("#username-hint").html("✔");
				return true;
			} else {
				$("#username-hint").html("A-Z开头，由字母数字下划线组成，最少6位");
				return false;
			}
		}
	})

	//验证密码格式  
	$("#password").blur(function() {
		var flag = false;
		var pwd = $("#password").val();
		var reg = /^\d[A-Z0-9]{5,}$/i;
		if(pwd == '') {
			$("#password-hint").html("密码不能为空");
			return false;
		} else {
			if(reg.test(pwd)) {
				$("#password-hint").html("✔");
				return true;
			} else {
				$("#password-hint").html("数字开头，由数字、字母组成，最少6位");
				return false;
			}
		}
	})

	//验证邮箱格式
	$("#email").blur(function() {
		var flag = false;
		var email = $('#email').val();
		var reg = /^\w+@\w+(\.[a-zA-Z]{2,3}){1,2}$/;
		if(email == '') {
			$('#email-hint').html("邮箱不能为空");
			return false;
		} else {
			if(reg.test(email)) {
				$('#email-hint').html('✔');
				return true;
			} else {
				$('#email-hint').html("Email格式不正确，例如web@sohu.com");
				return false;
			}
		}
	})

	//验证性别格式
	$("#message-gender").blur(function() {
		var sex = document.getElementById('message-gender');
		if(sex[1].checked == true || sex[2].checked == true) {
			$("#gender-hint").html("✔");
			return true;
		} else {
			$("#gender-hint").html("最少选择一项");
			return false;
		}
	})
	
	
	$('#regist-mess').click(function(){//blur失去焦点时触发
		//取用户名
		var user = $("#username").val();
		//取密码
		var pwd = $("#password").val();
		//取邮箱
		var email = $('#email').val();
		//取性别
		var sex = $("input[name='sex']:checked").val();
		
		//调ajax
		$.ajax({
			type:'post',
			url: "http://47.104.244.134:8080/usersave.do",
			data: {'username':user,'password':pwd,'email':email,'sex':sex},
			success: function(data){
				console.log(data);
				if(data.msg == "成功"){
					$("#regist-hint").html('注册成功!2s后将自动跳转到登录界面...');
//					setTimeout(function(){
//						location.href = "login.html";
//					},2000);
				}else{
					alert('注册失败！请稍后重试！');
				}
			}
		})
	})
})