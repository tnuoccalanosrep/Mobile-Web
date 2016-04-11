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
		if(title == "排污监控"){
			$('#normal-chart').css('display','none');
			$('#tabs-chart').css('display','block');
			$('<div id="container"></div>').appendTo($('.am-tab-panel.am-active'));
			generateChart('#container',{'title':title});
		}
		else{
			$('<div id="container"></div>').appendTo($('#normal-chart'));
			generateChart('#container',{'title':title});
	}
	
	$('#tabs-chart li').on('click',function(e){
		$('.am-tab-panel.am-active').empty('');
		var index = $(this).index('#tabs-chart li');
		var strContent = 'div[data-tab-panel-' + index + ']';
		$('<div id="container"></div>').appendTo($(strContent));
		param = {'title':title};
		if($(this).find('a').text() == '排放量'){
			param.range='1750-2000';
		}
		else{
			param.range='7-8';
		}
		generateChart('#container',param);
	})
});

function generateChart(id, param){
	var min = 7;
	var max = 8;
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
							var x = (new Date()).getTime(), // current time         
								y = random(min, max) + Math.random();
							series.addPoint([x, y], true, true);
						}, 1000);
					}
				}
			},
			credits: {
				text: ''
			},
			title: {
				text: isNotNull(param.title)? (param.title + '实时趋势图') : '实时趋势图'
			},
			xAxis: {
				type: 'datetime',
				tickPixelInterval: 100
			},
			yAxis: {
				title: {
					text: isNotNull(param.title)? (param.title + '实时监测值') : '实时监测值'
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
				name: 'Random data',
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
