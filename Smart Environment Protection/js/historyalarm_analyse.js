$(function(){
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
	
});

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
	if(startTime > endTime){
		alert('所选时间段无效，请重新选择');
		return;
	}
	getAlarm(alarmtypeids, startTime, endTime);
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
		async: false,
		success: function(result) {
			/*
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
			alert(result);
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
