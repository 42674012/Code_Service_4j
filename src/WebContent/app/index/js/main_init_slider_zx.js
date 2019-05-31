
//loadJs("/scripts/ubbeditor.js", function(){UBBEditor.Create("posttext");});

/**
 * 报表初始化
 */
function initTopSlider() {
	initSliderSamle1();
	//时间 在controls.js 里面 方法   getMonthStartDate
//	var arr = "挂号目标:,接诊目标:,复诊目标:,业绩目标:,单体目标:";
	
}
function initSliderSamle1() {
	var start = getMonthStartDate();
	var end = getMonthEndDate();
	
	var targMonth = start.substring(0,7);
	var title = "咨询目标:,预约目标:,到诊目标:";
	
	var targArr = "0/未设定,0/未设定,0/未设定";//没有 为未设定
	var adviceNum="未设定",appointmentNum="未设定",checkHomeNum = "未设定";
	
	var targ = {
		month:targMonth,
		employeeId:_id
	};
	tcCore.post({
		url:"kpiGoalDS/getPreGoal.ssm",
		data:{
			params:targ
		},
		success:function(data){
			console.info("目标接口取值",data);
			if(data&&data.length>0) {
				adviceNum = ((data[0].specificationsValue==null||data[1].specificationsValue=="undefined")?"未设定":data[0].specificationsValue);
				appointmentNum = ((data[1].specificationsValue==null||data[1].specificationsValue=="undefined")?"未设定":data[1].specificationsValue);
				checkHomeNum = ((data[2].specificationsValue==null||data[1].specificationsValue=="undefined")?"未设定":data[2].specificationsValue);
				targArr = "0/"+adviceNum+",0/"+appointmentNum+",0/"+checkHomeNum;
			}
			mainAtrr.Target.adviceNum = adviceNum;
			mainAtrr.Target.appointmentNum = appointmentNum;
			mainAtrr.Target.checkHomeNum = checkHomeNum;
			targArr = targArr.split(",");
			title = title.split(",");
			$("#mySlider").jxSlider({
				width:240,
				height:14,
				sliders:3,
				title:title,
				targ:targArr
			});
			initTopSliderSample();
		}
	});
}
/**
 * slider 副本
 */
function initTopSliderSample() {
	var adviceNum = mainAtrr.Target.adviceNum;
	var appointmentNum = mainAtrr.Target.appointmentNum;
	var checkHomeNum = mainAtrr.Target.checkHomeNum;
	console.info("测试",adviceNum,appointmentNum,checkHomeNum);
	var start = getMonthStartDate();
	var end = getMonthEndDate();
	var startDate = start+" 00:00:00";
	var endDate = end+" 23:59:59";
	var data = {
		startDate:startDate,
		endDate:endDate
	};
	tcCore.post({
		url:"ruleVarDS/caculateVarByCodes.ssm",
		data:{
			params:data,
			code:["adviceNum","appointmentNum","checkHomeNum","tdCallbacked","tdCameCheck","adviceToAppointment","appointmentToCheck","appointmentTolost"]
		},
		success:function(data){
			//目标展示
			var r1 = (data[0].value[0].adviceNum/adviceNum)*100;
			var r2 = (data[1].value[0].appointmentNum/appointmentNum)*100;
			var r3 = (data[2].value[0].checkHomeNum/checkHomeNum)*100;
			var sld = r1+"%,"+r2+"%,"+r3+"%";
			console.log(sld);
			var slider = sld.split(",");
			var tar = data[0].value[0].adviceNum+"/"+adviceNum+","+data[1].value[0].appointmentNum+"/"+appointmentNum+","+data[2].value[0].checkHomeNum+"/"+checkHomeNum;
			var targ = tar.split(",");
			console.info("setValue",targ);
			$("#mySlider").jxSlider("setValue",slider);
			$("#mySlider").jxSlider("setTargValue",targ);
			
			//几率展示
			var adviceToAppointment = data[5].value[0].adviceToAppointment+"";
			var appointmentToCheck = data[6].value[0].appointmentToCheck+"";
			var appointmentTolost = data[7].value[0].appointmentTolost+"";
			if(adviceToAppointment) {//咨询转预约
				adviceToAppointment = parseFloat(adviceToAppointment*100).toFixed(2);
			}else{
				adviceToAppointment = 0;
			}
			if(appointmentToCheck) {
				appointmentToCheck = parseFloat(appointmentToCheck*100).toFixed(2);
			}else{
				appointmentToCheck=0;
			}
			if(appointmentTolost) {
				appointmentTolost = parseFloat(appointmentTolost*100).toFixed(2);
			}else{
				appointmentTolost=0;
			}
			$("#receptionRate").attr("data-text","咨询转预约  "+adviceToAppointment+"%");
			$("#receptionRate").attr("data-percent",adviceToAppointment);
			
			$("#reReception").attr("data-text","预约转到诊  "+appointmentToCheck+"%");
			$("#reReception").attr("data-percent",appointmentToCheck);
			
			$("#notDiagnosis").attr("data-text","预约流失率 "+appointmentTolost+"%");
			$("#notDiagnosis").attr("data-percent",appointmentTolost);
			$('#receptionRate').circliful();
			$('#reReception').circliful();
			$('#notDiagnosis').circliful();
			
			//今日汇总数据展示
			var tdCallbacked = data[3].value[0].tdCallbacked;
			$("#today_finish_wait").html(tdCallbacked+" 人");
			var tdCameCheck = data[4].value[0].tdCameCheck;
			$("#today_already_come").html(tdCameCheck+" 人");
		}
	});
}

function getJob() {
	tcCore.post({
		url:"employeeJobDS/getJobName.ssm",
		success:function(data){
			console.info("角色",data);
			return data;
		}
	});
}