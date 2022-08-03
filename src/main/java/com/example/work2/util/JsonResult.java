package com.example.work2.util;

import lombok.Data;

import java.util.List;

/**
 * @Description TODO
 * @date 2022/8/2 16:20
 * @Author wuxx
 */
@Data
public class JsonResult<T> {

    private boolean success;

    private Long total;

    private List<T> data;
}
