var jobRoleAttr = {
	jobroleId : "",
	code : '',
	parentId : '',
	parentName : ''
};

function init() {
	$("#west").mCustomScrollbar({
		theme : "minimal-dark",
		scrollSpeed : 50,
		scrollInertia : 100
	});
	$("#center").mCustomScrollbar({
		theme : "minimal-dark",
		scrollSpeed : 50,
		scrollInertia : 100
	});
	initJobRoleTree();
	getJobRole(0);
	initControl();
	initGrid();
}

function initControl() {
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
	// $("#quota").combogrid({
	// url:"ruleVarDS/getAllNewRuleVarList.ssm",
	// idField : 'id',
	// textField : 'varDesc',
	// panelHeight : 180,
	// panelWidth: 240,
	// multiple:true,
	// editable : false,
	// //checkbox : true,
	// //frozenColumns:[[{field:'id',checkbox:true,width:30}]],
	// columns:[[ {field:'id',checkbox:true},
	// {field:'varDesc',title:'名称',width:200},
	// {field:'varCode',title:'code',hidden:true}
	// ]],
	// onLoadSuccess:function(data){
	// $("#quota").combogrid('setText','请选择');
	// }
	// });

}

function getJobRole(parentId, async) {
	tcCore.get({
		async : async,
		url : "jobRoleDS/getJobRoleTree.ssm",
		success : function(data) {
			if (jobRoleAttr.expendId == null || jobRoleAttr.expendId == "") {
				$("#jobRoleTree").treegrid("loadData", data);
			} else {
				$("#jobRoleTree").treegrid("append", {
					parent : jobRoleAttr.expendId,
					data : data
				});
			}
		}
	});
	// 一次性加载所有
	// tcCore.get({
	// url : "jobRoleDS/getJobRoleTree.ssm?noDisable=0",
	// success : function(data) {
	// $("#jobRoleTree").treegrid("loadData", data);
	// }
	// });
}

function initJobRoleTree() {
	$("#jobRoleTree").treegrid({
		title : "职务列表",
		toolbar : getToolbar(),
		idField : 'jobroleId',
		collapsible : true,
		treeField : 'jobroleName',
		fitColumns : true,
		iconCls : "icon-grid",
		headerCls : "gridHeaderCls",
		showHeader : false,
		columns : [ [ {
			title : '名称',
			field : 'jobroleName',
			width : 180
		} ] ],
		onClickRow : function(row) {
			// 设置控件值
			for ( var d in row) {
				tcCore.setControlValue($("#" + d), row[d]);
			}
			
			tcCore.post({
				url : "orgDS/getOrgByPk.ssm",
				data : {
					orgId : row.orgId
				},
				success : function(data) {
					$("#orgIdShow").val(data.name);
				}
			});
			
			setQuota(row.jobroleId);

		},
		/*
		 * //一次性加载所有的时候该方法屏蔽 onBeforeExpand:function(row){ jobRoleAttr.expendId =
		 * row.jobroleId; if(!row.opened){ row.opened = true;
		 * getJobRole(jobRoleAttr.expendId,false); } },
		 */
		onLoadSuccess : function(row) {
			$(this).treegrid('enableDnd', row ? row.id : null);
		}
	});
}

function getToolbar() {
	return [ {
		iconCls : 'icon-grid-add',
		text : "新增子级",
		handler : function() {
			addSub();
		}
	}, '-', {
		iconCls : 'icon-grid-edit',
		text : "新增同级",
		handler : function() {
			addSameLevel();
		}
	}];
}

/*******************************************************************************
 * 添加子集
 */
function addSub() {
	// 获取当前选中
	var newCode = '';
	var data = $("#jobRoleTree").treegrid("getSelected");
	if(!data){
		$.messager.alert('提示','请选择一个职务!','info');
		return false;
	}
	newCode = numFormat(data.childrenCount + '', data.code);
	/*if (data.children) {
		newCode = numFormat(data.childrenCount + '', data.code);
	} else {
		newCode = numFormat('0', data.code);
	}*/
	// var codeSource = [{'newCode': newCode}];
	//data['newCode'] = newCode;
	data['newCode'] = numFormat(data.childrenCount + '', data.code);
	/*
	 * var data1 = $('#orgTree').treegrid('getChildren',data.orgId);
	 * data.push({'childrenCount': data1.length});
	 */
	tcCore.openWindowOnTop("JobRoleTreeEdit.jsp", data, null, function(result) {
		// 关闭窗口的回调
		var data1 = $("#jobRoleTree").treegrid("getSelected");
		var parentId = null;
		if (!data1) {
			parentId = 0;
		} else {
			parentId = data1.jobroleId;
		}
		// 如果父节点已经打开过，附加数据,再打开
		$("#jobRoleTree").treegrid("append", {
			parent : parentId,
			data : [ result.data ]
		});
		$("#jobRoleTree").treegrid("expand", parentId);
	}, {
		width : 500,
		height : 300
	});
}

/*******************************************************************************
 * 添加同级
 */
function addSameLevel() {
	// 获取当前选中
	var newCode = '';
	var data = tcCore.getSelectParent("jobRoleTree");
	if (data) {
		/*var d = data.children;
		newCode = numFormat(d.length + '', data.code);
		data['newCode'] = newCode;*/
		data['newCode'] = numFormat(data.childrenCount + '', data.code);
	} else {
		var rootData = $('#jobRoleTree').treegrid('getRoot');
		if (rootData) {
			newCode = numFormat(rootData.rootCount + '', null);
		} else {
			newCode = numFormat(0 + '', null);
		}
		data = {
			'newCode' : newCode,
			'parentId' : 0
		};
	}
	tcCore.openWindowOnTop("JobRoleTreeEdit.jsp", data, null, function(result) {
		// 关闭窗口的回调
		var data1 = tcCore.getSelectParent("jobRoleTree");

		var parentId = null;
		if (!data1) {
			parentId = 0;
		} else {
			parentId = data1.jobroleId;
		}
		$("#jobRoleTree").treegrid("append", {
			parent : parentId, // the node has a 'id' value that defined
			data : [ result.data ]
		});
	}, {
		width : 500,
		height : 300
	});
}

tcCore.getSelectParent = function(id) {
	var data = $("#" + id).treegrid("getSelected");
	if (data) {
		data = $("#jobRoleTree").treegrid("getParent", data.jobroleId);
	}
	return data;
}

function initJobRole(data) {
	for ( var d in data) {
		tcCore.setControlValue($("#" + d), data[d]);
	}
}

/*******************************************************************************
 * 保存职务
 */
function saveJobRole() {
	var sdata = $("#jobRoleTree").treegrid("getSelected");
	if (!sdata) {
		alert("请先选择一个菜单节点");
		return;
	}

	var isValid = $('#jobRoleForm').form('validate');
	if (!isValid) {
		$.messager.alert('提示', '请完善信息!', 'warning');
		return false;
	}
	var data = tcCore.getFormData("jobRoleForm");

	tcCore.post({
		url : "jobRoleDS/saveJobRole.ssm",
		data : {
			jobRole : data
		// rows : getquota()
		},
		success : function(data) {
			data.children = sdata.children;
			data.state = sdata.state;
			// 更新界面上的节点
			$('#jobRoleTree').treegrid('update', {
				id : data.jobroleId,
				row : data
			});
		}
	});

}

function deleteJobRole() {
	var sdata = $("#jobRoleTree").treegrid("getSelected");
	if(sdata.children!=null&&sdata.children.length>0){
		alert("请先删除下级职务");
		return;
	}
	top.$.messager.confirm('系统提示', '确认要删除该职务信息吗', function(r) {
		if (r) {
			var jobroleId = $("#jobroleId").val();
			if (jobroleId) {
				tcCore.post({
					url : "jobRoleDS/deleteJobRoleByPk.ssm",
					data : {
						jobroleId : jobroleId
					},
					success : function(data) {
						$('#jobRoleTree').treegrid('remove', jobroleId);
						$('#jobRoleForm input').val('');
					}
				});
			}
		}
	});

}

function getquota() {
	var grid = $("#quota").combogrid('grid');
	var rows = grid.datagrid('getSelections');
	return rows;
}

function setQuota(jobId) {
	tcCore.post({
		url : "jobQuotaDS/getByJobId.ssm",
		data : {
			jobId : jobId
		},
		success : function(data) {
			$("#kpiGradeGrid").datagrid('loadData', data);
		}
	});
}

function cancel() {
	tcCore.closeTopDialog();
}

function numFormat(value, parentCode) {
	var str = value;
	if (parentCode) {
		for (var i = 0; i < 2 - value.length; i++) {
			str = '0' + str;
		}
		str = parentCode + str;
	} else {
		for (var i = 0; i < 2 - value.length; i++) {
			str = '0' + str;
		}
	}
	return str;
}

/*******************************************************************************
 * 初始化表格
 * 
 * @returns
 */
function initGrid() {
	$('#kpiGradeGrid')
			.datagrid(
					{
						title : "指标与提成",
						columns : [ [
								{
									field : 'varDesc',
									title : '指标',
									width : 200
								},
								{
									field : 'operation_custom',
									title : '操作',
									width : 60,
									align : "center",
									formatter : function(value, row, index) {
										return "";
									}
								} ] ],
						width : "100%",
						headerCls : "gridHeaderCls",
						iconCls : "icon-grid",
						striped : true,
						singleSelect : true,
						rownumbers : true,
						fitColumns : true,
						// pagination:true,
						checkOnSelect : true,
						toolbar : getKpibar()
					});
}

function getKpibar() {
	return [ {
		iconCls : 'icon-grid-add',
		text : "新增",
		handler : function() {
			addKpi();
		}
	}, '-', {
		iconCls : 'icon-grid-edit',
		text : "修改",
		handler : function() {
			editKpi();
		}
	}, '-', {
		iconCls : 'icon-remove',
		text : "删除",
		handler : function() {
			deleteKpi();
		}
	} ];
}

function addKpi() {
	// 获取当前选中
	var sdata = $("#jobRoleTree").treegrid("getSelected");
	if (!sdata) {
		alert("请先选择一个菜单节点");
		return;
	}

	tcCore.openWindowOnTop(context + "/app/oms/kpi/KpiEdit.jsp?jobId="
			+ sdata.jobroleId, sdata, null, function(result) {
		// 关闭窗口的回调
		var sdata = $("#jobRoleTree").treegrid("getSelected");
		setQuota(sdata.jobroleId);
	});
}

function editKpi() {
	// 获取当前选中
	var sdata = $("#jobRoleTree").treegrid("getSelected");
	if (!sdata) {
		alert("请先选择一个菜单节点");
		return;
	}
	
	var data = $("#kpiGradeGrid").datagrid("getSelected");
	if (!data) {
		alert("请先选择一个指标项");
		return;
	}
	tcCore.openWindowOnTop(context + "/app/oms/kpi/KpiEdit.jsp?jobId="
			+ sdata.jobroleId+"&varId="+data.varId, sdata, null, function(result) {
		// 关闭窗口的回调
		var sdata = $("#jobRoleTree").treegrid("getSelected");
		setQuota(sdata.jobroleId);
	});
}

function deleteKpi(){
	var data = $("#kpiGradeGrid").datagrid("getSelected");
	if (!data) {
		alert("请先选择一个指标项");
		return;
	}
	tcCore.post({
		url : "jobQuotaDS/deleteJobQuotaByPk.ssm",
		data : {
			jqId : data.jqId
		},
		success : function(data) {
			var sdata = $("#jobRoleTree").treegrid("getSelected");
			setQuota(sdata.jobroleId);
		}
	});
}

$(document).ready(init);
