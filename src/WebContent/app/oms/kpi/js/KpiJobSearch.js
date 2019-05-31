
function init(){
	$("#center").mCustomScrollbar({
		theme : "minimal-dark",
		scrollSpeed : 50,
		scrollInertia : 100
	});
	initGrid();
	var jobId = tcCore.getParameter("jobId");
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
				title : "指标与提成",
				columns : [ [
						{
							field : 'varDesc',
							title : '指标',
							width : 200
						},{
							field : 'operation_custom',
							title : '查看',
							width : 60,
							align : "center",
							formatter : function(value, row, index) {
								return  "<a title='查看' class='grid_link'  onclick=editKpi('"+row.varId+"')>查看</a>&nbsp;";;
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
				checkOnSelect : true
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

function editKpi(varId) {
	var jobId = tcCore.getParameter("jobId");
	tcCore.openWindowOnTop("KpiEdit.jsp?noedit=1&jobId="
			+ jobId+"&varId="+varId, {
				jobId:jobId
			}, null, function(result) {
	});
}


$(document).ready(init);
