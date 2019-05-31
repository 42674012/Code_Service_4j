function fileQueueError(file, errorCode, message) {
	try {
		var imageName = "<font color='red'>文件上传错误</font>";
		var errorName = "";
		if (errorCode === SWFUpload.errorCode_QUEUE_LIMIT_EXCEEDED) {
			errorName = "You have attempted to queue too many files.";
		}

		if (errorName !== "") {
			alert(errorName);
			return;
		}
		
		switch (errorCode) {
		case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
			imageName = "<font color='red'>文件大小为0</font>";
			break;
		case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
			imageName = "<font color='red'>文件大小超过限制</font>";
			break;
		case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
		case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
		case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
			alert("只能上传一个文件！");
			break;
		default:
			alert(message);
			break;
		}
		alert(imageName);

	} catch (ex) {
		this.debug(ex);
	}
}

/**
 * 当文件选择对话框关闭消失时，如果选择的文件成功加入上传队列，
 * 那么针对每个成功加入的文件都会触发一次该事件（N个文件成功加入队列，就触发N次此事件）。
 * @param {} file
 * id : string,			    // SWFUpload控制的文件的id,通过指定该id可启动此文件的上传、退出上传等
 * index : number,			// 文件在选定文件队列（包括出错、退出、排队的文件）中的索引，getFile可使用此索引
 * name : string,			// 文件名，不包括文件的路径。
 * size : number,			// 文件字节数
 * type : string,			// 客户端操作系统设置的文件类型
 * creationdate : Date,		// 文件的创建时间
 * modificationdate : Date,	// 文件的最后修改时间
 * filestatus : number		// 文件的当前状态，对应的状态代码可查看SWFUpload.FILE_STATUS }
 */
function fileQueued(file){
	if(buttonplaceholderid!="orgLogoBtn"&&buttonplaceholderid!="orgEditLogoBtn"){
		addReadyFileInfo(file.id,file.name,"上传文件");
	}
}
function fileDialogComplete(numFilesSelected, numFilesQueued) {
	try {
		if (numFilesQueued > 0) {
//			startUploadFile();
			this.startUpload();
		}
	} catch (ex) {
		this.debug(ex);
	}
}

function uploadProgress(file, bytesLoaded) {
	try {
		var percent = Math.ceil((bytesLoaded / file.size) * 100);

		var progress = new FileProgress(file,  this.customSettings.upload_target);
		progress.setProgress(percent);
		if (percent === 100) {
			addFileInfo(file.id,"上传完成");
			progress.toggleCancel(false, this);
		} else {
			progress.setStatus("");
			addFileInfo(file.id,"正在上传("+percent+" %)请稍后...");
			progress.toggleCancel(true, this);
		}
	} catch (ex) {
		this.debug(ex);
	}
}
/**
 * 上传完成
 * @param file
 * @param serverData
 */
function uploadSuccess(file, serverData) {
	try {
//		var progress = new FileProgress(file,  this.customSettings.upload_target);
		if(buttonplaceholderid!="orgLogoBtn"&&buttonplaceholderid!="orgEditLogoBtn"){
			deleteFileInfo(file.id);
		}
		if(serverData!=""){
			var imgur=serverData.split(",");
			tcCore.get({
				url : "fileOptions/getUrl.ssm",
				success : function(data) {
					if(buttonplaceholderid=="uploadButton"){
						var html="";
						html="<input type='hidden' name='goodsfileId' id='"+imgur[0]+"' value='"+imgur[0]+"'>";
						html+="<a href='#' onclick='showimg(\""+data+"\",\"goodsfileId\",\""+imgur[0]+"\")' style='margin: 5px'>";
						html+="<img id='consimg"+imgur[1]+"' src='http://"+data+imgur[1]+"' style='width: 128px;height: 96px;'/>";
						html+="</a>";
						$("#goodesphone").append(html);
					}else if(buttonplaceholderid=="orguploadButton"){
						var html="";
						html="<input type='hidden' name='orgimgfileId' id='"+imgur[0]+"' value='"+imgur[0]+"'>";
						html+="<a href='#' onclick='showimg(\""+data+"\",\"orgimgfileId\",\""+imgur[0]+"\")' style='margin: 5px'>";
						html+="<img id='consimg"+imgur[1]+"' src='http://"+data+imgur[1]+"' style='width: 128px;height: 96px;'/>";
						html+="</a>";
						$("#orgimg").append(html);
					}else if(buttonplaceholderid=="jlButton"){
						var html="";
						html="<input type='hidden' name='swrewardfileId' id='"+imgur[0]+"' value='"+imgur[0]+"'>";
						html+="<a href='#' onclick='showimg(\""+data+"\",\"swrewardfileId\",\""+imgur[0]+"\")' style='margin: 5px'>";
						html+="<img id='consimg"+imgur[1]+"' src='http://"+data+imgur[1]+"' style='width: 128px;height: 96px;'/>";
						html+="</a>";
						$("#jlimg").append(html);
					}else if(buttonplaceholderid=="orgLogoBtn"){
						var html="";
////						html="<input type='hidden' name='swrewardfileId' id='"+imgur[0]+"' value='"+imgur[0]+"'>";
//						html+="<a href='#' onclick='showimg(\""+data+"\",\"swrewardfileId\",\""+imgur[0]+"\")'>";
//						html+="<img id='consimg"+imgur[1]+"' src='http://"+data+imgur[1]+"' style='width: 100%;height: 100%;'/>";
//						html+="</a>";
//						$("#logo").html(html);
						updatelogo(imgur[0]);
					}else if(buttonplaceholderid=="orgEditLogoBtn"){
						var html="";
						html="<input type='hidden' name='orgEditimgfileId' id='"+imgur[0]+"' value='"+imgur[0]+"'>";
						html+="<a href='#' onclick='showimg(\""+data+"\",\"swrewardfileId\",\""+imgur[0]+"\")'>";
						html+="<img id='consimg"+imgur[1]+"' src='http://"+data+imgur[1]+"' style='width: 100%;height: 100%;'/>";
						html+="</a>";
						$("#logo").html(html);
					}
					
				}
			});
			
		}
		
	} catch (ex) {
		this.debug(ex);
	}
}
/**
 * 显示图片 
 * @param urlip 图片服务地址
 * @param inputname 图片存贮的input name=
 * @param onckimg 当前点击的图片
 */
function showimg(urlip,inputname,onckimg){
		var allimg=$("input[name='"+inputname+"']");
		var imgattr=[];
		if(allimg){
			$(allimg).each(function(i,o){
				imgattr.push($(o).val());
			});
		}
		var imgdate={
				imgattr:imgattr,
				imgurl:urlip
		}
		//imgattr  图片数组
		//图片服务URL
		var url ="http://"+ urlip +onckimg;
		tcCore.openWindowOnTop(context+"/js/imageZoom/imageZoom.jsp?imgurl="+url, null, null, function(result){
		}, {
			title:"图片显示",
			width:top.window.innerWidth-100,
			height:top.window.innerHeight-50
		});
		
//		tcCore.openWindowOnTop(context+"/app/fileupload/Imgshow/imgShow.jsp", imgdate, null, function(result){
//		}, {
//			title:"图片显示",
//			width:top.window.innerWidth-100,
//			height:top.window.innerHeight-50
//			
//		});
}
/**
 * 移除row
 * @param fileId
 */
function deleteFileInfo(fileId){
	var row = document.getElementById(fileId);
	var tablid;
	if(buttonplaceholderid=="uploadButton"){
		tablid="goodsTable";
	}
	if(buttonplaceholderid=="orguploadButton"){
		tablid="orgTable";
	}
	if(buttonplaceholderid=="jlButton"){
		tablid="jlTable";
	}
//	if(buttonplaceholderid=="spanButtonactivity"){
//		tablid="activityTable";
//	}
	//用表格显示
	var infoTable = document.getElementById(tablid);
	infoTable.deleteRow(row.rowIndex);
}
/**
 * 添加信息
 * @param fileId
 * @param message
 */
function addFileInfo(fileId,message){
	if(buttonplaceholderid!="orgLogoBtn"&&buttonplaceholderid!="orgEditLogoBtn"){
		var row = document.getElementById(fileId);
		row.cells[2].innerHTML = "<font color='green'>"+message+"</font>";
	}
	
}
 

function addReadyFileInfo(fileid,fileName,message,status){
	var tablid;
	if(buttonplaceholderid=="uploadButton"){
		tablid="goodsTable";
	}
	if(buttonplaceholderid=="orguploadButton"){
		tablid="orgTable";
	}
	if(buttonplaceholderid=="jlButton"){
		tablid="jlTable";
	}
//	if(buttonplaceholderid=="spanButtonactivity"){
//		tablid="activityTable";
//	}
	//用表格显示
	var infoTable = document.getElementById(tablid);
	var row = infoTable.insertRow();
	row.id = fileid;
	var col1 = row.insertCell();
	var col2 = row.insertCell();
	var col3 = row.insertCell();
	var col4 = row.insertCell();
	col4.align = "right";
	col1.innerHTML = message+" : ";
	col2.innerHTML = fileName;
	if(status!=null&&status!=""){
		col3.innerHTML="<font color='red'>"+status+"</font>";
	}else{
		col3.innerHTML="";
	}
//	col4.innerHTML = "<a href='javascript:deleteFile(\""+fileid+"\")'>删除</a>";
	col1.style.width="150";
	col2.style.width="250";
	col3.style.width="80";
	col4.style.width="50";
}

function cancelUpload(){
	var infoTable = document.getElementById("infoTable");
	var rows = infoTable.rows;
	var ids = new Array();
	var row;
	if(rows==null){
		return false;
	}
	for(var i=0;i<rows.length;i++){
		ids[i] = rows[i].id;
	}	
	for(var i=0;i<ids.length;i++){
		deleteFile(ids[i]);
	}	
}
function deleteFile(fileId){
	//用表格显示
	var infoTable = document.getElementById("infoTable");
	var row = document.getElementById(fileId);
	infoTable.deleteRow(row.rowIndex);
	swfu.cancelUpload(fileId,false);
}

function uploadComplete(file) {
	try {
		/*  I want the next upload to continue automatically so I'll call startUpload here */
		if (this.getStats().files_queued > 0) {
			this.startUpload();
		} else {
			var progress = new FileProgress(file,  this.customSettings.upload_target);
			progress.setComplete();
//			progress.setStatus("<font color='red'>所有文件上传完毕!</b></font>");
			progress.toggleCancel(false);
		}
	} catch (ex) {
		this.debug(ex);
	}
}

function uploadError(file, errorCode, message) {
	var imageName =  "<font color='red'>文件上传出错!</font>";
	var progress;
	try {
		switch (errorCode) {
		case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:
			try {
				progress = new FileProgress(file,  this.customSettings.upload_target);
				progress.setCancelled();
				progress.setStatus("<font color='red'>取消上传!</font>");
				progress.toggleCancel(false);
			}
			catch (ex1) {
				this.debug(ex1);
			}
			break;
		case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:
			try {
				progress = new FileProgress(file,  this.customSettings.upload_target);
				progress.setCancelled();
				progress.setStatus("<font color='red'>停止上传!</font>");
				progress.toggleCancel(true);
			}
			catch (ex2) {
				this.debug(ex2);
			}
		case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
			imageName = "<font color='red'>文件大小超过限制!</font>";
			break;
		default:
			alert(message);
			break;
		}
		addFileInfo(file.id,imageName);
	} catch (ex3) {
		this.debug(ex3);
	}

}


function addImage(src) {
	var newImg = document.createElement("img");
	newImg.style.margin = "5px";
	 
	if(buttonplaceholderid=="uploadButton"){
		document.getElementById("goodsnails").appendChild(newImg);
	}
	if(buttonplaceholderid=="orguploadButton"){
		document.getElementById("orgnails").appendChild(newImg);
	}
	if(buttonplaceholderid=="jlButton"){
		document.getElementById("jlnails").appendChild(newImg);
	}
//	if(buttonplaceholderid=="uploadzhphone"){
//		document.getElementById("uploadzhphonenails").appendChild(newImg);
//	}
//	if(buttonplaceholderid=="spanButtonactivity"){
//		document.getElementById("activitynails").appendChild(newImg);
//	}
	if (newImg.filters) {
		try {
			newImg.filters.item("DXImageTransform.Microsoft.Alpha").opacity = 0;
		} catch (e) {
			// If it is not set initially, the browser will throw an error.  This will set it if it is not set yet.
			newImg.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + 0 + ')';
		}
	} else {
		newImg.style.opacity = 0;
	}

	newImg.onload = function () {
		fadeIn(newImg, 0);
	};
	newImg.src = src;
}

function fadeIn(element, opacity) {
	var reduceOpacityBy = 5;
	var rate = 30;	// 15 fps


	if (opacity < 100) {
		opacity += reduceOpacityBy;
		if (opacity > 100) {
			opacity = 100;
		}

		if (element.filters) {
			try {
				element.filters.item("DXImageTransform.Microsoft.Alpha").opacity = opacity;
			} catch (e) {
				// If it is not set initially, the browser will throw an error.  This will set it if it is not set yet.
				element.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + opacity + ')';
			}
		} else {
			element.style.opacity = opacity / 100;
		}
	}

	if (opacity < 100) {
		setTimeout(function () {
			fadeIn(element, opacity);
		}, rate);
	}
}



/* ******************************************
 *	FileProgress Object
 *	Control object for displaying file info
 * ****************************************** */

function FileProgress(file, targetID) {
	this.fileProgressID = "divFileProgress";

	this.fileProgressWrapper = document.getElementById(this.fileProgressID);
	if (!this.fileProgressWrapper) {
		this.fileProgressWrapper = document.createElement("div");
		this.fileProgressWrapper.className = "progressWrapper";
		this.fileProgressWrapper.id = this.fileProgressID;

		this.fileProgressElement = document.createElement("div");
		this.fileProgressElement.className = "progressContainer";

		var progressCancel = document.createElement("a");
		progressCancel.className = "progressCancel";
		progressCancel.href = "#";
		progressCancel.style.visibility = "hidden";
		progressCancel.appendChild(document.createTextNode(" "));

		var progressText = document.createElement("div");
		progressText.className = "progressName";
//		progressText.appendChild(document.createTextNode("上传文件: "+file.name));

		var progressBar = document.createElement("div");
		progressBar.className = "progressBarInProgress";

		var progressStatus = document.createElement("div");
		progressStatus.className = "progressBarStatus";
		progressStatus.innerHTML = "&nbsp;";

		this.fileProgressElement.appendChild(progressCancel);
		this.fileProgressElement.appendChild(progressText);
		this.fileProgressElement.appendChild(progressStatus);
		this.fileProgressElement.appendChild(progressBar);

		this.fileProgressWrapper.appendChild(this.fileProgressElement);
		document.getElementById(targetID).style.height = "75px";
		document.getElementById(targetID).appendChild(this.fileProgressWrapper);
		fadeIn(this.fileProgressWrapper, 0);

	} else {
		this.fileProgressElement = this.fileProgressWrapper.firstChild;
		this.fileProgressElement.childNodes[1].firstChild.nodeValue = "上传文件: "+file.name;
	}

	this.height = this.fileProgressWrapper.offsetHeight;

}
FileProgress.prototype.setProgress = function (percentage) {
	this.fileProgressElement.className = "progressContainer green";
	this.fileProgressElement.childNodes[3].className = "progressBarInProgress";
	this.fileProgressElement.childNodes[3].style.width = percentage + "%";
};
FileProgress.prototype.setComplete = function () {
	this.fileProgressElement.className = "progressContainer blue";
	this.fileProgressElement.childNodes[3].className = "progressBarComplete";
	this.fileProgressElement.childNodes[3].style.width = "";

};
FileProgress.prototype.setError = function () {
	this.fileProgressElement.className = "progressContainer red";
	this.fileProgressElement.childNodes[3].className = "progressBarError";
	this.fileProgressElement.childNodes[3].style.width = "";

};
FileProgress.prototype.setCancelled = function () {
	this.fileProgressElement.className = "progressContainer";
	this.fileProgressElement.childNodes[3].className = "progressBarError";
	this.fileProgressElement.childNodes[3].style.width = "";

};
FileProgress.prototype.setStatus = function (status) {
	this.fileProgressElement.childNodes[2].innerHTML = status;
};

FileProgress.prototype.toggleCancel = function (show, swfuploadInstance) {
	this.fileProgressElement.childNodes[0].style.visibility = show ? "visible" : "hidden";
	if (swfuploadInstance) {
		var fileID = this.fileProgressID;
		this.fileProgressElement.childNodes[0].onclick = function () {
			swfuploadInstance.cancelUpload(fileID);
			return false;
		};
	}
};
