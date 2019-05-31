package com.xt.ssb.dict.facade;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;
import com.xt.ssb.dict.bussiness.DictDS;

@Component
public class DictFacade {
	@Resource
	DictDS ds;

	/****
	 * 根据ID获取模型对象
	 * 
	 * @param resourceId
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<Object > getDictByDictTypeCode(String dictTypeCode) {
		return ds.getDictByDictTypeCode(dictTypeCode);
	}
}
