
function init(){
	$("#center").mCustomScrollbar({
		theme : "minimal-dark",
		scrollSpeed : 50,
		scrollInertia : 100
	});
	initControls();
	initMoreConditionBtnClick();
	initGrid();
	queryBespeak();
}

/*******************************************************************************
 * 初始化高级搜索条件
 * 
 * @returns
 */
function initMoreConditionBtnClick(){
	$("#moreConditionBtn").click(function(){
		if($("#bespeakTable").data().opened){
			$("#bespeakTable").children().children().each(function(i,o){
				if(i!=0){
					$(o).css("display","none");
				}
			});
			$("#bespeakTable").data().opened = false;
			$("#moreConditionBtn").parent().removeAttr("vAlign");
		}else{
			$("#bespeakTable").children().children().each(function(i,o){
				$(o).css("display","");
			});
			$("#bespeakTable").data().opened = true;
			$("#moreConditionBtn").parent().attr("vAlign","bottom");
		}
		
	});
	$(".shouldhidden").each(function(){
		$(this).css("display","none");
	})
}

function initControls(){
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
	
	$('#bespeakGridDiv').css({
		height:window.innerHeight-$("#bespeakForm").innerHeight()-$("#operbtn").innerHeight()-60
	});
	
	$('#bespeakGrid').datagrid({
		// title:"Bespeak列表",
	    columns:[[
	 	    	 
		    	  	 	{title:'预约电话',field:'phone',width:100},
		    	  	 	{title:'预约姓名',field:'usrname',width:100},
		    	  	 	{title:'商品名称',field:'goodsname',width:100},
		    	  	 	{title:'商品价格',field:'price',width:100},
		    	  	 	{title:'活动主题',field:'subject',width:100},
		    	  	 	{title:'活动价格',field:'camprice',width:100},
		    	  	  	{title:'预约时间',field:'createdate',width:100,formatter:function(value,row,index){
		    	  	  		if(value){
		    	  	  			return new Date(value).format("yyyy-MM-dd hh:mm:ss")
		    	  	  		}
		    	  	  		return value;
		    	  	  	}},
		    	  	  {title:'是否支付',field:'status',width:100,formatter:function(value,row,index){
		    	  	  		if(value ==="1"){
		    	  	  			return "未支付"
		    	  	  		}else{
		    	  	  			return "已支付";
		    	  	  		}
		    	  	  	}},
	    	 {field:'operation_custom',title:'操作',width:60,align:"center",formatter:function(value,row,index){
	    		 if(row.status==="1"){
	    			 return  "<a title='编辑' class='grid_link' onclick=viewData(this,'"+row.bespeakid+"')>付款</a>&nbsp;" +
	  	  				"<a title='删除' class='grid_link'  onclick=deleteData(this,'"+row.bespeakid+"')>删除</a>";
	    		 }else{
	    			 return   "";
	    		 }
	    		 
		  	  }}
	    ]],
	    fit:true,
	    width:"100%",
	    headerCls:"gridHeaderCls",
	    iconCls:"icon-grid",
	    striped:true,
	    singleSelect:true,
	    rownumbers:true,
	    fitColumns:true,
	    // pagination:true,
	    checkOnSelect:true
	    // toolbar: getGridToolbar()
	});
	$("#bespeakGridPager").pagination({
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
function queryBespeak(){
	var param = tcCore.getFormData("bespeakForm");
	var param1 =tcCore.getFormData("bespeakFormMoreCondition"); 
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
	var pager = $('#bespeakGridPager').pagination("options");
	if(param){
		window.searchParam = param;
	}
	// 计算起始，和截至数据
	tcCore.post({
		url:"bespeakDS/queryForListPage.ssm",
		data:{
			params:param,
			size:pager.pageSize,
			start:(pager.pageNumber-1)*pager.pageSize  
		},
		success:function(page){
			// dataList total
			$('#bespeakGrid').datagrid("loadData",page.dataList);
			$("#bespeakGridPager").pagination('refresh',{	
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
	tcCore.openWindowOnTop("BespeakView.jsp?bespeakid="+id, null, a, function(result){
		// 关闭窗口的回调
		operaCallBack(result);
	}, {
		title:"到院支付"
	});
}
/*******************************************************************************
 * 新增
 * 
 * @returns
 */
function addData(){
	tcCore.openWindowOnTop("BespeakEdit.jsp", null, null, function(result){
		// 关闭窗口的回调
		operaCallBack(result);
	}, {
		title:"新增Bespeak"
	});
}
/*******************************************************************************
 * 编辑
 * 
 * @returns
 */
function editData(a,id){
	// 打开编辑窗口
	tcCore.openWindowOnTop("BespeakEdit.jsp?bespeakid="+id, null, a, function(result){
		// 关闭窗口的回调
		operaCallBack(result);
	}, {
		title:"编辑Bespeak"
	});
}

function editDataBtnClick(){
	var data = $("#bespeakGrid").datagrid("getSelected");
	if(data==null){
		alert("请先选中一行记录");
	}else{
		editData(null,data.bespeakid);
	}
}

/*******************************************************************************
 * 新增，编辑的回调
 */
function operaCallBack(result){
	if(result && (result.command=="save" ||  result.command=="delete")){
		queryBespeak();
	}
}

/*******************************************************************************
 * 删除
 * 
 * @returns
 */
function deleteData(a,id){
	// debugger;
	 top.$.messager.confirm('系统提示', '确认要删除该预约信息吗', function(r){
         if (r){
             if(id){
            	 tcCore.post({
              		url:"bespeakDS/deleteBespeakByPk.ssm",
              		data:{
              			bespeakid:id
              		},
              		success:function(data){
              			sendQuery();
              		}
              	}); 
             }
         }
     });
}

function deleteDataBtnClick(){
	var data = $("#bespeakGrid").datagrid("getSelected");
	if(data==null){
		alert("请先选中一行记录");
	}else{
		deleteData(null,data.bespeakid);
	}
}


$(document).ready(init);
