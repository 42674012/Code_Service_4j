<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
    String context = request.getContextPath();
%>
<!DOCTYPE html>
<html>
<head>
    <title>用户管理</title>
    
    
    
 <%@ include file="../../includeScript.jsp" %>
    
<!-- Bootstrap -->
<link rel="stylesheet" href="<%=context%>/js/bootstrap/css/bootstrap.min.css">
<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<%-- <script src="<%=context%>/js/bootstrap/jquery.min.js"></script> --%>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="<%=context%>/js/bootstrap/bootstrap.min.js"></script>
    
<!-- bootstrap-table -->   
<link rel="stylesheet" href="<%=context%>/js/bootstrap/bootstrap-table/css/bootstrap-table.css">
<link rel="stylesheet" href="<%=context%>/js/bootstrap/bootstrap-table/css/bootstrap-editable.css"> 
<script src="<%=context%>/js/bootstrap/bootstrap-table/ga.js"></script>


<script src='js/userEdit.js'></script>

</head>
<body>
<div>
 
    <div id="toolbar">
    
        
          <div class="col-sm-2">
			<button id="remove" class="btn btn-default" disabled>
            <i class="glyphicon glyphicon-remove"></i> 删  除
           </button>
			</div>
			 <div class="col-sm-4">
			 
			 <select  class="form-control" id="userGroup" name="userGroup" disabled>
                 <option value="">添加到</option>
                 <option value="1">默认组</option>
                 <option value="2">星标组</option>
                </select>
                
			</div>
			 <div class="col-sm-2">
			<button id="blackList" class="btn btn-default" disabled>
                                        黑名单
             </button>
			</div>
        
       <div class="col-sm-2">
			<button id="synchronous_wx_user" class="btn btn-info">
                                        微信粉丝同步
             </button>
			</div>
               
        
             
          
             
    </div>
    
    <table id="table"
           data-toolbar="#toolbar"
           data-search="true"
           data-show-refresh="true"
           data-show-toggle="true"
           data-show-columns="true"
           data-show-export="true"
           data-detail-view="true"
           data-detail-formatter="detailFormatter"
           data-minimum-count-columns="2"
           data-show-pagination-switch="true"
           data-pagination="true"
           data-id-field="userid"
           data-page-list="[10, 25, 50, 100, ALL]"
           data-show-footer="false"
           data-side-pagination="server"
           data-url="<%=context%>/userDS/saveOrQueryUser.ssm"
           data-response-handler="responseHandler">
    </table>
</div>
<script type="text/javascript">

var $table = $('#table'),
$remove = $('#remove'),
$userGroup = $('#userGroup'),
$blackList = $('#blackList'),
$synchronous_wx_user = $('#synchronous_wx_user'),

selections = [];

function initTable() {
$table.bootstrapTable({
    height: getHeight(),
    columns: [
          [
            {
                field: 'state',
                checkbox: true,
                rowspan: 2,
                align: 'center',
                valign: 'middle'
            } 
            ,
            {
                title: '基本信息',
                colspan: 8,
                align: 'center',
                valign: 'middle'
            }
            , {
            	field: 'operate',
                title: '操作管理',
                rowspan: 2,
                align: 'center',
                valign: 'middle',
                events: operateEvents,
                formatter: operateFormatter
              }
        ],
        [ 
            {
             title: '头像',
             field: 'headimgurl',
             align: 'center',
             valign: 'middle',
             sortable: true,
             formatter: operateHtmlFormatter
            },
            {
                field: 'nickname',
                title: '名称',
                align: 'left',
                valign: 'middle',
                sortable: true
            }
            ,
            {
                field: 'groupid',
                title: '分组',
                align: 'center',
                valign: 'middle',
                sortable: true,
                	editable: {
                        type: 'select',
                        source: [
                            {value: '0', text: '默认组'},
                            {value: '1', text: '黑名单'},
                            {value: '2', text: '星标组'}
                        ]
                    }
            }
              ,
            {
                field: 'remark',
                title: '备注',
                align: 'center',
                valign: 'middle',
                sortable: true,
                editable: {
                    type: 'text',
                    title: '修改备注',
                    validate: function (value) {
                        value = $.trim(value);
                        if (!value) {
                            return 'This field is required';
                        }
//                         if (!/^$/.test(value)) {
//                             return 'This field needs to start width $.'
//                         }
                        var data = $table.bootstrapTable('getData'),
                            index = $(this).parents('tr').data('index');
                        console.log("==>>>>>"+data[index]);
                        console.log("==>>>>>"+data[index].openid);
                        var user={remark:value,openid:data[index].openid,userid:data[index].userid}
                      
                        	tcCore.post({
                        		url:"userDS/saveRemarkUserName.ssm",
                        		data:{
                        			user:user
                        		},
                        		success:function(data){
                        			console.log(data);
                        			alert("成功");
                        		}
                        	});
                        
                        
                        
                        return '';
                    }
                }
            },{
                field: 'sex',
                title: '性别',
                align: 'center',
                valign: 'middle',
                sortable: true,
                editable:false,
                formatter: operateSexFormatter
            },
            {
                field: 'country',
                title: '国家',
                align: 'center',
                valign: 'middle',
                sortable: true,
                editable:false
            },
            {
                field: 'province',
                title: '省份',
                align: 'center',
                valign: 'middle',
                sortable: true,
                editable:false
               
            },
            {
                field: 'city',
                title: '市/区',
                align: 'center',
                valign: 'middle',
                sortable: true,
                editable:false
            }
        ]
    ]
});
// sometimes footer render error.
setTimeout(function () {
    $table.bootstrapTable('resetView');
}, 200);
$table.on('check.bs.table uncheck.bs.table ' +
        'check-all.bs.table uncheck-all.bs.table', function () {
    $remove.prop('disabled', !$table.bootstrapTable('getSelections').length);
    $userGroup.prop('disabled', !$table.bootstrapTable('getSelections').length);
    $blackList.prop('disabled', !$table.bootstrapTable('getSelections').length);
    
    
    // save your data, here just save the current page
    selections = getIdSelections();
    // push or splice the selections if you want to save all data selections
});
$table.on('expand-row.bs.table', function (e, index, row, $detail) {
//     if (index % 2 == 1) {
//         $detail.html('Loading from ajax request...');
//         $.get('LICENSE', function (res) {
//             $detail.html(res.replace(/\n/g, '<br>'));
//         });
//     }
});
$table.on('all.bs.table', function (e, name, args) {
    console.log(name, args);
});

$remove.click(function () {
    var ids = getIdSelections();
    $table.bootstrapTable('remove', {
        field: 'id',
        values: ids
    });
    $remove.prop('disabled', true);
});


$userGroup.click(function () {
    var ids = getIdSelections();
    $table.bootstrapTable('remove', {
        field: 'id',
        values: ids
    });
    $userGroup.prop('disabled', true);
});

$blackList.click(function () {
    var ids = getIdSelections();
    $table.bootstrapTable('remove', {
        field: 'id',
        values: ids
    });
    $userGroup.prop('disabled', true);
});


$synchronous_wx_user.click(function () {
	tcCore.get({
		url:"/userDS/saveQueryWXUser.ssm",
		success:function(data){
			alert("成功")
		}
	});
});


$(window).resize(function () {
    $table.bootstrapTable('resetView', {
        height: getHeight()
    });
});
}

function getIdSelections() {
return $.map($table.bootstrapTable('getSelections'), function (row) {
    return row.id
});
}

function responseHandler(res) {
$.each(res.rows, function (i, row) {
    row.state = $.inArray(row.id, selections) !== -1;
});
return res;
}

function detailFormatter(index, row) {
var html = [];
$.each(row, function (key, value) {
    html.push('<p><b>' + key + ':</b> ' + value + '</p>');
});
return html.join('');
}

function operateFormatter(value, row, index) {
return [
    '<button class="btn btn-success like" href="javascript:void(0)" title="Like">',
    '<i class="glyphicon glyphicon-heart"></i>关注',
    '</button> ',
    '<button class="btn btn-danger remove" href="javascript:void(0)" title="Remove">',
    '<i class="glyphicon glyphicon-remove"></i>删除',
    '</button>'
].join('');
}


window.operateEvents = {
'click .like': function (e, value, row, index) {
    alert('You click like action, row: ' + JSON.stringify(row));
},
'click .remove': function (e, value, row, index) {
    $table.bootstrapTable('remove', {
        field: 'openid',
        values: [row.id]
    });
}
};





function totalTextFormatter(data) {
return 'Total';
}

function totalNameFormatter(data) {
return data.length;
}

function totalPriceFormatter(data) {
var total = 0;
$.each(data, function (i, row) {
    total += +(row.price.substring(1));
});
return '$' + total;
}

function operateHtmlFormatter(value, row, index) {
var img="<img src='"+value+"' height='48px' width='48px' ></img>";
 return img;
}
function operateSexFormatter(value, row, index) {
 var sex="未知";
 if("1"==value)
 {
 	sex="男";
 }else if("2"==value)
 {
 	sex="女";
 }
return sex;
}


function getHeight() {
return $(window).height() - $('h1').outerHeight(true);
}

$(function () {
var scripts = [
        location.search.substring(1) || '<%=context%>/js/bootstrap/bootstrap-table/bootstrap-table.js',
        '<%=context%>/js/bootstrap/bootstrap-table/bootstrap-table-export.js',
        '<%=context%>/js/bootstrap/bootstrap-table/tableExport.js',
        '<%=context%>/js/bootstrap/bootstrap-table/bootstrap-table-editable.js',
        '<%=context%>/js/bootstrap/bootstrap-table/bootstrap-editable.js',
        '<%=context%>/js/bootstrap/bootstrap-table/bootstrap-table-zh-CN.min.js'
        
    ],
    eachSeries = function (arr, iterator, callback) {
        callback = callback || function () {};
        if (!arr.length) {
            return callback();
        }
        var completed = 0;
        var iterate = function () {
            iterator(arr[completed], function (err) {
                if (err) {
                    callback(err);
                    callback = function () {};
                }
                else {
                    completed += 1;
                    if (completed >= arr.length) {
                        callback(null);
                    }
                    else {
                        iterate();
                    }
                }
            });
        };
        iterate();
    };

eachSeries(scripts, getScript, initTable);
});

function getScript(url, callback) {
var head = document.getElementsByTagName('head')[0];
var script = document.createElement('script');
script.src = url;

var done = false;
// Attach handlers for all browsers
script.onload = script.onreadystatechange = function() {
    if (!done && (!this.readyState ||
            this.readyState == 'loaded' || this.readyState == 'complete')) {
        done = true;
        if (callback)
            callback();

        // Handle memory leak in IE
        script.onload = script.onreadystatechange = null;
    }
};

head.appendChild(script);

// We handle everything using the script element injection
return undefined;
}
</script>
</body>
</html>
