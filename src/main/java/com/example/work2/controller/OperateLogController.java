package com.example.work2.controller;

import com.example.work2.entity.OperateLog;
import com.example.work2.entity.User;
import com.example.work2.model.OperateLogParam;
import com.example.work2.service.OperateLogService;
import com.example.work2.util.JsonResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * @Description TODO
 * @date 2022/8/3 14:22
 * @Author wuxx
 */
@RestController
@RequestMapping("log")
public class OperateLogController {

    @Autowired
    private OperateLogService operateLogService;

    @ResponseBody
    @RequestMapping("listLog")
    public JsonResult<OperateLog> listLog(@RequestBody OperateLogParam operateLogParam) {
        JsonResult<OperateLog> jsonResult = new JsonResult<>();
        jsonResult.setSuccess(true);
        jsonResult.setTotal(operateLogService.countOperateLog(operateLogParam));
        if (jsonResult.getTotal() > 0L) {
            jsonResult.setData(operateLogService.listOperateLog(operateLogParam));
        }
        return jsonResult;
    }
}
