package com.xt.ssb.util.bean;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;

public class BeanConvertUtil {

    /***
     * 对简单java bean 的转换（依据源对象的字段名称， 如果目标对象也有该字段，则取值赋值操作）
     * 
     * @param src
     * @param descClass
     * @return 一旦捕捉到异常，返回 null
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
    public static <S, D> D convertBeanByFieldName(S src, Class<D> descClass) {
        if (src == null) {
            return null;
        }
        Class srcClass = src.getClass();
        D desc;
        try {
            desc = descClass.newInstance();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        Field[] srcFields = srcClass.getDeclaredFields();
        List<String> srcFieldNames = getFiledNames(srcFields);

        Field[] descFields = descClass.getDeclaredFields();
        Method[] descMethods = descClass.getMethods();
        List<String> descFieldNames = getFiledNames(descFields);

        try {
            for (String fName : srcFieldNames) {
                if (descFieldNames.contains(fName)) {
                    String capitalizeName = StringUtils.capitalize(fName);
                    String getterMethodName = "get" + capitalizeName;
                    String setterMethodName = "set" + capitalizeName;

                    try {
                        Method getterMethod = srcClass
                                .getDeclaredMethod(getterMethodName);
                        Object value = getterMethod.invoke(src);

                        if (value != null) {
                            // for Primitive class such as int, is considered
                            // the
                            // same with Integer
                            // that I use the for while code
                            for (Method method : descMethods) {
                                if (method.getName().equals(setterMethodName)) {
                                    method.invoke(desc, value);
                                    break;
                                }
                            }
                        }
                    } catch (Exception e) {
                        // TODO Auto-generated catch block
                        e.printStackTrace();
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        return desc;
    }

    private static List<String> getFiledNames(Field[] fields) {
        List<String> fileNames = new ArrayList<String>(fields.length);

        for (Field f : fields) {
            String fName = f.getName();
            fileNames.add(fName);
        }

        return fileNames;
    }
}
