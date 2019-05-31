package com.xt.ssb.dict.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Repository;

import com.xt.ssb.common.dao.GenericDAO;
import com.xt.ssb.common.domain.PageInfo;
import com.xt.ssb.dict.facade.DictDomain;
import com.xt.ssb.dict.model.Dict;

@Repository
public class DictDAO extends GenericDAO<Dict> {

	public DictDAO() {
		super(Dict.class);
	}

	/****
	 * 删除模型对象
	 * 
	 * @param resourceId
	 * @return
	 */
	public void deleteDictByPk(long dictId) {
		String hql = " update Dict t set t.isDelete=1  where t.dictId = ? ";
		excuteHql(hql, new Object[] { dictId });
	}
	/****
	 * 更新字典值
	 * 
	 * @param resourceId
	 * @return
	 */
	public void updateDict(Dict dict) {
		 this.update(dict);
	}
	/****
	 * 根据ID获取模型对象
	 * 
	 * @param resourceId
	 * @return
	 */
	public Dict getDictByPk(long dictId) {
		String hql = " from Dict t  where 1=1 and t.dictId = ? and isDelete=0 ";
		List<Dict> list = queryForList(hql, new Object[] { dictId });
		if (list != null && list.size() > 0) {
			return list.get(0);
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
	public Dict getDictByDictKey(String dictKey) {
		String hql = " from Dict t  where 1=1 and t.dictKey = ? and isDelete=0 ";
		List<Dict> list = queryForList(hql, new Object[] { dictKey });
		if (list != null && list.size() > 0) {
			return list.get(0);
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
	public List<Dict> getDictByDictTypeId(long dictTypeId) {
		String hql = " from Dict t  where 1=1 and t.dictTypeId = ? and isDelete=0  ";
		return queryForList(hql, new Object[] { dictTypeId });
	}

	/****
	 * 根据ID获取模型对象
	 * 
	 * @param resourceId
	 * @return
	 */
	public List<Object> getDictByDictTypeCode(String dictTypeCode) {

		if (!StringUtils.isEmpty(dictTypeCode)) {
			String sql = "select  dict_id as dictId, dict_Name as dictName, dict_value as dictValue ,dict_key as dictKey from ssb_dict t,ssb_dict_type tt  where 1=1 and t.dict_Type_Id = tt.dict_Type_Id and tt.Code =? and t.is_delete=0 ";
			List<Object> list = queryListBySql(sql,
					new Object[] { dictTypeCode }, DictDomain.class);
			return list;
		}
		return null;
	}
	
	
	/****
	 * 根据ID获取模型对象
	 * 
	 * @param resourceId
	 * @return
	 */
	public List<Object> getDictByParentCode(String dictTypeCode) {

		if (!StringUtils.isEmpty(dictTypeCode)) {
			String sql = "select dict_Name as dictName, dict_value as dictValue ,dict_key as dictKey from ssb_dict t,ssb_dict_type tt  where 1=1 and  t.is_delete=0 and t.dict_Type_Id = tt.dict_Type_Id and tt.parent_id in (select a.dict_Type_Id from ssb_dict_type a where a.Code = ?  )  ";
			List<Object> list = queryListBySql(sql,
					new Object[] { dictTypeCode }, DictDomain.class);
			return list;
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
	public Map getDictByDictType(String dictTypeCode) {
		Map<String, String> map = new HashMap<String, String>();
		if (!StringUtils.isEmpty(dictTypeCode)) {
			String sql = "select dict_Name as dictName, dict_value as dictValue from ssb_dict t,ssb_dict_type tt  where 1=1 and t.is_delete=0 and t.dict_Type_Id = tt.dict_Type_Id and tt.Code = ?  ";
			List<Object> list = queryListBySql(sql,new Object[] { dictTypeCode }, DictDomain.class);
			if(list != null){
				for(int i =0;i<list.size();i++){
					DictDomain dict = (DictDomain)list.get(i);
					map.put(dict.getDictValue()+"", dict.getDictName());
				}
			}
			return map;
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
	public List<Dict> getAllDictList() {
		String hql = " from Dict t where t.isDelete=0";
		List<Dict> list = queryForList(hql, new Object[] {});
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
	public PageInfo<Dict> queryForListPage(
			HashMap<String, Object> parameterMap, int size, int start) {
		StringBuilder hql = new StringBuilder("from Dict where 1 = 1 and  isDelete=0 ");
		Map parameters = new HashMap();
		if (parameterMap != null) {
			Object dictIdObj = parameterMap.get("dictId");
			if (dictIdObj != null && !StringUtils.isEmpty(dictIdObj.toString())) {
				hql.append(" and dictId like :dictId escape '/'");
				parameters.put("dictId", getLikeKeyworkd(dictIdObj.toString()));
			}

			Object dictKeyObj = parameterMap.get("dictKey");
			if (dictKeyObj != null
					&& !StringUtils.isEmpty(dictKeyObj.toString())) {
				hql.append(" and dictKey like :dictKey escape '/'");
				parameters.put("dictKey",
						getLikeKeyworkd(dictKeyObj.toString()));
			}

			Object dictValueObj = parameterMap.get("dictValue");
			if (dictValueObj != null
					&& !StringUtils.isEmpty(dictValueObj.toString())) {
				hql.append(" and dictValue like :dictValue escape '/'");
				parameters.put("dictValue",
						getLikeKeyworkd(dictValueObj.toString()));
			}

			Object dictNameObj = parameterMap.get("dictName");
			if (dictNameObj != null
					&& !StringUtils.isEmpty(dictNameObj.toString())) {
				hql.append(" and dictName like :dictName escape '/'");
				parameters.put("dictName",
						getLikeKeyworkd(dictNameObj.toString()));
			}

			Object dictTypeIdObj = parameterMap.get("dictTypeId");
			if (dictTypeIdObj != null
					&& !StringUtils.isEmpty(dictTypeIdObj.toString())) {
				hql.append(" and dictTypeId = :dictTypeId ");
				parameters.put("dictTypeId",Long.parseLong(dictTypeIdObj.toString()));
			}
		}
		return this.queryForListPage(hql.toString(), parameters, size, start);
	}
	/**
	 * 查询创建人员的bcc地址
	 */
	public String selectUrl(String dictKey){
		String hql = " from Dict t  where 1=1  and t.dictKey = ?  and t.isDelete=0  ";
		List<Dict> list = queryForList(hql, new Object[] {dictKey});
		if (list != null && list.size() > 0) {
			return list.get(0).getDictValue();
		}
		return null;
	}
	
}
