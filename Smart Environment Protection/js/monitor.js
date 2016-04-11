$(function(){
	addAbnormalAnimation();
	RegEvent();
});

function addAbnormalAnimation(){
	var url = document.URL;
	var params = isNotNull(url.split('?')[1]) ? url.split('?')[1] : '';
	if(params.indexOf('abdevice') > -1){
		var abdevice = getParamValue(params, 'abdevice');
		var divs = $('div[data-name="' + abdevice + '"]');
		var div_height = divs[0].offsetTop;
		SlideTo(div_height);
		divs.addClass('am-animation-shake');
	}
}

function RegEvent(){
	/*
	 * 设备状态点击事件
	 */
	$('div[data-name="device-status"] span').on('click', function(e){
		$('#device-detail .am-popup-bd').empty("");
		var target = $(e.target).parent();
		
		/*
		 * 缓兵之计
		 */
		if(target.attr('data-name') == 'FCT'){
			$('<p>设备名称：流量变送器</p>').appendTo($('#device-detail .am-popup-bd'));
			$('<p>流速：2m/s</p>').appendTo($('#device-detail .am-popup-bd'));
			$('<p style="color:red">瞬时流量(异常)：1500m<sup>3</sup>/s</p>').appendTo($('#device-detail .am-popup-bd'));
			$('<p>累积流量：60000m<sup>3</sup></p>').appendTo($('#device-detail .am-popup-bd'));
		}
		else if(target.attr('data-name') == 'ORP' ){
			$('<p>设备名称：酸洗机</p>').appendTo($('#device-detail .am-popup-bd'));
			$('<p style="color:red">酸洗池PH(异常)：5</p>').appendTo($('#device-detail .am-popup-bd'));
			$('<p>ORP：1500mV</p>').appendTo($('#device-detail .am-popup-bd'));
			$('<p>温度：40<sup>o</sup>C</p>').appendTo($('#device-detail .am-popup-bd'));
		}
		else{
			return;
		}
		$('#device-detail').modal({
		});
	});
	/*
	 * 实时趋势/实时监控按钮点击事件
	 */
	$('a.am-btn.am-round').on('click',function(e){
		var current_panel = $(this).parents('.am-panel');
		var title = current_panel.find('.panel-title span').text();
		var pageName = getPageName(this.href);
		if(pageName != 'monitor_video.html'){
			this.href = this.href + '?title=' + title;
		}
	});
}

function SlideTo(height) {
	var w = $(window);
	var header_height = $('#nav-header').height();
	var panel_height = $('.am-panel-first').height();
	w.smoothScroll({
		position: height - header_height - panel_height,
		speed: 200
	});
}
