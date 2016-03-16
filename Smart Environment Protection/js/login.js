window.onload = function() {
	$('button').popover({
		content: '用户名或密码错误',
	});
	document.getElementsByTagName('button')[0].onclick = function(e) {
		var username = document.getElementById('user').value;
		var pwd = document.getElementById("pwd").value;
		if( isNotNull(username) && isNotNull(pwd) ){
			$.ajax({
				type: "get",
				timeout: 1000,
				dataType: 'jsonp',
				jsonp:'jsoncallback',
				data: {username:username, password:hex_sha1(pwd)},
				url: "http://192.168.16.88:8080/SmartEnv/user/checkUser",
				async: false,
				success: function(result) {
					if(result.success == true){
						$('.am-popover').remove();
						window.location.href='main.html';
					}
					else{
						$('button').popover('open');
						setTimeout('$("button").popover("close")',2000);
					}
				},
				error: function(data) {
					alert("请求失败，请重新登录");
				}
			});
		}
		else {
			var obj = $('#user')[0];
			if( !isNotNull(username)){
				obj.placeholder = '请输入用户名';
				addClass(obj.parentNode, 'am-form-warning');
			}
			
			obj = $('#pwd')[0];
			if( !isNotNull(pwd)){
				obj.placeholder = '请输入密码';
				addClass(obj.parentNode, 'am-form-warning');
			}
			return;
		}
	};
	

	document.getElementById('user').onfocus = function(e) {
		removeClass(this.parentNode, 'am-form-warning');
	};
	
	document.getElementById('user').onblur = function(e) {
		if(this.value == ''){
			this.placeholder = '请输入用户名';
			addClass(this.parentNode, 'am-form-warning');
		}
	};
	
	document.getElementById('pwd').onfocus = function(e) {
		removeClass(this.parentNode, 'am-form-warning');
	};
	
	document.getElementById('pwd').onblur = function (e) {
		if(this.value == ''){
			this.placeholder = '请输入密码';
			addClass(this.parentNode, 'am-form-warning');
		}
	};
};





