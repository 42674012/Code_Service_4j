var orgAttr={
	orgid:"",
	logoimg:"",
};
function init(){
	initSwfUpload() ;
	getHospital();
}

function getHospital() {
	tcCore.get({
		url : "orgDS/getOrgV.ssm",
		success : function(data) {
			 if(data){
				 orgAttr.orgid=data.orgId
				 initOrg(data);
			 }
		}
	});
}
function initOrg(row) {
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
		}else if(d==="smallimg"){
			orgAttr.logoimg=row[d];
		}
		
	}
	if(row.orgId){
		initFile(row.orgId);
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
							$("#logo").html("");
							var logimg="<img  src='http://"+data+orgAttr.logoimg+"' style='width: 100%;height: 100%;'/>";
							$("#logo").html(logimg);
						}
					}
				}
			});
			
		}
	});
}
/**
 * 编辑
 */
function editOrg() {
	if (orgAttr.orgid&&orgAttr.orgid!="") {
		tcCore.openWindowOnTop("OrgTreeEdit.jsp?orgId="+orgAttr.orgid, null, null, function(result){
			// 关闭窗口的回调
			operaCallBack(result);
		}, {
			title:"编辑医院",
			width:800,
			height:window.innerHeight,
		});
	} 
}
/**
 * 更新logo
 */
function updatelogo(fileid){
	tcCore.post({
		url : "orgDS/updateOrgLogo.ssm",
		data:{
			orgid: orgAttr.orgid,
			fileid:fileid,
		},
		success : function(data) {
			if(data&&data+""==="1"){
				getHospital();
			}else{
				alert("更新失败！");
			}
		}
	});
}
/**
 * 查看
 */
function queryOrg(){
	if (orgAttr.orgid&&orgAttr.orgid!="") {
		tcCore.openWindowOnTop(context+"/app/exiaobao/org/OrgView.jsp?orgid="+orgAttr.orgid+"&phone="+uphone, null, null, function(result){
			// 关闭窗口的回调
		}, {
			title:"查看医院",
			width:window.innerWidth/2,
			height:window.innerHeight,
		});
	}
}
/**
 * 回调
 * @param result
 */
function operaCallBack(result) {
	if (result && result.command == 'save') {
		getHospital();
	}
}
$(document).ready(init);