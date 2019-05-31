package com.xt.ssb.common.bussiness;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class CommonDS extends GenericDS {

	/****
	 * //获取从当月开始，往后的12个月份
	 * 
	 * @return
	 */
	public List<HashMap<String, Integer>> getMonthMap() {
		Date today = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
		Calendar rightNow = Calendar.getInstance();
		rightNow.setTime(today);
		rightNow.add(Calendar.MONTH, -6);// 日期加3个月
		int month = 0;
		List<HashMap<String, Integer>> ml = new ArrayList<>();
		for (int i = 1; i <12; i++) {
			rightNow.add(Calendar.MONTH, 1);// 日期加3个月
			HashMap<String, Integer> m = new HashMap<>();
			month = Integer.parseInt(sdf.format(rightNow.getTime()));
			m.put("id", month);
			m.put("name", month);
			ml.add(m);
		}
		return ml;
	}
	
	
	public static void main(String[] args) {
		CommonDS d = new CommonDS();
		System.out.print(d.getMonthMap());
	}
}
