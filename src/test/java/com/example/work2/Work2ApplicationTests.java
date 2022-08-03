package com.example.work2;

import com.alibaba.fastjson.JSON;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;

@SpringBootTest

class Work2ApplicationTests {

    @Test
    void contextLoads() {
    }
    @Autowired
    private RedisTemplate<String, String> redisTemplate;
    // string 入库
    @Test
    public void testForValue1(){
        String key = "wuxx";
        String value = "仗剑天涯";
        redisTemplate.opsForValue().set(key, JSON.toJSONString(value));
        System.out.println(JSON.parseObject(redisTemplate.opsForValue().get(key),String.class));
    }

}
