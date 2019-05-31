package com.xt.ssb.dict.bussiness;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.xt.ssb.cache.EnQuickCache;
import com.xt.ssb.common.bussiness.GenericDS;
import com.xt.ssb.common.domain.PageInfo;
import com.xt.ssb.dict.model.Dict;
import com.xt.ssb.util.Constants;

@Component
public class DictDS extends GenericDS {

	@Resource
	com.xt.ssb.dict.dao.DictDAO dao;

	/***
	 * 获取模型对象
	 * 
	 * @param modelId
	 * @return
	 */
	public Dict getDictByPk(long dictId) {
		return dao.getDictByPk(dictId);
	}

	/***
	 * 获取模型对象
	 * 
	 * @param modelId
	 * @return
	 */
	public List<Dict> getDictByDictTypeId(long dictTypeId) {
		return dao.getDictByDictTypeId(dictTypeId);
	}

	/****
	 * 根据ID获取模型对象
	 * 
	 * @param resourceId
	 * @return
	 */
	public List<Object> getDictByDictTypeCode(String dictTypeCode) {
		return dao.getDictByDictTypeCode(dictTypeCode);
	}
	/****
	 * 更新字典值
	 * 
	 * @param resourceId
	 * @return
	 */
	@Transactional
	public void updateDict(Dict[] dict) {
		 for (int i = 0; i < dict.length; i++) {
			 if(dict[i].getDictId()!=null){
				 dao.update(dict[i]);
			 }
		}
	}
	@Transactional
	public void updateDictBypk(Long dictid) {
		Dict dict=getDictByPk(dictid);
		dict.setDictKey("2");
		dict.setDictValue("2");
		dict.setDictName("已初始化");;
		dao.update(dict);
	}
	/****
	 * 根据ID获取模型对象
	 * 
	 * @param resourceId
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<Object> getDictByParentCode(String dictTypeCode) {
		return dao.getDictByParentCode(dictTypeCode);
	}

	/****
	 * 根据ID获取模型对象
	 * 
	 * @param resourceId
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Map<String, String> getDictByDictType(String dictTypeCode) {
		return dao.getDictByDictType(dictTypeCode);
	}

	/***
	 * 保存模型对象
	 * 
	 * @param page
	 * @param parameter
	 */
	@Transactional
	@SuppressWarnings("unchecked")
	public Dict saveDict(Dict dict) {
		Date now = new Date();
		dict.setCreateBy(getCurrentEmployeeNameUI());
		dict.setCreateDate(now);
		dict.setLastUpdateBy(getCurrentEmployeeNameUI());
		dict.setLastUpdateDate(now);
		dict.setIsDelete(0);
		dao.save(dict);
		switch (dict.getDictKey()) {
		case "#dcache_ip":
			Dict port = getDictByDictKey("#dcache_port");
			break;
		case "#dcache_port":
			Dict ip = getDictByDictKey("#dcache_ip");
			break;
		case "#encache_bcc_url":
			EnQuickCache.getInstance().setValue(Constants.encache_bcc_url,
					dict.getDictValue());
			break;
//		case "#create_employee":
//			EnQuickCache.getInstance().setValue(
//					Constants.encache_save_employee_url, dict.getDictValue());
//			break;
//		case "#get_hospital_info":
//			EnQuickCache.getInstance().setValue(
//					Constants.encache_get_hospital_url, dict.getDictValue());
//			break;
//		case "#update_password":
//			EnQuickCache.getInstance().setValue(
//					Constants.encache_update_password_url, dict.getDictValue());
//			break;
//		case "#delete_employee_url":
//			EnQuickCache.getInstance().setValue(
//					Constants.encache_delete_employee_url, dict.getDictValue());
//			break;
//			
		}

		return dict;
	}

	/***
	 * 删除模型对象
	 * 
	 * @param page
	 * @param parameter
	 */
	@Transactional
	public void deleteDictByPk(long dictId) {
		dao.deleteDictByPk(dictId);
	}
	/***
	 * 删除模型对象
	 * 
	 * @param page
	 * @param parameter
	 */
	@Transactional
	public void deleteDictByAttrPk(Long[] dictId) {
		for (int i = 0; i < dictId.length; i++) {
			dao.deleteDictByPk(dictId[i]);
		}
	}
	/****
	 * 获取所有模型对象
	 * 
	 * @param resourceId
	 * @return
	 */
	public List<Dict> getAllDictList() {
		return dao.getAllDictList();
	}

	public PageInfo<Dict> queryForListPage(HashMap<String, Object> params,
			int size, int start) {
		return dao.queryForListPage(params, size, start);
	}

	/**
	 * 取出Url
	 */
	@Transactional
	public String getUrl(String dictKey) {
		String s = dao.selectUrl(dictKey);
		return s;
	}

	/****
	 * 根据ID获取模型对象
	 * 
	 * @param resourceId
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dict getDictByDictKey(String dictKey) {
		return dao.getDictByDictKey(dictKey);
	}


	
	public HashMap<String, List<Object>> getByCodeList(
			List<String> dictTypeCodeList) {
		HashMap<String, List<Object>> m = new HashMap<String, List<Object>>();
		for (String code : dictTypeCodeList) {
			m.put(code, getDictByDictTypeCode(code));
		}
		return m;
	}

}
