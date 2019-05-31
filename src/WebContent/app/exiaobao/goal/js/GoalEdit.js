
var goalAttr = {
		goalid:"",
		initControlCount:2,
		imgserURL:"",
	};

function init(){
	initSwfUpload();
	$("#center").mCustomScrollbar({
		theme : "minimal-dark",
		scrollSpeed : 50,
		scrollInertia : 100
	});
	var dialogId =  tcCore.getParameter("dialogId");
	if(!dialogId){
		//判断是否为窗口打开，如果被打开，隐藏form的头，border
		$("#goalFormPanel").panel({
			iconCls:"icon-form-edit"
		});
	}
	initControls();
	goalAttr.goalid = tcCore.getParameter("goalid");
	if(goalAttr.goalid){
		getGoal(goalAttr.goalid);
		$("#cancelBtn").remove();
	}else{
		$("#deleteBtn").remove();
	}
	
}


function initControls(){
	$("#cmonth").simpleCanleder();
	$("#cmonth").val(new Date().format("yyyy-MM"));
	initfileUrl();
	 
}
/**
 * 获得文件服务访问基础路径
 */
function initfileUrl(){
	//获得附件服务器的url
	tcCore.get({
		url:"fileOptions/getUrl.ssm",
		success:function(data){
			goalAttr.imgserURL=data;
			goalAttr.initControlCount--; 
		}
	});
}

function getGoal(id){
	tcCore.get({
		url:"goalDS/getGoalByPk.ssm?goalid="+encodeURI(id),
		success:function(data){
			var flag = window.setInterval(function(){
				if(goalAttr.initControlCount==0){
					initGoal(data);
				}
				window.clearInterval(flag);
			},10);
		}
	});
}


function initGoal(data){
	for(var d in data){
		if(d==="tgnum"){
			$('#tgnum').numberbox("setValue",data[d]);
		}else if(d==="fwnum"){
			$('#fwnum').numberbox("setValue",data[d]);
		}else if(d==="ddnum"){
			$('#ddnum').numberbox("setValue",data[d]);
		}else if(d==="cjnum"){
			$('#cjnum').numberbox("setValue",data[d]);
		}else if(d==="cmonth"){
			$("#cmonth").val(data.cyear+"-"+data[d]);
		}else{
			tcCore.setControlValue($("#"+d),data[d],data);
		}
		dwchick();
	}
	/**
	 * 编辑获得商品头像
	 */
	//获得附件列表
	tcCore.get({
		url : "fileDS/queryFileListBy.ssm?modelname=icms_goal&modelid="+ data.goalid,
		success : function(datas) {
			if (datas) {
				$(datas).each(function(i, o) {
					if(o.atttype === "goalshowimg"){
						var html="";
						html="<input type='hidden' name='swrewardfileId' id='"+o.fileId+"' value='"+o.fileId+"' readonly='readonly'>";
						html+="<a href='#' onclick='showimg(\""+goalAttr.imgserURL+"\",\"swrewardfileId\",\""+o.fileId+"\")' style='margin: 5px'>";
						html+="<img id='consimg"+o.fileId+"' src='http://"+goalAttr.imgserURL+o.fileId+"' style='width: 128px;height: 96px;'/>";
						html+="</a>";
						$("#jlimg").append(html);
					}
					 
				});
			}
		}
	});
}


/**
 * 验证表单
 */
function validateForm(data){
	var msg="";
	if(data.cmonth===""||data.cmonth==null){
		msg+="请选择月份！ \n ";
	}
	return msg;
}

function saveGoal(){
	var data = tcCore.getFormData("goalForm");
	var msg=validateForm(data);
	if(msg!=null&&msg!=""){
		alert(msg);
		return ;
	}
	if(goalAttr.goalid){
		data.goalid = goalAttr.goalid;
	}
	
	if(data.cmonth&&data.cmonth.length>4){
		var tt=data.cmonth;
		data.cyear=tt.substring(0,4); 
		data.cmonth=tt.substring(4,tt.length); ;
	}
	
	var filemap=[];
	/**
	 * 获取附件信息
	 */
	$("input[name='swrewardfileId']").each(function(i,o){
		if($(o).val()!=""){
			if(!$(o).attr("readonly")){
				var file={};
				file.fileId=$(o).val();
				file.atttype="goalshowimg";
				filemap.push(file);
				$(o).remove();
			}
		}
	});
	
	tcCore.post({
		url:"goalDS/saveGoal.ssm",
		data:{
			goal:data,
			filemap:filemap,
		},
		success:function(data){
			if(data){
				tcCore.closeTopDialog({
					data:data,
					command:"save"
				});
			}else{
				alert("此医院本月的目标已添加");
			}
			
		}
	});
	
}

function deleteGoal(){
	 top.$.messager.confirm('系统提示', '确认要删除该目标信息吗', function(r){
         if (r){
             if(goalAttr.goalid){
            	 tcCore.post({
              		url:"goalDS/deleteGoalByPk.ssm",
              		data:{
              			goalid:goalAttr.goalid
              		},
              		success:function(data){
              			tcCore.closeTopDialog({
              				data:data,
              				command:"save"
              			});
              		}
              	}); 
             }
         }
     });
	
}

function cancel(){
	tcCore.closeTopDialog();
}




$(document).ready(init);
