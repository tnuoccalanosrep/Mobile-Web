$(function(){
	getNewsInfo();
	RegEvent();
});




/*
 * method:get the news info and put it into correct place
 */
function getNewsInfo(){
	clearContent();
	var type = $('#news-sort .g-active').index('#news-sort a');
	type = type + 1;
	$.ajax({
				type: "get",
				timeout: 1000,
				dataType: 'jsonp',
				jsonp:'jsoncallback',
				data: {newstype:type},
				url: "http://183.62.9.189:8270/SmartEnv/news/getNewsInfo",
				async: false,
				success: function(result) {
					setNewsBanner(result.newsbanners);
					setNewsInfo(result.newsinfos);
				},
				error: function(result) {
					var elem = result;
				}
			});
}


/*
 * 首次加载页面时设置第一个新闻banner标题
 */
function setFirstTitle(){
	var alt = $('.am-slides li:eq(0) img').attr('alt');
	if(isNotNull(alt)){
		$('#pic-title span').text(alt);	
	}
}


function initSlider(){
	setFirstTitle();//必须先设置title再初始化，不然顺序有误
	$('#slider-pic').flexslider({
		directionNav: false,
		pauseOnAction: false,
		after:function(slider){
			ChangeTitle();
		},
	});
}



/*
 * 更改新闻banner下方的标题
 */
function ChangeTitle(){
	var alt = $('.am-active-slide img').attr('alt');
	$('#pic-title span').text(alt);
}

/*
 * 暂时：加载静态页面到指定的div中
 */
function setContent(url) {
	$('#content').load(url);
}

function changeBackBtnState(){
	$('#btn-back').attr('data-state', 1);
}

function clearContent(){
	$('#slider-wrapper').empty('');
	$('<div class="am-slider am-slider-a4" id="slider-pic"><ul class="am-slides"></ul></div>').appendTo('#slider-wrapper');
	$('#news-list').empty("");
}


function setNewsBanner(newsbanners){
	var ul = $('#slider-pic .am-slides');
	for(var i = 0; i < newsbanners.length; i ++){
		var img = $('<img></img>');
		img.attr('src',newsbanners[i].src);
		img.attr('alt',newsbanners[i].alt);
		var a = $('<a></a>');
		a.attr('data-url',newsbanners[i].href);
		img.appendTo(a);
			
		var li = $('<li></li>');
		a.appendTo(li);
		li.appendTo(ul);
	}
	ul.appendTo($('#slider-pic'));
	$('<div id="pic-title"><i class="am-icon-image"></i><span></span></div>').appendTo($('#slider-pic'));
	initSlider();
	BindSliderClickEvent();
}

function BindSliderClickEvent(){
	$('#slider-pic a').on('click', function(e){
		var url = $(this).attr('data-url');
		if(isNotNull(url)){
			setContent(url);
			changeBackBtnState();
		}
	});
}


function setNewsInfo(newsinfos){
	for(var i = 0; i < newsinfos.length; i++){
		var li = $('<li class="am-g am-list-item-desced am-list-item-thumbed am-list-item-thumb-left"></li>');
		var div_list_thumb = $('<div class="am-u-sm-4 am-list-thumb"></div>');
		var div_list_main = $('<div class="am-u-sm-8 am-list-main"></div>');
		
		var img_thumb = $('<img></img>');
		img_thumb.attr('src',newsinfos[i].src);
		img_thumb.attr('alt',newsinfos[i].alt);
		
		var a_thumb = $('<a></a>');
		a_thumb.attr('data-url',newsinfos[i].href);
		img_thumb.appendTo(a_thumb);
		
		a_thumb.appendTo(div_list_thumb);
		
		var a_title = $('<a></a>');
		a_title.attr('data-url',newsinfos[i].href);
		a_title.text(newsinfos[i].title);
		var h3_title = $('<h3 class="am-list-item-hd"></h3>');
		a_title.appendTo(h3_title);
		
		var div_text = $('<div class="am-list-item-text"><div>');
		div_text.text(newsinfos[i].summary);
		
		h3_title.appendTo(div_list_main);
		div_text.appendTo(div_list_main);
		
		div_list_thumb.appendTo(li);
		div_list_main.appendTo(li);
		
		li.appendTo($('#news-list'));
	}
	BindNewsListEvent();
	
}

function BindNewsListEvent(){
	$('#news-list a').on('click', function(e){
		var url = $(this).attr('data-url');
		setContent(url);
		changeBackBtnState();
	});
}

/*
 * 注册事件
 */
function RegEvent(){
	$('#news-sort a').on('click',function(e){
		$('#news-sort a.g-active').removeClass('g-active');
		$(this).addClass('g-active');
		getNewsInfo();
	});

	
	$('#btn-back').on('click', function(e){
		var state = $('#btn-back').attr('data-state');
		if(state == 1){
			window.location.href = 'envpro_info.html';
		}
		else{
			window.location.href = 'more.html';
		}
	});
}

