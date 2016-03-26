$(function(){
	setFirstTitle();
	RegEvent();
});


function setFirstTitle(){
	var alt = $('.am-slides li:eq(0) img').attr('alt');
	$('#pic-title span').text(alt);
}

function ChangeTitle(){
	var alt = $('.am-active-slide img').attr('alt');
	$('#pic-title span').text(alt);
}

function RegEvent(){
	$('#news-sort a').on('click',function(e){
		$('#news-sort a.g-active').removeClass('g-active');
		$(this).addClass('g-active');
	});
	
	$('#slider-pic').flexslider({
		directionNav: false,
		pauseOnAction: false,
		after:function(slider){
			ChangeTitle();
		},
	});
	
	$('#news-list a').on('click', function(e){
		var url = $(this).attr('data-url');
		setContent(url);
	});
	
	$('#btn-back').on('click', function(e){
		
	});
	
}


function setContent(url) {
	$('#content').load(url);
	
}
