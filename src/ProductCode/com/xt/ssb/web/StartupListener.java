package com.xt.ssb.web;

import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.xt.privilege.resource.bussiness.FunctionDS;
import com.xt.ssb.cache.DCache;
import com.xt.ssb.cache.EnQuickCache;
import com.xt.ssb.dict.bussiness.DictDS;
import com.xt.ssb.dict.bussiness.DictTypeDS;
import com.xt.ssb.dict.model.Dict;
import com.xt.ssb.menu.bussiness.MenuDS;
import com.xt.ssb.menu.model.MenuCommon;
import com.xt.ssb.util.Constants;

//@WebListener
public class StartupListener implements ServletContextListener {

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
		WebApplicationContext webApplicationContext = WebApplicationContextUtils
				.getRequiredWebApplicationContext(arg0.getServletContext());
		// 设置初始化字典
		DictDS dictDS = (DictDS) webApplicationContext.getBean("dictDS");
		DictTypeDS dictTypeDS = (DictTypeDS) webApplicationContext
				.getBean("dictTypeDS");
		//
		// // 注册缓存
		// Dict ip = dictDS.getDictByDictKey("#dcache_ip");
		// Dict port = dictDS.getDictByDictKey("#dcache_port");
		// DCache.setup(ip.getDictValue(),
		// Integer.parseInt(port.getDictValue()));

		// 设置控制中心地址
		Dict loginUrl = dictDS.getDictByDictKey("#encache_bcc_url");
		EnQuickCache.getInstance().setValue(Constants.encache_bcc_url,
				loginUrl.getDictValue());

//		// 设置保存人员地址
//		Dict saveEmployeeURL = dictDS.getDictByDictKey("#create_employee");
//		EnQuickCache.getInstance().setValue(
//				Constants.encache_save_employee_url,
//				saveEmployeeURL.getDictValue());
//
//		// 设置修改密码地址
//		Dict encache_update_password_url = dictDS
//				.getDictByDictKey("#update_password");
//		EnQuickCache.getInstance().setValue(
//				Constants.encache_update_password_url,
//				encache_update_password_url.getDictValue());
//
//		// 设置删除人员地址
//		Dict encache_delete_employee = dictDS
//				.getDictByDictKey("#delete_employee_url");
//		EnQuickCache.getInstance().setValue(
//				Constants.encache_delete_employee_url,
//				encache_delete_employee.getDictValue());
//
//		// 设置保存人员地址
//		Dict getHospitalUrl = dictDS.getDictByDictKey("#get_hospital_info");
//		EnQuickCache.getInstance().setValue(Constants.encache_get_hospital_url,
//				getHospitalUrl.getDictValue());

		// 资源缓存
		FunctionDS function = (FunctionDS) webApplicationContext
				.getBean("functionDS");
		HashMap<String, Long> functionMap = (HashMap<String, Long>) function
				.getFunctionMap();
		if (functionMap != null) {
			EnQuickCache.getInstance().setValue(
					Constants.encache_dcache_functionMap, functionMap);
		}

		// 菜单缓存
		MenuDS menuDS = (MenuDS) webApplicationContext.getBean("menuDS");
		menuDS.setCacheMenu();
	}

}
