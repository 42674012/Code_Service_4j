package com.xt.ssb.util;

import java.util.LinkedList;
import java.util.List;

public class SplitChinese {

	public static String[] spiltString(String s) {
		int a = s.length();
		List<String> arr = new LinkedList<String>();
		for (int i = 0; i < a; i++) {
			arr.add(s.substring(i, i + 1));
		}
		return arr.toArray(new String[]{});
	}
}
