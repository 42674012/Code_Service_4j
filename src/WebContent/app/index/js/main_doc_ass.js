$(document).ready(init);
var mainAtrr = {
	appointmentOrg : {},
	visit_way : {},
	processingStatus : {},
	channelResource : {},
	complaintType : {},
	refreshFlag : "",
	married : {},
	nation : {},// 民族
	occupation : {},// 职业
	topWindowFlag:0,
	Target:{}
};
function init() {
	tcCore.loadJs(context+"/app/index/js/main_init_appointment_grid.js");
	initTopBtn();
	initTopSlider();
	todayTarget();
//	willcallback();
	/**
	 * 初始化科室
	 */
	 $("#center").mCustomScrollbar({
	 theme : "minimal-dark",
	 scrollSpeed : 50,
	 scrollInertia : 100
	 });
	tcCore.get({
		url : "orgDS/getAllOrgByType.ssm?type=" + 3,
		success : function(data) {
			mainAtrr.appointmentOrg = data;
//			willcallback();
		}
	});
	initDict();
	initTab();
	initTdTotal();
	//refreshTdTotal();
}
function initTab() {
	$(".bottom").css({
		width:'99%',
		height:window.innerHeight-$(".top").outerHeight()-$(".center").innerHeight()-30
	});
	$("#todayCount").css({
		height:window.innerHeight-$(".top").outerHeight()-$(".center").innerHeight()-30
	});
	$('#tt').css({
		width:window.innerWidth-$("#todayCount").outerWidth()-50,
		height:window.innerHeight-$(".top").outerHeight()-$(".center").innerHeight()-30
	 });
	$('#container').highcharts({
		chart : {
			type : 'pie' // 图表类型还是pie图
		},
		title : "",
		plotOptions : {
			pie : {
				innerSize : '80%',
				colors : [ '#ddd', '#1aadce'

				]
			// 也可以配置为10%的百分比形式
			}
		},
		series : [ {
			data : [ [ '完成', 50 ], [ '未完成', 350 ] ]
		} ]
	});
//	 $('#tt').css({
//		 width:"50%",
//		 height:window.innerHeight-$("#top_tb").innerHeight()-$(".tiltediv").innerHeight()-20-300
//	 });
	 var tabss = $('#tt').tabs({
		 onSelect : function(title) {
			 if (title === '今日待回访') {
				 willcallback();
			 } else if (title === '今日新增意向') {
				 initAdviceGrid();
			 }else if(title === '今日新增预约') {
				 initAppointGrid();
			 }else if(title=="今日预计到诊") {
				 initTdWillcomeGrid();
			 } else if (title === '今日新增患者') {
				 initCustomerGrid();
			 } else {
				 initComplaintGrid();
			 }
		 }
	 });
	
}

/**
 * 待回访 列表
 */
function willcallback() {
// $("#callbackGrid").css({
// height:window.innerHeight-$("#top_tb").innerHeight()-$(".tiltediv").innerHeight()-20-400
// });
	$("#callbackGrid").datagrid({
		border : false,
		columns : [ [ {
			field : 'customerName',
			title : '姓名',
			width : 100,
			formatter : function(value, row, index) {
				return value;
			}
		}, {
			field : 'recordType',
			title : '类型',
			width : 80,
			formatter : function(value, row, index) {
				return f_fmtRecordType(value, row);
			}
		}, {
			field : 'callbackTime',
			title : '上次回访时间',
			width : 50,
			formatter : function(value, row, index) {
				if (value) {
					return new Date(value).format("yyyy-MM-dd hh:mm:ss")
				}
				return value;
			}
		},  {
			field : 'remark',
			title : '上次回访摘要',
			width : 50,
			formatter : function(value, row, index) {
				if (value) {
					return new Date(value).format("yyyy-MM-dd hh:mm:ss")
				}
				return value;
			}
		},{
			field : 'operation_custom',
			title : '操作',
			sortable : true,
			width : 60,
			align : "center",
			formatter : function(value, row, index) {
				return f_fmtOperation(row, index);
			}
		} ] ],
		width : "98%",
		striped : true,
		singleSelect : true,
		fitColumns : true,
		checkOnSelect : true,
		fit : true,
		sortOrder : 'asc',
		border:true
	});
	var param = {};
	param.consume = 7;
	param.advice = 2;
	param.lost = 2;
	// 计算起始，和截至数据
	tcCore.post({
		url : "callbackDS/queryListForWaitVisit.ssm",
		data : {
			params : param
		},
		success : function(result) {
			// dataList total
			if(result) {
				if($('#callbackGrid').datagrid()) {
					$('#callbackGrid').datagrid("loadData", result.list);
				}
			}
		}
	});
}
function f_fmtRecordType(value, row) {
	if (value == "今日到诊") {
		return "今日到诊&emsp;&emsp;到诊时间:"
				+ new Date(row.checkTime).format("yyyy-MM-dd hh:mm:ss");
	}
	return value;
}

function f_fmtOperation(row, index) {
	var a = "";
	if (row) {
		var status = row.callbackStatus;
		if (status && status == 1) {
			a = "<a href='javascript:;' title='历史' class='grid_opreat_a' onclick=callbackHistory(this,\""
					+ index + "\")>查看历史</a>";
		} else {
			a = "<a href='javascript:;' title='回访' class='grid_opreat_a' onclick=callback(this,\""
					+ index + "\",\"call\")>回访</a>";
		}
	} else {
		a = "<a href='javascript:;' title='回访' class='grid_opreat_a' onclick=callback(this,\""
				+ index + "\",\"call\")>回访</a>";
	}
	return a;
}
/**
 * 今日预计到诊
 */

function initTdWillcomeGrid() {
	$('#willcomeGrid').datagrid({
		border : true,
		fit : true,
		width : "100%",
		headerCls : "gridHeaderCls",
		iconCls : "icon-grid",
		striped : true,
		singleSelect : true,
		rownumbers : true,
		fitColumns : true,
		checkOnSelect : true,
		columns : [ [ {
				field : 'customerName',
				title : '姓名',
				width : 100,
				formatter : function(value, row, index) {
					return value;
				}
			}, {
				field : 'recordType',
				title : '类型',
				width : 80,
				formatter : function(value, row, index) {
					return f_fmtRecordType(value, row);
				}
			}, {
				field : 'lastTime',
				title : '记录时间',
				width : 50,
				formatter : function(value, row, index) {
					if (value) {
						return new Date(value).format("yyyy-MM-dd hh:mm:ss")
					}
					return value;
				}
			}, {
				field : 'operation_custom',
				title : '操作',
				sortable : true,
				width : 60,
				align : "center",
				formatter : function(value, row, index) {
					return f_fmtOperationWill(row, index);
				}
			} 
		] ]
	});
	queryForTdWillcome();
}
function queryForTdWillcome() {
	tcCore.post({
		url : "customerRecordDS/queryForTdpatients.ssm",
		success : function(page) {
			if(page) {
				if($('#willcomeGrid').datagrid()) {
					$('#willcomeGrid').datagrid("loadData", page.list);
				}
			}
		}
	});
}
function f_fmtOperationWill(row, index) {
	var a = "";
	if (row) {
		var status = row.callbackStatus;
		if (status && status == 1) {
			a = "<a href='javascript:;' title='历史' class='grid_opreat_a' onclick=callbackHistory(this,\""
					+ index + "\")>查看历史</a>";
		} else {
			a = "<a href='javascript:;' title='回访' class='grid_opreat_a' onclick=callback(this,\""
					+ index + "\",\"willcall\")>回访</a>";
		}
	} else {
		a = "<a href='javascript:;' title='回访' class='grid_opreat_a' onclick=callback(this,\""
				+ index + "\",\"willcall\")>回访</a>";
	}
	return a;
}
/*******************************************************************************
 * 查看
 * 
 * @returns
 */
function viewData(a, id) {
	mainAtrr.topWindowFlag = 1;
	tcCore.openWindowOnTop(context
			+ "/app/ejanton/customer/CustomerRecordView.jsp?recordId=" + id,
			null, a, function(result) {
				// 关闭窗口的回调
			}, {
				title : "查看客户信息",
				width : 800,
				height : 650
			});
}

/**
 * 打开回访
 * 
 * @param a
 * @param index
 */
function callbackCustomer(a, index) {
	var data = $("#callback").datagrid("getRows")[index];
	mainAtrr.topWindowFlag = 1;
	// 打开回访窗口
	tcCore.openWindowOnTop(context + "/app/ejanton/callback/CallbackEdit.jsp",
			data, a, function(result) {
				if (result) {
					if (result.data) {
						window.alert("新增回访成功!");
					}
				}
				// 关闭窗口的回调
				operaCallBack({});
			}, {
				title : "新增回访",
				width : 1000,
				height : 650
			});

}
/**
 * 打开回访
 * 
 * @param a
 * @param index
 */
function callback(a, index,type) {
	var data = null;
	if(type=="call") {
		data = $("#callbackGrid").datagrid("getRows")[index];
	}else if(type=="willcall") {
		data = $("#willcomeGrid").datagrid("getRows")[index];
	}else{
		return;
	}
	data["typeFlag"] = data.type;
	mainAtrr.topWindowFlag = 1;
	// 打开回访窗口
	tcCore.openWindowOnTop(context + "/app/ejanton/callback/CallbackEdit.jsp",
			data, a, function(result) {
				if (result) {
					if (result.data) {
						window.alert("新增回访成功!");
						result.refresh = "callback";
					}
				}
				// 关闭窗口的回调
				operaCallBack(result);
			}, {
				title : "新增回访",
				width : 1000,
				height : 650
			});

}

function callbackHistory(a, index) {
	/**
	 * 查看电子病历
	 */
	var data = $('#callbackGrid').datagrid('getRows')[index];
	// 打开编辑窗口
	mainAtrr.topWindowFlag = 1;
	tcCore.openWindowOnTop(context
			+ "/app/ejanton/history/HistoryView.jsp?customerId="
			+ data.customerId, data, null, function(result) {
		// 关闭窗口的回调
		operaCallBack(result);
	}, {
		title : "查看病历",
		width : 800,
		height : 600
	});
}

/**
 * 登记到院
 */
function checkHome(a, index) {
	var data = $("#examinelists").datagrid("getRows")[index];
	if (data == null) {
		// addData();
	} else {
		mainAtrr.topWindowFlag = 1;
		tcCore.openWindowOnTop(
				context + "/app/ejanton/history/HistoryEdit.jsp", data, null,
				function(result) {
					// 关闭窗口的回调
					operaCallBack(result);
				}, {
					title : "新增病例",
					width : 1000,
					height : 650
				});
	}
}
/** ****************************** 咨询 列表 ********************************* */
function initAdviceGrid() {
	$('#adviceGrid').datagrid({
		columns : [ [ {
			field : 'name',
			title : '姓名',
			width : 40,
			formatter : function(value, row, index) {
				return value;
			}
		}, {
			field : 'sex',
			title : '性别',
			width : 30,
			formatter : function(value, row, index) {
				var t = "";
				switch (value) {
				case 0:
					t = "女";
					break;
				case 1:
					t = "男";
					break;
				default:
					t = "未知类型";
				}
				return t;
			}
		}, {
			field : 'phone',
			title : '手机号',
			width : 50
		}, {
			field : 'channelSource',
			title : '渠道',
			width : 50,
			formatter : function(value, row, index) {
				return mainAtrr.channelResource[value];
			}
		}, {
			field : 'diseaseName',
			title : '咨询病种',
			width : 80
		}, {
			field : 'callbackStatus',
			title : '处理状态',
			width : 80,
			formatter : function(value, row, index) {
				var t = "未处理";
				switch (value) {
				case 0:
					t = "未处理";
					break;
				case 1:
					t = "已回访";
					break;
				default:
					t = "未处理";
				}
				return t;
			}
		}, {
			field : 'createDate',
			title : '创建时间',
			width : 80,
			formatter : function(value, row, index) {
				if (value) {
					return new Date(value).format("yyyy-MM-dd hh:mm:ss")
				}
				return value;
			}
		}, {
			field : 'rembo',
			title : '备注',
			width : 100,
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
		border:true
		
	});
	queryForAdviceGrid();
}

function queryForAdviceGrid() {
	var queryUrl = "customerRecordViewDS/queryForListPage.ssm";
	var param = {
		createDateStart : new Date().format("yyyy-MM-dd hh:mm:ss"),
		createDateEnd : new Date().format("yyyy-MM-dd hh:mm:ss"),
		status:"0"
	};
	// 计算起始，和截至数据
	tcCore.post({
		url : queryUrl,
		data : {
			params : param,
			size : 1000,
			start : 0
		},
		success : function(page) {
			if(page) {
				$('#adviceGrid').datagrid("loadData", page.dataList);
			}
		}
	});
}
/** ********************** 预约 列表 ********************************** */
//initAppointGrid();


function operaCallBack(result) {
	mainAtrr.topWindowFlag = 0;
	if (result && result.command) {
		var flag = mainAtrr.refreshFlag;
		if (flag) {
			if ("新增意向" == flag) {
				var tabss = $('#tt').tabs("select", 2);
				initAdviceGrid();
			} else if ("到院登记" == flag) {
				var tabss = $('#tt').tabs("select", 4);
				initCustomerGrid();
			} else if ("患者投诉" == flag) {
				var tabss = $('#tt').tabs("select", 5);
				initComplaintGrid();
			}else if("新增预约" == flag) {
				var tabss = $('#tt').tabs("select", 3);
				initAppointGrid();
			} else {

			}
		} else if (result.refresh == "callback") {
			willcallback();
		} else {

		}
		mainAtrr.refreshFlag = "";
	}
}
/** ******************************** 患者 列表 ********************************* */
function initCustomerGrid() {
	$('#customerGrid')
			.datagrid(
					{
						columns : [ [
								{
									field : 'name',
									title : '姓名',
									width : 50
								},
								{
									field : 'sex',
									title : '性别',
									width : 20,
									formatter : function(value, row, index) {
										var t = "";
										switch (value) {
										case 0:
											t = "女";
											break;
										case 1:
											t = "男";
											break;
										default:
											t = "未知";
										}
										return t;
									}
								},
								{
									field : 'phone',
									title : '电话',
									width : 40
								},
								{
									field : 'qq',
									title : 'QQ',
									width : 40
								},
								{
									field : 'occupation',
									title : '职业',
									width : 50,
									formatter : function(value, row, index) {
										return mainAtrr.occupation[value];
									}
								},
								{
									field : 'married',
									title : '婚否',
									width : 30,
									formatter : function(value, row, index) {
										return mainAtrr.married[value];
									}
								},
								{
									field : 'bingli',
									title : '电子病历',
									width : 60,
									formatter : function(value, row, index) {
										if (row.spendall != null) {
											return "<a title='查看病历' class='grid_opreat_a' href='javascript:;'  onclick=lookhistory(this,'"
													+ index
													+ "')>查看</a>&nbsp;&nbsp;<a title='新增病历' class='grid_opreat_a' href='javascript:;'  onclick=checkHome(this,'"
													+ index + "')>新增</a>";
										} else {
											return "<a title='新增病历' class='grid_opreat_a' href='javascript:;'  onclick=checkHome(this,'"
													+ index + "')>新增</a>";
										}
									}
								}, {
									field : 'spendall',
									title : '总消费',
									width : 40,
									formatter : function(value, row, index) {
										if (value) {
											return "￥" + value;
										} else {
											return "￥0";
										}

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
						border:true
					// toolbar: getGridToolbar()
					});
	queryForCustomer();
}
function queryForCustomer() {
	var param = {
		createDateStart : new Date().format("yyyy-MM-dd hh:mm:ss"),
		createDateEnd : new Date().format("yyyy-MM-dd hh:mm:ss")
	};
	tcCore.post({
		url : "customerDS/queryForListPage.ssm",
		data : {
			params : param,
			size : 1000,
			start : 0
		},
		success : function(page) {
			if(page) {
				$('#customerGrid').datagrid("loadData", page.dataList);
			}
		}
	});
}
/** ********************** 投诉 列表 ********************************** */
function initComplaintGrid() {
	$('#customerComplaintGrid').datagrid({
		// title:"CustomerComplaint列表",
		columns : [ [ {
			field : 'complaintDate',
			title : '投诉时间',
			width : 90,
			formatter : function(value, row, index) {
				if (value) {
					return new Date(value).format("yyyy-MM-dd")
				}
				return value;
			}
		}, {
			field : 'complaintType',
			title : '投诉类型',
			width : 100,
			formatter : function(value, row, index) {
				return mainAtrr.complaintType[value];
			}
		}, {
			field : 'customerName',
			title : '投诉人',
			width : 90
		}, {
			field : 'customerPhone',
			title : '手机号',
			width : 100
		}, {
			field : 'complaintObject',
			title : '投诉对象',
			width : 100
		}, {
			field : 'complaintContent',
			title : '投诉内容',
			width : 100
		}, {
			field : 'complaintAccepter',
			title : '受理人',
			width : 115
		}, {
			field : 'processingStatus',
			title : '处理状态',
			width : 90,
			formatter : function(value, row, index) {
				return mainAtrr.processingStatus[value];
			}
		}, {
			field : 'processingResult',
			title : '处理结果',
			width : 100
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
	queryForComplaint();
}

function queryForComplaint() {

	var param = {
		createDateStart : new Date().format("yyyy-MM-dd hh:mm:ss"),
		createDateEnd : new Date().format("yyyy-MM-dd hh:mm:ss")
	};
	tcCore.post({
		url : "customerComplaintDS/queryForListPage.ssm",
		data : {
			params : param,
			size : 1000,
			start : 0
		},
		success : function(page) {
			if(page) {
				$('#customerComplaintGrid').datagrid("loadData", page.dataList);
			}
		}
	});
}

function initTopBtn() {
	$(".tiltediv").bind('click', function() {
		var id = $(this).attr("id");
		if (id == "adviceDiv") {// 咨询预约
			mainAtrr.refreshFlag = "新增预约";
			addAdviceAppointment();
		} else if (id == "appointmentDiv") {// 预约查询
			queryAppointment();
		} else if (id == "checkhomeDiv") {// 登记
			mainAtrr.refreshFlag = "到院登记";
			checkeHome();
		} else {// 患者投诉complaintDiv
			mainAtrr.refreshFlag = "患者投诉";
			addComplaint();
		}
	});
}
function addAdviceAppointment() {
	mainAtrr.topWindowFlag = 1;
	tcCore.openWindowOnTop(context
			+ "/app/ejanton/customer/CustomerRecordEdit.jsp", null, null,
			function(result) {
				// 关闭窗口的回调
				operaCallBack(result);
			}, {
				title : "新增客户记录",
				width : 800,
				height : 650
			});
}
function queryAppointment() {
	mainAtrr.topWindowFlag = 1;
	tcCore.openWindowOnTop(context
			+ "/app/ejanton/customer/CustomerRecordSearch.jsp", null, null,
			function(result) {
				// 关闭窗口的回调
				operaCallBack(result);
			}, {
				title : "查询预约记录",
				width : $(document).width(),
				height : $(document).height()
			});
}
function checkeHome() {
	mainAtrr.refreshFlag = "到院登记";
	mainAtrr.topWindowFlag = 1;
	tcCore.openWindowOnTop(context
			+ "/app/ejanton/customer/CustomerEditSingle.jsp", null, null,
			function(result) {
				// 关闭窗口的回调
				operaCallBack(result);
			}, {
				title : "新增患者",
				width : 800,
				height : 650
			});
	// tcCore.openWindowOnTop(context+"/app/ejanton/customer/CustomerSearch.jsp",
	// null, null,
	// function(result) {
	// // 关闭窗口的回调
	// operaCallBack(result);
	// }, {
	// title : "查询患者",
	// width : $(document).width(),
	// height : $(document).height()
	// });
}
function addComplaint() {
	mainAtrr.topWindowFlag = 1;
	tcCore.openWindowOnTop(context
			+ "/app/ejanton/complaint/ComplaintEdit.jsp", null,
			null, function(result) {
				// 关闭窗口的回调
				operaCallBack(result);
			}, {
				title : "新增投诉",
				width : 800,
				height : 650
			});
}
function initDict() {
	tcCore.post({
		url:"dictDS/getByCodeList.ssm",
		data:{
			dictTypeCodeList:["$complaint_status","$channel_type","$visit_way","$complaint_type","$custom_marrage","$custom_work","$custom_nation"]
		},
		success:function(data){
			$(data["$complaint_status"]).each(function(i,o){
				mainAtrr.processingStatus[o.dictValue]=o.dictName;
			});
			
			$(data["$channel_type"]).each(function(i,o){
				mainAtrr.channelResource[o.dictValue]=o.dictName;
			});
			
			$(data["$visit_way"]).each(function(i,o){
				mainAtrr.visit_way[o.dictValue]=o.dictName;
			});
			$(data["$complaint_type"]).each(function(i,o){
				mainAtrr.complaintType[o.dictValue]=o.dictName;
			});
			
			$(data["$custom_marrage"]).each(function(i,o){
				mainAtrr.married[o.dictValue]=o.dictName;
			});
			
			$(data["$custom_work"]).each(function(i,o){
				mainAtrr.occupation[o.dictValue]=o.dictName;
			});
			
			$(data["$custom_nation"]).each(function(i,o){
				mainAtrr.nation[o.dictValue]=o.dictName;
			});
			
//			initGrid();
//	    	queryCustomer();
		}
	});
}

function todayTarget() {
	$('#todayTargetDiv').css(
			{
				width : "100%",
				height : window.innerHeight - $("#top_tb").innerHeight()
						- $(".tiltediv").innerHeight() - 20,
				top : $("#top_tb").innerHeight()
			});
	$("#todayTargetGrid").datagrid({
		border : false,
		columns : [ [ {
			field : 'customerName',
			title : '考核项',
			width : 100
		}, {
			field : 'visitWay',
			title : '目标',
			width : 80
		}, {
			field : 'visitWay1',
			title : '达成',
			width : 80
		}, {
			field : 'visitWay2',
			title : '达成率',
			width : 80
		}, {
			field : 'visitTime',
			title : '备注',
			width : 50
		} ] ],
		width : "98%",
		striped : true,
		singleSelect : true,
		fitColumns : true,
		checkOnSelect : true,
		fit : true,
		border:true
	});

	$('#todayTargetGrid').datagrid('appendRow', {
		customerName : '咨询',
		visitWay : '300',
		visitWay1 : '280',
		visitWay2 : '93%',
		visitTime : '活动'
	});
	$('#todayTargetGrid').datagrid('appendRow', {
		customerName : '预约',
		visitWay : '100',
		visitWay1 : '108',
		visitWay2 : '105%',
		visitTime : '活动'
	});
	$('#todayTargetGrid').datagrid('appendRow', {
		customerName : '到诊',
		visitWay : '0',
		visitWay1 : '0',
		visitWay2 : '0%',
		visitTime : '未到诊28人'
	});
	$('#todayTargetGrid').datagrid('appendRow', {
		customerName : '消费',
		visitWay : '10000',
		visitWay1 : '10000',
		visitWay2 : '100%',
		visitTime : '未到诊'
	});
	$('#todayTargetGrid').datagrid('appendRow', {
		customerName : '流失',
		visitWay : '5',
		visitWay1 : '4',
		visitWay2 : '',
		visitTime : ''
	});
}
/**
 * 查看电子病历
 */
function lookhistory(a, index) {
	var data = $('#customerGrid').datagrid('getRows')[index];
	// 打开编辑窗口
	mainAtrr.topWindowFlag = 1;
	tcCore.openWindowOnTop(context
			+ "/app/ejanton/history/HistoryView.jsp?customerId="
			+ data.customerId, data, null, function(result) {
		// 关闭窗口的回调
		operaCallBack(result);
	}, {
		title : "查看病历",
		width : 800,
		height : 600
	});
}
/**
 * 登记到院
 */
function checkHome(a, index) {
	mainAtrr.refreshFlag = "到院登记";
	var data = $('#customerGrid').datagrid('getRows')[index];
	if (data == null) {
		addData();
	} else {
		mainAtrr.topWindowFlag = 1;
		tcCore.openWindowOnTop(
				context + "/app/ejanton/history/HistoryEdit.jsp", data, null,
				function(result) {
					sliderRefreshValue();
					// 关闭窗口的回调
					operaCallBack(result);
				}, {
					title : "新增病例",
					width : 800,
					height : 650
				});
	}
}


function initTopSlider() {
	var s = getJob();
	
	//时间 在controls.js 里面
	var title = "挂号目标:,接诊目标:,复诊目标:";
	var targArr = "0/未设定,0/未设定,0/未设定";//没有 为未设定
	
	var start = getMonthStartDate();
	var end = getMonthEndDate();
	
	var targMonth = start.substring(0,7);
	var code = ["registration","reception","returnVisit"];
	var targ = {
			month:targMonth,
			employeeId:_id
		};
	var registration="未设定",reception="未设定",returnVisit = "未设定";
	tcCore.post({
		url:"kpiGoalDS/getPreGoal.ssm",
		data:{
			params:targ
		},
		success:function(data){
			if(data&&data.length>0) {
				var tt = {};
				$(code).each(function(i,o){
					a:
					for (var int = 0; int < data.length; int++) {
						if(data[int].varCode==o) {
							tt[o] = data[int].specificationsValue;
							break a;
						}
					}
				});
				registration = (tt.registration==undefined?"未设定":tt.registration);
				reception = (tt.reception==undefined?"未设定":tt.reception);
				returnVisit = (tt.returnVisit==undefined?"未设定":tt.returnVisit);
				targArr = "0/"+registration+",0/"+reception+",0/"+returnVisit;
			}
			mainAtrr.Target.registration = registration;
			mainAtrr.Target.reception = reception;
			mainAtrr.Target.returnVisit = returnVisit;
			targArr = targArr.split(",");
			title = title.split(",");
			$("#mySlider").jxSlider({
				width:240,
				height:14,
				sliders:3,
				title:title,
				targ:targArr
			});
			initTopSliderSample();
		}
	});
	
}

/**
 * slider 副本
 */
function initTopSliderSample() {
	var registration = mainAtrr.Target.registration;
	var reception = mainAtrr.Target.reception;
	var returnVisit = mainAtrr.Target.returnVisit;
	
	var start = getMonthStartDate();
	var end = getMonthEndDate();
	var startDate = start+" 00:00:00";
	var endDate = end+" 23:59:59";
	var data = {
		registration:{startDate:startDate,endDate:endDate},
		reception:{startDate:startDate,endDate:endDate},
		returnVisit:{startDate:startDate,endDate:endDate},
		notDiagnosis:{startDate:startDate,endDate:endDate,startDate:startDate,endDate:endDate}
	};
	tcCore.post({
		url:"ruleVarDS/caculateVarByCodes.ssm",
		data:{
			params:data,
			code:["registration","reception","returnVisit","notDiagnosis"]
		},
		success:function(data){
			var r1 = (data[0].value[0].registration/registration)*100;
			var r2 = (data[1].value[0].reception/reception)*100;
			var r3 = (data[2].value[0].returnVisit/returnVisit)*100;
			
			if(isNaN(r1)||r1==undefined) 
				r1=0;
			if(isNaN(r2)||r1==undefined) 
				r2=0;
			if(isNaN(r3)||r1==undefined) 
				r3=0;
			
			var sld = r1+"%,"+r2+"%,"+r3+"%";
			var slider = sld.split(",");
			var alrArr = "(完成率:"+(r1>100?100:r1)+"%),(完成率:"+(r2>100?100:r2)+"%),(完成率:"+(r3>100?100:r3)+"%)";
			var tar = data[0].value[0].registration+"/"+registration+","+data[1].value[0].reception+"/"+reception+","+data[2].value[0].returnVisit+"/"+returnVisit;
			var targ = tar.split(",");
			var alr = alrArr.split(",");
			$("#mySlider").jxSlider("setValue",slider);
			$("#mySlider").jxSlider("setTargValue",targ);
			$("#mySlider").jxSlider("setAlrValue",alr);
			var jzl;
			var fzl;
			if(data[0].value[0].registration==0) {
				jzl = 0;
				fzl = 0;
			}else{
				jzl = (parseInt(data[1].value[0].reception)/parseInt(data[0].value[0].registration))*100;
				fzl = (data[2].value[0].returnVisit/data[0].value[0].registration)*100;
				
				fzl= fzl.toFixed(2);
				jzl = jzl.toFixed(2);
				jzl = jzl>100?100:jzl;
				fzl = fzl>100?100:fzl;
				if(isNaN(fzl)||fzl==undefined) {
					fzl = 0;
				}
				if(isNaN(jzl)||jzl==undefined) {
					jzl = 0;
				}
			}
			var dzl = (parseFloat(data[3].value[0].notDiagnosis))*100;
			dzl = dzl.toFixed(2);
			dzl = dzl>100?100:dzl;
			if(isNaN(dzl)||dzl==undefined) {
				dzl = 0;
			}
			$("#receptionRate").attr("data-text","接诊率  "+(jzl==0?"0":jzl+"%"));
			$("#receptionRate").attr("data-percent",jzl);
			
			$("#reReception").attr("data-text","复诊率  "+(fzl==0?"0":fzl+"%"));
			$("#reReception").attr("data-percent",fzl);
			
			$("#notDiagnosis").attr("data-text","断诊率  "+(dzl==0?"0":dzl+"%"));
			$("#notDiagnosis").attr("data-percent",dzl);
			
			$('#receptionRate').circliful();
			$('#reReception').circliful();
			$('#notDiagnosis').circliful();
		}
	});
}


function getJob() {
	tcCore.post({
		url:"employeeJobDS/getJobName.ssm",
		success:function(data){
			return data;
		}
	});
}
function initTdTotal() {
	tcCore.loadJs(context+"/app/index/js/main_doc_ass_init_top_count.js");
	//今日
	initTodayCount();
	//昨日
	initYesterDayCount();
	//本月
	initToMonthCount();
	
}

var timeOutFlag = 0;
function refreshTdTotal() {
//	var flag = window.setInterval(function() {
//		if(mainAtrr.topWindowFlag==0) {
//			initTdTotal();
//			sliderRefreshValue();
//		}else {
//			timeOutFlag++;
//			if(timeOutFlag==2) {
//				mainAtrr.topWindowFlag==0;
//			}
//		}
//	},30000);
}

function sliderRefreshValue() {
	var start = getMonthStartDate();
	var end = getMonthEndDate();
	var startDate = start+" 00:00:00";
	var endDate = end+" 23:59:59";
//	var startDate = tcCore.easyUiDateTimeBox.parseDate(start+"00:00:00");
//	var endDate = tcCore.easyUiDateTimeBox.parseDate(end+"23:59:59");
	var data = {
		startDate:startDate,
		endDate:endDate
	};
	tcCore.post({
		url:"ruleVarDS/caculateVarByCodes.ssm",
		data:{
			params:data,
			code:["registration","reception","returnVisit"]
		},
		success:function(data){
//			arr2 = data[0].value[0].registration+"/1000,"+data[1].value[0].reception+"/500,"+data[2].value[0].returnVisit+"/100";
			var r1 = (data[0].value[0].registration/1000)*100;
			var r2 = (data[1].value[0].reception/500)*100;
			var r3 = (data[2].value[0].returnVisit/100)*100;
			var sld = r1+"%,"+r2+"%,"+r3+"%";
			var slider = sld.split(",");
			
			var tar = data[0].value[0].registration+"/1000,"+data[1].value[0].reception+"/500,"+data[2].value[0].returnVisit+"/100";
			var targ = tar.split(",");
			$("#mySlider").jxSlider("setValue",slider);
			$("#mySlider").jxSlider("setTargValue",targ);
		}
	});
}
function rangeGet() {
	
}
