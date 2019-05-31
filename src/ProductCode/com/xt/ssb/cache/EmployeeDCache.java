package com.xt.ssb.cache;

import java.util.HashMap;
import java.util.List;

public class EmployeeDCache {

	public static String employee_table_name = "100_";

	public static String employee_login_table = "101_";

	public static String employee_sso_info = "102_";

	public static int session_timeout = 7200;

	public static void setEmployee(String key, HashMap value) {
		DCache.hmset(employee_table_name, key, value);
	}

	public static List<String> getEmployee(String key, String name) {
		return DCache.hmget(employee_table_name, key, name);
	}

	public static void setEmployeeValidate(String key, HashMap value) {
		DCache.hmset(employee_login_table, key, value);
	}

	public static void delEmployeeValidate(String key) {
		DCache.hdel(employee_login_table, key);
	}

	public static List<String> getEmployeeValidate(String key, String name,
			String name1) {
		return DCache.hmget(employee_login_table, key, name, name1);
	}

	public static List<String> getEmployeeValidate(String key, String name,
			String name1, String name2, String name3) {
		return DCache.hmget(employee_login_table, key, name, name1, name2,
				name3);
	}

	public static List<String> hvalsEmployeeValidate(String key) {
		return DCache.hvals(employee_login_table, key);
	}

	/***
	 * 该方法带有超时时间，默认2小时失效
	 * 
	 * @param key
	 * @param value
	 */
	public static void setEmployeeSSOInfo(String key, String value) {
		DCache.setex(employee_sso_info, key, session_timeout, value);
	}

	public static String getEmployeeSSOInfo(String key, String ip, String port) {
		return DCache.get(employee_sso_info, key);
	}

	public static void main(String[] args) {

	}
}
