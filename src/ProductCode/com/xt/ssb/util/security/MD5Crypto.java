package com.xt.ssb.util.security;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import sun.misc.BASE64Encoder;

public class MD5Crypto {

    public static String encodePwdByMd5(String password) {
        String newstr = "";

        /* 确定计算方法 */
        MessageDigest md5 = null;
        try {
            md5 = MessageDigest.getInstance("MD5");
        }
        catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }

        /* 这里使用sun的未公开的sun.misc.BASE64Encoder类 */
        BASE64Encoder base64en = new BASE64Encoder();

        /* 说明：MD5加密后的字节数组，再使用base64对其进行编码 */
        try {
            newstr = base64en.encode(md5.digest(password.getBytes("utf-8")));
        }
        catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return newstr;
    }
    
    
    public static void main(String[] args) {
        String a = "12345678";//13603459623.密码654321 8888999
        System.out.print(MD5Crypto.encodePwdByMd5(a));
    }
}
