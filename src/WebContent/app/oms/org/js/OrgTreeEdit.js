var orgAttr = {
		orgId:"",
		parentId:"",
		logoimg:"",
	};

function init(){
	initSwfUpload();
	var dialogId =  tcCore.getParameter("dialogId");
	if(!dialogId){
		//判断是否为窗口打开，如果被打开，隐藏form的头，border
		$("#orgFormPanel").panel({
			iconCls:"icon-form-edit"
		});
	}
	orgAttr.orgId = tcCore.getParameter("orgId");
	if(orgAttr.orgId){
		getOrg(orgAttr.orgId);
	}
	
	
}
function getOrg(id) {
	tcCore.get({
		url : "orgDS/getOrgObjByPk.ssm?orgId=" + encodeURI(id),
		success : function(data) {
			initOrg(data);
			initFile(id);
		}
	});
}

function initOrg(data) {
	for ( var d in data) {
		if(d==="phone"){
			$("#phone").textbox("setValue",data[d]);
		}else if(d==="wxaccount"){
			$("#wxaccount").textbox("setValue",data[d]);
		}else if(d==="address"){
			$("#address").textbox("setValue",data[d]);
		}else if(d==="introduction"){
			$("#introduction").textbox("setValue",data[d]);
		}else if(d==="smallimg"){
			orgAttr.logoimg=data[d];
		}else{
			tcCore.setControlLabel($("#"+d),data[d]);
		}
	}
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
						if(orgAttr.logoimg){
							var logimg="<img  src='http://"+data+orgAttr.logoimg+"' style='width: 100%;height: 100%;'/>";
							$("#logo").html(logimg);
						}
					}
				}
			});
			
		}
	});
}

function saveOrg(){
	var data = tcCore.getFormData("orgForm");
	if(orgAttr.orgId){
		data.orgId = orgAttr.orgId;
	}
	var filemap=[];
	var logoimg="";
	/**
	 * 获取附件信息
	 */
	$("input[name='orgimgfileId']").each(function(i,o){
		if($(o).val()!=""){
			if(!$(o).attr("readonly")){
				var file={};
				file.fileId=$(o).val();
				file.atttype="orgshowimg";
				filemap.push(file);
				$(o).remove();
			}
		}
	});
	/**
	 * Logo
	 */
	$("input[name='orgEditimgfileId']").each(function(i,o){
		if($(o).val()!=""){
			logoimg=$(o).val();
		}
	});
	
	data.parentName = $("#parentName").val();
	tcCore.post({
		url:"orgDS/saveOrgFromPag.ssm",
		data:{
			org:data,
			filemap:filemap,
			logoimg:logoimg,
		},
		success:function(data){
			data.managerUserIdShow = $("#managerUserIdShow").val();
			tcCore.closeTopDialog({
				data:data,
				command:"save"
			});
		}
	});
	
}

function deleteOrg(){
	 top.$.messager.confirm('系统提示', '确认要删除该机构信息吗', function(r){
         if (r){
             if(orgAttr.orgId){
            	 tcCore.post({
              		url:"orgDS/deleteOrgByPk.ssm",
              		data:{
              			orgId:orgAttr.orgId
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
