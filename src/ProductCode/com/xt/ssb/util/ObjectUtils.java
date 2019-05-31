package com.xt.ssb.util;

import org.apache.commons.lang3.StringUtils;

public class ObjectUtils {
	public static boolean isNotEmpty(Object o){
		if(o!=null&&StringUtils.isNotEmpty(o.toString())){
			return true;
		}
		return false;
		
	}
}
