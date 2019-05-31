
var empowerAttr = {
		empowerId:"",
		initControlCount:2
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
		$("#empowerFormPanel").panel({
			iconCls:"icon-form-edit"
		});
	}
	initControls();
	empowerAttr.empowerId = tcCore.getParameter("empowerId");
	if(empowerAttr.empowerId){
		$("#cancelBtn").remove();
	}else{
		$("#deleteBtn").remove();
	}
	getEmpower(empowerAttr.empowerId);
}


function initControls(){
	
	       		 $("#groupId").autocomplete('employeeDS/queryAutoComplete.ssm', {
					dataType: "json",
					parse: function(data) {
						return $.map(data, function(item) {
							return {data: item,name: item.name}
						});
					},matchContains:true,max:1000,cacheLength:1,
					formatItem: function(item) {
						return item.name;
					},
					formatMatch:function (item){
					}
				}).result(function(e, item) {
					$("#groupIdShow").val(item.name+"/"+item.loginName);
					$("#groupId").val(item.employeeId);
				});
		    	tcCore.get({
		    		url:"dictDS/getDictByDictTypeCode.ssm?dictTypeCode=",
		    		success:function(data){
		    			$("#type").combobox("loadData",data);
		    			empowerAttr.initControlCount--;
		    		}
		    	});
}

function getEmpower(id){
	tcCore.get({
		url:"empowerDS/getEmpowerByPk.ssm?empowerId="+encodeURI(id),
		success:function(data){
			var flag = window.setInterval(function(){
				if(empowerAttr.initControlCount==0){
					initEmpower(data);
				}
				window.clearInterval(flag);
			},50);
		}
	});
}


function initEmpower(data){
	for(var d in data){
		tcCore.setControlValue($("#"+d),data[d],data);
	}
}

function saveEmpower(){
	var data = tcCore.getFormData("empowerForm");
	if(empowerAttr.empowerId){
		data.empowerId = empowerAttr.empowerId;
	}
	tcCore.post({
		url:"empowerDS/saveEmpower.ssm",
		data:{
			empower:data
		},
		success:function(data){
			tcCore.closeTopDialog({
				data:data,
				command:"save"
			});
		}
	});
	
}

function deleteEmpower(){
	 top.$.messager.confirm('系统提示', '确认要删除该empower信息吗', function(r){
         if (r){
             if(empowerAttr.empowerId){
            	 tcCore.post({
              		url:"empowerDS/deleteEmpowerByPk.ssm",
              		data:{
              			empowerId:empowerAttr.empowerId
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
