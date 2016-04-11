/*
$(document).on('click', 'html', function(e) {
	var nodeName = e.target.localName;
	var parentNodeName = '';
	if(e.target.parentNode != 'undefined'){
		parentNodeName = e.target.parentNode.localName;
	}
	if (!isFunctionNode(nodeName) && !isFunctionNode(parentNodeName)) {
		var nav = $('#nav-bottom')[0];
		if (nav != null) {
			if (nav.style.display == 'none') {
				nav.style.display = 'block';
			} else {
				nav.style.display = 'none';
			}
		}
	}
});
*/

$(function(){
	
	var filter = [	'monitor_video.html',
					'envpro_info.html',
					'historyalarm_analyse.html',
					'monitor_tendency.html'
				]
	
	
	$("<script type=\"text/javascript\" src=\"js/hammer.js\"><\/script>").appendTo($('head'));
	addBodyClass();
	BindBackBtnEvent();
	var dirArray = document.URL.split('/');
	var pageName = dirArray[dirArray.length - 1];
	
	for(var i = 0 ; i < filter.length; ++i) {
		var pageName = filter[i];
		if(document.URL.indexOf(pageName) > -1){
			return;
		}
	}
	addSwipeEvent();
	if(window.plus){
		addBackBtnEvent();
	}else{
		document.addEventListener("plusready",addBackBtnEvent,false);
	}
});

function addBackBtnEvent(){
	plus.key.addEventListener("backbutton",function(){
		var r = confirm( "确定退出程序？" );
		if(!r){
			return;
		}
		else{
			var ws=plus.webview.currentWebview();
			plus.webview.close(ws);
		}
	});
}

/*
document.getElementsByTagName('html')[0].onclick = function(e) {
	var nodeName = e.target.localName;
	var parentNodeName = e.target.parentNode.localName;
	if ( !isFunctionNode(nodeName) && !isFunctionNode(parentNodeName)) {
		var nav = document.getElementById('nav-bottom');
		if (nav !=null ) {
			if(nav.style.display == 'none'){
				nav.style.display = 'block';
			}
			else {
			nav.style.display = 'none';
			}
		}
	}
};
*/

function addSwipeEvent(){
	var hammer = new Hammer($('html')[0]);
	hammer.on('swipeleft',function(e){
		var index = $('#nav-bottom a.g-selected').index('#nav-bottom a');
		var max_index = $('#nav-bottom a').length - 1;
		if(index < max_index){
			$('#nav-bottom a.g-selected').removeClass('g-selected');
			$('#nav-bottom a:eq(' + (index+1) + ')').addClass('g-selected');
			var animation = '?bodyclass=am-animation-slide-right';
			window.location.href = $('#nav-bottom a.g-selected')[0].href + animation;
		}
	});
	
	hammer.on('swiperight',function(e){
		var index = $('#nav-bottom a.g-selected').index('#nav-bottom a');
		if(index > 0){
			$('#nav-bottom a.g-selected').removeClass('g-selected');
			$('#nav-bottom a:eq(' + (index-1) + ')').addClass('g-selected');
			var animation = '?bodyclass=am-animation-slide-left';
			window.location.href = $('#nav-bottom a.g-selected')[0].href + animation;
		}
	});

}

function addBodyClass(){
	var currentURL = document.URL;
	var param = isNotNull(currentURL.split('?')[1])?currentURL.split('?')[1]:'';
	var value = isNotNull(param.split('=')[1])?param.split('=')[1]:'';
	$('#content').addClass(value);
}


function isFunctionNode(nodeName){
	if(nodeName != 'a' 
	&& nodeName != 'button'
	&& nodeName != 'input'
	&& nodeName != 'select'){
		return false;
	}
	else{
		return true;
	}
}

function BindBackBtnEvent(){
	$('#btn-back').on('click', function(e){
		var state = $('#btn-back').attr('data-state');
		var pageName = getPageName(document.URL);
		if(pageName != 'envpro_info.html' && pageName != 'more.html'){
			var lastPageName = getPageName(document.referrer);
			if(lastPageName != 'login.html'){
				history.go(-1);
			}
		}
		
	});
}
/*
function hasClass(obj, cls) {  
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));  
}  
  
function addClass(obj, cls) {  
    if (!this.hasClass(obj, cls)) obj.className += " " + cls;  
}
  
function removeClass(obj, cls) {  
    if (hasClass(obj, cls)) {  
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');  
        obj.className = obj.className.replace(reg, ' ');  
    }  
}  
  
function toggleClass(obj,cls){
    if(hasClass(obj,cls)){  
        removeClass(obj, cls);  
    }else{  
        addClass(obj, cls);  
    }
}  
*/
function isNotNull(str) {
	return (str != null && str != '' && str != 'undefined');
}

function getPageName(url){
	var dirArray = url.split('/');
	if(dirArray.length > 0){
		return dirArray[dirArray.length - 1];
	}
	else{
		return '';
	}
}


function getParamValue(strParams, paramName){
	var params = strParams.split('&');
	for(var i = 0; i < params.length; i++){
		var key = isNotNull(params[i].split('=')[0]) ? params[i].split('=')[0] : '';
		if(key == paramName){
			var value = isNotNull(params[i].split('=')[1]) ? params[i].split('=')[1] : '';
			return value;
		}
	}
}

function random(min, max){
	min = Number(min);
	max = Number(max);
	return Math.floor(min + Math.random() * (max - min));
}


