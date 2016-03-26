$(function() {
	$(document).ready(function() {
		Highcharts.setOptions({
			global: {
				useUTC: false
			}
		});

		var chart;
		$('#container').highcharts({
			chart: {
				type: 'spline',
				animation: Highcharts.svg, // don't animate in old IE               
				marginRight: 20,
				events: {
					load: function() {

						// set up the updating of the chart each second             
						var series = this.series[0];
						setInterval(function() {
							var x = (new Date()).getTime(), // current time         
								y = Math.random() + 10;
							series.addPoint([x, y], true, true);
						}, 1000);
					}
				}
			},
			credits: {
				text: 'www.gosuncn.com',
				href: 'http://www.gosuncn.com:81/'
			},
			title: {
				text: 'PM2.5实时趋势图'
			},
			xAxis: {
				type: 'datetime',
				tickPixelInterval: 100
			},
			yAxis: {
				title: {
					text: 'PM2.5实时监测值'
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
					var data = [],
						time = (new Date()).getTime(),
						i;

					for (i = -19; i <= 0; i++) {
						data.push({
							x: time + i * 1000,
							y: Math.random() + 10
						});
					}
					return data;
				})()
			}]
		});
	});
});