package com.xt.ssb.fileupload.dao;

import java.text.ParseException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Repository;

import com.xt.ssb.fileupload.model.File;
import com.xt.ssb.common.dao.GenericDAO;
import com.xt.ssb.common.domain.PageInfo;
import com.xt.ssb.util.Constants;
@Repository
public class FileDAO extends GenericDAO<File> {

    public FileDAO() {
        super(File.class);
    }
	/****
	 * 删除模型对象
	 * 
	 * @param resourceId
	 * @return
	 */
	public void deleteFileByPk(Long id) {
		
			String hql = " delete File t   where t.id = ? ";
			excuteHql(hql, new Object[] {id });
	}
    
	/****
	 * 根据ID获取模型对象
	 * 
	 * @param resourceId
	 * @return
	 */
	public File getFileByPk(Long id) {
			String hql = " from File t  where 1=1 and t.id = ?  ";
			List<File> list = queryForList(hql, new Object[] { id });
			if (list != null && list.size() > 0) {
				return list.get(0);
			}
		return null;
	}

	/****
	 * 获取所有模型对象
	 * 
	 * @param resourceId
	 * @return
	 */
	public List<File> getAllFileList() {
		String hql = " from File t";
		List<File> list = queryForList(hql,new Object[] {});
		return list;
	}
	
	/**
	  * 获得附件信息
	  * @param modelname
	  * @param modelid
	  * @return
	  */
	public 	List<File> queryFileListBy(String modelname,String modelid,String fileId){
		String hql = " from File t where 1=1   ";
		if(modelname!=null&&!"".equals(modelname)){
			hql+=" and t.modelname='"+modelname+"'";
		}
		if(modelid!=null&&!"".equals(modelid)){
			hql+=" and t.modelid='"+modelid+"'";
		}
		if(fileId!=null&&!"".equals(fileId)){
			hql+=" and t.fileId='"+fileId+"'";
		}
		List<File> list = queryForList(hql,new Object[] {});
		return list;
	}
	   /***
     * 分页查询模型数据
     * 
     * @param page
     * @param key
     * @param value
     * @param desc
     */
    @SuppressWarnings({ "unchecked", "rawtypes" })
    public  PageInfo<File> queryForListPage(HashMap<String,Object> parameterMap, int size,
            int start) {
        StringBuilder hql = new StringBuilder(
                "from File where 1 = 1");
        Map parameters = new HashMap();
        if(parameterMap!=null){
                Object  idObj = parameterMap.get("id");
                if (idObj!=null&&!StringUtils.isEmpty(idObj.toString())) {
                    hql.append(" and id = :id");
                    parameters.put("id", Long.parseLong(idObj.toString()));
                }
                
                Object  atttypeObj = parameterMap.get("atttype");
                if (atttypeObj!=null&&!StringUtils.isEmpty(atttypeObj.toString())) {
                    hql.append(" and atttype like :atttype escape '/'");
                    parameters.put("atttype", getLikeKeyworkd(atttypeObj.toString()));
                }
                Object  fileidObj = parameterMap.get("fileid");
                if (fileidObj!=null&&!StringUtils.isEmpty(fileidObj.toString())) {
                    hql.append(" and fileid like :fileid escape '/'");
                    parameters.put("fileid", getLikeKeyworkd(fileidObj.toString()));
                }
                Object  modelnameObj = parameterMap.get("modelname");
                if (modelnameObj!=null&&!StringUtils.isEmpty(modelnameObj.toString())) {
                    hql.append(" and modelname like :modelname escape '/'");
                    parameters.put("modelname", getLikeKeyworkd(modelnameObj.toString()));
                }
                Object  modelidObj = parameterMap.get("modelid");
                if (modelidObj!=null&&!StringUtils.isEmpty(modelidObj.toString())) {
                    hql.append(" and modelid like :modelid escape '/'");
                    parameters.put("modelid", getLikeKeyworkd(modelidObj.toString()));
                }
                Object  createtimeStartObj = parameterMap.get("createtimeStart");
                if (createtimeStartObj!=null) {
                    Date createtimeStart = null;
                    try {
                        createtimeStart = Constants.sdf.parse(createtimeStartObj.toString().replace('T', ' '));
                        createtimeStart.setDate(createtimeStart.getDate()-1);
                        createtimeStart.setHours(23);
                        createtimeStart.setMinutes(59);
                        createtimeStart.setSeconds(59);
                    } catch (ParseException e) {
                        // TODO Auto-generated catch block
                        e.printStackTrace();
                    }
                   
                    hql.append(" and  createtime >= :createtimeStart ");
                    parameters.put("createtimeStart", createtimeStart);
                }
                
                Object  createtimeEndObj = parameterMap.get("createtimeEnd");
                if (createtimeEndObj!=null) {
                    Date createtimeEnd = null;
                    
                    try {
                        createtimeEnd = Constants.sdf.parse(createtimeEndObj.toString().replace('T', ' '));
                        createtimeEnd.setDate(createtimeEnd.getDate());
                        createtimeEnd.setHours(23);
                        createtimeEnd.setMinutes(59);
                        createtimeEnd.setSeconds(59);
                    } catch (ParseException e) {
                        // TODO Auto-generated catch block
                        e.printStackTrace();
                    }
                   
                    hql.append(" and  createtime <= :createtimeEnd ");
                    parameters.put("createtimeEnd", createtimeEnd);
                }
        }
        return this.queryForListPage( hql.toString(), parameters,size,start);
    }
	public List<File> getFileByFK(String string) {
		String hql = " from File t  where 1=1 and t.modelid = ?  ";
		List<File> list = queryForList(hql, new Object[] { string });
		return list;
	}
    
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
}
