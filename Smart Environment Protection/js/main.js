$(function(){
	$('#btn-alarm').on('click',function(e){
		var height = $('.g-waring-list').height();
		var w = $(window);
		w.smoothScroll({position:height});
	});
	
	$('.waring-info').on('click', function(e){
		var abdevice = $(e.target).attr('data-abdevice');
		window.location.href = 'monitor.html?abdevice=' + abdevice;  
	});
});
