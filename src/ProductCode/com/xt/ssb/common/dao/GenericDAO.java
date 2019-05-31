package com.xt.ssb.common.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.apache.commons.dbutils.handlers.MapHandler;
import org.apache.commons.dbutils.handlers.MapListHandler;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.engine.spi.SessionFactoryImplementor;
import org.hibernate.service.jdbc.connections.spi.ConnectionProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate4.SessionFactoryUtils;

import com.xt.ssb.common.domain.PageInfo;

public abstract class GenericDAO<T> implements IGenericDAO<T> {

	static Log logger = LogFactory.getLog(GenericDAO.class);

	private Class<T> entityClass;

	public GenericDAO(Class<T> clazz) {
		this.entityClass = clazz;
	}

	@Autowired
	protected SessionFactory sessionFactory;

	@Override
	public void insert(T t) {
		sessionFactory.getCurrentSession().saveOrUpdate(t);
	}

	@Override
	public void delete(T t) {
		sessionFactory.getCurrentSession().delete(t);
	}

	@Override
	public void update(T t) {
		sessionFactory.getCurrentSession().update(t);
	}

	@Override
	public T save(T t) {
		sessionFactory.getCurrentSession().saveOrUpdate(t);
		return t;
	}

	@SuppressWarnings("unchecked")
	@Override
	public T queryById(String id) {
		return (T) sessionFactory.getCurrentSession().get(entityClass, id);
	}

	@Override
	public List<T> queryAll() {
		String hql = "from " + entityClass.getSimpleName();
		return queryForList(hql, null);
	}

	@SuppressWarnings("unchecked")
	public T queryForObject(String hql, Object[] params) {
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		setQueryParams(query, params);
		return (T) query.uniqueResult();
	}

	@SuppressWarnings("unchecked")
	public T queryForTopObject(String hql, Object[] params) {
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		setQueryParams(query, params);
		return (T) query.setFirstResult(0).setMaxResults(1).uniqueResult();
	}

	@SuppressWarnings("unchecked")
	public List<T> queryForList(String hql, Object[] params) {
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		setQueryParams(query, params);
		return query.list();
	}
	
	@SuppressWarnings("unchecked")
	public List<T> queryForList(String hql, Object[] params, boolean isLimit) {
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		setQueryParams(query, params);
		if (isLimit) {
			query.setFirstResult(0);
			query.setMaxResults(100);
		}

		return query.list();
	}

	@SuppressWarnings("unchecked")
	public List<T> queryForList(String hql, Object[] params, int start,
			int maxResultSize) {
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		setQueryParams(query, params);
		query.setFirstResult(start);
		query.setMaxResults(maxResultSize);

		return query.list();
	}

	@SuppressWarnings("unchecked")
	public PageInfo<T> queryForListPage(final String hql,
			final Map<String, Object> params, final int size, final int start) {
		PageInfo info = new PageInfo();

		String totalhql = " select count(*) " + hql + " ";
		Query query = sessionFactory.getCurrentSession().createQuery(totalhql);
		setQueryParams(query, params);
		info.setTotal(((Number) query.iterate().next()).intValue());

		Query query1 = sessionFactory.getCurrentSession().createQuery(hql);
		setQueryParams(query1, params);
		info.setDataList(query1.setFirstResult(start).setMaxResults(size)
				.list());
		return info;
	}

	@SuppressWarnings("unchecked")
	public PageInfo<T> queryPageBySql(final String sql, List<Object> params,
			final int size, final int start, Class clz) {
		PageInfo info = new PageInfo();

		String totalhql = " select count(*) as totalCount  from (" + sql
				+ ") as d";

		QueryRunner runner = new QueryRunner();
		List<T> result = null;
		Connection conn = null;
		try {
			conn = SessionFactoryUtils.getDataSource(sessionFactory)
					.getConnection();
			result = runner.query(conn, totalhql, new BeanListHandler(
					Integer.class), params.toArray());
			if (result != null && result.size() > 0) {
				info.setTotal(Integer.parseInt(result.get(0).toString()));
				// 进行查询

				String dataSql = " select * from (" + sql + " ) limit ?,?";
				params.add(start);
				params.add(size);
				result = runner.query(conn, dataSql, new BeanListHandler(clz),
						params.toArray());
			}

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			close(conn);
		}
		return info;
	}

	@SuppressWarnings("unchecked")
	public PageInfo<Map<String, Object>> queryPageBySql(final String sql,
			List<Object> params, final int size, final int start) {
		PageInfo info = new PageInfo();

		String totalhql = " select count(1) as totalCount from (" + sql
				+ ") as d";

		QueryRunner runner = new QueryRunner();
		List<Map<String, Object>> result = null;
		Connection conn = null;
		try {
			conn = SessionFactoryUtils.getDataSource(sessionFactory)
					.getConnection();
			result = runner.query(conn, totalhql, new MapListHandler(),
					params.toArray());
			if (result != null && result.size() > 0) {
				info.setTotal(Integer.parseInt(result.get(0).get("totalCount")
						.toString()));

				String dataSql = " select pageTable.* from (" + sql
						+ " ) as pageTable limit ?,?";
				params.add(start);
				params.add(size);
				result = runner.query(conn, dataSql, new MapListHandler(),
						params.toArray());
				info.setDataList(result);
			}

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			close(conn);
		}
		return info;
	}

	@SuppressWarnings("unchecked")
	public List<T> queryForListMaxSize(final String hql, final Object[] params,
			final int recordNum, final int start) {
		Query query1 = sessionFactory.getCurrentSession().createQuery(hql);
		setQueryParams(query1, params);
		return query1.setFirstResult(start).setMaxResults(recordNum).list();
	}

	private void setQueryParams(Query query, Object[] params) {
		if (null == params) {
			return;
		}
		for (int i = 0; i < params.length; i++) {
			query.setParameter(i, params[i]);
		}
	}

	private void setQueryParams(Query query, Map<String, Object> params) {
		if (null == params) {
			return;
		}
		query.setProperties(params);
	}

	public void excuteHql(String hql, Object[] parmas) {
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		setQueryParams(query, parmas);
		query.executeUpdate();
	}

	/***
	 * 获取泛型指定的集合列表
	 * 
	 * @param sql
	 * @param params
	 * @param type
	 * @return
	 */
	public List<T> queryListSpecifyBySql(String sql, Object[] params, Class type) {
		QueryRunner runner = new QueryRunner();
		List<T> result = null;
		Connection conn = null;
		try {
			conn = SessionFactoryUtils.getDataSource(sessionFactory)
					.getConnection();
			result = runner.query(conn, sql, new BeanListHandler(type), params);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			close(conn);
		}

		return result;
	}

	public List<Object> queryListBySql(String sql, Object[] params, Class type) {
		QueryRunner runner = new QueryRunner();
		List<Object> result = null;
		Connection conn = null;
		try {
			conn = SessionFactoryUtils.getDataSource(sessionFactory)
					.getConnection();
			result = runner.query(conn, sql, new BeanListHandler(type), params);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			close(conn);
		}
		return result;
	}

	public Object getResultBySql(String sql, Object[] params, Class type) {
		QueryRunner runner = new QueryRunner();
		Object r = null;
		Connection conn = null;
		try {

			conn = SessionFactoryUtils.getDataSource(sessionFactory)
					.getConnection();
			r = runner.query(conn, sql, new BeanHandler(type), params);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			close(conn);
		}

		return r;
	}

	public List<Map<String, Object>> queryMapListBySql(String sql,
			Object[] params) {
		QueryRunner runner = new QueryRunner();
		List<Map<String, Object>> result = null;
		Connection conn = null;
		try {
			// conn =
			// SessionFactoryUtils.getDataSource(sessionFactory).getConnection();
			ConnectionProvider cp = ((SessionFactoryImplementor) sessionFactory)
					.getConnectionProvider();
			conn = cp.getConnection();
			result = runner.query(conn, sql, new MapListHandler(), params);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			logger.error(sql);
			logger.error(params);
		} finally {
			close(conn);
		}
		return result;
	}

	public Map<String, Object> getMapBySql(String sql, Object[] params) {
		QueryRunner runner = new QueryRunner();
		Map<String, Object> result = null;
		Connection conn = null;
		try {
			// conn =
			// SessionFactoryUtils.getDataSource(sessionFactory).getConnection();
			ConnectionProvider cp = ((SessionFactoryImplementor) sessionFactory)
					.getConnectionProvider();
			conn = cp.getConnection();
			result = runner.query(conn, sql, new MapHandler(), params);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			close(conn);
		}
		return result;
	}

	public int excuteSql(String sql, Object[] params) {
		Connection conn = null;
		try {
			conn = SessionFactoryUtils.getDataSource(sessionFactory)
					.getConnection();
			PreparedStatement ps = conn.prepareStatement(sql);
			int i = 1;
			for (Object o : params) {
				ps.setObject(i, o);
				i++;
			}
			return ps.executeUpdate();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			close(conn);
		}
		return -1;
	}

	public static void close(Connection con) {
		if (con != null) {
			try {
				con.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

	public String getLikeKeyworkd(String keyword) {
		keyword = keyword.replace("%", "/%");
		keyword = keyword.replace("_", "/_");
		return "%" + keyword + "%";
	}
}
