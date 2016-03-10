$(function() {
  $('#datetimepicker').datepicker().
    on('changeDate.datepicker.amui', function(e) {
		$('#nav-header h1').text($('#datetimepicker').data('date'));
		//do something else
    });
});