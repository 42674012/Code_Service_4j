package com.xt.ssb.util.net;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

import org.apache.http.HttpResponse;
import org.apache.http.ParseException;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

public class LoadUrl {

	private static CloseableHttpClient httpclient = null;

	static {
		httpclient = HttpClients.createDefault();
	}

	/**
	 * 
	 * @param httpUrl
	 * @param params
	 * @return
	 */
	public static String loadUrl(String httpUrl, String params) {
		String str = null;
		try {
			HttpPost httppost = new HttpPost(httpUrl);
			StringEntity entity3 = new StringEntity(params);
//			List<NameValuePair> valuePairs = new LinkedList<NameValuePair>();
//            valuePairs.add(new BasicNameValuePair("_xsrf", xsrfValue));
//            valuePairs.add(new BasicNameValuePair("email", "xxxx@xxx.com"));
//            valuePairs.add(new BasicNameValuePair("password", "xxxxx"));
//            valuePairs.add(new BasicNameValuePair("remember_me", "true"));
//			UrlEncodedFormEntity entity = new UrlEncodedFormEntity(entity3, Consts.UTF_8);
//			StringEntity entity = new StringEntity(params);
//			httppost.setEntity(entity);
			HttpResponse response = httpclient.execute(httppost);
			org.apache.http.HttpEntity entity1 = response.getEntity();
			str = EntityUtils.toString(entity1, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ClientProtocolException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return str;
	}

}
