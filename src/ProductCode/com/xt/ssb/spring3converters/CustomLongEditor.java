package com.xt.ssb.spring3converters;

import java.beans.PropertyEditorSupport;

/**
 * Property editor for <code>java.sql.Timestamp</code>,<br>
 * supporting a custom <code>java.text.DateFormat</code>.
 * 
 * @author <a href="http://www.micmiu.com">Michael Sun</a>
 */
public class CustomLongEditor extends PropertyEditorSupport {

	@Override
	public void setAsText(String text) throws IllegalArgumentException {
		if (text == null) {
			setValue(-1l);
		} else {
			try {
				setValue(Long.parseLong(text));
			} catch (Exception ex) {
				throw new IllegalArgumentException("Could not parse long: "
						+ ex.getMessage(), ex);
			}
		}
	}

	@Override
	public Object getValue() {
		if (getValue() != null) {
			return Long.parseLong(super.getValue().toString());
		}
		return -1l;
	}

	@Override
	public String getAsText() {
		if (getValue() != null) {
			return super.getValue().toString();
		}
		return "-1";
	}
}