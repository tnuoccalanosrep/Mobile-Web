window.onload = function(){
	$('.center').slick({
	arrows: false,
	centerMode: true,
	infinite: false,
	speed: 500,
	centerPadding: '0px',
	slidesToShow: 3,
	});
	var deviceid = $('.center').find('li:eq(0)').attr('ID');
	if(isNotNull(deviceid)){
		getRealtimeVideo(deviceid);
	}

	
	
	$('.center').on('beforeChange', function(event,slick,currentSlide){
	  	pauseVideo();
	});
	
	
	$('.center').on('afterChange', function(event,slick,currentSlide){
	  	var obj = $(event.target);
	  	deviceid = obj.find("li:eq(" + currentSlide + ")").attr("ID");
	  	if(isNotNull(deviceid)){
	  		getRealtimeVideo(deviceid);
	  	}
	});
};

function getRealtimeVideo(deviceid) {
	$.ajax({
		type: "get",
		timeout: 1000,
		dataType: 'jsonp',
		jsonp: 'jsonvideomsg',
		data: {
			deviceid: deviceid
		},
		url: "http://192.168.16.88:8080/SmartEnv/video/getRealtimeVideo",
		async: false,
		success: function(result) {
			if (isNotNull(result.url)) {
				setVideoUrl(result.url);
			} else {
				alert(result.err);
			}
		},
		error: function(result) {
			
		}
	});
}

function setVideoUrl(url){
	var video = $('.video-field video')[0];
	video.src = url;
}

function pauseVideo(){
	$('.video-field video')[0].pause();
}

