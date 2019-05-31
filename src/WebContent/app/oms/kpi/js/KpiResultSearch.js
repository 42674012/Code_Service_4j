var attr = {
	count : 1
};

function init() {
	$("#center").mCustomScrollbar({
		theme : "minimal-dark",
		scrollSpeed : 50,
		scrollInertia : 100

	});
	initControls();
}

function initControls() {
	$("#month").simpleCanleder();
	$("#month").val(new Date().format("yyyy-MM"));

	$("#employeeIdShow").autocomplete('employeeDS/queryAutoComplete.ssm', {
		dataType : "json",
		parse : function(data) {
			return $.map(data, function(item) {
				return {
					data : item,
					name : item.name + "" + item.phone
				}
			});
		},
		matchContains : true,
		max : 1000,
		cacheLength : 1,
		formatItem : function(item) {
			$("#employeeId").val(null);
			return item.name + "" + item.phone;
		},
		formatMatch : function(item) {
		}
	}).result(function(e, item) {
		$("#employeeIdShow").val(item.name + "" + item.phone);
		$("#employeeId").val(item.employeeId);
	});

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

	tcCore.post({
		url : "jobRoleDS/getAllJobRoleList.ssm",
		success : function(data) {

			$("#jobId").combogrid({
				url : "jobRoleDS/getAllJobRoleList.ssm",
				idField : 'jobroleId',
				textField : 'jobroleName',
				panelHeight : 180,
				panelWidth : 240,
				multiple : true,
				singleSelect : false,
				editable : false,
				data : data,
				columns : [ [ {
					field : 'jobroleId',
					checkbox : true
				}, {
					field : 'jobroleName',
					title : '职务',
					width : 200
				} ] ],
				onLoadSuccess : function(data) {
					$("#jobId").combogrid('setText', '请选择');
				}
			});

			initGrid();
			queryKpiResult();
		}
	});

}

/*******************************************************************************
 * 隐藏高级搜索条件
 * 
 * @returns
 */
function hideMoreCondition() {
	$("#moreConditionBtn").tooltip("hide");
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
									width : 100
								},
								{
									field : 'value',
									title : '应发金额',
									width : 100
								},
								{
									field : 'jobId',
									title : '提成规则',
									width : 100,
									formatter : function(value, row, index) {
										return "<a title='查看明细' class='grid_link'  onclick=viewKpi(this,'"
												+ row.month
												+ "','"
												+ row.employeeId
												+ "','"
												+ row.employeeName
												+ "')>查看明细</a>&nbsp;";
									}
								},
								{
									field : 'operation_custom',
									title : '操作',
									width : 60,
									align : "center",
									formatter : function(value, row, index) {
										if(window.searchParam.status=="1"){
											return "";
										}
										return "<a title='核对发放' class='grid_link'  onclick=check(this,'"
												+ row.month
												+ "','"
												+ row.employeeId
												+ "','"
												+ row.employeeName
												+ "','"
												+ row.value
												+ "')>核对发放</a>&nbsp;";
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
	$("#kpiResultGridPager")
			.pagination(
					{
						pageList : [ 30, 50, 100 ],
						pageSize : 30,
						beforePageText : "第",
						afterPageText : "/{pages}页",
						displayMsg : "当前显示 &nbsp;<font color='#3a87ad'>{from}</font>&nbsp;到&nbsp;<font color='#3a87ad'>{to}</font>&nbsp;/&nbsp;(<font color='#3a87ad'>{total}</font>)笔记录",
						showRefresh : false,
						layout : [ 'first', 'prev', 'manual', 'next', 'last',
								'list' ],
						onSelectPage : function(pageNumber, pageSize) {
							sendQuery();
						},
						onChangePageSize : function(pageSize) {
							sendQuery();
						},
					});
}

function caculate() {
	tcCore.post({
		url : "kpiCaculateDS/excuteCaculate.ssm",
		success : function() {
			var param = tcCore.getFormData("kpiResultForm");
			sendQuery(param);
		}
	});
}

/*******************************************************************************
 * 获取datagrid的工具栏
 * 
 * @returns
 */
function getGridToolbar() {
	return [ {
		iconCls : 'icon-grid-add',
		text : "新增",
		handler : function() {
			// 获取当前行
			addData();
		}
	}, '-', {
		iconCls : 'icon-grid-edit',
		text : "编辑",
		handler : function() {
			editDataBtnClick();
		}
	}, '-', {
		iconCls : 'icon-dustbin',
		text : "删除",
		handler : function() {
			deleteDataBtnClick();
		}
	} ];
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
	var pager = $('#kpiResultGridPager').pagination("options");
	if (param) {
		window.searchParam = param;
	}
	if (param.status == "-1") {
		param.status = "";
	}
	// 计算起始，和截至数据
	tcCore.post({
		url : "kpiResultDS/queryPageBySql.ssm",// "kpiResultDS/queryForListPage.ssm",
		data : {
			parameterMap : param,
			size : pager.pageSize,
			start : (pager.pageNumber - 1) * pager.pageSize
		},
		success : function(page) {
			// dataList total
			$('#kpiResultGrid').datagrid("loadData", page.dataList);
			$("#kpiResultGridPager").pagination('refresh', {
				total : page.total
			});
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
function viewKpi(a, month, employeeId) {
	tcCore.openWindowOnTop("KpiResultSearchDetail.jsp?employeeId=" + employeeId
			+ "&month=" + month, null, null, function(result) {
	}, {
		title : "查看绩效明细",
		width : 800,
		height : 600
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
function check(a, month, employeeId, employeeName, value) {
	// 打开编辑窗口
	tcCore.openWindowOnTop("KpiResultCheck.jsp", {
		employeeName : employeeName,
		employeeId : employeeId,
		month : month,
		value : value
	}, a, function(result) {
		// 关闭窗口的回调
		operaCallBack(result);
	}, {
		title : "核对绩效"
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

function refresh() {
	window.location.href = window.location.href;
}

$(document).ready(init);
