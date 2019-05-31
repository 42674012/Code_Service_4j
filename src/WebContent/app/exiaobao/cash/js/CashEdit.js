
var cashAttr = {
		cashid:"",
		initControlCount:1,
	};

function init(){
	$("#center").mCustomScrollbar({
		theme : "minimal-dark",
		scrollSpeed : 50,
		scrollInertia : 100
	});
	var dialogId =  tcCore.getParameter("dialogId");
	if(!dialogId){
		//判断是否为窗口打开，如果被打开，隐藏form的头，border
		$("#cashFormPanel").panel({
			iconCls:"icon-form-edit"
		});
	}
	initControls();
	cashAttr.cashid = tcCore.getParameter("cashid");
	if(cashAttr.cashid){
		getCash(cashAttr.cashid);
		$("#cancelBtn").remove();
	}else{
		$("#deleteBtn").remove();
	}
	
}


function initControls(){
	if(!cashAttr.cashid){
		$("#createdate").datebox('setValue',new Date().format("yyyy-MMM-dd"));
	}
	sectionClick();
}
/**
 * 根据医院选择人员
 * @param id
 */
function sectionClick(){
	tcCore.get({
		url:"empofhospitalDS/queryUserByorgid.ssm",
		success:function(data){
			data.unshift({
				'employeeId' : '',
				'employeeName' : '- - - 请选择 - - -'
			});
			$("#employeeId").combobox("loadData", data);
			cashAttr.initControlCount--;
		}
	});
}
/**
 * 选择人员查询银行账户
 * @param rec
 */
function empClick(rec){
	if(rec.bankAccount){
		$("#bankAccount").textbox("setValue",rec.bankAccount);
	}
}


/**
 * 根据id查询
 */
function getCash(id){
	tcCore.get({
		url:"cashDS/getCashByPk.ssm?cashid="+encodeURI(id),
		success:function(data){
			var flag = window.setInterval(function(){
				if(cashAttr.initControlCount==0){
					initCash(data);
				}
				window.clearInterval(flag);
			},50);
		}
	});
}


function initCash(data){
	for(var d in data){
		if(d==="orgid"){
			tcCore.get({
				url:"empofhospitalDS/queryUserByorgid.ssm",
				success:function(datas){
					datas.unshift({
						'employeeId' : '',
						'employeeName' : '- - - 请选择 - - -'
					});
					$("#employeeId").combobox("loadData", datas);
					
					$("#employeeId").combobox("setValue", data.employeeId);
				}
			});
		}else{
			tcCore.setControlValue($("#"+d),data[d]);
		}
		
	}
}

/**
 * 验证表单
 */
function validateForm(data){
	var msg="";
	if(data.employeeId===""||data.employeeId==null){
		msg+="请选择提现人员 !  \n ";
	}
	if(data.bankAccount===""||data.bankAccount==null){
		msg+="用户提现账户不能空!  \n";
	}
	if(data.tmoney===""||data.tmoney==null){
		msg+="结款金额不能为空值 ! \n";
	}
	return msg;
}

function saveCash(){
	var data = tcCore.getFormData("cashForm");
	var msg=validateForm(data);
	if(msg!=""){
		alert(msg);
		return ;
	}
	if(cashAttr.cashid){
		data.cashid = cashAttr.cashid;
	}else {
		//校验该月钱已结算
	}
	
	tcCore.post({
		url:"cashDS/saveCash.ssm",
		data:{
			cash:data
		},
		success:function(data){
			tcCore.closeTopDialog({
				data:data,
				command:"save"
			});
		}
	});
	
}

function deleteCash(){
	 top.$.messager.confirm('系统提示', '确认要删除该cash信息吗', function(r){
         if (r){
             if(cashAttr.cashid){
            	 tcCore.post({
              		url:"cashDS/deleteCashByPk.ssm",
              		data:{
              			cashid:cashAttr.cashid
              		},
              		success:function(data){
              			tcCore.closeTopDialog({
              				data:data,
              				command:"save"
              			});
              		}
              	}); 
             }
         }
     });
	
}

function cancel(){
	tcCore.closeTopDialog();
}




$(document).ready(init);
