package com.xt.ssb.common.dao;

import java.util.List;

import com.xt.ssb.common.domain.PageInfo;

public interface IGenericDAO<T> {

	void insert(T t);

	void delete(T t);

	void update(T t);

	T save(T t);

	T queryById(String id);

	List<T> queryAll();

	PageInfo<T> queryPageBySql(final String sql, List<Object> params,
			final int size, final int start, Class clz);
}