package com.xt.ssb.fileupload.bussiness;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.xt.ssb.fileupload.model.File;
import com.xt.ssb.common.bussiness.GenericDS;
import com.xt.ssb.common.domain.PageInfo;


@Component
public class FileDS extends GenericDS{
    
	@Resource
	com.xt.ssb.fileupload.dao.FileDAO dao;

	/***
	 * 获取模型对象
	 * 
	 * @param modelId
	 * @return
	 */
	public  File getFileByPk(Long id) {
		return dao.getFileByPk(id);
	}
	
	public List<File> getFileByFK(String string){
		return dao.getFileByFK(string);
	}
	
	/***
	 * 保存模型对象
	 * 
	 * @param page
	 * @param parameter
	 */
	@Transactional
	public File saveFile(File file) {
	 return dao.save( file);
	}
	
	/***
	 * 保存模型对象
	 * 
	 * @param page
	 * @param parameter
	 */
	@Transactional
	public File saveFileByfileid(String fileid) {
		Date now=new Date();
		File file=new File();
		file.setFileId(fileid);
		file.setCreatetime(now);
	 return dao.save( file);
	}
	/***
	 * 删除模型对象
	 * 
	 * @param page
	 * @param parameter
	 */
	@Transactional
	public void deleteFileByPk(Long id) {
		dao.deleteFileByPk(id);
	}

	/****
	 * 获取所有模型对象
	 * 
	 * @param resourceId
	 * @return
	 */
	public List<File> getAllFileList() {
		return dao.getAllFileList();
	}
	
	 public PageInfo<File> queryForListPage(HashMap<String,Object> params,  int size,  int start) {
         return dao.queryForListPage(params, size, start);
     }
	 /**
	  * 获得附件信息
	  * @param modelname
	  * @param modelid
	  * @return
	  */
	public 	List<File> queryFileListBy(String modelname,String modelid){
		if(modelname!=null&&!"".equals(modelname)&&modelid!=null&&!"".equals(modelid)){
			return 	dao.queryFileListBy(modelname, modelid,null);
		}else{
			return null;
		}
	}
	/**
	  * 获得附件信息
	  * @param modelname
	  * @param modelid
	  * @return
	  */
	public 	List<File> queryFileListByfileId(String modelname,String modelid,String fileId){
		return 	dao.queryFileListBy(modelname, modelid,fileId);
	}	  
		  
		  
		  
		  
		  
		  
		  
		  
}
