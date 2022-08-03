package com.example.work2.util.log;

import java.lang.annotation.*;

/**
 * @Description TODO
 * @date 2022/8/2 18:18
 * @Author wuxx
 */
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface EditLog {

    String operate() default "";

}
