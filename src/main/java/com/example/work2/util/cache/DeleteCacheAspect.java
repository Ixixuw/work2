package com.example.work2.util.cache;

import com.baomidou.mybatisplus.core.toolkit.ObjectUtils;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.util.Set;

/**
 * @Description TODO
 * @date 2022/8/3 13:15
 * @Author wuxx
 */
@Aspect
@Component
public class DeleteCacheAspect {

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Pointcut("@annotation(com.example.work2.util.cache.DeleteCache)")
    public void pt(){}

    @After("pt()")
    public void after() {
        Set<String> keys = redisTemplate.keys("listUser*");
        if (ObjectUtils.isNotEmpty(keys)) {
            redisTemplate.delete(keys);
        }
    }
}
