package com.xt.ssb.menu.bussiness;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.xt.privilege.resource.bussiness.FunctionDS;
import com.xt.privilege.resource.model.Function;
import com.xt.ssb.cache.EnQuickCache;
import com.xt.ssb.common.bussiness.GenericDS;
import com.xt.ssb.common.domain.PageInfo;
import com.xt.ssb.menu.model.Menu;
import com.xt.ssb.menu.model.MenuCommon;
import com.xt.ssb.util.Constants;
import com.xt.ssb.util.bean.BeanConvertUtil;

@Component
public class MenuDS extends GenericDS {

	@Resource
	com.xt.ssb.menu.dao.MenuDAO dao;

	@Resource
	FunctionDS functionDS;

	/***
	 * 获取模型对象
	 * 
	 * @param modelId
	 * @return
	 */
	public Menu getMenuByPk(long menuId) {
		return dao.getMenuByPk(menuId);
	}

	/***
	 * 保存模型对象
	 * 
	 * @param page
	 * @param parameter
	 */
	@Transactional
	@SuppressWarnings("unchecked")
	public Menu saveMenu(Menu menu) {
		if (StringUtils.isEmpty(menu.getParentId())) {
			menu.setParentId(default_menu_root_id);
		}
		if (StringUtils.isEmpty(menu.getMenuId())) {
			// 如果该菜单没有生成过，生成orderIndex
			Map<String, Object> indexObj = dao.getMaxOrderByParentId(menu
					.getParentId());
			if (indexObj == null
					|| StringUtils.isEmpty(indexObj.get("orderIndex"))) {
				menu.setOrderIndex(0);
			} else {
				int index = Integer.parseInt(indexObj.get("orderIndex")
						.toString()) + 1;
				menu.setOrderIndex(index);
			}
		}

		Date now = new Date();
		menu.setCreateBy(getCurrentEmployeeNameUI());
		menu.setCreateDate(now);
		menu.setLastUpdateBy(getCurrentEmployeeNameUI());
		menu.setLastUpdateDate(now);
		menu = dao.save(menu);
		setCacheMenu();
		Function function = new Function();
		function.setFunctionId(menu.getMenuId());
		function.setUri(menu.getUrl());
		function.setRemark(menu.getName());
		function.setParentId(menu.getParentId());
		function.setFunctionType(0);
		this.functionDS.saveFunction(function);
		return menu;
	}

	/***
	 * 删除模型对象
	 * result int
	 * @param page
	 * @param parameter
	 */
	@Transactional
	public int deleteMenuByPk(long menuId) {
		int result = 0;
		try {
			dao.deleteMenuByPk(menuId);
			setCacheMenu();
			result = 1;
		} catch (Exception e) {
			result = 0;
		}
		return result;

	}

	/****
	 * 获取所有模型对象
	 * 
	 * @param resourceId
	 * @return
	 */
	public List<Menu> getAllMenuList() {
		return dao.getAllMenuList();
	}

	public PageInfo<Menu> queryForListPage(HashMap<String, Object> params,
			int size, int start) {
		return dao.queryForListPage(params, size, start);
	}

	static long default_menu_root_id = 0l;

	/***
	 * 获取所有的菜单，拼装为树结构返回
	 * 
	 * @return
	 */
	public List<MenuCommon> getMenuTree(int noDisable) {
		List<Menu> menuList = dao.getMenuListByParentId(-1, noDisable);

		return setMenuTree(changeMenuToMenuCommon(menuList));
		/*
		 * List<Menu> menuTreeList = new LinkedList<Menu>();
		 * 
		 * HashMap<Long, List<Menu>> menuMap = new HashMap<Long, List<Menu>>();
		 * 
		 * for (Menu m : menuList) {
		 * 
		 * List<Menu> mlTemp = menuMap.get(m.getParentId()); if (mlTemp == null)
		 * { mlTemp = new LinkedList<Menu>(); } mlTemp.add(m);
		 * menuMap.put(m.getParentId(), mlTemp); }
		 * 
		 * for (Menu m : menuList) { // 挂载子节点
		 * m.setChildren(menuMap.get(m.getMenuId())); if
		 * (m.getParentId().equals(default_menu_root_id)) { // 拼装结果集
		 * menuTreeList.add(m); } }
		 */
	}

	/****
	 * 根据父ID获取节点列表
	 * 
	 * @param parentId
	 * @param noDisable为1
	 *            不获取visiable为0的菜单
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<Menu> getMenuListByParentId(long parentId, int noDisable) {
		List<Menu> menuList = dao.getMenuListByParentId(parentId, noDisable);
		return menuList;
	}

	/****
	 * 根据父ID获取节点列表，附带childrenCount查询
	 * 
	 * @param parentId
	 * @param noDisable为1
	 *            不获取visiable为0的菜单
	 * @return
	 */
	public List<Menu> getMenuListWithChildrenByParentId(long parentId,
			int noDisable) {
		return dao.getMenuListWithChildrenByParentId(parentId, noDisable);
	}

	public List<Menu> getMenu() {
		return dao.getAllMenuList();
	}

	/**
	 * 获取缓存
	 * 
	 */

	public static Menu getCacheMenu(Long parentId, Long menuId) {
		List<Menu> menu = (List<Menu>) EnQuickCache.getInstance().getValue(
				Constants.encache_dcache_menuTree);
		if (menu == null) {
			return null;
		}
		for (Menu m : menu) {
			HashMap<Long, List<Menu>> chil = (HashMap<Long, List<Menu>>) m
					.getChildren();
			List<Menu> c = chil.get(parentId);
			for (Menu e : c) {
				if (e.getMenuId() == menuId) {
					return e;
				}
			}
		}
		return null;
	}

	/**
	 * 修改缓存
	 * 
	 * @param patentId
	 * @param menu
	 */
	public void setCacheMenu() {
		List<MenuCommon> menuTree = (List<MenuCommon>) getMenuTree(0);
		if (menuTree != null) {
			EnQuickCache.getInstance().setValue(
					Constants.encache_dcache_menuTree, menuTree);
		}
	}

	/**
	 * 测试菜单
	 */
	public List<Menu> getMenuTree1() {
		List<Menu> list = (List<Menu>) EnQuickCache.getInstance().getValue(
				Constants.encache_dcache_menuTree);
		return list;
	}

	/**
	 * 创建菜单树
	 */
	public List<MenuCommon> setMenuTree(List<MenuCommon> menuList) {
		List<MenuCommon> menuTreeList = new LinkedList<MenuCommon>();

		HashMap<Long, List<MenuCommon>> menuMap = new HashMap<Long, List<MenuCommon>>();
		HashMap<Long, MenuCommon> menuMapTemp = new HashMap<Long, MenuCommon>();
		for (MenuCommon m : menuList) {
			menuMapTemp.put(m.getMenuId(), m);
			List<MenuCommon> mlTemp = menuMap.get(m.getParentId());
			if (mlTemp == null) {
				mlTemp = new LinkedList<MenuCommon>();
			}
			mlTemp.add(m);
			menuMap.put(m.getParentId(), mlTemp);
		}
		for (MenuCommon m : menuList) {
			// 挂载子节点
			m.setChildren(menuMap.get(m.getMenuId()));
			if (m.getParentId().equals(default_menu_root_id)) {
				// 拼装结果集
				menuTreeList.add(m);
			}
		}
		return menuTreeList;
	}

	/**
	 * 菜单转换
	 */
	private List<MenuCommon> changeMenuToMenuCommon(List<Menu> menuList) {
		if (menuList != null) {
			List<MenuCommon> menuCommonList = new ArrayList<MenuCommon>();
			for (Menu menu : menuList) {
				menuCommonList.add(BeanConvertUtil.convertBeanByFieldName(menu,
						MenuCommon.class));
			}
			return menuCommonList;
		}
		return null;
	}

}
