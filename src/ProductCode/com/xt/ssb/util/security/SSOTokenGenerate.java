package com.xt.ssb.util.security;

import com.xt.ssb.cache.EnQuickCache;
import com.xt.ssb.util.Constants;

public class SSOTokenGenerate {
	public static String getToken(String employeeId, String orgId, boolean isVip) {
		if (isVip) {
			return CryptoCenter.encrypt(employeeId
					+ "$"
					+ orgId
					+ "$"
					+ EnQuickCache.getInstance().getValue(
							Constants.encache_dcache_ip)
					+ "$"
					+ EnQuickCache.getInstance().getValue(
							Constants.encache_dcache_port));
		} else {
			return CryptoCenter.encrypt(employeeId
					+ "$"
					+ orgId
					+ "-master"
					+ "$"
					+ EnQuickCache.getInstance().getValue(
							Constants.encache_dcache_ip)
					+ "$"
					+ EnQuickCache.getInstance().getValue(
							Constants.encache_dcache_port));
		}

	}
}
