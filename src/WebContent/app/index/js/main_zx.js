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
	tdCollect:{},
	Target:{}
};
function init() {
	initPermisson();
	initTopBtn(); 
	initTopSlider();
//	willcallback();
	/**
	 * 初始化科室
	 */
	 $("#bottom").mCustomScrollbar({
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
	tdTotal();
}

function initPermisson() {
//	if(!tcCore.operationAllow("adviceDivBtn")){
//		$("#adviceDivBtn").remove();
//	}
//	if(!tcCore.operationAllow("appointmentDivBtn")){
//		$("#appointmentDivBtn").remove();
//	}
	
}

function initTab() {
	$(".bottom").css({
		width:'99%',
		height:window.innerHeight-$(".top").outerHeight()-$(".center").innerHeight()-20
	});
	$("#todayCount").css({
		height:window.innerHeight-$(".top").outerHeight()-$(".center").innerHeight()-20
	});
	$('#tt').css({
		width:window.innerWidth-$("#todayCount").outerWidth()-50,
		height:window.innerHeight-$(".top").outerHeight()-$(".center").innerHeight()-20
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
	 var tabss = $('#tt').tabs({
		 onSelect : function(title) {
			 if (title == '今日待回访') {
				 willcallback();
			 } else if (title == '今日新增意向') {
				 initAdviceGrid();
			 } else if (title == '今日新增预约') {
				 initAppointGrid();
			 } else if(title == "今日预计到诊") {
				 initTdWillcomeGrid();
			 }else {
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
		}, {
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
				$('#callbackGrid').datagrid("loadData", result.list);
				mainAtrr.tdCollect["willCallback"] = result.total;
				$("#today_wait").html(result.total+" 人");
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
	}else {
		return;
	}
	if(data) {
		data["typeFlag"] = data.type;
	}
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
		},{
			field : 'salesName',
			title : '接待客服',
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
		checkOnSelect : true
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
				if($('#adviceGrid').datagrid()) {
					$('#adviceGrid').datagrid("loadData", page.dataList);
				}
				$("#today_new_advicer").html(page.total+" 人");
			}
		}
	});
}

function operaCallBack(result) {
	mainAtrr.topWindowFlag = 0;
	if (result && result.command) {
		var flag = mainAtrr.refreshFlag;
		if(result&&result.data) {
			if(result.data.type==1) {
				var tabss = $('#tt').tabs("select", 3);
				initAppointGrid();
			}else if(result.data.type==0) {
				var tabss = $('#tt').tabs("select", 2);
				initAdviceGrid();
			}
		}else{
		}
		mainAtrr.refreshFlag = "";
	}
}
/** ******************************** 今日预计到诊 列表 ********************************* */
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
				$("#today_willcome").html(page.total+ " 人");
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
/** ********************** 预约 列表 ********************************** */
function initAppointGrid() {
	$('#appointmentGrid').datagrid({
		// title:"CustomerComplaint列表",
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
					t = "";
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
			width : 70,
			formatter : function(value, row, index) {
				return mainAtrr.channelResource[value];
			}
		}, {
			field : 'appointmentDate',
			title : '预约时间',
			width : 60,
			formatter : function(value, row, index) {
				if(value) {
					return new Date(value).format("yyyy-MM-dd hh:mm:ss");
				}
				return value;
			}
		},  {
			field : 'checkTime',
			title : '预计到诊时间',
			width : 60,
			formatter : function(value, row, index) {
				if(value) {
					return new Date(value).format("yyyy-MM-dd hh:mm:ss");
				}
				return value;
			}
		}, {
			field : 'appointmentOrgName',
			title : '科室',
			width : 50
		},  {
			field : 'appointmentDocName',
			title : '医生',
			width : 50
		},{
			field : 'salesName',
			title : '接待客服',
			width : 80
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
		checkOnSelect : true
	// toolbar: getGridToolbar()
	});
	queryForAppointmentGrid();
}

function queryForAppointmentGrid() {
	var queryUrl = "customerRecordViewDS/queryForListPage.ssm";
	var param = {
			appointmentDateStart : new Date().format("yyyy-MM-dd hh:mm:ss"),
			appointmentDateEnd : new Date().format("yyyy-MM-dd hh:mm:ss"),
			status:"1"
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
				if($('#appointmentGrid').datagrid()) {
					$('#appointmentGrid').datagrid("loadData", page.dataList);
				}
				$("#today_new_appointmentor").html(page.total+" 人");
			}
			
		}
	});
}
/**
 * 顶部按钮事件初始化
 */
function initTopBtn() {
	$(".tiltediv").bind('click', function() {
		var id = $(this).attr("id");
		if (id == "adviceDiv") {// 咨询预约
			mainAtrr.refreshFlag = "新增预约";
			addAdviceAppointment();
		} else if (id == "appointmentDiv") {// 预约查询
			queryAppointment();
		} 
	});
}
/**
 * 新增预约
 */
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
				width : $(document).width()-100,
				height : $(document).height()-100
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
}
//
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

/**
 * 报表初始化
 */
function initTopSlider() {
	//时间 在controls.js 里面 方法   getMonthStartDate
//	var arr = "挂号目标:,接诊目标:,复诊目标:,业绩目标:,单体目标:";
	var start = getMonthStartDate();//本月第一天
	var end = getMonthEndDate();//本月最后一天
	var targMonth = start.substring(0,7);
	var title = "咨询目标:,预约目标:,到诊目标:,本组到诊:";
	var targArr = "0/未设定,0/未设定,0/未设定";//没有 为未设定
	var adviceNum="未设定",appointmentNum="未设定",checkHomeNum = "未设定",owerGroupToExamine="未设定";
	
	var code = ["checkHomeNum","appointmentNum","checkHomeNum","owerGroupToExamine"];
	var targ = {
		month:targMonth,
		employeeId:_id
	};
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
				adviceNum = (tt.adviceNum==undefined?"未设定":tt.adviceNum);
				appointmentNum = (tt.appointmentNum==undefined?"未设定":tt.appointmentNum);
				checkHomeNum = (tt.checkHomeNum==undefined?"未设定":tt.checkHomeNum);
				owerGroupToExamine = (tt.owerGroupToExamine==undefined?"未设定":tt.owerGroupToExamine);
				
				targArr = "0/"+adviceNum+",0/"+appointmentNum+",0/"+checkHomeNum+",0/"+owerGroupToExamine;
			}
			mainAtrr.Target.adviceNum = adviceNum;
			mainAtrr.Target.appointmentNum = appointmentNum;
			mainAtrr.Target.checkHomeNum = checkHomeNum;
			mainAtrr.Target.owerGroupToExamine = owerGroupToExamine;
			targArr = targArr.split(",");
			title = title.split(",");
			$("#mySlider").jxSlider({
				width:240,
				height:14,
				sliders:4,
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
	var adviceNum = mainAtrr.Target.adviceNum;
	var appointmentNum = mainAtrr.Target.appointmentNum;
	var checkHomeNum = mainAtrr.Target.checkHomeNum;
	var owerGroupToExamine = "未设定";
	if(mainAtrr.Target.owerGroupToExamine) {
		owerGroupToExamine = mainAtrr.Target.owerGroupToExamine;
	}
	var start = getMonthStartDate();
	var end = getMonthEndDate();
	var startDate = start+" 00:00:00";
	var endDate = end+" 23:59:59";
	
	var data = {
		adviceNum:{startDate:startDate,endDate:endDate},
		appointmentNum:{startDate:startDate,endDate:endDate},
		checkHomeNum:{startDate:startDate,endDate:endDate},
		tdCallbacked:{startDate:startDate,endDate:endDate},
		tdCameCheck:{startDate:startDate,endDate:endDate},
		adviceToAppointment:{startDate:startDate,endDate:endDate},
		appointmentToCheck:{startDate:startDate,endDate:endDate},
		appointmentTolost:{startDate:startDate,endDate:endDate},
		owerGroupToExamine:{startDate:startDate,endDate:endDate}
	};
	tcCore.post({
		url:"ruleVarDS/caculateVarByCodes.ssm",
		data:{
			params:data,
			code:["adviceNum","appointmentNum","checkHomeNum",
			      "tdCallbacked","tdCameCheck","adviceToAppointment",
			      "appointmentToCheck","appointmentTolost","owerGroupToExamine"]
		},
		success:function(data){
			//目标展示
			var r1 = (data[0].value[0].adviceNum/adviceNum)*100;
			var r2 = (data[1].value[0].appointmentNum/appointmentNum)*100;
			var r3 = (data[2].value[0].checkHomeNum/checkHomeNum)*100;
			var r4 = 0;
			if(data[8].value) {
				r4 = (data[8].value[0].owerGroupToExamine/owerGroupToExamine)*100;
			}
			if(isNaN(r1)||r1==undefined) {
				r1=0;
			}
			if(isNaN(r2)||r1==undefined) {
				r2=0;
			}
			if(isNaN(r3)||r1==undefined) {
				r3=0;
			}
			if(isNaN(r4)||r1==undefined) {
				r4=0;
			}
			var sld = r1+"%,"+r2+"%,"+r3+"%,"+r4+"%";
			var alrArr = "(完成率:"+(r1>100?100:r1)+"%),(完成率:"+(r2>100?100:r2)+"%),(完成率:"+(r3>100?100:r3)+"%),(完成率:"+(r4>100?100:r4)+"%)";
			
			var slider = sld.split(",");
			var tar = data[0].value[0].adviceNum+"/"+adviceNum+"," +
					""+data[1].value[0].appointmentNum+"/"+appointmentNum+"," +
					""+data[2].value[0].checkHomeNum+"/"+checkHomeNum+"," +
					""+(data[8].value[0].owerGroupToExamine==undefined?"0":data[8].value[0].owerGroupToExamine)+"/"+owerGroupToExamine;
			var targ = tar.split(",");
			var alr = alrArr.split(",");
			$("#mySlider").jxSlider("setValue",slider);
			$("#mySlider").jxSlider("setTargValue",targ);
			$("#mySlider").jxSlider("setAlrValue",alr);
			
			//几率展示
			var adviceToAppointment = data[5].value[0].adviceToAppointment+"";
			var appointmentToCheck = data[6].value[0].appointmentToCheck+"";
			var appointmentTolost = data[7].value[0].appointmentTolost+"";
			if(adviceToAppointment) {//咨询转预约
				adviceToAppointment = parseFloat(adviceToAppointment*100).toFixed(2);
				adviceToAppointment = adviceToAppointment>100?100:adviceToAppointment;
				if(isNaN(adviceToAppointment)) {
					adviceToAppointment = 0;
				}
			}else{
				adviceToAppointment = 0;
			}
			if(appointmentToCheck) {
				appointmentToCheck = parseFloat(appointmentToCheck*100).toFixed(2);
				appointmentToCheck = appointmentToCheck>100?100:appointmentToCheck;
				if(isNaN(appointmentToCheck)) {
					appointmentToCheck = 0;
				}
			}else{
				appointmentToCheck=0;
			}
			if(appointmentTolost) {
				appointmentTolost = parseFloat(appointmentTolost*100).toFixed(2);
				appointmentTolost = appointmentTolost>100?100:appointmentTolost;
				if(isNaN(appointmentTolost)) {
					appointmentTolost = 0;
				}
			}else{
				appointmentTolost=0;
				
			}
			if(isNaN(appointmentToCheck)||appointmentToCheck==undefined) {
				appointmentToCheck=0;
			}
			if(isNaN(appointmentTolost)||appointmentTolost==undefined) {
				appointmentTolost=0;
			}
			if(isNaN(appointmentToCheck)||appointmentToCheck==undefined) {
				appointmentToCheck=0;
			}
			$("#receptionRate").attr("data-text","咨询转预约  "+(adviceToAppointment==0?"0":adviceToAppointment+"%"));
			$("#receptionRate").attr("data-percent",adviceToAppointment);
			$("#reReception").attr("data-text","预约转到诊  "+(appointmentToCheck==0?"0":appointmentToCheck+"%"));
			$("#reReception").attr("data-percent",appointmentToCheck);
			
			$("#notDiagnosis").attr("data-text","预约流失率 "+(appointmentTolost==0?"0":appointmentTolost+"%"));
			$("#notDiagnosis").attr("data-percent",appointmentTolost);
			$('#receptionRate').circliful();
			$('#reReception').circliful();
			$('#notDiagnosis').circliful();
			
			//今日汇总数据展示
			var tdCallbacked = data[3].value[0].tdCallbacked;
			$("#today_finish_wait").html(tdCallbacked+" 人");
			var tdCameCheck = data[4].value[0].tdCameCheck;
			$("#today_already_come").html(tdCameCheck+" 人");
		}
	});
}
/**
 * 报表初始化
 */
function initTdTotal() {
	tcCore.loadJs(context+"/app/index/js/main_zx_init_top_count.js");
	initTodayCount();
	initYesterdayCount();
	initToMonthCount();
}
/**
 * 定时刷新统计数据
 */
/*var timeOutFlag = 0;
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
}*/
/**
 * 今日汇总统计初始化
 */
function tdTotal() {
	queryForAdviceGrid();
	queryForAppointmentGrid();
	queryForTdWillcome();
}
/**
 * 设置slider的数据
 */
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
