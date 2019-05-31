package com.xt.ssb.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class Constants {
	
	 /** 
     * Java Calender类获得指定日期加几天 
     *  
     * @param specifiedDay 
     * @param d  day 
     * @return 
     */  
    public static String getSpecifiedDayAfter(String specified,int d) {  
        Calendar c = Calendar.getInstance();  
        Date date = null;  
        try {  
            date = new SimpleDateFormat("yy-MM-dd").parse(specified);  
        } catch (ParseException e) {  
            e.printStackTrace();  
        }  
        c.setTime(date);  
        int day = c.get(Calendar.DATE);  
        c.set(Calendar.DATE, day + d);  
        String dayAfter = new SimpleDateFormat("yyyy-MM-dd").format(c.getTime());  
        return dayAfter;  
    }
    
	public static long getDaySub(String beginDateStr,String endDateStr){
        long day=0;
        java.text.SimpleDateFormat format = new java.text.SimpleDateFormat("yyyy-MM-dd");    
        java.util.Date beginDate;
        java.util.Date endDate;
        try{
            beginDate = format.parse(beginDateStr);
            endDate= format.parse(endDateStr);    
            day=(endDate.getTime()-beginDate.getTime())/(24*60*60*1000);    
            //System.out.println("相隔的天数="+day);   
        } catch (ParseException e){
            // TODO 自动生成 catch 块
            e.printStackTrace();
        }   
        return day;
    }
	
	public static SimpleDateFormat sdy = new SimpleDateFormat(
			"yyyy-MM-dd");
	
	public static SimpleDateFormat sdf = new SimpleDateFormat(
			"yyyy-MM-dd HH:mm:ss");

	public static final int login_success = 0;
	public static final int login_user_not_exitst = 1;
	public static final int login_password_wrong = 2;
	public static final int login_no_employeeid = 3;
	public static final int login_no_password = 4;

	public static final String session_org_id = "session_org_id";
	
	public static final String session_now_org = "session_now_org";

	public static final String session_dataSource_id = "session_dataSource_id";

	public static final String session_employee_id = "session_employee_id";
	public static final String session_employee = "session_employee";
	public static final String session_employee_ui = "session_employee_ui";
	public static final String session_employee_phone = "session_employee_phone";
	public static final String session_employee_name = "session_employee_name";
	public static final String session_job_name = "session_job_name";
	public static final String session_employee_duty = "session_employee_duty";
	public static final String session_employee_type = "session_employee_type";
	public static final String session_dept_id = "session_dept_id";
	public static final String session_token = "session_token";

	public static final String session_is_master = "session_is_master";

	public static final String save_work_error_msg_start_early = "newworkstartearly";
	public static final String save_work_error_msg_end_early = "newworkend.early";

	public static final String all_employee_duty_map = "all_employee_duty_map";
	public static final String all_employee_duty_list = "all_employee_duty_list";

	public static final String jsp_login = "/love/index.jsp";

	public static final String cookie_employeeid = "cookie_employeeid";
	public static final String cookie_sessionid = "cookie_sessionid";
	public static final String cookie_logintime = "cookie_logintime";

	public static final String coder_key = "hOnt13Ee5/7vGt6";

	public static String d_employee_id = "d_employee_id";
	public static String d_employee_name = "d_employee_name";
	public static String d_password = "d_password";
	public static String d_orgid = "d_orgid";
	public static String d_loginName = "d_loginName";
	public static String d_employee_type = "d_employee_type";
	public static String d_varify_e = "d_varify_e";
	public static String varify_result = "varify_result";
	public static String varify_OrgId_Attr="varify_orgid_attr";

	public static String d_index_url = "index_url";
	public static String d_ds_url = "ds_url";
	public static String d_ds_user = "ds_user";
	public static String d_ds_password = "ds_password";
	public static String d_ds_id = "d_ds_id";

	public static String ds_info = "900000";

	public static String system_select_param = "system_select_param";

	public static String every_hospital_assign_db = "1";

	public static String every_member_assign_db = "1";

	public static int db_num_each_server = 12;

	//public static String encache_login_url = "encache_login_url";
	//public static String encache_save_employee_url = "encache_save_employee_url";
	//public static String encache_update_password_url = "encache_update_password_url";
	public static String encache_dcache_ip = "encache_dcache_ip";
	public static String encache_dcache_port = "encache_dcache_port";
	//public static String encache_get_hospital_url = "encache_get_hospital_url";
	public static String encache_bcc_url = "encache_bcc_url";
	
	public static String encache_get_var_url = "encache_get_var_url";

	public static String encache_dcache_functionMap = "encache_dcache_functionMap";
	public static String encache_dcache_menuTree = "encache_dcache_menuTree";
	public static String encache_dcache_menuMap = "encache_dcache_menuMap";

	public static int org_type_hospital = 1;

}
