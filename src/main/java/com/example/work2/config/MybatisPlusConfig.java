package com.example.work2.config;

import com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.baomidou.mybatisplus.extension.plugins.inner.PaginationInnerInterceptor;

/**
 * @Description TODO
 * @date 2022/8/2 17:03
 * @Author wuxx
 */
@Configuration
//扫包，将此包下的接口生成代理实现类，并且注册到spring容器中
@MapperScan("com.example.work2.dao")
public class MybatisPlusConfig {
    //分页插件
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor(){
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor());
        return interceptor;
    }
}

