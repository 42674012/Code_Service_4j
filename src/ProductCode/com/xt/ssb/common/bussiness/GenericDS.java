package com.xt.ssb.common.bussiness;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;

import com.xt.oms.org.model.Org;
import com.xt.ssb.util.Constants;

public abstract class GenericDS {

	@Autowired
	public HttpServletRequest request;

	/***
	 * 获取当前登录人的ID
	 * 
	 * @return
	 */
	public Long getCurrentEmployeeId() {
		Object d = request.getSession().getAttribute(
				Constants.session_employee_id);
		if (d == null) {
			return 100l;
		} else {
			return Long.parseLong(d.toString());
		}
	}

	/***
	 * 获取当前登录人的姓名
	 * 
	 * @return
	 */
	public String getCurrentEmployeeNameUI() {
		return request.getSession()
				.getAttribute(Constants.session_employee_name) ==null?"":request.getSession()
						.getAttribute(Constants.session_employee_name).toString()
				+ request.getSession()
						.getAttribute(Constants.session_employee_phone)
						.toString();
	}
	/**
	 * 获取当前登录人医院列表
	 * @return
	 */
	public Org getCurrentEmployeeOrg(){
		Object obj=request.getSession()
			.getAttribute(Constants.session_now_org);
		if(obj!=null){
		  return (Org) obj;
		}
		return null;
	}
	/**
	 * 获取当前登录人医院列表
	 * @return
	 */
	public Org getCurrentOrg(){
		Object obj=request.getSession()
			.getAttribute(Constants.session_now_org);
		if(obj!=null){
		  return (Org) obj;
		}
		return null;
	}
	
	public HttpSession getSession() {
		return request.getSession();
	}


	public String getCurrentDeptId() {
		return request.getSession().getAttribute(Constants.session_dept_id)
				.toString();
	}
}
