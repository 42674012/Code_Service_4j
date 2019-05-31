var kpiAttr = {
	kpiId : "",
	initControlCount : 1,
	itemFlag : false
};

function init() {
	$("#center").mCustomScrollbar({
		theme : "minimal-dark",
		scrollSpeed : 50,
		scrollInertia : 100
	});
	initControls();
	initGrid();
	var noedit = tcCore.getParameter("noedit");
	if (noedit=='1') {
		$("#deleteBtn").remove();
		$("#addBtn").remove();
	} else {
		$("#cancelBtn").remove();
	}
	getKpi();
}

function initControls() {
	tcCore.get({
		url : "ruleVarDS/getAllRuleVarList.ssm",
		success : function(data) {
			$("#varId").combobox("loadData", data);
			$("#varId").combobox("setValue", tcCore.getParameter("varId"));
		}
	});
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
						title:"提成梯度列表",
						columns : [ [
								{
									field : 'kpiThreshold',
									title : '梯度值',
									width : 100,
									editor : {
										type : 'numberbox',
									}
								},
								{
									field : 'kpiRatio',
									title : '比例',
									width : 100,
									editor : {
										type : 'textbox'
									}
								},
								{
									field : 'kpiInput',
									title : '基数',
									width : 100,
									editor : {
										type : 'textbox'
									}
								}] ],
						width : "100%",
						headerCls : "gridHeaderCls",
						iconCls : "icon-grid",
						striped : true,
						singleSelect : true,
						rownumbers : true,
						fitColumns : true,
						// pagination:true,
						checkOnSelect : true,
						toolbar: getGridToolbar()
					});
}


function getGridToolbar() {
	var noedit = tcCore.getParameter("noedit");
	if(noedit=="1"){
		return [];
	}
	return [ {
		iconCls : 'icon-grid-add',
		text : "新增",
		handler : function() {
			addItem();
		}
	}, '-', {
		iconCls : 'icon-grid-edit',
		text : "修改",
		handler : function() {
			editItem();
		}
	}, '-', {
		iconCls : 'icon-save',
		text : "保存",
		handler : function() {
			saveChange();
		}
	},'-', {
		iconCls : 'icon-remove',
		text : "删除",
		handler : function() {
			removeit();
		}
	} ];
}

/**
 * 增加消费清单项目
 */
function addItem() {
	saveChange();
	$('#kpiGradeGrid').datagrid('appendRow', {});
	editIndex = $('#kpiGradeGrid').datagrid('getRows').length - 1;
	$('#kpiGradeGrid').datagrid('selectRow', editIndex).datagrid('beginEdit',
			editIndex);
}

/**
 * 增加消费清单项目
 */
function editItem(index) {
	saveChange();
	$('#kpiGradeGrid').datagrid('acceptChanges');
	var data = $('#kpiGradeGrid').datagrid('getSelected');
	if(!data){
		alert("请选择一条记录");
		return;
	}
	var index = $('#kpiGradeGrid').datagrid('getRowIndex',data); 
	$('#kpiGradeGrid').datagrid('beginEdit', index);
}
var editIndex = undefined;

function saveChange(){
	$('#kpiGradeGrid').datagrid('acceptChanges');
}

/**
 * 清单项取消
 */
function removeit() {
	var data = $('#kpiGradeGrid').datagrid('getSelected');
	if(!data){
		alert("请选择一条记录");
		return;
	}
	var index = $('#kpiGradeGrid').datagrid('getRowIndex',data); 
	$('#kpiGradeGrid').datagrid('deleteRow', index);
}

function getKpi() {
	tcCore.get({
		url : "kpiGradeDS/getByJobId$varId.ssm?jobId=" +tcCore.getParameter("jobId")+"&varId="+tcCore.getParameter("varId"),
		success : function(data) {
			$('#kpiGradeGrid').datagrid('loadData', data);
		}
	});

}

function initKpi(data) {
	for ( var d in data) {
		tcCore.setControlValue($("#" + d), data[d], data);
	}
}

function saveKpi() {
	var data = tcCore.getFormData("kpiForm");
	saveChange();
	var gradeData = $('#kpiGradeGrid').datagrid("getData");
	if (gradeData == null) {
		gradeData = {};
	}
	if (!data.varId) {
		alert("请选择变量");
		return;
	}
	tcCore.post({
		url : "jobQuotaDS/saveKpiGradeList.ssm",
		data : {
			jobRoleId : tcCore.getParameter("jobId"),
			jobQuota : data,
			gradeList : gradeData.rows
		},
		success : function(data) {
			tcCore.closeTopDialog({
				data : data,
				command : "save"
			});
		}
	});

}

function deleteKpi() {
	top.$.messager.confirm('系统提示', '确认要删除该kpi信息吗', function(r) {
		if (r) {
			if (kpiAttr.kpiId) {
				tcCore.post({
					url : "kpiDS/deleteKpiByPk.ssm",
					data : {
						kpiId : kpiAttr.kpiId
					},
					success : function(data) {
						tcCore.closeTopDialog({
							data : data,
							command : "save"
						});
					}
				});
			}
		}
	});

}

function cancel() {
	tcCore.closeTopDialog();
}

$(document).ready(init);
