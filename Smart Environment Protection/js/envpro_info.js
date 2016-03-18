$(function(){
	$('#news-sort a').on('click',function(e){
		/*
		var elem = $(this);
		$('#news-sort a').css({
			'color':'black',
		});
		$(this).css({
		'-moz-transform':'scale(1.08)',
		'-ms-transform':'scale(1.08)',
		'-o-transform': 'scale(1.08)',
		'-webkit-transform': 'scale(1.08)',
		'color': '#5eb95e',
		'opacity': '1',
		'transform': 'scale(1.08)',
		'font-size':'1.8rem'		
		});
		*/
		$('#news-sort a.g-active').removeClass('g-active');
		$(this).addClass('g-active');
	});
	setFirstTitle();
	$('#slider-pic').flexslider({
		directionNav: false,
		pauseOnAction: false,
		after:function(slider){
			ChangeTitle();
		},
	});
});


function setFirstTitle(){
	var alt = $('.am-slides li:eq(0) img').attr('alt');
	$('#pic-title span').text(alt);
}

function ChangeTitle(){
	var alt = $('.am-active-slide img').attr('alt');
	$('#pic-title span').text(alt);
}
