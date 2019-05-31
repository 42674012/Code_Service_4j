package com.xt.ssb.dict.bussiness;

import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.xt.ssb.common.bussiness.GenericDS;
import com.xt.ssb.common.domain.PageInfo;
import com.xt.ssb.dict.model.DictType;

@Component
public class DictTypeDS extends GenericDS {

	@Resource
	com.xt.ssb.dict.dao.DictTypeDAO dao;
	@Resource
	DictDS dictds;

	/***
	 * 获取模型对象
	 * 
	 * @param modelId
	 * @return
	 */
	public DictType getDictTypeByPk(long dictTypeId) {
		return dao.getDictTypeByPk(dictTypeId);
	}

	/***
	 * 保存模型对象
	 * 
	 * @param page
	 * @param parameter
	 */
	@Transactional
	@SuppressWarnings("unchecked")
	public DictType saveDictType(DictType dictType) {
		if (StringUtils.isEmpty(dictType.getParentId())) {
			dictType.setParentId(default_dictType_root_id);
		}
		if (StringUtils.isEmpty(dictType.getDictTypeId())) {
			// 如果该菜单没有生成过，生成orderIndex
			Map<String, Object> indexObj = dao.getMaxOrderByParentId(dictType
					.getParentId());
			if (indexObj == null
					|| StringUtils.isEmpty(indexObj.get("orderIndex"))) {
				dictType.setOrderIndex(0);
			} else {
				int index = Integer.parseInt(indexObj.get("orderIndex")
						.toString()) + 1;
				dictType.setOrderIndex(index);
			}
		}
		Date now = new Date();
		dictType.setCreateDate(now);
		dictType.setLastUpdateDate(now);
		return dao.save(dictType);
	}

	/***
	 * 删除模型对象
	 * 
	 * @param page
	 * @param parameter
	 */
	@Transactional
	public void deleteDictTypeByPk(Long dictTypeId) {
		dao.deleteDictTypeByPk(dictTypeId);
	}

	/****
	 * 获取所有模型对象
	 * 
	 * @param resourceId
	 * @return
	 */
	public List<DictType> getAllDictTypeList() {
		return dao.getAllDictTypeList();
	}

	public PageInfo<DictType> queryForListPage(HashMap<String, Object> params,
			int size, int start) {
		return dao.queryForListPage(params, size, start);
	}

	static long default_dictType_root_id = 0l;

	/***
	 * 获取所有的菜单，拼装为树结构返回
	 * 
	 * @return
	 */
	public List<DictType> getDictTypeTree(int noDisable) {
		List<DictType> dictTypeList = dao.getDictTypeListByParentId(-1l,
				noDisable);
		List<DictType> dictTypeTreeList = new LinkedList<DictType>();

		HashMap<Long, List<DictType>> dictTypeMap = new HashMap<Long, List<DictType>>();

		for (DictType m : dictTypeList) {

			List<DictType> mlTemp = dictTypeMap.get(m.getParentId());
			if (mlTemp == null) {
				mlTemp = new LinkedList<DictType>();
			}
			mlTemp.add(m);
			dictTypeMap.put(m.getParentId(), mlTemp);
		}

		for (DictType m : dictTypeList) {
			// 挂载子节点
			List<DictType> temp = dictTypeMap.get(m.getDictTypeId());
			m.setChildren(temp);
			if (m.getParentId() == default_dictType_root_id) {
				// 拼装结果集
				dictTypeTreeList.add(m);
			}
		}

		return dictTypeTreeList;
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
	public List<DictType> getDictTypeListByParentId(long parentId, int noDisable) {
		List<DictType> dictTypeList = dao.getDictTypeListByParentId(parentId,
				noDisable);
		return dictTypeList;
	}

	/****
	 * 根据父ID获取节点列表，附带childrenCount查询
	 * 
	 * @param parentId
	 * @param noDisable为1
	 *            不获取visiable为0的菜单
	 * @return
	 */
	public List<DictType> getDictTypeListWithChildrenByParentId(long parentId,
			int noDisable) {
		return dao.getDictTypeListWithChildrenByParentId(parentId, noDisable);
	}
	public  List<DictType> getDictTypeListByTypeCode(String code) {
		return dao.getDictTypeListByTypeCode(code);
	}
	/**
	 * @Description  </br>
	 * 			获取职位名称
	 * @author csm_
	 * @date 2015年10月15日-下午2:21:10
	 * @param q
	 * @return
	 */
	public List<Map<String, Object>> autocompleteGetJob(String q) {
		return this.dao.getJob(q);
	}
	public List<Map<String, Object>> queryChilrenListByCode(String code) {
		return this.dao.queryChilrenListByCode(code);
	}
	/**
	 * 渠道查询使用
	 */
	public List<DictType> queryDictForChannel(String dictTypeCode){
		List<DictType> list=dao.queryDictForChannel(dictTypeCode);
		List<DictType> menuTreeList = new LinkedList<DictType>();
		 
		for (DictType m : list) {
			List<Object> dictlist=dictds.getDictByDictTypeCode(m.getCode());
			m.setDictlist(dictlist);
			menuTreeList.add(m);
		}
		return menuTreeList;
	}
}
