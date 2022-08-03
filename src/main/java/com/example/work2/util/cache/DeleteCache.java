package com.example.work2.util.cache;

import java.lang.annotation.*;

/**
 * @Description TODO
 * @date 2022/8/3 13:15
 * @Author wuxx
 */
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface DeleteCache {
}
