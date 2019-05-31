var jobRoleAttr = {
		jobroleId:"",
		parentId:"",
		code : '',
		parentName : ''
	};

function init(){
	
	var dialogId =  tcCore.getParameter("dialogId");
	if(!dialogId){
		//判断是否为窗口打开，如果被打开，隐藏form的头，border
		$("#jobRoleFormPanel").panel({
			iconCls:"icon-form-edit"
		});
	}
	initControl();
	var data = tcCore.getTopWindowParam();
	$("#parentId").val(data.jobroleId);
	$('#code').val(data.newCode);
	$('#parentName').val(data.jobroleName);
	/*if(data){
		$("#parentId").val(data.jobroleId);
		var parentName = null;
		if(data.parentName!=null&&data.parentName==""){
			parentName = data.name;
		}else{
			parentName = data.name+"-"+data.parentName;
		}
		
		$("#parentName").html(parentName);
	}else{
		$("#parentId").val(0);
		$('#code').val('000');
	}*/
	
}

function initControl(){
	$("#orgIdShow").autocomplete('orgDS/queryAutoComplete.ssm', {
		dataType : "json",
		parse : function(data) {
			return $.map(data, function(item) {
				return {
					data : item,
					name : item.name
				}
			});
		},
		scrollHeight: 140,
		matchContains : true,
		max : 1000,
		cacheLength : 1,
		formatItem : function(item) {
			$("#orgId").val(null);
			return item.name;
		},
		formatMatch : function(item) {
		}
	}).result(function(e, item) {
		$("#orgIdShow").val(item.name);
		$("#orgId").val(item.orgId);
	});
	
	
//	$("#quota").combogrid({
//		url:"ruleVarDS/getAllNewRuleVarList.ssm",
//		idField : 'id',
//		textField : 'varDesc',
//		panelHeight : 180,
//		panelWidth: 240,
//		multiple:true,
//		editable : false,
//		//checkbox : true,
//		//frozenColumns:[[{field:'id',checkbox:true,width:30}]],
//		columns:[[ 	 {field:'id',checkbox:true},
//			         {field:'varDesc',title:'名称',width:200},
//					 {field:'varCode',title:'code',hidden:true}
//			      ]],
//		onLoadSuccess:function(data){
//			$("#quota").combogrid('setText','请选择');
//		}
//	});
}

function getJobRole(id){
	tcCore.get({
		url:"jobRoleDS/getJobRoleByPk.ssm?jobroleId="+encodeURI(id),
		success:function(data){
			initJobRole(data);
		}
	});
}


function initJobRole(data){
	for(var d in data){
		tcCore.setControlValue($("#"+d),data[d]);
	}
}

function saveJobRole(){
	var data = tcCore.getFormData("jobRoleForm");
	if(data.jobroleId == ""){
		data.jobroleId = null;
	}
	var isValid = $('#jobRoleForm').form('validate');
	if(!isValid){
		$.messager.alert('提示','请完善信息!','warning');
		return false;
	}
	data.parentName = $("#parentName").html();
	tcCore.post({
		url:"jobRoleDS/saveJobRole.ssm",
		data:{
			jobRole:data
		},
		success:function(data){
			tcCore.closeTopDialog({
				data:data,
				command:"save"
			});
		}
	});
	
}

function deleteJobRole(){
	 top.$.messager.confirm('系统提示', '确认要删除该职务信息吗', function(r){
         if (r){
             if(jobRoleAttr.jobroleId){
            	 tcCore.post({
              		url:"jobRoleDS/deleteJobRoleByPk.ssm",
              		data:{
              			jobroleId:jobRoleAttr.jobroleId
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
