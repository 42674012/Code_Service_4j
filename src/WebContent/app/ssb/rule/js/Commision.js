var commisionAttr={
	maxNum:100,
};


function init(){
	initZj();
}
/**
 * 确定
 */
function queding(){
	var cwpj=((1/3).toFixed(2))*100;
	var bianliang=Number($("#bianliang").val());
	if(bianliang==0||bianliang==100){
		return ;
	}else{
		$('#cnemp').slider("setValue",bianliang);
	}
	var dijianzhi=Number($("#dijianzhi").val());
	if(dijianzhi==0){
		$('#cwemp1').slider("setValue",cwpj);
		$('#cwemp2').slider("setValue",cwpj);
		$('#cwemp3').slider("setValue",cwpj);
	}else{
		var xfbl=cwpj+dijianzhi;
		if(xfbl>=100){
			$('#cwemp3').slider("setValue",100);
			$('#cwemp1').slider("setValue",0);
			$('#cwemp2').slider("setValue",0);
		}else{
			$('#cwemp3').slider("setValue",xfbl);
			if((xfbl+cwpj)>100){
				$('#cwemp2').slider("setValue",100-xfbl);
			}else{
				$('#cwemp2').slider("setValue",cwpj);
			}
			
			var yjbl=cwpj-dijianzhi;
			if(yjbl<=0){
				$('#cwemp1').slider("setValue",0);
			}else{
				$('#cwemp1').slider("setValue",yjbl);
			}
		}
	}
}
/**
 * 初始化组件
 */
function initZj(){
	tcCore.get({
		url : "ruleVarDS/getAllRuleVarList.ssm",
		success : function(data) {
			if(data){
				var html="";
				$(data).each(function(i,o){
					html+="<tr style='height: 70px;'>";
					html+="<td align='right' class='td-label' >"+o.varDesc+" </td>";
					html+="<td  >";
					html+="<input id='"+o.varCode+"' data-ssbtype='"+o.uiType+"' name ='"+o.varCode+"' >";
					html+="</td></tr>";
				});
				$("#showvarCode").html(html);

				$(data).each(function(i,o){
					if(o.uiType="slider"){
						$('#'+o.varCode).css("width","800px");
						$('#'+o.varCode).slider({
							min:0,
							max:100,
							showTip:true,
							disabled:true,
							rule: [0,'|',25,'|',50,'|',75,'|',100],
						    tipFormatter: function(value){
								return value + '%';
						    },
						    onComplete:function(value){
						    	 
						    }
						});
					}
				});
			}
			initdata();
		}
	});
	
}

function initdata(){
	tcCore.get({
		url : "regularDS/getAllRegularList.ssm",
		success : function(data) {
				if(data){
					$(data).each(function(i,o){
						if(o.qucode=="cnemp"){
							$("#bianliang").numberbox("setValue",o.quvalue*100);
						}
						tcCore.setControlValue($("#"+o.qucode),o.quvalue*100,o);
					});
				}
			}
		});
}

/**
 * 验证表单
 */
function validateForm(data){
	var msg="";
	return msg;
}

function saveGoal(){
	var data = tcCore.getFormData("goalForm");
	var rattr=[];
	if(data){
		for(var d in data){
			var regular={};
			regular.qucode=d
			regular.quvalue=data[d]/100;
			rattr.push(regular);
		}
	}
	tcCore.post({
		url:"regularDS/saveRegular.ssm",
		data:{
			regular:rattr
		},
		success:function(data){
			alert("设置成功");
		}
	});
	
}































$(document).ready(init);