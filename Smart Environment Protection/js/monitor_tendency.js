$(function() {
	Highcharts.setOptions({
			global: {
				useUTC: false
			}
		});

	var chart;
	var params = isNotNull(document.URL.split('?')[1]) ? document.URL.split('?')[1] : '';
	var title = getParamValue(params,'title');
	title = decodeURIComponent(title);
	var param = {'title':title};
	if(title == "排污监控"){
		$('#normal-chart').css('display','none');
		$('#tabs-chart').css('display','block');
		$('<div id="container"></div>').appendTo($('.am-tab-panel.am-active'));
		param.range='7-8';
		param.yTitle = 'pH值';
		generateChart('#container',param);
	}
	else{
		$('<div id="container"></div>').appendTo($('#normal-chart'));
		generateChart('#container',param);
	}
	
	$('#tabs-chart li').on('click',function(e){
		$('.am-tab-panel.am-active').empty('');
		var index = $(this).index('#tabs-chart li');
		var strContent = 'div[data-tab-panel-' + index + ']';
		$('<div id="container"></div>').appendTo($(strContent));
		param = {'title':title};
		if($(this).find('a').text() == '排放量'){
			param.range='1750-2000';
			param.yTitle = '排放量';
		}
		else if($(this).find('a').text() == 'pH值'){
			param.range='7-8';
			param.yTitle = 'pH值';
		}
		generateChart('#container',param);
	});
});

function generateChart(id, param){
	var min = 1750;
	var max = 2000;
	if(isNotNull(param.range)){
		 min = param.range.split('-')[0];
		 max = param.range.split('-')[1];
	}
	
	$(id).highcharts({
			chart: {
				type: 'spline',
				animation: Highcharts.svg, // don't animate in old IE               
				marginRight: 10,
				events: {
					load: function() {

						// set up the updating of the chart each second
						// dynamic bind
						var series = this.series[0];
						setInterval(function() {
							getDeviceRealData();
							var x = (new Date()).getTime(), // current time         
							y = lastData;
							series.addPoint([x, y], true, true);
						}, 3000);
					}
				}
			},
			credits: {
				text: ''
			},
			title: {
				text: isNotNull(param.title)? (param.title) : '实时趋势图'
			},
			xAxis: {
				type: 'datetime',
				tickPixelInterval: 100
			},
			yAxis: {
				title: {
					text: isNotNull(param.yTitle)? (param.yTitle) : '流量'
				},
				plotLines: [{
					value: 0,
					width: 1,
					color: '#808080'
				}],
				min: 0,
			},
			
			tooltip: {
				formatter: function() {
					return '<b>' + this.series.name + '</b><br/>' +
						Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
						Highcharts.numberFormat(this.y, 10);
				}
			},
			
			legend: {
				enabled: false
			},
			exporting: {
				enabled: false
			},
			series: [{
				name: isNotNull(param.yTitle)? (param.yTitle) : '流量',
				data: (function() {
					// generate an array of random data    
					// first initital data
					var data = [],
						time = (new Date()).getTime(),
						i;
					
					for (i = -19; i <= 0; i++) {
						data.push({
							x: time + i * 1000,
							y: random(min, max) + Math.random()
						});
					}
					return data;
				})(),
				marker:{
					enabled:false
				},
				lineWidth: 1.5,
			}]
		});
}

var lastData = 2000;
function getDeviceRealData(){
	var deviceid = 'c767c1f3602d41d4ab0d821e316027ca';
	$.ajax({
		type: "get",
		timeout: 1000,
		dataType: 'jsonp',
		jsonp: 'jsondevicedata',
		data: {
			deviceids: deviceid
		},
		//url: "http://192.168.16.88:8080/SmartEnv/device/getRealData",
		url: "http://183.62.9.189:8270/SmartEnv/device/getRealData",
		async: false,
		success: function(result) {
			if (isNotNull(result)) {
				for(var i = 0; i < result.length; ++i){
					if( result[i].channelName == "A相电压"){
						lastData = Number(result[i].signalValue);
					}
					
				}
			} 
			else {
				
			}
		},
		error: function(result) {
			
		}
	});
}
