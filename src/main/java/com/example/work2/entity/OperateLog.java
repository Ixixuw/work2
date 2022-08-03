package com.example.work2.entity;

import lombok.Data;

/**
 * @Description 数据库OperateLog实体类
 * @date 2022/8/2 15:28
 * @Author wuxx
 */
@Data
public class OperateLog {

    private String id;

    private String ip;

    private String content;

    private String operateDate;

    private String deleteFlag;

    private String operateBy;
}
