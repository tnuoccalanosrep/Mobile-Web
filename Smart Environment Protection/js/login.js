window.onload = function() {
	var ani_shake = 'am-animation-shake';
	$('button')[0].onclick = function(e) {
		RemoveAnimation();
		var username = $('#user input')[0].value;
		var pwd = $("#pwd input")[0].value;
		if( isNotNull(username) && isNotNull(pwd) ){
			$.ajax({
				type: "get",
				timeout: 1000,
				dataType: 'jsonp',
				jsonp:'jsoncallback',
				data: {username:username, password:hex_sha1(pwd)},
				url: "http://183.62.9.187:80/SmartEnv/user/checkUser",
				async: false,
				success: function(result) {
					if(result.success == true){
						window.location.href='main.html';
					}
					else{
						$('button').addClass(ani_shake);
					}
				},
				error: function(data) {
					alert("请求失败，请重新登录");
				}
			});
		}
		else {
			var obj = $('#user input')[0];
			if( !isNotNull(username)){
				obj.placeholder = '请输入用户名';
				//addClass(obj.parentNode, 'am-form-warning');
				//addClass(obj.parentNode, ani_shake);
				$('#user').addClass('am-form-warning');
				$('#user').addClass(ani_shake);
			}
			
			obj = $('#pwd input')[0];
			if( !isNotNull(pwd)){
				obj.placeholder = '请输入密码';
				$('#pwd').addClass('am-form-warning');
				$('#pwd').addClass(ani_shake);
			}
			return;
		}
	};
	
	/*
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
	*/
	$('#user input')[0].onfocus = function(e){
		$('#user').removeClass('am-form-warning');
		$('#user').removeClass('am-animation-shake');
	}
	
	$('#pwd input')[0].onfocus = function(e){
		$('#pwd').removeClass('am-form-warning');
		$('#pwd').removeClass('am-animation-shake');
	}
	
	$('#user input')[0].onblur = function(e) {
		if(this.value == ''){
			this.placeholder = '请输入用户名';
			$('#user').addClass('am-form-warning');
			$('#user').addClass('am-animation-shake');
		}
	};
	
	$('#pwd input')[0].onblur = function(e) {
		if(this.value == ''){
			this.placeholder = '请输入密码';
			$('#pwd').addClass('am-form-warning');
			$('#pwd').addClass('am-animation-shake');
		}
	};
	
};

function RemoveAnimation(){
	var ani_shake = 'am-animation-shake';
	$('button').removeClass(ani_shake);
	$('#user').removeClass(ani_shake);
	$('#pwd').removeClass(ani_shake);
}


