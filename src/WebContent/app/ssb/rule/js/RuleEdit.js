var ruleAttr = {
	ruleId : "",
	initControlCount : 0
};

function init() {
	$("#center").mCustomScrollbar({
		theme : "minimal-dark",
		scrollSpeed : 50,
		scrollInertia : 100
	});
	var dialogId = tcCore.getParameter("dialogId");
	if (!dialogId) {
		// 判断是否为窗口打开，如果被打开，隐藏form的头，border
		$("#ruleFormPanel").panel({
			iconCls : "icon-form-edit"
		});
	}
	initControls();
	ruleAttr.ruleId = tcCore.getParameter("ruleId");
	if (ruleAttr.ruleId) {
		$("#cancelBtn").remove();
	} else {
		$("#deleteBtn").remove();
	}
	getRule(ruleAttr.ruleId);
}

function initControls() {
	ruleAttr.editor = CodeMirror.fromTextArea(document.getElementById("formula"), {
		  lineNumbers: true,
		  mode: "htmlmixed"
		});
	ruleAttr.editor.setSize(400,250);
}

function getRule(id) {
	tcCore.get({
		url : "ruleDS/getRuleByPk.ssm?ruleId=" + encodeURI(id),
		success : function(data) {
			var flag = window.setInterval(function() {
				if (ruleAttr.initControlCount == 0) {
					initRule(data);
				}
				window.clearInterval(flag);
			}, 50);
		}
	});
}

function initRule(data) {
	for ( var d in data) {
		tcCore.setControlValue($("#" + d), data[d], data);
	}
	if(data){
		ruleAttr.editor.setValue(data.formula);
	}
}

function saveRule() {
	var data = tcCore.getFormData("ruleForm");
	if (ruleAttr.ruleId) {
		data.ruleId = ruleAttr.ruleId;
	}
	tcCore.post({
		url : "ruleDS/saveRule.ssm",
		data : {
			rule : data
		},
		success : function(data) {
			tcCore.closeTopDialog({
				data : data,
				command : "save"
			});
		}
	});

}

function deleteRule() {
	top.$.messager.confirm('系统提示', '确认要删除该rule信息吗', function(r) {
		if (r) {
			if (ruleAttr.ruleId) {
				tcCore.post({
					url : "ruleDS/deleteRuleByPk.ssm",
					data : {
						ruleId : ruleAttr.ruleId
					},
					success : function(data) {
						tcCore.closeTopDialog({
							data : data,
							command : "save"
						});
					}
				});
			}
		}
	});

}

function cancel() {
	tcCore.closeTopDialog();
}

function caculteTest() {
	tcCore.post({
		url : "ruleDS/caculateTest.ssm",
		data : {
			formula : $("#formula").val()
		},
		success : function(data) {
			alert(data);
		}
	});
}

$(document).ready(init);
