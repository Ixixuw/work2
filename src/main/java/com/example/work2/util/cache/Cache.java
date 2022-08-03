package com.example.work2.util.cache;

/**
 * @Description TODO
 * @date 2022/8/2 17:56
 * @Author wuxx
 */
import java.lang.annotation.*;

@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Cache {

    long expire() default 1 * 60 * 1000;

    String name() default "";

}
