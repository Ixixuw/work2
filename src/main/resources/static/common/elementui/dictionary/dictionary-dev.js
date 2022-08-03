var dictionaryDev = {
    transfer: {
        sign: '签收',
        manifestNo: '联单编号',
    },
    inventory: {
        addBusiMessage:'产废入库需要提交并确认后，才会入库！',//产废入库业务提示  无内容则不展示
        listBusiMessageA:'本功能仅用于生产性危废和非生产性危废入库。产废入库需要提交并确认后，才会入库！',
        listBusiMessageB:'；每批次重量请控制在1吨范围内；如遇到散装或液体废物，为便于该批次出库转移，每批次重量也勿大于常用运输工具载重上限，否则将无法转移！',
        inventorySaveMessage:'常用运输工具载重上限，否则无法转移！',
    },
    transferOutManifest: {
        reply:'复函',
        replyRemark:'复函意见',
        commitRemark:'商请意见',
        alreadyRemark:'批复意见',
        commit:'商请',
        already:'批复',
        agreeCommit:'同意商请',
        noAgreeCommit:'不同意商请',
        agreeAlready:'批复通过',
        noAgreeAlready:'批复不通过',
        recordIn:'同意转入',
        noRecordIn:'不同意转入',
    },
    //单位产废
    generatedWaste:{
        secondaryWaste:'次生危废',
    },
    //管理计划
    managementPlan:{
        changeTip:'【改】',
    },
    //许可证
    licence:{
        secondaryWaste:"次生危废"
    },
    //医疗机构
    medical: {
        registerNo: '医疗机构登记号',
    },
    // 跨省转出申请
    transferOutApplyPlan: {
        onExport: '暂存表单页',
        cantExportMsg: '该申请已经保存，无法再次暂存！',
        delFileMsg: '暂存功能不支持文件上传，请删除所有上传文件后再操作！',
    },
    common: COMMON,
    exception: {
        earlyWarning: '预警'
    }
};