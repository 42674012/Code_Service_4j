
function init(){
	$("#center").mCustomScrollbar({
		theme : "minimal-dark",
		scrollSpeed : 50,
		scrollInertia : 100
	});
	initControls();
	initGrid();
	queryTickling();
}
 

function initControls(){
	 
}
 
/*******************************************************************************
 * 初始化表格
 * 
 * @returns
 */
function initGrid(){
	
	$('#ticklingGridDiv').css({
		height:window.innerHeight-$("#ticklingForm").innerHeight()-$("#operbtn").innerHeight()-60
	});
	
	$('#ticklingGrid').datagrid({
		// title:"Tickling列表",
	    columns:[[
	              		{field:'ck',width:30,checkbox:true},
		    	  	 	{field:'employeeName',title:'反馈人',width:100},
		    	  	  	{field:'createdate',title:'反馈时间',width:100,formatter:function(value,row,index){
		    	  	  		if(value){
		    	  	  			return new Date(value).format("yyyy-MM-dd")
		    	  	  		}
		    	  	  		return value;
		    	  	  	}},
		    	  	 	{field:'replyer',title:'回复人',width:100},
		    	  	  	{field:'replydate',title:'回复时间',width:100,formatter:function(value,row,index){
		    	  	  		if(value){
		    	  	  			return new Date(value).format("yyyy-MM-dd")
		    	  	  		}
		    	  	  		return value;
		    	  	  	}},

	    	 {field:'operation_custom',title:'操作',width:60,align:"center",formatter:function(value,row,index){
		  	  		return "<a title='回复' class='grid_link'  onclick=editData(this,'"+row.ticklingid+"')>回复</a>&nbsp;";
		  	  	}}
	    ]],
	    fit:true,
	    width:"100%",
	    headerCls:"gridHeaderCls",
	    iconCls:"icon-grid",
	    striped:true,
	    rownumbers:true,
	    fitColumns:true,
	    // pagination:true,
	    checkOnSelect:true
	    // toolbar: getGridToolbar()
	});
	$("#ticklingGridPager").pagination({
		pageList: [10,50,100],
		beforePageText:"第",
		afterPageText:"/{pages}页",
		displayMsg:"当前显示 &nbsp;<font color='#3a87ad'>{from}</font>&nbsp;到&nbsp;<font color='#3a87ad'>{to}</font>&nbsp;/&nbsp;(<font color='#3a87ad'>{total}</font>)笔记录",
		showRefresh:false,
		layout:['first','prev','manual','next','last','list'],
		onSelectPage:function(pageNumber, pageSize){
			sendQuery();
		},
		onChangePageSize:function(pageSize){
			sendQuery();
		},
	});
}


/*******************************************************************************
 * 查询
 * 
 * @returns
 */
function queryTickling(){
	var param = tcCore.getFormData("ticklingForm");
	var param1 =tcCore.getFormData("ticklingFormMoreCondition"); 
	var p = {};
	copyProerty(p,param);
	copyProerty(p,param1);
	sendQuery(p);
}

function copyProerty(p,p1){
	for(var a in p1){
		p[a] = p1[a];
	}
	return p;
}


/*******************************************************************************
 * 发送查询请求
 * 
 * @returns
 */
function sendQuery(param){
	// 获取分页信息
	var pager = $('#ticklingGridPager').pagination("options");
	if(param){
		window.searchParam = param;
	}
	// 计算起始，和截至数据
	tcCore.post({
		url:"ticklingDS/queryForListPage.ssm",
		data:{
			params:param,
			size:pager.pageSize,
			start:(pager.pageNumber-1)*pager.pageSize  
		},
		success:function(page){
			// dataList total
			$('#ticklingGrid').datagrid("loadData",page.dataList);
			$("#ticklingGridPager").pagination('refresh',{	
				total:page.total
			});
		}
	});
}
/*******************************************************************************
 * 查看
 * 
 * @returns
 */
function viewData(a,id){
	// debugger;
	tcCore.openWindowOnTop("TicklingView.jsp?ticklingid="+id, null, a, function(result){
		// 关闭窗口的回调
	}, {
		title:"查看Tickling"
	});
}

/*******************************************************************************
 * 编辑
 * 
 * @returns
 */
function editData(a,id){
	// 打开编辑窗口
	tcCore.openWindowOnTop("TicklingEdit.jsp?ticklingid="+id, null, a, function(result){
		// 关闭窗口的回调
		operaCallBack(result);
	}, {
		title:"回复"
	});
}

/*******************************************************************************
 * 新增，编辑的回调
 */
function operaCallBack(result){
	if(result && (result.command=="save" ||  result.command=="delete")){
		sendQuery(null);
	}
}

function editDataBtnClick(){
	var griddt=$('#ticklingGrid').datagrid("getChecked");
	if(griddt&&griddt.length>0){
		var tickid=[];
		$(griddt).each(function(i,o){
			tickid.push(o.ticklingid);
		});
		$.messager.prompt('回复', '请输入回复内容', function(r){
			if (r){
				tcCore.post({
					url:"ticklingDS/saveTickBttch.ssm",
					data:{
						ticklingid:tickid,
						replytxt:r
					},
					success:function(data){
						sendQuery(null);
					}
				});
			}
		});
	}else {
		alert("请选择记录");
	}
	 
}


$(document).ready(init);
