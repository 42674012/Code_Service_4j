package com.xt.ssb.util.security;

import com.xt.ssb.util.security.aes.AESCrypto;

public class CryptoCenter {
	
    private CryptoCenter() {
    }

    public static String encrypt(String encryptMsg) {
        try {
            return AESCrypto.encrypt(Key.des_key, encryptMsg);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

    public static String decrypt(String encryptedMsg) {
        try {
            return AESCrypto.decrypt(Key.des_key, encryptedMsg);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }
    
}
