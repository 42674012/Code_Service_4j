package com.xt.ssb.dict.dao;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Repository;

import com.xt.ssb.common.dao.GenericDAO;
import com.xt.ssb.common.domain.PageInfo;
import com.xt.ssb.dict.model.DictType;
import com.xt.ssb.util.Constants;

@Repository
public class DictTypeDAO extends GenericDAO<DictType> {

	public DictTypeDAO() {
		super(DictType.class);
	}

	/****
	 * 删除模型对象
	 * 
	 * @param resourceId
	 * @return
	 */
	public void deleteDictTypeByPk(long dictTypeId) {
		if (dictTypeId != -1l) {
			String hql = " delete DictType t   where t.dictTypeId = ? ";
			excuteHql(hql, new Object[] { dictTypeId });
		}
	}

	/****
	 * 根据ID获取模型对象
	 * 
	 * @param resourceId
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public DictType getDictTypeByPk(long dictTypeId) {
		String hql = " from DictType t  where 1=1 and t.dictTypeId = ?  ";
		List<DictType> list = queryForList(hql, new Object[] { dictTypeId });
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
	public List<DictType> getAllDictTypeList() {
		String hql = " from DictType t";
		List<DictType> list = queryForList(hql, new Object[] {});
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
	public PageInfo<DictType> queryForListPage(
			HashMap<String, Object> parameterMap, int size, int start) {
		StringBuilder hql = new StringBuilder("from DictType where 1 = 1");
		Map parameters = new HashMap();
		if (parameterMap != null) {
			Object dictTypeIdObj = parameterMap.get("dictTypeId");
			if (dictTypeIdObj != null
					&& !StringUtils.isEmpty(dictTypeIdObj.toString())) {
				hql.append(" and dictTypeId like :dictTypeId escape '/'");
				parameters.put("dictTypeId",
						getLikeKeyworkd(dictTypeIdObj.toString()));
			}

			Object parentIdObj = parameterMap.get("parentId");
			if (parentIdObj != null
					&& !StringUtils.isEmpty(parentIdObj.toString())) {
				hql.append(" and parentId like :parentId escape '/'");
				parameters.put("parentId",
						getLikeKeyworkd(parentIdObj.toString()));
			}

			Object nameObj = parameterMap.get("name");
			if (nameObj != null && !StringUtils.isEmpty(nameObj.toString())) {
				hql.append(" and name like :name escape '/'");
				parameters.put("name", getLikeKeyworkd(nameObj.toString()));
			}

			Object codeObj = parameterMap.get("code");
			if (codeObj != null && !StringUtils.isEmpty(codeObj.toString())) {
				hql.append(" and code like :code escape '/'");
				parameters.put("code", getLikeKeyworkd(codeObj.toString()));
			}

			Object expandObj = parameterMap.get("expand");
			if (expandObj != null && !StringUtils.isEmpty(expandObj.toString())) {
				hql.append(" and expand like :expand escape '/'");
				parameters.put("expand", getLikeKeyworkd(expandObj.toString()));
			}

			Object parentNameObj = parameterMap.get("parentName");
			if (parentNameObj != null
					&& !StringUtils.isEmpty(parentNameObj.toString())) {
				hql.append(" and parentName like :parentName escape '/'");
				parameters.put("parentName",
						getLikeKeyworkd(parentNameObj.toString()));
			}

			Object orderIndexObj = parameterMap.get("orderIndex");
			if (orderIndexObj != null
					&& !StringUtils.isEmpty(orderIndexObj.toString())) {
				hql.append(" and orderIndex = :orderIndex");
				parameters.put("orderIndex", orderIndexObj);
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
	public DictType getDictTypeByParentId(long dictTypeId) {
		if (dictTypeId != -1l) {
			String hql = " from DictType t  where 1=1 and t.parentId = ?  ";
			List<DictType> list = queryForList(hql, new Object[] { dictTypeId });
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
	public Map<String, Object> getMaxOrderByParentId(Long dictTypeId) {
		if (dictTypeId != -1) {
			String sql = "select max(order_index) as orderIndex from ssb_dict_type t  where 1=1 and t.parent_Id = ?  ";
			return this.getMapBySql(sql, new Object[] { dictTypeId });
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
	public List<DictType> getDictTypeListByParentId(long parentId, int noDisable) {
		List<Object> params = new LinkedList<Object>();
		String hql = " from DictType where 1=1";
		if (parentId != -1l) {
			hql += " and parentId = ? ";
			params.add(parentId);
		}
		if (noDisable == 1) {
			hql += " and visiable = 1 ";
		}
		hql += " order by orderIndex";
		List<DictType> list = this.queryForList(hql, params.toArray());
		return list;
	}

	/****
	 * 根据ID获取模型对象
	 * 
	 * @param resourceId
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<DictType> getDictTypeListWithChildrenByParentId(long parentId,
			int noDisable) {
		List<Object> params = new LinkedList<Object>();

		StringBuffer sb = new StringBuffer("select ");

		sb.append(" dict_type_id as dictTypeId  , ");

		sb.append(" parent_id as parentId  , ");

		sb.append(" name as name  , ");

		sb.append(" code as code  , ");

		sb.append(" expand as expand  , ");

		sb.append(" parent_name as parentName  , ");

		sb.append(" order_index as orderIndex  , ");

		sb.append(" create_date as createDate  , ");

		sb.append(" create_by as createBy  , ");

		sb.append(" last_update_date as lastUpdateDate  , ");

		sb.append(" last_update_by as lastUpdateBy  , ");
		sb.append("  (select count(*) from  ssb_dict_type as t1 where t1.parent_Id= t.dict_type_id) as childrenCount ");

		sb.append(" from ssb_dict_type as t where 1=1 ");
		if (parentId != -1l) {
			sb.append(" and parent_Id = ? ");
			params.add(parentId);
		}
		if (noDisable == 1) {
			sb.append(" and visiable = 1 ");
		}
		sb.append(" order by orderIndex");
		List<DictType> list = this.queryListSpecifyBySql(sb.toString(),
				params.toArray(), DictType.class);
		return list;
	}
	/**
	 * @Description // </br>
	 * @author csm_
	 * @date 2015年10月8日-下午12:44:18
	 * @param parentId
	 * @param noDisable
	 * @return
	 */
	public List<DictType> getDictTypeListByTypeCode(String code) {
		List<Object> params = new LinkedList<Object>();
		
		StringBuffer sb = new StringBuffer("select ");
		
		sb.append(" dict_type_id as dictTypeId  , ");
		
		sb.append(" parent_id as parentId  , ");
		
		sb.append(" name as name  , ");
		
		sb.append(" code as code  , ");
		
		sb.append(" expand as expand  , ");
		
		sb.append(" parent_name as parentName  , ");
		
		sb.append(" order_index as orderIndex  , ");
		
		sb.append(" create_date as createDate  , ");
		
		sb.append(" create_by as createBy  , ");
		
		sb.append(" last_update_date as lastUpdateDate  , ");
		
		sb.append(" last_update_by as lastUpdateBy  , ");
		sb.append("  (select count(*) from  ssb_dict_type as t1 where t1.parent_Id= t.dict_type_id) as childrenCount ");
		
		sb.append(" from ssb_dict_type as t where 1=1 ");
		if (code != null && code != "") {
			sb.append(" and code = ? ");
			params.add(code);
		}
		sb.append(" order by orderIndex");
		List<DictType> list = this.queryListSpecifyBySql(sb.toString(),
				params.toArray(), DictType.class);
		return list;
	}

	/**
	 * @Description 根据条件查询 </br>
	 * @author csm_
	 * @date 2015年10月8日-下午6:20:42
	 * @param t
	 * @return
	 */
	public List<DictType> getList(DictType t) {
		List<Object> params = new LinkedList<Object>();

		StringBuffer sb = new StringBuffer("select ");

		sb.append(" dict_type_id as dictTypeId  , ");

		sb.append(" parent_id as parentId  , ");

		sb.append(" name as name  , ");

		sb.append(" code as code  , ");

		sb.append(" expand as expand  , ");

		sb.append(" parent_name as parentName  , ");

		sb.append(" order_index as orderIndex  , ");

		sb.append(" create_date as createDate  , ");

		sb.append(" create_by as createBy  , ");

		sb.append(" last_update_date as lastUpdateDate  , ");

		sb.append(" last_update_by as lastUpdateBy  , ");
		sb.append(" pinyin_header as pinYinHeader  , ");
		sb.append("  (select count(*) from  ssb_dict_type as t1 where t1.parent_Id= t.dict_type_id) as childrenCount ");

		sb.append(" from ssb_dict_type as t where 1=1 ");
		if (t.getParentId() != null && t.getParentId() != -1l) {
			sb.append(" and parent_Id = ? ");
			params.add(t.getParentId());
		}
		if (t.getDictTypeId() != null && t.getDictTypeId() != -1l) {
			sb.append(" and dict_type_id = ? ");
			params.add(t.getDictTypeId());
		}
		if (t.getName() != "" && t.getName() != null) {
			sb.append(" and name = ? ");
			params.add(t.getName());
		}
		if (t.getCode() != "" && t.getCode() != null) {
			sb.append(" and code = ? ");
			params.add(t.getCode());
		}
		if (t.getExpand() != "" && t.getExpand() != null) {
			sb.append(" and expand = ? ");
			params.add(t.getExpand());
		}
		if (t.getPinYinHeader() != "" && t.getPinYinHeader() != null) {
			sb.append(" and pinyin_header = ? ");
			params.add(t.getPinYinHeader());
		}
		if (t.getPinYinHeader() != "" && t.getPinYinHeader() != null) {
			sb.append(" and pinyin_header = ? ");
			params.add(t.getPinYinHeader());
		}
		if (t.getParentName() != "" && t.getParentName() != null) {
			sb.append(" and parent_name = ? ");
			params.add(t.getParentName());
		}
		sb.append(" order by orderIndex");
		List<DictType> list = this.queryListSpecifyBySql(sb.toString(),
				params.toArray(), DictType.class);
		return list;
	}
	
	public List<Map<String, Object>> getJob(String q) {
		
		StringBuffer sql = new StringBuffer("SELECT CONCAT_WS('-',t.`name`,r.`name`) as name,t.`name` as jobType,r.name as jobName from ssb_dict_type t,ssb_dict_type r "
				+ "where t.dict_type_id = r.parent_id");
		sql.append(" and t.parent_id = (SELECT dict_type_id from ssb_dict_type where code = '$job') "
				+ "and (r.`name` LIKE ?' or r.pinyin_header LIKE ?)");
		return this.queryMapListBySql(sql.toString(), new Object[]{getLikeKeyworkd(q),getLikeKeyworkd(q)});
	}

	/**
	 * @date 2015年10月27日-下午1:42:50
	 * @param code
	 * @return
	 */
	public List<Map<String, Object>> queryChilrenListByCode(String code) {
		StringBuffer sql = new StringBuffer("SELECT l.`code` as `code`,l.`name` as `name`,l.dict_type_id as dictTypeId from ssb_dict_type l,ssb_dict_type r where l.parent_id = r.dict_type_id and r.`code` = ?");
		return this.queryMapListBySql(sql.toString(), new Object[]{code});
	}
	
	/**
	 * 渠道查询使用
	 */
	public List<DictType> queryDictForChannel(String dictKey){
		String sql = "select tt.dict_type_id as dictTypeId ,tt.parent_id as parentId, "
				+ " tt.`name` as name ,tt.`code` as code,tt.expand as expand,tt.parent_name as parentName,tt.order_index as orderIndex  "
				+ " from ssb_dict_type tt,( select t1.dict_type_id as dict_type_id from ssb_dict_type t1 where  t1. code = '"+dictKey+"' ) t2  "
				+ " where  t2.dict_type_id=tt.parent_id  ";
		List<Object> parameters = new ArrayList<Object>();
		return this.queryListSpecifyBySql(sql, parameters.toArray(),DictType.class);
		
	}
}
