package com.xt.ssb.web;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.xt.ssb.cache.EnQuickCache;
import com.xt.ssb.util.Constants;

public class LogoutServlet extends HttpServlet {
	public LogoutServlet() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		super.destroy();
	}

	@Override
	protected void doGet(HttpServletRequest arg0, HttpServletResponse arg1)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(arg0, arg1);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		req.getSession().removeAttribute(Constants.session_employee_id);
		req.getSession().removeAttribute(Constants.session_employee_id);
		req.getSession().removeAttribute(Constants.session_employee_name);
		req.getSession().removeAttribute(Constants.session_employee_phone);
		req.getSession().removeAttribute(Constants.session_org_id);
		req.getSession().removeAttribute(Constants.session_dept_id);
		if (SessiontimeoutFilter.debugger) {
			resp.sendRedirect(req.getContextPath() + "/login.jsp");
		} else {
			resp.sendRedirect(EnQuickCache.getInstance()
					.getValue(Constants.encache_bcc_url).toString()
					+ "/login.jsp");
		}

	}
}
