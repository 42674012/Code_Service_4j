function init() {
	$("#center").mCustomScrollbar({
		theme : "minimal-dark",
		scrollSpeed : 50,
		scrollInertia : 100
	});

	initControls();
	// initMoreConditionBtnClick();
	
}

/*******************************************************************************
 * 初始化高级搜索条件
 * 
 * @returns
 */
function initMoreConditionBtnClick() {
	$("#moreConditionDiv").css("display", "none");

	$("#moreConditionBtn").click(function() {
		if ($("#moreConditionDiv").css("display") == "none") {
			$("#moreConditionDiv").css("display", "block");
		}
	});

	$("#moreConditionBtn").tooltip({
		content : $('#moreConditionDiv'),
		showEvent : 'click',
		onShow : function() {

			var t = $(this);
			t.tooltip('tip').unbind().bind('mouseenter', function() {
				t.tooltip('show');
			}).bind('mouseleave', function() {
				// t.tooltip('hide');
			});
		}
	});
}

function initControls() {
	tcCore.get({
		url : "dictDS/getDictByDictTypeCode.ssm?dictTypeCode=$sex",
		success : function(data) {
			$("#sex").combobox("loadData", data);
		}
	});
	
	initGrid();
	queryEmployee();

}

/*******************************************************************************
 * 初始化表格
 * 
 * @returns
 */
function initGrid() {
	$('#employeeGridDiv').css(
			{
				height : window.innerHeight - $("#employeeForm").innerHeight()
						- $("#operbtn").innerHeight() - 58
			});

	$('#employeeGrid')
			.datagrid(
					{
						// title:"Employee列表",
						columns : [ [
								{
									field : 'name',
									title : '姓名',
									width : 100
								},
								{
									field : 'phone',
									title : '电话号码',
									width : 120
								},
								
								{
									field : 'orgname',
									title : '医院',
									width : 120
								},
								{
									field : 'status',
									title : '状态',
									width : 40,
									formatter : function(value, row, index) {
										if (value == 1) {
											return "在职";
										} else {
											return "离职";
										}
									}
								},
								{
									field : 'createDate',
									title : '创建时间',
									width : 80,
									formatter : function(value, row, index) {
										if (value) {
											return new Date(value)
													.format("yyyy-MM-dd");
										}
										return value;
									}
								},
								{
									field : 'operation_custom',
									title : '操作',
									width : 80,
									align : "center",
									formatter : function(value, row, index) {
										return "<a title='查看' class='grid_link'  onclick=viewData(this,'"
												+ row.employeeId
												+ "')>查看</a>&nbsp;"
												+ "<a title='编辑' class='grid_link' onclick=editData(this,'"
												+ row.employeeId
												+ "')>编辑</a>&nbsp;"
												+ "<a title='删除' class='grid_link'  onclick=deleteData(this,'"
												+ row.employeeId + "')>删除</a>";
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
	$("#employeeGridPager")
			.pagination(
					{
						pageSize : 30,
						pageList : [ 30, 50, 100 ],
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
function queryEmployee() {
	var param = tcCore.getFormData("employeeForm");
	sendQuery(param);
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
	var pager = $('#employeeGridPager').pagination("options");
	if (param) {
		window.searchParam = param;
	}
	// 计算起始，和截至数据
	tcCore.post({
		url : "employeeDS/queryForListPage.ssm",
		data : {
			params : param,
			size : pager.pageSize,
			start : (pager.pageNumber - 1) * pager.pageSize
		},
		success : function(page) {
			// dataList total
			$('#employeeGrid').datagrid("loadData", page.dataList);
			$("#employeeGridPager").pagination('refresh', {
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
function viewData(a, id) {
	// debugger;blur
	tcCore.openWindowOnTop("EmployeeView.jsp?employeeId=" + id, null, a,
			function(result) {
				// 关闭窗口的回调
			}, {
				title : "查看人员"
			});
}
/*******************************************************************************
 * 新增
 * 
 * @returns
 */
function addData() {
	tcCore.openWindowOnTop("EmployeeEdit.jsp", null, null, function(result) {
		// 关闭窗口的回调
		operaCallBack(result);
	}, {
		title : "新增场内人员",
		width : 600,
		height : 580
	});
}
/*******************************************************************************
 * 编辑
 * 
 * @returns
 */
function editData(a, id) {
	// 打开编辑窗口
	tcCore.openWindowOnTop("EmployeeEdit.jsp?employeeId=" + id, null, a,
			function(result) {
				// 关闭窗口的回调
				operaCallBack(result);
			}, {
				title : "编辑场内人员",
				width : 600,
				height : 580
			});
}

function editDataBtnClick() {
	var data = $("#employeeGrid").datagrid("getSelected");
	if (data == null) {
		alert("请先选中一行记录");
	} else {
		editData(null, data.employeeId);
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
	top.$.messager.confirm('系统提示', '确认要删除该会员信息吗', function(r) {
		if (r) {
			if (id) {
				tcCore.post({
					url : "employeeDS/deleteEmployeeByPk.ssm",
					data : {
						employeeId : id
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
	var data = $("#employeeGrid").datagrid("getSelected");
	if (data == null) {
		alert("请先选中一行记录");
	} else {
		deleteData(null, data.employeeId);
	}
}

$(document).ready(init);
