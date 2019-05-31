$(document).ready(init);
var mainAtrr={
	appointmentOrg:{},
	visit_way:{}
};
function init(){
	/**
	 * 初始化科室
	 */
	$("#south").mCustomScrollbar({
		theme : "minimal-dark",
		scrollSpeed : 50,
		scrollInertia : 100
	});
	tcCore.get({
		 url : "orgDS/getAllOrgByType.ssm?type="+3,
		 success : function(data) {
			 mainAtrr.appointmentOrg=data;
			 querytotal();
			 initexamine();
			willcallback();
		 }
	 });
	tcCore.get({
		url : "dictDS/getDictByDictTypeCode.ssm?dictTypeCode=$visit_way",
		success : function(data) {
			$.each(data,function(i,v) {
				mainAtrr.visit_way[v.dictValue]=v.dictName;
			});
		}
	});
	getDiseaseStatic();
	
}
//统计首页 咨询 预约 流失 到院 的量
function querytotal(){
	tcCore.get({
		url:"electronicHistoryViewDS/getTotal.ssm",
		success:function(data){
			$(data).each(function(i,o){
				if(o.recordtype==="咨询"){
					var htl=$("#intention").html();
					$("#intention").html(htl+"<a>"+(o.tnum==null?"0":o.tnum)+"</a>");
				}else if(o.recordtype==="预约"){
					var htl=$("#bespoke").html();
					$("#bespoke").html(htl+"<a>"+(o.tnum==null?"0":o.tnum)+"</a>");
				}else if(o.recordtype==="病例"||o.recordtype==="病历"){
					var htl=$("#examine").html();
					$("#examine").html(htl+"<a>"+(o.tnum==null?"0":o.tnum)+"</a>");
				}else if(o.recordtype==="流失"){
					var htl=$("#loss").html();
					$("#loss").html(htl+"<a>"+(o.tnum==null?"0":o.tnum)+"</a>");
				}
			});
		}
	});
}
//统计预计到诊
function initexamine(){
	$("#examinelists").datagrid({
		columns : [ [{
			field : 'name',
			title : '姓名',
			width : 100,
			formatter:function(value, row, index){
				return value;
			}
		},{
			field : 'appointmentOrg',
			title : '预约科室',
			width : 80,
			formatter : function(value, row, index) {
				var appointmentOrg="";
				if(mainAtrr.appointmentOrg){
					$(mainAtrr.appointmentOrg).each(function(i,o){
						if(o.orgId==value){
							appointmentOrg=o.name;
						}
					});
				}
				return appointmentOrg;
			}
		},{
			field : 'appointmentDocName',
			title : '预约医生',
			width : 50,
			formatter:function(value, row, index){
				return value;
			}
		},{
			field : 'checkTime',
			title : '到诊时间',
			width : 50,
			formatter:function(value, row, index){
				if (value) {
					return new Date(value)
							.format("yyyy-MM-dd hh:mm:ss")
				}
				return value;
			}
		},{
			field : 'operation_custom',
			title : '操作',
			width : 60,
			align : "center",
			formatter : function(value, row, index) {
				return "<a href='javascript:;' title='查看'  class='grid_opreat_a' onclick=viewData(this,'" + row.recordId + "')>查看</a>" +
				"&nbsp;<a href='javascript:;' title='回访' class='grid_opreat_a' onclick=callbackCustomer(this,\""+index+"\")>回访</a>" +
						"&nbsp;<a href='javascript:void(0);' title='登记' class='grid_opreat_a' onclick=checkHome(this,\""+index+"\")>登记</a>";
			}
		}] ],
	width : "98%",
	striped : true,
	singleSelect : true,
	fitColumns : true,
	rownumbers : true,
	checkOnSelect : true,
	fit:true,
	border:false
	});
	queryexamine();
}

function queryexamine(){
	var param={};
	param.appointmentDateStart = new Date();
	param.appointmentDateEnd=new Date();
	param.status="1";
	param.type=1;
	// 计算起始，和截至数据
	tcCore.post({
		url : "customerRecordViewDS/queryForListPage.ssm",
		data : {
			params : param,
			size : 10,
			start : 0
		},
		success : function(page) {
			// dataList total
			$('#examinelists').datagrid("loadData", page.dataList);
		}
	});
}

//待回访
function  willcallback(){
	$("#callback").datagrid({
		border:false,
		columns : [ [{
			field : 'customerName',
			title : '考核项',
			width : 100
		},
		{
			field : 'visitWay',
			title : '目标',
			width : 80
		},
		{
			field : 'visitWay1',
			title : '达成',
			width : 80
		},
		{
			field : 'visitWay2',
			title : '达成率',
			width : 80
		}
		,{
			field : 'visitTime',
			title : '备注',
			width : 50
		}] ],
	width : "98%",
	striped : true,
	singleSelect : true,
	fitColumns : true,
	checkOnSelect : true,
	fit:true
	});
	
	/*var param={};
	param.nextVisitTimeEnd=new Date();
	// 计算起始，和截至数据
	tcCore.post({
		url : "callbackDS/queryForListPage.ssm",
		data : {
			params : param,
			size : 10,
			start : 0
		},
		success : function(page) {
			// dataList total
			$('#callback').datagrid("loadData", page.dataList);
		}
	});*/
	
	$('#callback').datagrid('appendRow', {customerName: '咨询',visitWay: '300',visitWay1: '280',visitWay2: '93%',visitTime:'活动'});
	$('#callback').datagrid('appendRow', {customerName: '预约',visitWay: '100',visitWay1: '108',visitWay2: '105%',visitTime:'活动'});
	$('#callback').datagrid('appendRow', {customerName: '到诊',visitWay: '0',visitWay1: '0',visitWay2: '0%',visitTime:'未到诊28人'});
	$('#callback').datagrid('appendRow', {customerName: '消费',visitWay: '10000',visitWay1: '10000',visitWay2: '100%',visitTime:'未到诊'});
	$('#callback').datagrid('appendRow', {customerName: '流失',visitWay: '5',visitWay1: '4',visitWay2: '',visitTime:''});
}

function getDiseaseStatic(){
	tcCore.get({
		url : "diseaseDS/getDiseaseStatic.ssm",
		success : function(data) {
			// dataList total
			var d = [];
			$(data).each(function(){
				d.push([this.dName,parseInt(this.dNum)]);
			});
			
			$('#diseaseStatic').css({
				width:"100%",
				height:"100%"
			}).highcharts({
		        title: {
		            text: ''
		        },
		        series: [{
		            type: 'pie',
		            name: '病种分布',
		            data:d
		        }]
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
	tcCore.openWindowOnTop(context+"/app/ejanton/customer/CustomerRecordView.jsp?recordId=" + id, null, a,
			function(result) {
				// 关闭窗口的回调
			}, {
				title : "查看客户信息",
				width:800,
				height:650
			});
}


/**
 * 打开回访
 * @param a
 * @param index
 */
function callbackCustomer(a,index) {
	var data =$("#examinelists").datagrid("getRows")[index];
	// 打开回访窗口
	tcCore.openWindowOnTop(context+"/app/ejanton/callback/CallbackEdit.jsp", data, a,
			function(result) {
				if(result) {
					if(result.data) {
						window.alert("新增回访成功!"); 
					}
				}
				// 关闭窗口的回调
				operaCallBack({});
			}, {
				title : "新增回访",
				width:1000,
				height:650
			});
		
}

/**
 * 登记到院
 */
function checkHome(a,index){
	var data = $("#examinelists").datagrid("getRows")[index];
	if(data==null){
		addData();
	}else{
		tcCore.openWindowOnTop(context+"/app/ejanton/history/HistoryEdit.jsp", data, null, function(result){
			// 关闭窗口的回调
			operaCallBack(result);
		}, {
			title:"新增病例",
			width:1000,
			height:650
		});
	}
}
