$(function() {
  $('#datetimepicker').datepicker().
    on('changeDate.datepicker.amui', function(e) {
			$('#nav-header h1').text($('#datetimepicker').data('date'));
			//do something else
    });
  
  $('.histogram-box a').each(function(){
  	var chart_height = $(this).attr('data-percent');
  	$(this).animate({height:chart_height},2000);
  });
  
  
});