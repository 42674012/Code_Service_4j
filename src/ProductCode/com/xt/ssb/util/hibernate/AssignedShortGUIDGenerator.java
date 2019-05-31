package com.xt.ssb.util.hibernate;

import java.io.Serializable;
import java.util.Properties;

import org.hibernate.HibernateException;
import org.hibernate.MappingException;
import org.hibernate.dialect.Dialect;
import org.hibernate.engine.spi.SessionImplementor;
import org.hibernate.id.AbstractUUIDGenerator;
import org.hibernate.id.Configurable;
import org.hibernate.type.Type;

import com.xt.ssb.util.ShortUUID;

public class AssignedShortGUIDGenerator extends AbstractUUIDGenerator implements
		Configurable {
	private String entityName;

	public static ShortUUID idGen1;
	
	@Override
	public void configure(Type type, Properties params, Dialect dialect)
			throws MappingException {
		long workerId = 0l;
		long datacenterId = 0l;
		long twepoch = 1288834974657L;
		//不同的数据库中心采用不同的datacenterId,或者 twepoch 不同
		idGen1 = new ShortUUID(workerId, datacenterId, twepoch);
	}

	@Override
	public Serializable generate(SessionImplementor session, Object obj)
			throws HibernateException {
		return idGen1.nextId();
	}
	
	
}