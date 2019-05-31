var groupAttr = {
		groupId:"",
	};
function init(){
	var data = tcCore.getTopWindowParam();
	groupAttr.groupId = data.groupId;
	$('#name').html(data.name);
	initTabs();
	//getGroup(groupAttr.groupId);
	getGroupSql(groupAttr.groupId);
}

function initTabs(){
	$('#center').tabs({
		onSelect : function(title){
			if(title == '规则'){
				$('#ceshi').css('visibility','visible');
			}
		}
	});
	
}

function getGroup(id){
	tcCore.get({
		url:"groupDS/getGroupByPk.ssm?groupId="+encodeURI(id),
		success:function(data){
			var flag = window.setInterval(function(){
				if(data != null){
					initGroup(data);
				}
				window.clearInterval(flag);
			},50);
		}
	});
}

function getGroupSql(id){
	tcCore.get({
		url:"groupSqlDS/getGroupSqlByFk.ssm?groupId="+encodeURI(id),
		success:function(data){
			var flag = window.setInterval(function(){
				if(data != null){
					initGroup(data);
					$("#cancelBtn").remove();
				}else{
					$("#deleteBtn").remove();
				}
				window.clearInterval(flag);
			},50);
		}
	});
}

function initGroup(data){
	for(var d in data){
		tcCore.setControlValue($("#"+d),data[d],data);
	}
}

/**
 * 保存sql
 */
function saveGroupSql(){
	var data = tcCore.getFormData("groupSqlForm");
	if(groupAttr.groupId){
		data.groupId = groupAttr.groupId;
	}
	tcCore.post({
		url:"groupSqlDS/saveGroupSql.ssm",
		data:{
			groupSql:data
		},
		success:function(data){
			tcCore.closeTopDialog({
				data:data,
				command:"save"
			});
		}
	});
}

/**
 * 删除sql
 */
function deleteGroupSql(){
	top.$.messager.confirm('系统提示', '确认要删除该群组人员吗', function(r) {
		if (r) {
			var sqlId = $("#sqlId").val();
			var groupId = $("#groupId").val();
			if (sqlId) {
				tcCore.post({
					url : "groupSqlDS/deleteGroupSqlByFk.ssm",
					data : {
						sqlId : sqlId,
						groupId : groupId
					},
					success : function(data) {
						tcCore.closeTopDialog({
							data : data,
							command : "delete"
						});
					}
				});
			}
		}
	});
}

/**
 * 返回
 */
function cancel() {
	tcCore.closeTopDialog();
}
$(document).ready(init);