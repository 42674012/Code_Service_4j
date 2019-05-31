/**
 * 今日汇总
 */
function initTodayCount() {
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
}

function initYesterDayCount() {
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
}

function initToMonthCount() {
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
