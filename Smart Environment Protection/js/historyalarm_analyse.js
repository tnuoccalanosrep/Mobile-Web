var initPos;
var Footer_initPos;
$(function(){
	initPos = $('#page-head').offset().top;
	Footer_initPos = $('#page-footer').offset().top;
	InitDate();
	StickHeader();
	StickPageFooter();
	InitModal();
	checkData();
	RegEvent();
});



function InitDate(){
	var date = new Date().toLocaleString();
	$('#start-time').datepicker('setValue',date);
	$('#end-time').datepicker('setValue',date);
}


function RegEvent(){
	$('#btn-confirm')[0].onclick = function(e){
		checkData();
	}
	$('.am-pagination-select select')[0].onchange = function(e){
		checkData();
	}
	
	$('.am-pagination-next')[0].onclick = function(e){
		var select = $('.am-pagination-select select')[0];
		var index = select.selectedIndex;
		if(index + 1 < select.length){
			select.selectedIndex = select.selectedIndex + 1;
			checkData();
		}
	}
	$('.am-pagination-prev')[0].onclick = function(e){
		var select = $('.am-pagination-select select')[0];
		var index = select.selectedIndex;
		if(index - 1 >= 0){
			select.selectedIndex = select.selectedIndex - 1;
			checkData();
		}
	}
}



function StickHeader(){
	$('#page-head').scrollspy({
  	});
  	
	$('#page-head').on('outview.scrollspy.amui', function(){
		$(this).addClass('g-stick-head');
 	});
 	$(window).scroll(function() {
		var init_pos = $('#page-head').offset().top;
		if(init_pos <= initPos){
			$('#page-head').removeClass('g-stick-head');
		}
	});
}

function StickPageFooter(){
	/*
	$('#page-footer').scrollspy({
  	});
  	
	$('#page-footer').on('outview.scrollspy.amui', function(){
		//$(this).addClass('g-stick-footer');
 	});
 	$(window).scroll(function() {
 		console.log("InitPos_Top=" + Footer_initPos);
 		var absTop =  $('#page-footer').offset().top;
 		var absLeft =  $('#page-footer').offset().left;
 		var relTop = $('#page-footer').position().top;
 		var relLeft = $('#page-footer').position().left;
 		
 		console.log("absTop = " + absTop +" ,absLeft = " + absLeft + " ,relTop = "+ relTop + " ,relLeft = " + relLeft);
		var current_pos = $('#page-footer').offset().bottom;
		if(current_pos >= Footer_initPos){
			//$('#page-footer').removeClass('g-stick-footer');
		}
	});
	*/
}
function InitModal() {
	$('.am-modal').modal({
		target: '#filter-modal',
		closeViaDimmer: 1,
		width: 370,
		height: 280
	})
}

function checkData(){
	var alarmtypeids = new Array();
	$('.am-checkbox input:checked').each(function(){
		alarmtypeids.push($(this)[0].value);
	});	
	if(alarmtypeids.length == 0){
		alert('请选择告警类型');
		return;
	}
	var strstartTime = $('#start-time input')[0].value;
	var strendTime = $('#end-time input')[0].value;
	if(!isNotNull(strstartTime)){
		alert('请选择开始时间');
		return;
	}
	if(!isNotNull(strendTime)){
		alert('请选择结束时间');
		return;
	}
	
	var startTime = new Date(strstartTime.replace(/-/g,   "/"));
	var endTime = new Date(strendTime.replace(/-/g,   "/"));
	
	startTime = initTime(startTime, 0);
	endTime = initTime(endTime, 1);
	
	if(startTime > endTime){
		alert('所选时间段无效，请重新选择');
		return;
	}
	getAlarm(alarmtypeids, startTime, endTime);
}

function initTime(time, flag){
	if(flag == 0){
		time.setHours(0);
		time.setMinutes(0);
		time.setSeconds(0);
	}
	else{
		time.setHours(23);
		time.setMinutes(59);
		time.setSeconds(59);
	}
	return time;
}


function getAlarm(alarmtypeids, startTime, endTime) {
	$.ajax({
		type: "get",
		timeout: 1000,
		dataType: 'jsonp',
		jsonp: 'jsoncallback',
		data: {
			alarmTypeIds: alarmtypeids,
			pageNumber: getPageIndex(),
			startTime: startTime,
			endTime: endTime
		},
		url: "http://192.168.16.88:8080/SmartEnv/alarm/getAlarmPage",
		async: true,
		success: function(result) {
			/* explain:
			 * result.content = List<Alarm>
			 * result.number + 1= index
			 * result.totalPages
			 * result.size
			 * result.toatlElements
			 * result.numberOfElements
			 */
			var table = $('.am-table')[0];
			$(".am-table  tr:not(:first)").empty("");
			for(var i=0; i< result.content.length; i++){
				var tr = GenTableRow(result.content[i]);
				tr.appendTo(table);
			}
			setQueryTitle();
			setPageInfo(result.number, result.totalPages);
			$('#filter-modal').modal('close');
		},
		error: function(result) {
			$('#filter-modal').modal('close');
		}
	});
}


function GenTableRow(rowObj){
	var tr=$("<tr></tr>");
	var time = rowObj.endtime.toString();
	var endtime = (rowObj.endtime.month + 1) + '/' + rowObj.endtime.date;
	var starttime = (rowObj.starttime.month + 1) + '/' + rowObj.starttime.date;
	var td=$("<td>"+ starttime + "-" + endtime + "</td>");
	td.appendTo(tr);
	td=$("<td>"+ rowObj.inputwater + "</td>");
	td.appendTo(tr);
	td=$("<td>"+ rowObj.outputwater + "</td>");
	td.appendTo(tr);
	td=$("<td>"+ rowObj.reusewater + "</td>");
	td.appendTo(tr);
	td=$("<td>-</td>");
	td.appendTo(tr);
	td=$("<td>-</td>");
	td.appendTo(tr);
	return tr;
}



function setPageInfo(index, totalPages){
	var pageSelect = $('.am-pagination-select select')[0];
	pageSelect.innerHTML = '';
	for(var i=0;i<totalPages;i++){
		var pageinfo = (i+1) + '/' + totalPages;
		var option = $('<option>'+ pageinfo +'</option>');
		option.appendTo(pageSelect);
	}
	if(totalPages == 0){
		var pageinfo = 0 + '/' + 0;
		var option = $('<option>'+ pageinfo +'</option>');
		option.appendTo(pageSelect);
	}
	pageSelect.selectedIndex = index;
}

function getPageIndex(){
	var pageIndex = $('.am-pagination-select select')[0].selectedIndex;
	if(pageIndex == -1){
		return 0;
	}
	else{
		return pageIndex;
	}
}

function setQueryTitle(){
	$('#alarm-type')[0].textContent = '';
	$('#time-span')[0].textContent = '';
	$('.am-checkbox input:checked').each(function(){
		var text = $(this)[0].parentNode.textContent;
		$('#alarm-type')[0].textContent = $('#alarm-type')[0].textContent + text + ' ';
	});	
	var beginTime = $('#start-time input')[0].value;
	var endTime = $('#end-time input')[0].value;
	$('#time-span')[0].textContent = beginTime + '至' + endTime;
	
}



