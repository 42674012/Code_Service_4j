package com.xt.ssb.util.security;

import java.util.HashMap;
import java.util.List;

import com.xt.ssb.cache.EmployeeDCache;
import com.xt.ssb.util.Constants;

public class LoginCenter {

	public static String login_name = "loginName";
	public static String login_obj = "loginObj";

	public static void save(List<HashMap> mapList) {
		for (HashMap<String, Object> m : mapList) {
			EmployeeDCache.setEmployeeValidate(m.get(login_name).toString(),
					(HashMap<String, String>) m.get(login_obj));
		}
	}

	public static void remove(String key) {
		EmployeeDCache.delEmployeeValidate(key);
	}

	/***
	 * 通过redis进行认证
	 * 
	 * @param userName
	 * @param password
	 * @return
	 */
	public static HashMap<String, String> validate(String userName,
			String password) throws Exception {
		password = MD5Crypto.encodePwdByMd5(password);
		List<String> cacheList = EmployeeDCache.getEmployeeValidate(userName,
				Constants.d_password, Constants.d_employee_id,
				Constants.d_employee_type, Constants.d_employee_name);
		HashMap<String, String> hm = new HashMap<String, String>();
		// 用户不存在
		hm.put(Constants.varify_result, "02");
		if (cacheList != null && cacheList.size() > 0) {
			if (password.equals(cacheList.get(0))) {
				// 认证成功，返回
				hm.put(Constants.varify_result, "00");
				hm.put(Constants.d_employee_id, cacheList.get(1));
				hm.put(Constants.d_employee_type, cacheList.get(2));
				hm.put(Constants.d_employee_name, cacheList.get(3));

			} else {
				// 密码错误
				hm.put(Constants.varify_result, "01");
			}
		}
		return hm;
	}

	/***
	 * 通过redis进行认证
	 * 
	 * @param userName
	 * @param password
	 * @return
	 */
	public static void updateOrgRelation(String userName) {
		// 获取整个Map
		List<String> cacheList = EmployeeDCache.hvalsEmployeeValidate(userName);

	}
}
