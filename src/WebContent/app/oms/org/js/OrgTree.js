var orgAttr = {
	orgId : "",
	show_type : '1',
	id : ''
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
	initOrgTree();
	initControls();
	initGrid();
	
}

function getHospital() {

	tcCore.get({
		url : "orgDS/getOrgTreeV.ssm",
		success : function(data) {
			$("#orgTree").treegrid("loadData", data);
		}
	});
}

function initOrgTree() {
	$("#orgTree").treegrid({
		title : "医院列表",
//		toolbar : getToolbar(),
		idField : 'orgId',
		collapsible : true,
		treeField : 'name',
		fitColumns : true,
		iconCls : "icon-grid",
		headerCls : "gridHeaderCls",
		showHeader : false,
		columns : [ [ {
			title : '名称',
			field : 'name',
			width : 180
		} ] ],
		onClickRow : function(row) {
			// 设置控件值
			initOrg(row);
			
			// 获取机构类型
			// inithospitaltype();
		},
		// 一次性加载所有的时候该方法屏蔽
		onBeforeExpand : function(row) {
		},
		onLoadSuccess : function(row) {
			$(this).treegrid('enableDnd', row ? row.id : null);
		}
	});
}

function initControls() {
	// 获取类型
	tcCore.get({
		url : "dictDS/getDictByDictTypeCode.ssm?dictTypeCode=$org_type",
		success : function(data) {
			orgAttr.orgTypeMap = {};
			$(data).each(function(i, o) {
				orgAttr.orgTypeMap[o.dictValue] = o.dictName;
			});
			// getOrg(0);
			getHospital();
		}
	});
}

function getToolbar() {
	return [ {
		iconCls : 'icon-grid-add',
		text : "新增部门",
		handler : function() {
			addDept();
		}
	}, {
		iconCls : 'icon-grid-add',
		text : "新增科室",
		handler : function() {
			addSubject();
		}
	}, {
		iconCls : 'icon-grid-edit',
		text : "编辑机构",
		handler : function() {
			editOrg();
		}
	} ];
}

function addDept() {
	var node = $("#orgTree").treegrid("getSelected");
	addSub(2, node, "新增部门");
}

function addSubject() {
	var node = $("#orgTree").treegrid("getSelected");
	addSub(3, node, "新增科室");
}

function editOrg() {
	var data = $("#orgTree").treegrid("getSelected");
	if (data == null) {
		alert("请先选中一行记录");
		return;
	} else {
		var id=data.orgId;
		// debugger;
		tcCore.openWindowOnTop("OrgTreeEdit.jsp?orgId="+id, null, null, function(result){
			// 关闭窗口的回调
//			getHospital();
			operaCallBack(result);
		}, {
			title:"编辑医院",
			width:800,
			height:window.innerHeight,
		});
	}

}
/**
 * 查看
 */
function queryOrg(){
	var data = $("#orgTree").treegrid("getSelected");
	if (data == null) {
		alert("请先选中一行记录");
		return;
	} else {
		var id=data.orgId;
		// debugger;
		tcCore.openWindowOnTop(context+"/app/exiaobao/org/OrgView.jsp?orgid="+id+"&phone="+uphone, null, null, function(result){
			// 关闭窗口的回调
		}, {
			title:"查看医院",
			width:window.innerWidth/2,
			height:window.innerHeight,
		});
	}
}
/*******************************************************************************
 * 添加子集
 */
function addSub(orgType, data, title) {
	// 获取当前选中
	if (!data) {
		data = $("#orgTree").treegrid("getSelected");
	}
	if (!data) {
		alert("请先选择一个部门");
		return;
	}
	/*
	 * if(data.type==3&&orgType==3){ alert("科室下不能再创建科室，请选着部门进行操作"); return; }
	 */
	tcCore.openWindowOnTop("OrgTreeEdit.jsp?orgType=" + orgType, data, null,
			function(result) {
				// 关闭窗口的回调
				var data1 = $("#orgTree").treegrid("getSelected");
				var parentId = null;
				if (!data1) {
					parentId = 0;
				} else {
					parentId = data1.orgId;
				}
				// 如果父节点已经打开过，附加数据,再打开
				$("#orgTree").treegrid("append", {
					parent : parentId,
					data : [ result.data ]
				});
				$("#orgTree").treegrid("expand", parentId);
			}, {
				title : title
			});
}

tcCore.getSelectParent = function(id) {
	var data = $("#" + id).treegrid("getSelected");
	if (data) {
		data = $("#orgTree").treegrid("getParent", data.orgId);
	}
	return data;
}
function initFile(id){
	$("#orgimg").html("");
	//获得附件列表
	tcCore.get({
		url : "fileDS/queryFileListBy.ssm?modelname=oms_org&modelid="+ id,
		success : function(datas) {
			tcCore.get({
				url : "fileOptions/getUrl.ssm",
				success : function(data) {
					if (datas) {
						$(datas).each(function(i, o) {
							if(o.atttype === "orgshowimg"){
								var html="";
								html="<input type='hidden' name='orgimgfileId' id='"+o.fileId+"' value='"+o.fileId+"' readonly='readonly'>";
								html+="<a href='#' onclick='showimg(\""+data+"\",\"orgimgfileId\",\""+o.fileId+"\")' style='margin: 5px'>";
								html+="<img id='consimg"+o.fileId+"' src='http://"+data+o.fileId+"' style='width: 128px;height: 96px;'/>";
								html+="</a>";
								$("#orgimg").append(html);
							}
							 
						});
					}
				}
			});
			
		}
	});
}
function initOrg(row) {
	if(row.orgId){
		initFile(row.orgId);
	}
	for ( var d in row) {
		if(d==="name"){
			$("#" + d).html(row[d]);
		}else if(d==="phone"){
			$("#" + d).html(row[d]);
		}else if(d==="wxaccount"){
			$("#" + d).html(row[d]);
		}else if(d==="address"){
			$("#" + d).html(row[d]);
		}else if(d==="introduction"){
			$("#" + d).html(row[d]);
		}
		
	}
	
}

function deleteOrg() {
	top.$.messager.confirm('系统提示', '确认要删除该机构吗', function(r) {
		if (r) {
			var data = $("#orgTree").treegrid("getSelected");
			var orgId = data == null ? null : data.orgId;
			if (orgId) {
				tcCore.post({
					url : "orgDS/deleteOrgByPk.ssm",
					data : {
						orgId : orgId
					},
					success : function(data) {
						$('#orgTree').treegrid('remove', orgId);
					}
				});
			}
		}
	});
}

/*******************************************************************************
 * 初始化表格
 * 
 * @returns
 */
function initGrid() {
	$("#employeeGridDiv").css({
		height:$("#center").innerHeight()-($("#orgFormPanel").innerHeight()) -90
	});
	
	$('#employeeGrid')
			.datagrid(
					{
						title : "医院人员列表",
						columns : [ [
								{
									field : 'employeeId',
									title : '编号id',
									hidden : true
								},
								{
									field : 'deptId',
									title : '部门id',
									hidden : true
								},
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
									field : 'email',
									title : '邮箱',
									width : 120
								},
								{
									field : 'cardId',
									title : '身份证号',
									width : 140
								},
								{
									field : 'createDate',
									title : '创建时间',
									width : 100,
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
									width : 120,
									align : "center",
									formatter : function(value, row, index) {
										return "<a title='删除' class='grid_link'  onclick=deleteEmployee(this,'"
												+ row.employeeId
												+ "','"
												+ row.deptId + "')>删除</a>";
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
						checkOnSelect : true,
						toolbar : getGridToolbar()
					});
	$("#employeeGridPager")
			.pagination(
					{
						pageList : [ 30, 50, 100 ],
						pageSize:30,
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
			addemployeeData();
		}
	} ];
}

function addemployeeData() {
	var data = $("#orgTree").treegrid("getSelected");
	if (!data) {
		$.messager.alert('提示', '请选择一个部门!', 'info');
		return false;
	}

	tcCore.openWindowOnTop("EmployeeEdit.jsp?deptId=" + encodeURI(data.orgId),
			null, null, function(result) {// + "&deptIdShow=" +
											// encodeURI(data.name)
				// 关闭窗口的回调
				operaCallBack(result);
			}, {
				title : "新增会员",
				width : 800,
				height : 660
			});

}

function deleteEmployee(a, id, deptId) {
	// debugger;
	var dataSource = {
			employeeId : id,
			deptId : ''
	};
	top.$.messager.confirm('系统提示', '确认要删除该会员信息吗', function(r) {
		if (r) {
			if (id) {
				tcCore.post({
					url : "employeeDS/saveUpdateDept.ssm",
					data : {
						employee : dataSource
					},
					success : function(data) {
						sendQuery({
							deptId : deptId
						});
					}
				});
			}
		}
	});
}

function deleteDisease(a, id,orgid) {
	top.$.messager.confirm('系统提示', '确认要删除该病种信息吗', function(r) {
		if (r) {
			if (id) {
				tcCore.post({
					url : "diseaseOrgDS/deleteDiseaseOrgByPk.ssm",
					data : {
						diseaseoforgid : id
					},
					success : function(data) {
						queryDisease({
							orgid : orgAttr.id
						});
					}
				});
			}
		}
	});
}

function operaCallBack(result) {
	if (result && result.command == 'save') {
		$("#orgTree").treegrid("reload");
		initOrg( result.data);
	}
}

/*******************************************************************************
 * 查询
 */
function sendQuery(param) {
	var pager = $('#employeeGridPager').pagination("options");
	if (param) {
		window.searchParam = param;
	}
	// 计算起始，和截至数据
	tcCore.post({
		url : "employeeDS/queryForListPage.ssm",
		data : {
			params : window.searchParam,
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

// ----------------------------------------------------------------病种-----------------------------------------------------------------------------//

 
// ------------------------------------------------结束---------------------------------------------------------------------//
$(document).ready(init);
