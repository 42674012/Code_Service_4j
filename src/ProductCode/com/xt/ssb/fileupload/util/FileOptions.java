package com.xt.ssb.fileupload.util;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.security.NoSuchAlgorithmException;

import net.mikesu.fastdfs.FastdfsClient;
import net.mikesu.fastdfs.FastdfsClientConfig;
import net.mikesu.fastdfs.FastdfsClientFactory;

import org.springframework.stereotype.Component;

@Component
public class FileOptions {
	private static String g_charset="ISO8859-1";
	private static String g_secret_key="1234abcd.";
	/**
	 * 获取 文件URL
	 * @return
	 */
	public String  getUrl(String fileId){
		String url = FastdfsClientConfig.http_url+":"+FastdfsClientConfig.http_port;
		try {
			if(fileId!=null&&!"".equals(fileId)){
				url =url+fileId;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return url;
	}
	/**
	 * 获得文件token 
	 * @param fileid
	 * @return
	 */
	public String cretetoken(String fileid){
		int ts = (int)(System.currentTimeMillis() / 1000);
		try {
			String token=getToken(fileid, ts, g_secret_key);
			return "?token=" + token + "&ts=" + ts;
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * 删除
	 * @param fileId
	 */
	public Boolean fileDelete(String fileId){
		FastdfsClient fastdfsClient = FastdfsClientFactory.getFastdfsClient();
		Boolean result=false;
		try {
			fileId=FileUploadServlet.group+fileId;
			result = fastdfsClient.delete(fileId);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
	/**
	* md5 function
	* @param source the input buffer
	* @return md5 string
	*/
	public  String md5(byte[] source) throws NoSuchAlgorithmException{
	  	char hexDigits[] = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd',  'e', 'f'};
	    java.security.MessageDigest md = java.security.MessageDigest.getInstance("MD5");
	    md.update(source);
	    byte tmp[] = md.digest();
	    char str[] = new char[32];
	    int k = 0;
	    for (int i = 0; i < 16; i++){
	     str[k++] = hexDigits[tmp[i] >>> 4 & 0xf];
	     str[k++] = hexDigits[tmp[i] & 0xf];
	    }
	    
	  	return new String(str);
	 }
	 
	/**
	* get token for file URL
	* @param remote_filename the filename return by FastDFS server
	* @param ts unix timestamp, unit: second
	* @param secret_key the secret key
	* @return token string
	*/
	 public  String getToken(String remote_filename, int ts, String secret_key) 
			 throws UnsupportedEncodingException, NoSuchAlgorithmException{
	 	byte[] bsFilename = remote_filename.getBytes(g_charset);
	 	byte[] bsKey = secret_key.getBytes(g_charset);
	 	byte[] bsTimestamp = (new Integer(ts)).toString().getBytes(g_charset);
	 	
	 	byte[] buff = new byte[bsFilename.length + bsKey.length + bsTimestamp.length];
	 	System.arraycopy(bsFilename, 0, buff, 0, bsFilename.length);
	 	System.arraycopy(bsKey, 0, buff, bsFilename.length, bsKey.length);
	 	System.arraycopy(bsTimestamp, 0, buff, bsFilename.length + bsKey.length, bsTimestamp.length);
	 	
	 	return md5(buff);
	 }
	/**
	 * 文件下载
	 * @param req
	 * @param resp
	 */
	public byte[] fileDown(String fileId){
		if(fileId==null||"".equals(fileId)){
			return null;
		}
        int byteread = 0;
		String filepath=getUrl(fileId);
		 
		if(filepath==null||"".equals(filepath)){
			return null;
		}else {
			if(!filepath.contains("http")){
				filepath="http://"+filepath;
			}
			
		}
		ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream(); 
		try {
			URL url = new URL(filepath);
			URLConnection conn = url.openConnection();
            InputStream inStream = conn.getInputStream();
            byte[] buffer = new byte[4096];
            while ((byteread = inStream.read(buffer)) != -1) {
            	byteArrayOutputStream.write(buffer, 0, byteread);
            }
            inStream.close();
            byteArrayOutputStream.flush();
            byteArrayOutputStream.close();
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return byteArrayOutputStream.toByteArray();
	}
}
