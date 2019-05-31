package com.xt.ssb.fileupload.util;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.mikesu.fastdfs.FastdfsClient;
import net.mikesu.fastdfs.FastdfsClientConfig;
import net.mikesu.fastdfs.FastdfsClientFactory;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.xt.ssb.fileupload.bussiness.FileDS;

/**
 * 文件下载
 * 删除
 * 上传
 * @author jxcw
 */
public class FileUploadServlet extends HttpServlet {
	
	private static final long serialVersionUID = 11520L;
	public static String group="";
	public static String dictFileCounfigKey="$file_dict";
			
	@Override
	public void destroy() {
		super.destroy();
	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request. setCharacterEncoding("UTF-8");
		DiskFileItemFactory diskFactory = new DiskFileItemFactory(); 
		ServletFileUpload fileload = new ServletFileUpload(diskFactory);
        List<FileItem> list;
		try {
			list = fileload.parseRequest(request);
			for (FileItem item : list) {
				String fname=item.getName();
				if(fname!=null){
					System.out.println("---------"+fname);
					System.out.println("---------"+item.getFieldName());
					System.out.println("---------"+item.getSize());
				}
				
			}
		} catch (FileUploadException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
       PrintWriter out = response.getWriter();
       out.println("上传成功");
       out.flush();
       out.close();
	}
	      
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		fileconfigInit(req);//上传参数配置
		String callback = req.getParameter("callback");
		req. setCharacterEncoding("UTF-8");
		String method=req.getParameter("method");
		if(method!=null&&!"".equals(method)&&"down".equals(method)){
			fileDown(req, resp);
			return ;
		}
		DiskFileItemFactory diskFactory = new DiskFileItemFactory(); 
		ServletFileUpload fileload = new ServletFileUpload(diskFactory);
        List<FileItem> list;
        String results = null; 
        String result ="";
		try {
			list = fileload.parseRequest(req);
			for (FileItem item:list) {
				InputStream uploadout= item.getInputStream(); 
				InputStream compressout=item.getInputStream(); 
	        	String uploadFileName=item.getName();
	        	long fileLength=item.getSize();
	        	String fileId="";
	        	if(uploadout!=null&&uploadFileName!=null&&!"".equals(uploadFileName)&&fileLength>0){
	        		
	        		System.out.println("1---"+compressout.available());
	        		/**
		        	 * 文件压缩
		        	 */
	        		
	        		FastdfsClient fastdfsClient = FastdfsClientFactory.getFastdfsClient();
	        		fileId=fastdfsClient.uploadInputStream(uploadout, uploadFileName, fileLength);
	        		String filesmallId="";
	        	    String prefix=uploadFileName.substring(uploadFileName.lastIndexOf("."));
	        	    
	        	    InputStream instreamsmall=new ByteArrayInputStream(new ImgCompress().bufferedImageTobytes(compressout, (float) 0.7));
	        	    long filelength=Long.valueOf(instreamsmall.available());
	        	    System.out.println("4----"+filelength);
//	        	    String dirfilepath=FileUploadServlet.class.getResource("/").getPath();
//	        	    File dirfile =new File(dirfilepath+"/tmp");
//	        	    if(!dirfile.exists()){
//	        	    	dirfile.mkdir();
//	        	    }
//	        	    File tmpfile =new File(dirfilepath+"/tmp/tmp"+prefix);
//	        	    FileOutputStream  fos = new FileOutputStream(tmpfile); 
//	    			int ch = 0;
//	    			 while((ch=instreamsmall.read()) != -1){  
//	    		        fos.write(ch);  
//	    		     }  
//	    			 fos.close();
//	    			 instreamsmall.close();
//	    			 instream.close();
//	        		//缩略图上传
//	    			 File uploadfile =new File(dirfilepath+"/tmp/tmp"+prefix);
	        		filesmallId=fastdfsClient.uploadSlave(instreamsmall, fileId, "_small", prefix,filelength);
		        	System.out.println("2----"+filesmallId);
	        		if(fileId!=null&&!"".equals(fileId)){
		        		group=fileId.substring(0,fileId.indexOf("/"));
		        		fileId=fileId.replace(group, "");
		        		filesmallId=filesmallId.replace(group, "");
		        		results=fileId+","+filesmallId;
		        	}
//		        	uploadfile.delete();
		        	result = "{\"name\":\""+ uploadFileName +"\", \"originalName\": \""+ uploadFileName +"\","
		        			+ " \"size\": "+ fileLength +", \"state\": \""+ "SUCCESS" +"\", \"type\": \""+ prefix +"\", \"url\": \""+ fileId +"\"}";
	        	}
	        	
	        	uploadout.close();
	        	compressout.close();
	        	if(fileId!=null&&!"".equals(fileId)){
	        		ApplicationContext ac1 = WebApplicationContextUtils
		    				.getRequiredWebApplicationContext(req.getSession()
		    						.getServletContext());
		        	FileDS fileds=(FileDS) ac1.getBean("fileDS");
		        	fileds.saveFileByfileid(fileId);
	        	}
			}
			if( callback == null ){
				resp.getWriter().print(results);
		    }else{
		    	resp.getWriter().print(result);
		    }
			
			resp.getWriter().flush();
			resp.getWriter().close();
		} catch (FileUploadException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}  
	}
	/**
	 * 获取 文件URL
	 * @return
	 */
	public List<String >  getUrl(String[] fileId){
		List<String > list =new ArrayList<String>();
		String url = null;
		try {
			for (String str:fileId) {
				if(str!=null&&!"".equals(str)){
					url =FastdfsClientConfig.http_url+":"+FastdfsClientConfig.http_port+str;
					list.add(url);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	/**
	 * 文件下载
	 * @param req
	 * @param resp
	 */
	public void fileDown(HttpServletRequest req, HttpServletResponse resp){
		String fileId=req.getParameter("fileId")+",";
		if(fileId==null||"".equals(fileId)){
			return ;
		}
        int byteread = 0;
		String filepath="";
		List<String > list=getUrl(fileId.split(","));
		if(list!=null&&list.size()>0){
			filepath=list.get(0);
		}
		if(filepath==null||"".equals(filepath)){
			return ;
		}
		try {
			URL url = new URL(filepath);
			URLConnection conn = url.openConnection();
            InputStream inStream = conn.getInputStream();
            ServletOutputStream servletOS = resp.getOutputStream();

            byte[] buffer = new byte[4096];
            while ((byteread = inStream.read(buffer)) != -1) {
                servletOS.write(buffer, 0, byteread);
            }
            inStream.close();
            servletOS.flush();
            servletOS.close();
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	/**
	 * 初始化fastdfs 配置
	 * @param request
	 */
	public void fileconfigInit(HttpServletRequest request){
		ApplicationContext ac1 = WebApplicationContextUtils
				.getRequiredWebApplicationContext(request.getSession()
						.getServletContext());
		FileconfigInit fileconfiginit=(FileconfigInit) ac1.getBean("fileconfigInit");
		fileconfiginit.init();
	}
}
