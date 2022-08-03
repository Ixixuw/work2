package com.example.work2.util.log;

import com.baomidou.mybatisplus.core.toolkit.ObjectUtils;
import com.example.work2.entity.OperateLog;
import com.example.work2.service.OperateLogService;
import com.example.work2.util.IpUtil;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.Signature;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Set;


/**
 * @Description TODO
 * @date 2022/8/3 9:48
 * @Author wuxx
 */
@Aspect
@Component
@Slf4j
public class EditLogAspect {


    @Autowired
    private OperateLogService operateLogService;

    @Pointcut("@annotation(com.example.work2.util.log.EditLog)")
    public void pt(){}

    @After("pt()")
    public void around(JoinPoint jp) {


        MethodSignature methodSignature = (MethodSignature) jp.getSignature();
        //获取Cache注解
        EditLog annotation = methodSignature.getMethod().getAnnotation(EditLog.class);
        String content = annotation.operate();


    }


}
