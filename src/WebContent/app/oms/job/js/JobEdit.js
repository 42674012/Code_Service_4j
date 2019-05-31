
var jobAttr = {
		jobId:"",
		//initControlCount:1
	};

function init(){
	$("#center").mCustomScrollbar({
		theme : "minimal-dark",
		scrollSpeed : 50,
		scrollInertia : 100
	});
	var dialogId =  tcCore.getParameter("dialogId");
	if(!dialogId){
		//判断是否为窗口打开，如果被打开，隐藏form的头，border
		$("#jobFormPanel").panel({
			iconCls:"icon-form-edit"
		});
	}
	initControls();
	jobAttr.jobId = tcCore.getParameter("jobId");
	if(jobAttr.jobId){
		$("#cancelBtn").remove();
	}else{
		$("#deleteBtn").remove();
	}
	getJob(jobAttr.jobId);
}


function initControls(){
	    	/*tcCore.get({
	    		url:"dictDS/getDictByDictTypeCode.ssm?dictTypeCode=",
	    		success:function(data){
	    			data = tcCore.addSelectItem(data,"- - 请选择职务类型-combobox - -");
	    			$("#jobType").combobox("loadData",data);
	    			jobAttr.initControlCount--;
	    		}
	    	});*/
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
		    	
}

function getJob(id){
	tcCore.get({
		url:"jobViewDS/getJobViewByPk.ssm?jobId="+encodeURI(id),
		success:function(data){
			var flag = window.setInterval(function(){
				//if(jobAttr.initControlCount==0){
					initJob(data);
				//}
				window.clearInterval(flag);
			},50);
		}
	});
}


function initJob(data){
	for(var d in data){
		tcCore.setControlValue($("#"+d),data[d],data);
	}
}

function saveJob(){
	var data = tcCore.getFormData("jobForm");
	if(jobAttr.jobId){
		data.jobId = jobAttr.jobId;
	}
	tcCore.post({
		url:"jobDS/saveJob.ssm",
		data:{
			job:data
		},
		success:function(data){
			tcCore.closeTopDialog({
				data:data,
				command:"save"
			});
		}
	});
	
}

function deleteJob(){
	 top.$.messager.confirm('系统提示', '确认要删除该职务吗', function(r){
         if (r){
             if(jobAttr.jobId){
            	 tcCore.post({
              		url:"jobDS/deleteJobByPk.ssm",
              		data:{
              			jobId:jobAttr.jobId
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
