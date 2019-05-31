var attr = {
	count : 1
};

function init() {
	$("#center").mCustomScrollbar({
		theme : "minimal-dark",
		scrollSpeed : 50,
		scrollInertia : 100

	});
	initGrid();
	sendQuery(null);
}

/*******************************************************************************
 * 初始化表格
 * 
 * @returns
 */
function initGrid() {

	$('#kpiResultGridDiv').css(
			{
				height : window.innerHeight - $("#kpiResultForm").innerHeight()
						- $("#operbtn").innerHeight() - 58
			});

	$('#kpiResultGrid')
			.datagrid(
					{
						// title:"KpiResult列表",
						columns : [ [
								{
									field : 'orgName',
									title : '部门',
									width : 80
								},
								{
									field : 'jobRoleName',
									title : '职位',
									width : 100
								},
								{
									field : 'employeeName',
									title : '人员',
									width : 100
								},
								{
									field : 'month',
									title : '月份',
									width : 60
								},
								{
									field : 'value',
									title : '应发金额',
									width : 80
								},
								{
									field : 'createDate',
									title : '统计时间',
									width : 140,
									formatter : function(value, row, index) {
										if (value) {
											return new Date(value)
													.format("yyyy-MM-dd hh:mm:ss");
										}
										return value;
									}
								},
								{
									field : 'jobId',
									title : '提成规则',
									width : 60,
									formatter : function(value, row, index) {
										return "<a title='提成规则' class='grid_link'  onclick=viewKpi(this,'"
												+ row.jobId
												+ "','"
												+ row.varId
												+ "')>"
												+ row.varDesc
												+ "</a>&nbsp;";
									}
								} ] ],
						fit : true,
						width : "100%",
						headerCls : "gridHeaderCls",
						iconCls : "icon-grid",
						striped : true,
						singleSelect : true,
						rownumbers : true,
						fitColumns : true,
						// pagination:true,
						checkOnSelect : true
					// toolbar: getGridToolbar()
					});
}

/*******************************************************************************
 * 查询
 * 
 * @returns
 */
function queryKpiResult() {
	caculate();
}

function copyProerty(p, p1) {
	for ( var a in p1) {
		p[a] = p1[a];
	}
	return p;
}

/*******************************************************************************
 * 发送查询请求
 * 
 * @returns
 */
function sendQuery(param) {
	// 获取分页信息
	// 计算起始，和截至数据
	tcCore.post({
		url : "kpiResultDS/queryForListPage.ssm",// "kpiResultDS/queryForListPage.ssm",
		data : {
			params : {
				employeeId : tcCore.getParameter("employeeId"),
				month : tcCore.getParameter("month")
			},
			size : 100,
			start : 0
		},
		success : function(page) {
			// dataList total
			$('#kpiResultGrid').datagrid("loadData", page.dataList);
		}
	});
}
/*******************************************************************************
 * 查看
 * 
 * @returns
 */
// function viewKpi(a, id) {
// tcCore.openWindowOnTop("KpiJobSearch.jsp?jobId=" + id, null, a, function(
// result) {
// // 关闭窗口的回调
// }, {
// title : "查看指标"
// });
// }
function viewKpi(a, jobId, varId) {
	tcCore.openWindowOnTop("KpiEdit.jsp?noedit=1&jobId=" + jobId + "&varId="
			+ varId, {
		jobId : jobId
	}, null, function(result) {
	}, {
		title : "提成规则"
	});
}

/*******************************************************************************
 * 新增
 * 
 * @returns
 */
function addData() {
	tcCore.openWindowOnTop("KpiResultEdit.jsp", null, null, function(result) {
		// 关闭窗口的回调
		operaCallBack(result);
	}, {
		title : "新增KpiResult"
	});
}
/*******************************************************************************
 * 编辑
 * 
 * @returns
 */
function editData(a, id) {
	// 打开编辑窗口
	tcCore.openWindowOnTop("KpiResultEdit.jsp?id=" + id, null, a, function(
			result) {
		// 关闭窗口的回调
		operaCallBack(result);
	}, {
		title : "编辑KpiResult"
	});
}

function editDataBtnClick() {
	var data = $("#kpiResultGrid").datagrid("getSelected");
	if (data == null) {
		alert("请先选中一行记录");
	} else {
		editData(null, data.id);
	}
}

/*******************************************************************************
 * 新增，编辑的回调
 */
function operaCallBack(result) {
	if (result && (result.command == "save" || result.command == "delete")) {
		sendQuery(null);
	}
}

/*******************************************************************************
 * 删除
 * 
 * @returns
 */
function deleteData(a, id) {
	// debugger;
	top.$.messager.confirm('系统提示', '确认要删除该kpiResult信息吗', function(r) {
		if (r) {
			if (id) {
				tcCore.post({
					url : "kpiResultDS/deleteKpiResultByPk.ssm",
					data : {
						id : id
					},
					success : function(data) {
						sendQuery();
					}
				});
			}
		}
	});
}

function deleteDataBtnClick() {
	var data = $("#kpiResultGrid").datagrid("getSelected");
	if (data == null) {
		alert("请先选中一行记录");
	} else {
		deleteData(null, data.id);
	}
}
function cancel() {
	tcCore.closeTopDialog();
}

function refresh() {
	window.location.href = window.location.href;
}

$(document).ready(init);
