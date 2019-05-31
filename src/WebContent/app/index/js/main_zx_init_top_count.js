function initTodayCount() {
	var start = new Date().format("yyyy-MM-dd");
	var startDate = start+" 00:00:00";
	var endDate = start+" 23:59:59";
	var data = {
		tdCameCheck:{startDate:startDate,endDate:endDate},
		adviceNum:{startDate:startDate,endDate:endDate},
		tdCallbacked:{startDate:startDate,endDate:endDate},
		appointmentNum:{startDate:startDate,endDate:endDate}
	};
	tcCore.post({
		url:"ruleVarDS/caculateVarByCodes.ssm",
		data:{
			params:data,
			code:["tdCameCheck","adviceNum","tdCallbacked","appointmentNum"]
		},
		success:function(data){
			var r1 = data[0].value[0].tdCameCheck;
			var r2 = data[1].value[0].adviceNum;
			var r3 = data[2].value[0].tdCallbacked;
			var r4 = data[3].value[0].appointmentNum;
//			$("#today_wait").html(r1+" 人");//今日待回访
			$("#today_already_come").html(r1+" 人");//今日已到诊
			$("#today_new_advicer").html(r2+" 人");//今日新增咨询
			$("#today_finish_wait").html(r3+" 人");//今日已回访
			$("#today_new_appointmentor").html(r4+" 人");//今日新增预约
			
		}
	});
}

function initYesterdayCount() {
	var yStar = getDateStr(-1);
	var yStartDate = yStar+" 00:00:00";
	var yEndDate = yStar+" 23:59:59";
	var yData = {
			tdCameCheck:{startDate:yStartDate,endDate:yEndDate},
			adviceNum:{startDate:yStartDate,endDate:yEndDate},
			tdCallbacked:{startDate:yStartDate,endDate:yEndDate},
			appointmentNum:{startDate:yStartDate,endDate:yEndDate}
		};
	tcCore.post({
		url:"ruleVarDS/caculateVarByCodes.ssm",
		data:{
			params:yData,
			code:["tdCameCheck","adviceNum","tdCallbacked","appointmentNum"]
		},
		success:function(data){
			var r1 = data[0].value[0].tdCameCheck;
			var r2 = data[1].value[0].adviceNum;
			var r3 = data[2].value[0].tdCallbacked;
			var r4 = data[3].value[0].appointmentNum;
			
			$("#y_already_come").html(r1+" 人");//昨日已到诊
			$("#y_new_advicer").html(r2+" 人");//昨日新增咨询
			$("#y_finish_wait").html(r3+" 人");//昨日已回访
			$("#y_new_appointmentor").html(r4+" 人");//昨日新增预约
			
		}
	});
}

function initToMonthCount() {
	var start = getMonthStartDate();
	var end = getMonthEndDate();
	var startDate = start+" 00:00:00";
	var endDate = end+" 23:59:59";
	var data = {
		tdCameCheck:{startDate:startDate,endDate:endDate},
		adviceNum:{startDate:startDate,endDate:endDate},
		tdCallbacked:{startDate:startDate,endDate:endDate},
		appointmentNum:{startDate:startDate,endDate:endDate}
	};
	tcCore.post({
		url:"ruleVarDS/caculateVarByCodes.ssm",
		data:{
			params:data,
			code:["tdCameCheck","adviceNum","tdCallbacked","appointmentNum"]
		},
		success:function(data){
			var r1 = data[0].value[0].tdCameCheck;
			var r2 = data[1].value[0].adviceNum;
			var r3 = data[2].value[0].tdCallbacked;
			var r4 = data[3].value[0].appointmentNum;
			$("#m_already_come").html(r1+" 人");//本月已到诊
			$("#m_new_advicer").html(r2+" 人");//本月新增咨询
			$("#m_finish_wait").html(r3+" 人");//本月已回访
			$("#m_new_appointmentor").html(r4+" 人");//本月新增预约
			
		}
	});
}