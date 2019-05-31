package com.xt.ssb.spring3converters;

import org.springframework.core.convert.converter.Converter;
import org.springframework.util.StringUtils;

public class String2LongConverters implements Converter<String, Long> {

	@Override
	public Long convert(String source) {
		if (!StringUtils.hasLength(source)) {
			// ①如果source为空 返回null
			return null;
		}
		try {
			return Long.parseLong(source);
		} catch (Exception e) {
			throw new IllegalArgumentException(String.format("long类型转换失",
					source));
		}
	}
}
