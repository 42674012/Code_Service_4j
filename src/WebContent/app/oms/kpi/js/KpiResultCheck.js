var kpiAttr = {
	kpiId : "",
	initControlCount : 1,
	itemFlag : false
};

function init() {
	$("#center").mCustomScrollbar({
		theme : "minimal-dark",
		scrollSpeed : 50,
		scrollInertia : 100
	});
	initControls();
	initGrid();
	var data = tcCore.getTopWindowParam();
	if (data) {
		$("#deleteBtn").remove();
	} else {
		$("#cancelBtn").remove();
	}
	getKpi(data);
}

function initControls() {
	
}

/*******************************************************************************
 * 初始化表格
 * 
 * @returns
 */
function initGrid() {

}

function getKpi(data) {
	initKpi(data);

}

function initKpi(data) {
	for ( var d in data) {
		tcCore.setControlLabel($("#"+d),data[d]);
	}
}

function saveKpi() {
	var data = tcCore.getTopWindowParam();
	if (!data) {
		alert("没有选择绩效");
		return;
	}
	//public void updateByMonth(Long employeeId, Integer month, String bankNo) {
	tcCore.post({
		url : "kpiResultDS/updateByMonth.ssm",
		data : {
			employeeId:data.employeeId,
			month:data.month,
			bankNo:$("#bankNo").textbox("getValue")
		},
		success : function(data) {
			tcCore.closeTopDialog({
				data : data,
				command : "save"
			});
		}
	});

}

function cancel() {
	tcCore.closeTopDialog();
}

$(document).ready(init);
