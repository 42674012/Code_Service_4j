package com.xt.ssb.web.utils;

import java.util.Map;

import javax.sql.DataSource;

import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;
import org.springframework.jdbc.datasource.lookup.DataSourceLookup;

public class DynamicDataSource extends AbstractRoutingDataSource {

	@Override
	public Object determineCurrentLookupKey() {
		return DataSourceContextHolder.getDataSourceName();
	}

	@Override
	public void setDataSourceLookup(DataSourceLookup dataSourceLookup) {
		super.setDataSourceLookup(dataSourceLookup);
	}

	@Override
	public void setDefaultTargetDataSource(Object defaultTargetDataSource) {
		super.setDefaultTargetDataSource(defaultTargetDataSource);
	}

	@Override
	public void setTargetDataSources(Map<Object, Object> targetDataSources) {
		super.setTargetDataSources(targetDataSources);
		//�ص�
		super.afterPropertiesSet();
	}

	@Override
	public DataSource determineTargetDataSource() {
		return super.determineTargetDataSource();
	} 

}