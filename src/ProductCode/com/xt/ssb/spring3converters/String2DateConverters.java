package com.xt.ssb.spring3converters;

import java.text.ParseException;
import java.util.Date;

import org.springframework.core.convert.converter.Converter;
import org.springframework.util.StringUtils;

import com.xt.ssb.util.Constants;

public class String2DateConverters implements Converter<String, Date> {

	@Override
	public Date convert(String source) {
		if (!StringUtils.hasLength(source)) {
			// ①如果source为空 返回null
			return null;
		}
		try {
			Date date = Constants.sdf.parse(source);
			return date;
		} catch (ParseException e) {
			throw new IllegalArgumentException(String.format("类型转换失败，需要格式[010-12345678]，但格式是[%s]", source));
		}
	}
}
