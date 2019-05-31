function initChart(){
	tcCore.get({
		url : "bespeakDS/queryCjDd.ssm",
		success : function(data) {
			var dt={};
			$(data).each(function(i,o){
				if(i==0){
					dt.zj=Number(o.sm1);
				}else if(i==1){
					dt.wf=Number(o.sm1);
				}else if(i==2){
					dt.cj=Number(o.sm1);
				}
			});
			getChart(dt);
		}
	});
	tcCore.get({
		url : "commisionDS/queryTop.ssm",
		success : function(data) {
			var name=[];
			var numattr=[];
			$(data).each(function(i,o){
				name.push(o.name);
				numattr.push(o.receiving);
			});
			getzhcharts(name,numattr);
		}
	});
}

function getChart(dt){
	$('#danjuChart').highcharts({
        chart: {
            type: 'pie',
            width: 420,
            height: 310,
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: '订单总量、成交量、待支付量'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
        series: [{
            type: 'pie',
            name: '统计',
            data: [
             ["预约单据总量",dt.zj],
             ["预约未支付",dt.wf],
             ["成交量",dt.cj]
            ]
        }]
    });
}

function getzhcharts(name,numattr){
	 $('#yjChart').highcharts({
		        chart: {
		            type: 'column',
		            width: 420,
			        height: 320,
		            margin: [ 15, 0, 60, 30]
		        },
		        title: {
		            text: '佣金TOP10'
		        },
		        xAxis: {
		            categories: name,
		            labels: {
		                rotation: -45,
		                align: 'right',
		                style: {
		                    fontSize: '13px',
		                    fontFamily: 'Verdana, sans-serif'
		                }
		            }
		        },
		        yAxis: {
		            min: 0,
		            title: {
		                text: ''
		            }
		        },
		        legend: {
		            enabled: false
		        },
		        tooltip: {
		            pointFormat: '佣金额: <b>{point.y:.1f} 元</b>',
		        },
		        series: [{
		            name: 'Population',
		            data: numattr,
		            dataLabels: {
		                enabled: true,
		                rotation: -90,
		                color: '#FFFFFF',
		                align: 'right',
		                x: 4,
		                y: 10,
		                style: {
		                    fontSize: '13px',
		                    fontFamily: 'Verdana, sans-serif',
		                    textShadow: '0 0 3px black'
		                }
		            }
		        }]
		    });
}
