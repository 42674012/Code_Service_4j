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
			}
			
		}
	});
}