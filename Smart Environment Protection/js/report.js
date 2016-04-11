$(function() {
  $('#datetimepicker').datepicker().
    on('changeDate.datepicker.amui', function(e) {
			$('#nav-header h1').text($('#datetimepicker').data('date'));
			//do something else
    });
  setBarAnimation();
  $('.g-selector li').on('click',function(e){
  	var target =  $(e.target);
  	var text = target.text();
  	var div_category = target.parent().parent();
  	div_category.find('.g-option').text(text);
  	if(div_category.index('.g-selector .am-u-sm-3') == 2){
  		$('.histogram-footer').html('<span>&nbsp;</span>' + text);
  	}
  	setCoordinate(text);
  });
  
});

function setBarAnimation(){
	$('.histogram-box a').each(function(){
		$(this).css({'height':0});
  	var chart_height = $(this).attr('data-percent');
  	$(this).animate({height:chart_height},1000);
  });
}

function setCoordinate(coordinate_name){
	$.ajax({
				type: "get",
				timeout: 1000,
				dataType: 'jsonp',
				jsonp:'jsoncallback',
				data: {name:coordinate_name},
				url: "http://183.62.9.189:8270/SmartEnv/report/getReportCoordinate",
				async: false,
				success: function(result) {
					if(isNotNull(result)){
						if(result.length > 0){
							BuildHistogram(result[0]);	
						}
					}
					else{
							setBarAnimation();
					}
				},
				error: function(result) {
					
				}
			});
}


function BuildHistogram(coordinate){
	var axis = coordinate.type;
	var xaxis_blocknum = $('.histogram-content li').length;
	var yaxis_blocknum = $('.histogram-bg-line ul').length;
	var max = coordinate.range.split('-')[1] != null ? coordinate.range.split('-')[1] : 0;
	var min = coordinate.range.split('-')[0] != null ? coordinate.range.split('-')[0] : 0;
	var num = (max - min) / (coordinate.step);
	
	if(axis == 'x'){
		$('.histogram-content ul').empty("");
		$('.histogram-bg-line ul').empty("");
		for(var i = 0; i < num; i++ ){
			
			$('.histogram-bg-line ul').each(function(){
				$('<li><div></div></li>').appendTo($(this));
			});
			
			var histogram_box = $('<span class="histogram-box"><a title="0" data-percent="0%"></a></span>');
			var x_axis_block = $('<span class="name">' + ((i + 1) * coordinate.step) + '</span>');
			var li_block = $('<li></li>');
			histogram_box.appendTo(li_block);
			x_axis_block.appendTo(li_block);
			li_block.appendTo($('.histogram-content ul'));	
		}
		$('.histogram-content li').css('width',((100/num)) + '%');
		$('.histogram-bg-line li').css('width',((100/num)) + '%');
	}
	else if(axis == 'y'){
		$('.histogram-bg-line').empty('');
		$('.histogram-y ul').empty('');
		for(var i = 0; i < num; i++){
			
			var ul_bgblock = $('<ul></ul>');
			ul_bgblock.appendTo($('.histogram-bg-line'));
			
			var li_yaxis_block = $('<li>' + ((num - i) * coordinate.step) +'</li>');
			li_yaxis_block.appendTo($('.histogram-y ul'));
			
			$('.histogram-bg-line ul').each(function(){
				$('<li><div></div></li>').appendTo($(this));
			});
		}
		
		$('<li>0</li>').appendTo($('.histogram-y ul'));
		$('.histogram-bg-line li').css('width',((100/num)) + '%');
	}
	generateRandomValue(max);
}

function generateRandomValue(max){
	$('.histogram-box a').each(function(){
			var ran_value = random(60, 90);
			$(this).attr('title', (ran_value * max / 100));
			$(this).attr('data-percent', ran_value + '%');
			//添加动画
			$(this).css({'height':0});
  		var chart_height = $(this).attr('data-percent');
  		$(this).animate({height:chart_height},1000);
	});
}
