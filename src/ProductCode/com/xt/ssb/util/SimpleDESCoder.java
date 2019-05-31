package com.xt.ssb.util;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.xt.ssb.util.code.DESCoder;

public class SimpleDESCoder {

    static Log                    log = LogFactory.getLog(SimpleDESCoder.class);

    private static SimpleDESCoder instance;

    private SimpleDESCoder() {}

    private static String key = "";

    public static SimpleDESCoder getInstance() {
        if (instance == null) {
            instance = new SimpleDESCoder();
            try {
                key = DESCoder.initKey(Constants.coder_key);
            }
            catch (Exception e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
                log.error("DES加密类初始化失败");
            }
        }
        return instance;
    }

    public String decrypt(String inputStr) {
        try {
            byte[] outputData = DESCoder.decrypt(DESCoder.decryptBASE64(inputStr), key);
            String outputStr = new String(outputData);
            return outputStr;
        }
        catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public String encrypt(String inputStr) {
        try {
            byte[] inputData = inputStr.getBytes();
            inputData = DESCoder.encrypt(inputData, key);
            String outputStr = DESCoder.encryptBASE64(inputData);
            return outputStr;
        }
        catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
