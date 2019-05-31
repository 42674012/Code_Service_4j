package com.xt.ssb.menu.dao;

import java.text.ParseException;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Repository;

import com.xt.ssb.common.dao.GenericDAO;
import com.xt.ssb.common.domain.PageInfo;
import com.xt.ssb.menu.model.Menu;
import com.xt.ssb.util.Constants;

@Repository
public class MenuDAO extends GenericDAO<Menu> {

	public MenuDAO() {
		super(Menu.class);
	}

	/****
	 * 删除模型对象
	 * 
	 * @param resourceId
	 * @return
	 */
	public void deleteMenuByPk(long menuId) {
		String hql = " delete Menu t   where t.menuId = ? ";
		excuteHql(hql, new Object[] { menuId });
	}

	/****
	 * 根据ID获取模型对象
	 * 
	 * @param resourceId
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Menu getMenuByPk(long menuId) {
		String hql = " from Menu t  where 1=1 and t.menuId = ?  ";
		List<Menu> list = queryForList(hql, new Object[] { menuId });
		if (list != null && list.size() > 0) {
			return list.get(0);
		}
		return null;
	}

	/****
	 * 获取所有模型对象
	 * 
	 * @param resourceId
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<Menu> getAllMenuList() {
		String hql = " from Menu t";
		List<Menu> list = queryForList(hql, new Object[] {});
		return list;
	}

	/***
	 * 分页查询模型数据
	 * 
	 * @param page
	 * @param key
	 * @param value
	 * @param desc
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public PageInfo<Menu> queryForListPage(
			HashMap<String, Object> parameterMap, int size, int start) {
		StringBuilder hql = new StringBuilder("from Menu where 1 = 1");
		Map parameters = new HashMap();
		if (parameterMap != null) {
			Object menuIdObj = parameterMap.get("menuId");
			if (menuIdObj != null && !StringUtils.isEmpty(menuIdObj.toString())) {
				hql.append(" and menuId = :menuId");
				parameters.put("menuId", menuIdObj);
			}

			Object nameObj = parameterMap.get("name");
			if (nameObj != null && !StringUtils.isEmpty(nameObj.toString())) {
				hql.append(" and name like :name escape '/'");
				parameters.put("name", getLikeKeyworkd(nameObj.toString()));
			}

			Object remboObj = parameterMap.get("rembo");
			if (remboObj != null && !StringUtils.isEmpty(remboObj.toString())) {
				hql.append(" and rembo like :rembo escape '/'");
				parameters.put("rembo", getLikeKeyworkd(remboObj.toString()));
			}

			Object urlObj = parameterMap.get("url");
			if (urlObj != null && !StringUtils.isEmpty(urlObj.toString())) {
				hql.append(" and url like :url escape '/'");
				parameters.put("url", getLikeKeyworkd(urlObj.toString()));
			}

			Object visiableObj = parameterMap.get("visiable");
			if (visiableObj != null
					&& !StringUtils.isEmpty(visiableObj.toString())) {
				hql.append(" and visiable = :visiable");
				parameters.put("visiable", visiableObj);
			}

			Object createDateStartObj = parameterMap.get("createDateStart");
			if (createDateStartObj != null) {
				Date createDateStart = null;
				try {
					createDateStart = Constants.sdf.parse(createDateStartObj
							.toString().replace('T', ' '));
					createDateStart.setDate(createDateStart.getDate() - 1);
					createDateStart.setHours(23);
					createDateStart.setMinutes(59);
					createDateStart.setSeconds(59);
				} catch (ParseException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}

				hql.append(" and  createDate >= :createDateStart ");
				parameters.put("createDateStart", createDateStart);
			}

			Object createDateEndObj = parameterMap.get("createDateEnd");
			if (createDateEndObj != null) {
				Date createDateEnd = null;

				try {
					createDateEnd = Constants.sdf.parse(createDateEndObj
							.toString().replace('T', ' '));
					createDateEnd.setDate(createDateEnd.getDate());
					createDateEnd.setHours(23);
					createDateEnd.setMinutes(59);
					createDateEnd.setSeconds(59);
				} catch (ParseException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}

				hql.append(" and  createDate <= :createDateEnd ");
				parameters.put("createDateEnd", createDateEnd);
			}
			Object createByObj = parameterMap.get("createBy");
			if (createByObj != null
					&& !StringUtils.isEmpty(createByObj.toString())) {
				hql.append(" and createBy like :createBy escape '/'");
				parameters.put("createBy",
						getLikeKeyworkd(createByObj.toString()));
			}

			Object lastUpdateDateStartObj = parameterMap
					.get("lastUpdateDateStart");
			if (lastUpdateDateStartObj != null) {
				Date lastUpdateDateStart = null;
				try {
					lastUpdateDateStart = Constants.sdf
							.parse(lastUpdateDateStartObj.toString().replace(
									'T', ' '));
					lastUpdateDateStart
							.setDate(lastUpdateDateStart.getDate() - 1);
					lastUpdateDateStart.setHours(23);
					lastUpdateDateStart.setMinutes(59);
					lastUpdateDateStart.setSeconds(59);
				} catch (ParseException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}

				hql.append(" and  lastUpdateDate >= :lastUpdateDateStart ");
				parameters.put("lastUpdateDateStart", lastUpdateDateStart);
			}

			Object lastUpdateDateEndObj = parameterMap.get("lastUpdateDateEnd");
			if (lastUpdateDateEndObj != null) {
				Date lastUpdateDateEnd = null;

				try {
					lastUpdateDateEnd = Constants.sdf
							.parse(lastUpdateDateEndObj.toString().replace('T',
									' '));
					lastUpdateDateEnd.setDate(lastUpdateDateEnd.getDate());
					lastUpdateDateEnd.setHours(23);
					lastUpdateDateEnd.setMinutes(59);
					lastUpdateDateEnd.setSeconds(59);
				} catch (ParseException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}

				hql.append(" and  lastUpdateDate <= :lastUpdateDateEnd ");
				parameters.put("lastUpdateDateEnd", lastUpdateDateEnd);
			}
			Object lastUpdateByObj = parameterMap.get("lastUpdateBy");
			if (lastUpdateByObj != null
					&& !StringUtils.isEmpty(lastUpdateByObj.toString())) {
				hql.append(" and lastUpdateBy like :lastUpdateBy escape '/'");
				parameters.put("lastUpdateBy",
						getLikeKeyworkd(lastUpdateByObj.toString()));
			}

			Object orderIndexObj = parameterMap.get("orderIndex");
			if (orderIndexObj != null
					&& !StringUtils.isEmpty(orderIndexObj.toString())) {
				hql.append(" and orderIndex = :orderIndex");
				parameters.put("orderIndex", orderIndexObj);
			}

			Object parentIdObj = parameterMap.get("parentId");
			if (parentIdObj != null
					&& !StringUtils.isEmpty(parentIdObj.toString())) {
				hql.append(" and parentId = :parentId");
				parameters.put("parentId", parentIdObj);
			}

			Object isBlankObj = parameterMap.get("isBlank");
			if (isBlankObj != null
					&& !StringUtils.isEmpty(isBlankObj.toString())) {
				hql.append(" and isBlank = :isBlank");
				parameters.put("isBlank", isBlankObj);
			}

		}
		return this.queryForListPage(hql.toString(), parameters, size, start);
	}

	/****
	 * 根据ID获取模型对象
	 * 
	 * @param resourceId
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Menu getMenuByParentId(long menuId) {
		if (menuId != -1) {
			String hql = " from Menu t  where 1=1 and t.parentId = ?  ";
			List<Menu> list = queryForList(hql, new Object[] { menuId });
			if (list != null && list.size() > 0) {
				return list.get(0);
			}
		}
		return null;
	}

	/****
	 * 根据ID获取模型对象
	 * 
	 * @param resourceId
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Map<String, Object> getMaxOrderByParentId(long menuId) {
		if (menuId != -1) {
			String sql = "select max(order_index) as orderIndex from ssb_menu t  where 1=1 and t.parent_Id = ?  ";
			return this.getMapBySql(sql, new Object[] { menuId });
		}
		return null;
	}

	/****
	 * 根据ID获取模型对象
	 * 
	 * @param resourceId
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<Menu> getMenuListByParentId(long parentId, int noDisable) {
		List<Object> params = new LinkedList<Object>();
		String hql = " from Menu where 1=1";
		if (parentId != -1) {
			hql += " and parentId = ? ";
			params.add(parentId);
		}
		if (noDisable == 1) {
			hql += " and visiable = 1 ";
		}
		hql += " order by orderIndex";
		List<Menu> list = this.queryForList(hql, params.toArray());
		return list;
	}

	/****
	 * 根据ID获取模型对象
	 * 
	 * @param resourceId
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<Menu> getMenuListWithChildrenByParentId(long parentId,
			int noDisable) {
		List<Object> params = new LinkedList<Object>();

		StringBuffer sb = new StringBuffer("select ");

		sb.append(" menu_id as menuId  , ");

		sb.append(" name as name  , ");

		sb.append(" rembo as rembo  , ");

		sb.append(" url as url  , ");

		sb.append(" visiable as visiable  , ");

		sb.append(" create_date as createDate  , ");

		sb.append(" create_by as createBy  , ");

		sb.append(" last_update_date as lastUpdateDate  , ");

		sb.append(" last_update_by as lastUpdateBy  , ");

		sb.append(" order_index as orderIndex  , ");

		sb.append(" parent_id as parentId  , ");

		sb.append(" is_blank as isBlank  , ");
		sb.append("  (select count(*) from  ssb_menu as t1 where t1.parent_Id= t.menu_id) as childrenCount ");

		sb.append(" from ssb_menu as t where 1=1 ");
		if (parentId == -1) {
			sb.append(" and parent_Id = ? ");
			params.add(parentId);
		}
		if (noDisable == 1) {
			sb.append(" and visiable = 1 ");
		}
		sb.append(" order by orderIndex");
		List<Menu> list = this.queryListSpecifyBySql(sb.toString(),
				params.toArray(), Menu.class);
		return list;
	}

}
