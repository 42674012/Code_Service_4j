var NowSummary = {
	registration:{
		title:"今日挂号",
		ps:["000"]
	},
	reception:{
		title:"今日接诊",
		ps:["000"]
	},
	firstVisit:{
		title:"今日初诊",
		ps:["000"]
	},
	returnVisit:{
		title:"今日复诊",
		ps:["000"]
	},
	willCall:{
		title:"今日待回访",
		ps:["000"]
	},
	finishCall:{
		title:"今日已回访",
		ps:["000"]
	},
	willCheck:{
		title:"今日预计到诊",
		ps:["000"]
	},
	willCheck:{
		title:"今日实际到诊",
		ps:["000"]
	},
	newAppointmnet:{
		title:"今日新增预约",
		ps:["000"]
	},
	newAdvice:{
		title:"今日新增咨询",
		ps:["000"]
	}
};
function initNowSummaryList(code) {
//	var code = "00";
//	var sum = {};
//	for(var a in NowSummary) {
//		$(NowSummary[a].ps).each(function(i,o) {
//			if(code.indexOf(o)) {
//				sum[a] = [NowSummary[a].title,a];
//				
//				
//			}
//		});
//	}
//	initNowSum(sum);
//	return sum;
}
function getNowSumTable(title,data) {
//	var div = "<div class='ava' data-options='border:false,fit:true' >";
//	var divcenter = "<div title="+title+" data-options='selected:true,tabWidth:100>";
//	var divEnd = "</div></div>";
//	var ts = "<table>";
//	$(data).each(function(i,o) {
//		console.log(o);
//		ts+="<tr>" +
//				+"<td width='50%'>"+o["title"]+"</td>"
//				+"<td width='50%'>"+o["data"]+" 人</td>"
//			"</tr>";
//	});
//	ts+="</table>";
//	
//	var sumHtml = div+divcenter+ts+divEnd;
//	console.info(sumHtml);
//	$("#tCount_td").append(sumHtml);
//	$(".ava").tabs();
}
/**
 * 咨询 -------------------------------start-------------------------------
 */
function initTodayCountZX() {
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
			var tAr = [{title:"今日待回访",data:r1},
			           {title:"今日已回访",data:r3},
			           {title:"今日新增咨询",data:r2},
			           {title:"今日新增预约",data:r4}];	
			getNowSumTable("今日汇总",tAr);
			
//			$("#today_wait").html(r1+" 人");//今日待回访
			$("#today_g").parent().prev().html("今日已到诊:");
			$("#today_g").html(r1+" 人");//今日已到诊
			
			$("#today_j").parent().prev().html("今日新增咨询:");
			$("#today_j").html(r2+" 人");//今日新增咨询
			
			$("#today_c").parent().prev().html("今日已回访:");
			$("#today_c").html(r3+" 人");//今日已回访
			
			$("#today_f").parent().prev().html("今日新增预约:");
			$("#today_f").html(r4+" 人");//今日新增预约
			
		}
	});
	initYesterdayCountZX();
}

function initYesterdayCountZX() {
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
			
//			$("#y_already_come").html(r1+" 人");//昨日已到诊
//			$("#y_new_advicer").html(r2+" 人");//昨日新增咨询
//			$("#y_finish_wait").html(r3+" 人");//昨日已回访
//			$("#y_new_appointmentor").html(r4+" 人");//昨日新增预约
			$("#y_g").parent().prev().html("昨日已到诊:");
			$("#y_g").html(r1+" 人");//昨日已到诊
			
			$("#y_j").parent().prev().html("昨日新增咨询:");
			$("#y_j").html(r2+" 人");//昨日新增咨询
			
			$("#y_c").parent().prev().html("昨日已回访:");
			$("#y_c").html(r3+" 人");//昨日已回访
			
			$("#y_f").parent().prev().html("昨日新增预约:");
			$("#y_f").html(r4+" 人");//昨日新增预约
			
			
		}
	});
	initToMonthCountZX();
}

function initToMonthCountZX() {
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
//			$("#m_already_come").html(r1+" 人");//本月已到诊
//			$("#m_new_advicer").html(r2+" 人");//本月新增咨询
//			$("#m_finish_wait").html(r3+" 人");//本月已回访
//			$("#m_new_appointmentor").html(r4+" 人");//本月新增预约
			$("#m_g").parent().prev().html("本月已到诊:");
			$("#m_g").html(r1+" 人");//本月已到诊
			
			$("#m_j").parent().prev().html("本月新增咨询:");
			$("#m_j").html(r2+" 人");//本月新增咨询
			
			$("#m_c").parent().prev().html("本月已回访:");
			$("#m_c").html(r3+" 人");//本月已回访
			
			$("#m_f").parent().prev().html("本月新增预约:");
			$("#m_f").html(r4+" 人");//本月新增预约
		}
	});
}
// ---------------------------end-------------------------





/**
 * 今日汇总 医生/导医 -------------------start-------------------------------
 */
function initTodayCountYS() {
	var start = new Date().format("yyyy-MM-dd");
	var startDate = start+" 00:00:00";
	var endDate = start+" 23:59:59";
	
	var data = {
		registration:{startDate:startDate,endDate:endDate},
		reception:{startDate:startDate,endDate:endDate},
		returnVisit:{startDate:startDate,endDate:endDate},
		firstVisit:{startDate:startDate,endDate:endDate}
	};
	tcCore.post({
		url:"ruleVarDS/caculateVarByCodes.ssm",
		data:{
			params:data,
			code:["registration","reception","returnVisit","firstVisit"]
		},
		success:function(data){
			var r1 = data[0].value[0].registration;
			var r2 = data[1].value[0].reception;
			var r3 = data[2].value[0].returnVisit;
			var r4 = data[3].value[0].firstVisit;
			$("#today_g").html(r1+" 人");//挂号
			$("#today_j").html(r2+" 人");//接诊
			$("#today_f").html(r3+" 人");//复诊
			$("#today_c").html(r4+" 人");//初诊
			
		}
	});
	initYesterDayCountYS();
}

function initYesterDayCountYS() {
	var yStart = getDateStr(-1);
	var yStartDate = yStart+" 00:00:00";
	var yEndDate = yStart+" 23:59:59";
	var yData = {
			registration:{startDate:yStartDate,endDate:yEndDate},
			reception:{startDate:yStartDate,endDate:yEndDate},
			returnVisit:{startDate:yStartDate,endDate:yEndDate},
			firstVisit:{startDate:yStartDate,endDate:yEndDate}
		};
		tcCore.post({
			url:"ruleVarDS/caculateVarByCodes.ssm",
			data:{
				params:yData,
				code:["registration","reception","returnVisit","firstVisit"]
			},
			success:function(data){
				var r1 = data[0].value[0].registration;
				var r2 = data[1].value[0].reception;
				var r3 = data[2].value[0].returnVisit;
				var r4 = data[3].value[0].firstVisit;
				
				$("#y_g").html(r1+" 人");//挂号
				$("#y_j").html(r2+" 人");//接诊
				$("#y_f").html(r3+" 人");//复诊
				$("#y_c").html(r4+" 人");//初诊
				
			}
		});
		initToMonthCountYS();
}

function initToMonthCountYS() {
	var start = getMonthStartDate();
	var end = getMonthEndDate();
	var startDate = start+" 00:00:00";
	var endDate = end+" 23:59:59";
	
	var data = {
		registration:{startDate:startDate,endDate:endDate},
		reception:{startDate:startDate,endDate:endDate},
		returnVisit:{startDate:startDate,endDate:endDate},
		firstVisit:{startDate:startDate,endDate:endDate}
	};
	tcCore.post({
		url:"ruleVarDS/caculateVarByCodes.ssm",
		data:{
			params:data,
			code:["registration","reception","returnVisit","firstVisit"]
		},
		success:function(data){
			
			var r1 = data[0].value[0].registration;
			var r2 = data[1].value[0].reception;
			var r3 = data[2].value[0].returnVisit;
			var r4 = data[3].value[0].firstVisit;
			
			$("#m_g").html(r1+" 人");//挂号
			$("#m_j").html(r2+" 人");//接诊
			$("#m_f").html(r3+" 人");//复诊
			$("#m_c").html(r4+" 人");//初诊
			
		}
	});	
}
// ----------------------------------end----------------------------