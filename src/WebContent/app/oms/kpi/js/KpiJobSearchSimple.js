
function init(){
	$("#center").mCustomScrollbar({
		theme : "minimal-dark",
		scrollSpeed : 50,
		scrollInertia : 100
	});
	initGrid();
	window.jobId = tcCore.getParameter("jobId");
	setQuota(jobId);
}
/*******************************************************************************
 * 隐藏高级搜索条件
 * 
 * @returns
 */
function hideMoreCondition(){
	$("#moreConditionBtn").tooltip("hide");
}


/*******************************************************************************
 * 初始化表格
 * 
 * @returns
 */
function initGrid(){
	$('#kpiJobGrid').datagrid(
			{
				columns : [ [
						{
							field : 'varDesc',
							title : '指标',
							width : 200
						},{
							field : 'grade',
							title : '梯度',
							width : 200
						},{
							field : 'isKpi',
							title : '是否考核指标',
							width : 60,
							formatter:function(value,row,index){
								if(value==1){
									return "是";
								}else{
									return "";
								}
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
	tcCore.openWindowOnTop(context + "/app/oms/kpi/KpiEditSimple.jsp?jobId="
			+ window.jobId, null, null, function(result) {
		setQuota(window.jobId);
	},{
		width:600,
		height:500
	});
}

function editKpi() {
	// 获取当前选中
	var data = $("#kpiJobGrid").datagrid("getSelected");
	if (!data) {
		alert("请先选择一个指标项");
		return;
	}
	tcCore.openWindowOnTop(context + "/app/oms/kpi/KpiEditSimple.jsp?jobId="
			+ window.jobId+"&varId="+data.varId, data, null, function(result) {
		// 关闭窗口的回调
		setQuota(window.jobId);
	});
}

function deleteKpi(){
	var data = $("#kpiJobGrid").datagrid("getSelected");
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


function setQuota(jobId) {
	tcCore.post({
		url : "jobQuotaDS/getByJobId.ssm",
		data : {
			jobId : jobId
		},
		success : function(data) {
			$("#kpiJobGrid").datagrid('loadData', data);
		}
	});
}

$(document).ready(init);
