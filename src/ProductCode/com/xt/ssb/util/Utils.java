package com.xt.ssb.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.fuwushe.common.utils.MD5;

public class Utils {

    /***
     * 获取本周一日期对象
     * 
     * @return
     */
    public static Date getMondayDateOfThisWeek() {
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        if (cal.get(Calendar.DAY_OF_WEEK) == 1) {
            cal.add(Calendar.DATE, -1);
        }
        cal.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
        return cal.getTime();
    }

    /***
     * 获取本周一字符串
     * 
     * @return
     */
    public static String getMondayStringOfThisWeek() {
        return Constants.sdf.format(getMondayDateOfThisWeek());
    }

    public static String getMD5passwrod(String password) {
        return "MD5" + new MD5().getMD5ofStr(password);
    }

    /***
     * 获取当前周次
     * 
     * @return
     */
    public static int getWeekNumber() {
        Calendar calendar = Calendar.getInstance();
        calendar.setFirstDayOfWeek(Calendar.MONDAY);

        calendar.setTime(new Date());
        return calendar.get(Calendar.WEEK_OF_YEAR);

    }

    /***
     * 获取当前周次
     * 
     * @return
     */
    public static int getYear() {
        Calendar calendar = Calendar.getInstance();
        return calendar.get(Calendar.YEAR);

    }

    public static String escapeSQLLike(String sql) {
        return "";
    }
    /**
     * 根据日期计算 周
     * @param pTime
     * @return
     * @throws Throwable
     */
    public static String dayForWeek(String pTime) {  
    	String[] weekDays = {"星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"};
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");  
        Date tmpDate;
		try {
			tmpDate = format.parse(pTime);
			Calendar cal = Calendar.getInstance();
	        cal.setTime(tmpDate);
	        int w = cal.get(Calendar.DAY_OF_WEEK) - 1;
	        if (w < 0){
	        	w = 0;
	        }
	        return weekDays[w];
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}  
        return "星期日";
    }  
}
