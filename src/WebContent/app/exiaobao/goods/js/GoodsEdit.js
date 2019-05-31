
var goodsAttr = {
		goodsid:"",
		initControlCount:1,
		imgserURL:"",
	};

function init(){
	$("#goodstext").mCustomScrollbar({
		theme : "minimal-dark",
		scrollSpeed : 50,
		scrollInertia : 100
	});
	
	//初始化图片选择
	initSwfUpload();
	var dialogId =  tcCore.getParameter("dialogId");
	if(!dialogId){
		//判断是否为窗口打开，如果被打开，隐藏form的头，border
		$("#goodsFormPanel").panel({
			iconCls:"icon-form-edit"
		});
	}
	initControls();
	goodsAttr.goodsid = tcCore.getParameter("goodsid");
	if(goodsAttr.goodsid){
		$("#cancelBtn").remove();
		getGoods(goodsAttr.goodsid);
	}else{
		$("#deleteBtn").remove();
	}
}


function initControls(){
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
			goodsAttr.imgserURL=data;
			UM.getEditor('editorinfo');
			goodsAttr.initControlCount--; 
		}
	});
}
/**
 * 获得商品信息
 * @param id
 */
function getGoods(id){
	tcCore.get({
		url:"goodsDS/getGoodsByPk.ssm?goodsid="+encodeURI(id),
		success:function(data){
			var flag = window.setInterval(function(){
				if(goodsAttr.initControlCount==0){
					initGoods(data);
				}
				window.clearInterval(flag);
			},50);
		}
	});
}


function initGoods(data){
	for(var d in data){
		if(d==="goodsinfo"){
			setContent(data[d]);
		}else if(d==="orgid"){
			$("#orgid").combobox("setValue", data[d]);
		}else if(d==="detail"){
			if(data[d]&&data[d]!=""){
				$("#daltable").html(data[d]);
				$("#daltable").find("img").css('display','');
			}
		}else{
			tcCore.setControlValue($("#"+d),data[d]);
		}
	}
	/**
	 * 编辑获得商品头像
	 */
	//获得附件列表
	tcCore.get({
		url : "fileDS/queryFileListBy.ssm?modelname=icms_goods&modelid="+ data.goodsid,
		success : function(datas) {
			if (datas) {
				$(datas).each(function(i, o) {
					if(o.atttype === "goodsshowimg"){
						var html="";
						html="<input type='hidden' name='goodsfileId' id='"+o.fileId+"' value='"+o.fileId+"' readonly='readonly'>";
						html+="<a href='#' onclick='showimg(\""+goodsAttr.imgserURL+"\",\"goodsfileId\",\""+o.fileId+"\")' style='margin: 5px'>";
						html+="<img id='consimg"+o.fileId+"' src='http://"+goodsAttr.imgserURL+o.fileId+"' style='width: 128px;height: 96px;'/>";
						html+="</a>";
						$("#goodesphone").append(html);
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
	if(data.goodsname===""||data.goodsname==null){
		msg+="商品名称不能为空 !  \n ";
	}
	if(data.price===""||data.price==null){
		msg+="价格不能为空!  \n";
	}
	if(data.brokerage===""||data.brokerage==null){
		msg+="佣金不能为空!  \n";
	}
	if(data.discount===""||data.discount==null){
		msg+="折扣数不能为空 ! \n";
	}
	if(data.discount>10){
		msg+="折扣数超出10 ! \n";
	}
	
	return msg;
}
/**
 * 保存
 * @returns
 */
function saveGoods(){
	gettable();
	var detail=$("#daltable").html();
	detail=detail.replace("<tbody>","");
	detail=detail.replace("</tbody>","");
	getContent();
	var data = tcCore.getFormData("goodsForm");
	var msg=validateForm(data);
	if(msg!=""){
		alert(msg);
		return ;
	}
	if(goodsAttr.goodsid){
		data.goodsid = goodsAttr.goodsid;
	}
	data.detail=detail;
	var filemap=[];
	/**
	 * 获取附件信息
	 */
	$("input[name='goodsfileId']").each(function(i,o){
		if($(o).val()!=""){
			if(!$(o).attr("readonly")){
				var file={};
				file.fileId=$(o).val();
				file.atttype="goodsshowimg";
				filemap.push(file);
				$(o).remove();
			}
		}
	});
	tcCore.post({
		url:"goodsDS/saveGoods.ssm",
		data:{
			goods:data,
			filemap:filemap,
		},
		success:function(data){
			tcCore.closeTopDialog({
				data:data,
				command:"save"
			});
		}
	});
	
}

function deleteGoods(){
	 top.$.messager.confirm('系统提示', '确认要删除该商品信息吗', function(r){
         if (r){
             if(goodsAttr.goodsid){
            	 tcCore.post({
              		url:"goodsDS/deleteGoodsByPk.ssm",
              		data:{
              			goodsid:goodsAttr.goodsid
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
/**
 * 保存前 处理table
 */
function gettable(){
	$("#daltable").find("img").css('display','none');
	var put=$("#daltable").find("tr");
	$(put).each(function(i,o){
		var pt=$(o).find("input");
		if(pt&&pt.length>0){
			var boon=inpueach(pt);
			if(!boon){
				$(o).remove();
			}
		}
	});
	var firstTr=$("#daltable").find("td");
	$(firstTr).each(function(i,o){
		if(i==0){
			$(o).addClass("imgtd");
		}else if(i==1){
			$(o).addClass("toptd");
		}else if(i==2){
			$(o).addClass("toptd");
			return false;
		}
	});
}
function inpueach(pt){
	var flag=false;
	$(pt).each(function(i,o){
		if($(o).val()!=""){
			flag=true;
			$(o).parent("td").html($(o).val());
		}
		$(o).remove();
	});
	return flag;
}
/**
 * 删除此行
 */
function removeit(obj){
	$(obj).parent().parent('tr').remove();
	var firstTr=$("#daltable").find("td");
	$(firstTr).each(function(i,o){
		if(i==0){
			$(o).addClass("imgtd");
		}else if(i==1){
			$(o).addClass("toptd");
		}else if(i==2){
			$(o).addClass("toptd");
			return false;
		}
	});
}
/**
 * 添加tr
 */
function addTr(){
	var trhmtl="<tr><td class='imgtd'>";
	trhmtl+="<img src=\"images/edit_add.png\"  onclick=\"addTr()\"/>&nbsp;"
	trhmtl+="<img src=\"images/edit_remove.png\"  onclick=\"removeit(this)\"/>"
	trhmtl+="</td><td class=\"lefttd\"><input type=\"text\"></td><td class=\"righttd\"><input type=\"text\" ></td></tr>";
	$("#daltable").append(trhmtl);
	$("#daltable").trigger("create");
}

function cancel(){
	tcCore.closeTopDialog();
}




$(document).ready(init);
