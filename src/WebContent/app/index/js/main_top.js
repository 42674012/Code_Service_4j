

var targArr = function(data) {
	if(data) {
		$(data).each(function(i,o) {
		});
	}
	return;
}

function initTopSlider() {
	
	//时间 在controls.js 里面
	var title = "挂号目标:,接诊目标:,复诊目标:";
	var targArr = "0/未设定,0/未设定,0/未设定";//没有 为未设定
	var start = getMonthStartDate();
	var end = getMonthEndDate();
	
	var targMonth = start.substring(0,7);
	var code = ["registration","reception","returnVisit"];
	var targ = {
			month:targMonth,
			employeeId:_id
		};
	var registration="未设定",reception="未设定",returnVisit = "未设定";
	tcCore.post({
		url:"kpiGoalDS/getPreGoal.ssm",
		data:{
			params:targ
		},
		success:function(data){
			if(data&&data.length>0) {
				var tt = {};
				$(code).each(function(i,o){
					a:
					for (var int = 0; int < data.length; int++) {
						if(data[int].varCode==o) {
							tt[o] = data[int].specificationsValue;
							break a;
						}
					}
				});
				registration = (tt.registration==undefined?"未设定":tt.registration);
				reception = (tt.reception==undefined?"未设定":tt.reception);
				returnVisit = (tt.returnVisit==undefined?"未设定":tt.returnVisit);
				targArr = "0/"+registration+",0/"+reception+",0/"+returnVisit;
			}
			mainAtrr.Target.registration = registration;
			mainAtrr.Target.reception = reception;
			mainAtrr.Target.returnVisit = returnVisit;
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
	var registration = mainAtrr.Target.registration;
	var reception = mainAtrr.Target.reception;
	var returnVisit = mainAtrr.Target.returnVisit;
	
	var start = getMonthStartDate();
	var end = getMonthEndDate();
	var startDate = start+" 00:00:00";
	var endDate = end+" 23:59:59";
	var data = {
		registration:{startDate:startDate,endDate:endDate},
		reception:{startDate:startDate,endDate:endDate},
		returnVisit:{startDate:startDate,endDate:endDate},
		notDiagnosis:{startDate:startDate,endDate:endDate,startDate:startDate,endDate:endDate}
	};
	tcCore.post({
		url:"ruleVarDS/caculateVarByCodes.ssm",
		data:{
			params:data,
			code:["registration","reception","returnVisit","notDiagnosis"]
		},
		success:function(data){
			var r1 = (data[0].value[0].registration/registration)*100;
			var r2 = (data[1].value[0].reception/reception)*100;
			var r3 = (data[2].value[0].returnVisit/returnVisit)*100;
			
			if(isNaN(r1)||r1==undefined) 
				r1=0;
			if(isNaN(r2)||r1==undefined) 
				r2=0;
			if(isNaN(r3)||r1==undefined) 
				r3=0;
			
			var sld = r1+"%,"+r2+"%,"+r3+"%";
			var slider = sld.split(",");
			var alrArr = "(完成率:"+(r1>100?100:r1)+"%),(完成率:"+(r2>100?100:r2)+"%),(完成率:"+(r3>100?100:r3)+"%)";
			var tar = data[0].value[0].registration+"/"+registration+","+data[1].value[0].reception+"/"+reception+","+data[2].value[0].returnVisit+"/"+returnVisit;
			var targ = tar.split(",");
			var alr = alrArr.split(",");
			$("#mySlider").jxSlider("setValue",slider);
			$("#mySlider").jxSlider("setTargValue",targ);
			$("#mySlider").jxSlider("setAlrValue",alr);
			var jzl;
			var fzl;
			if(data[0].value[0].registration==0) {
				jzl = 0;
				fzl = 0;
			}else{
				jzl = (parseInt(data[1].value[0].reception)/parseInt(data[0].value[0].registration))*100;
				fzl = (data[2].value[0].returnVisit/data[0].value[0].registration)*100;
				
				fzl= fzl.toFixed(2);
				jzl = jzl.toFixed(2);
				jzl = jzl>100?100:jzl;
				fzl = fzl>100?100:fzl;
				if(isNaN(fzl)||fzl==undefined) {
					fzl = 0;
				}
				if(isNaN(jzl)||jzl==undefined) {
					jzl = 0;
				}
			}
			var dzl = (parseFloat(data[3].value[0].notDiagnosis))*100;
			dzl = dzl.toFixed(2);
			dzl = dzl>100?100:dzl;
			if(isNaN(dzl)||dzl==undefined) {
				dzl = 0;
			}
			$("#receptionRate").attr("data-text","接诊率  "+(jzl==0?"0":jzl+"%"));
			$("#receptionRate").attr("data-percent",jzl);
			
			$("#reReception").attr("data-text","复诊率  "+(fzl==0?"0":fzl+"%"));
			$("#reReception").attr("data-percent",fzl);
			
			$("#notDiagnosis").attr("data-text","断诊率 "+(dzl==0?"0":dzl+"%"));
			$("#notDiagnosis").attr("data-percent",dzl);
			
			$('#receptionRate').circliful();
			$('#reReception').circliful();
			$('#notDiagnosis').circliful();
			
			
			var pwx = $('#notDiagnosis').parent().parent().width();
			var myWX = $('#notDiagnosis').width();
			var px = ((pwx - myWX*3)/3);
			//$('#notDiagnosis').parent().css("margin-left",px+"px");
		}
	});
}