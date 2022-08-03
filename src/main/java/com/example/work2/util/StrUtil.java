package com.example.work2.util;

/**
 * @Description TODO
 * @date 2022/8/3 14:28
 * @Author wuxx
 */
public class StrUtil {

    public static final String DELETE_FLAG = "delete_flag";

    public static final String VALID = "0";

    public static final String IN_VALID = "1";
    public static boolean isNullOrEmpty(String str) {
        return str == null || str.trim().length() == 0;
    }
}
