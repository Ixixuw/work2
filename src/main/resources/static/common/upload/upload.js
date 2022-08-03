/**
 * Created by yinxl on 2017/9/21.
 */
var upload={
    ticketId: Util.getParam("ticketId"),
    appKey:'5da5441f62e48aedc7a3853ffc75c2db',
    prodID:'gf',
    businessCode:'',
    IMG_URL: appSettings.uploadServer,
    waterMarkText:appSettings.licenceWaterMark,
    timeout: 3000,
    index:0,
    accept: {A: this.acceptAll, B: this.acceptAll, C: this.acceptAll, D: this.acceptAll, E: this.acceptAll, F: this.acceptAll, G: this.acceptAll},
    acceptImg: "image/*",
    acceptAll: "*.*",
    acceptDocPdf: "doc&pdf",
    acceptImgPdf: "img&pdf",
    acceptImgDocPdf: "img&doc&pdf",
    previewContainers: {A: '', B: '', C: '', D: '', E: '', F: '', G: ''},
    waterMarkContainers: {A: '', B: '', C: '', D: '', E: '', F: '', G: ''},
    waterMark:{t: "", f: 48, r: 102, g: 102, b: 102, a: 0.5, d: -40},
    fileIndexList: {A: [], B: [], C: [], D: [], E: [], F: [], G: []},
    fileIDObject: {A: [], B: [], C: [], D: [], E: [], F: [],G: [] },
    imgFileType: ['jpg', 'jpeg', 'png', 'gif', 'JPG', 'JPEG', 'PNG', 'GIF'],
    limit: {A: 5, B: 5, C: 5, D: 5, E: 5, F: 5, G: 5},//0是不限制
    fileLen: {A: 50, B: 10, C: 10, D: 10, E: 10, F: 10, G: 5},//单位M
    init: function (options) {
        this.previewContainers = options.previewContainer ? {A: options.previewContainer} : this.previewContainers;//图片的容器
        this.accept = options.accept ? {A: options.accept} : this.accept;//上传文件格式
        this.limit = options.limit ? {A: options.limit} : this.limit;
        this.fileLen = options.fileLen ? {A: options.fileLen} : this.fileLen;
    },
    initMultiContainer: function (options) {
        this.previewContainers = options.previewContainers || this.previewContainers;//图片的容器
        this.fileIndexList = options.fileIndexList || this.fileIndexList;//图片的容器
        this.fileIDObject = options.fileIDObject || this.fileIDObject;//图片的容器
        this.accept = options.accept || this.accept;//上传文件格式
        this.limit = options.limit || this.limit;
        this.fileLen = options.fileLen || this.fileLen;
        this.waterMarkContainers = options.waterMarkContainers || this.waterMarkContainers;
        this.waterMark = options.waterMark || this.waterMark;

    },
    deleteEmptyForm:function () {
        var inputFileList=$('input[type=file]');
        for(var i=0;i<inputFileList.length;i++){
            if(inputFileList.eq(i)[0]['files'].length==0){
                inputFileList.eq(i).parent().remove();
            }
        }
    },
    addFile:function (viewContainer) {
        var viewContainer = viewContainer || 'A';
        var fileList = upload.fileIndexList[viewContainer];
        var fileLimit = upload.limit[viewContainer];
        var fLenght = upload.fileLen[viewContainer] * 1000 * 1024;
        if (fileLimit > 0 && fileList.length >= fileLimit) {
            jqueryDialog.alert({msg: '文件数量已达上限', status: 'info', timeout: upload.timeout});
            return;
        }
        this.deleteEmptyForm();
        var acceptType = upload.accept[viewContainer];
        var formId = "myform" + (viewContainer) + this.index;
        var str = '<form action="" id="' + formId + '" style="display: none" method="post" enctype="multipart/form-data">' +
            '<input type="hidden"   name="appKey" value="" />' +
            '<input type="hidden"   name="prodID" value="" />' +
            '<input type="hidden"   name="ticketId" value="" />' +
            '<input type="hidden" id="businessCode' + (viewContainer) + '" name="businessCode" code="businessCode' + (viewContainer) + '" value=""/>' +
            '<input id="uploadImage' + (viewContainer) + this.index + '" type="file" name="file" accept="' + acceptType + '"/>' +
            '</form>';
        $('body').append(str);
        $('#uploadImage' + (viewContainer) + this.index).click();
        $('#uploadImage' + (viewContainer) + this.index).on('change', function () {
            var files = !!this.files ? this.files : [];
            if (!files.length || !window.FileReader) return;
            var upFile = files[0];

            if (upFile.size  >  fLenght) {
                jqueryDialog.alert({msg: '文件大小请在' + upload.fileLen[viewContainer] +'M以内', status: 'info', timeout: upload.timeout});
                $("#" + formId).remove();
                return;
            }
            if (/\.exe/.test(upFile.name)) {
                jqueryDialog.alert({msg: '不能上传扩展名为exe的文件', status: 'info', timeout: upload.timeout});
                $("#" + formId).remove();
                return;
            }
            var curAccept = upload.accept[viewContainer];
            var isImgFile = /^image/.test(upFile.type);

            if(upload.acceptDocPdf == curAccept && !(/\.pdf/.test(upFile.name) || /\.doc/.test(upFile.name))){
                jqueryDialog.alert({msg: '只能上传pdf格式或者doc及docx格式的文件', status: 'info', timeout: upload.timeout});
                $("#" + formId).remove();
                return;
            }else if(upload.acceptImgDocPdf == curAccept && !(/\.pdf/.test(upFile.name) || /\.doc/.test(upFile.name) || isImgFile)){
                jqueryDialog.alert({msg: '只能上传图片格式、pdf格式或者doc及docx格式的文件', status: 'info', timeout: upload.timeout});
                $("#" + formId).remove();
                return;
            }else if (upload.acceptImg == curAccept && !isImgFile) {
                jqueryDialog.alert({msg: '只能上传图片格式的文件', status: 'info', timeout: upload.timeout});
                $("#" + formId).remove();
                return;
            }else if (upload.acceptImgPdf == curAccept && !(/\.pdf/.test(upFile.name) || isImgFile)) {
                jqueryDialog.alert({msg: '只能上传图片格式或者pdf格式的文件', status: 'info', timeout: upload.timeout});
                $("#" + formId).remove();
                return;
            }

            if (isImgFile) {
                fileList.push(upload.index);
                var currentIndex = upload.index;
                upload.index++;
                var reader = new FileReader();
                reader.readAsDataURL(files[0]);
                reader.onloadend = function () {
                    var str = '<div class="file-preview-frame" id="file-preview' + (viewContainer) + currentIndex + '">' +
                        '<img src="' + this.result + '">' +
                        '<div class="file-thumbnail-footer">' +
                        '<a href="javascript:;" title="删除" class="deleteImg" onclick="upload.deleteImg(' + currentIndex + ',\'' + (viewContainer) + '\')"><i class="fa fa-trash"></i></a>' +
                        '<div class="file-caption-name">确认保存后上传</div>' +
                        '</div>' +
                        '</div>';
                    $(upload.previewContainers[viewContainer]).append(str);
                    upload.imgBindEvent();
                }
            } else {
                fileList.push(upload.index);
                var currentIndex = upload.index;
                upload.index++;
                var str = '<div class="file-preview-frame" id="file-preview' + (viewContainer) + currentIndex + '">' +
                    '<div class="text-preview">' + upFile.name + '</div>' +
                    '<div class="file-thumbnail-footer">' +
                    '<a href="javascript:;" title="删除" class="deleteImg" onclick="upload.deleteImg(' + currentIndex + ',\'' + (viewContainer) + '\')"><i class="fa fa-trash"></i></a>' +
                    '<div class="file-caption-name">确认保存后上传</div>' +
                    '</div>' +
                    '</div>';
                $(upload.previewContainers[viewContainer]).append(str);
            }
        });
    },
    imgBindEvent:function () {
        $('.file-preview-frame img').unbind('click');
        $('.file-preview-frame img').on('click',function () {
            if($('.large').length>0){
                $('.large img').attr('src',$(this).attr('src'));
                $('.large').show();
            }else{
                $('body').append('<div class="large"><img src="'+$(this).attr('src')+'"></div>');
                $('.large').on('click',function () {
                    $(this).hide();
                })
            }
        });
    },
    delete:function (fileID) {
        $.ajax({
            url:upload.IMG_URL+'/remove',
            data:{
                appKey:upload.appKey,
                prodID:upload.prodID,
                fileID:fileID
            },
            async: false,
            success:function (data) {
                if(data.success){

                }
            }
        })
    },
    deleteImg:function (currentIndex, viewContainer) {
        var viewContainer = viewContainer || 'A';
        var fileID= upload.fileIDObject[viewContainer][currentIndex+''];
        if(fileID){//已上传
            var data= {
                msg: '删除后该文件无法恢复,确认要删除该文件？',
                title: '删除确认',
                type: 'info',
                cancelText: '取消',
                sureText: '确定',
                success: function () {
                    upload.delete(fileID);
                    upload.removeImg(currentIndex, viewContainer);
                    delete upload.fileIDObject[viewContainer][currentIndex+''];
                }
            };
            jqueryDialog.confirmTable(data);
        }else{
            upload.removeImg(currentIndex, viewContainer);
        }
    },
    removeImg:function (currentIndex, viewContainer) {
        var viewContainer = viewContainer || 'A';
        var index = upload.fileIndexList[viewContainer].indexOf(currentIndex);
        if (index > -1) {
            upload.fileIndexList[viewContainer].splice(index, 1);
        }
        $('#myform' + viewContainer + currentIndex).remove();
        $('#file-preview' + viewContainer + currentIndex).remove();
    },
    removeAll: function (viewContainer) {
        var fileidxs = upload.fileIndexList[viewContainer];
        for (var i = 0; i < fileidxs.length; i++) {
            $('#myform' + viewContainer + fileidxs[i]).remove();
            $('#file-preview' + viewContainer + fileidxs[i]).remove();
        }
        upload.fileIndexList[viewContainer] =  [];
        upload.fileIDObject[viewContainer] =  [];
    },
    upload:function (businessCode, viewContainer) {
        var viewContainer = viewContainer ||'A';
        var fileList = upload.fileIndexList[viewContainer];
        var fileIdList = upload.fileIDObject[viewContainer];
        if (fileList.length == 0) {
            jqueryDialog.alert({msg: '请选择上传文件', status: 'info', timeout: upload.timeout});
            return;
        }
        $('input[name=appKey]').val(upload.appKey);
        $('input[name=prodID]').val(upload.prodID);
        $('input[name=ticketId]').val(upload.ticketId);
        $('input[code=businessCode' + (viewContainer) + ']').val(businessCode + (viewContainer));

        for(var i in fileList){
            var formIdIndex=fileList[i];
            if(fileIdList[formIdIndex+'']){
                continue;
            }
            $('#myform'+ (viewContainer) + formIdIndex).ajaxSubmit({
                url: upload.IMG_URL+'/upload',
                type: 'POST',
                async: false,
                success: function(data) {
                    console.log(data);
                    if(data.success) {
                        console.log('上传成功');
                        $('#file-preview' + (viewContainer) +formIdIndex).find('.file-caption-name').html('已上传').css('color','green');
                        fileIdList[formIdIndex+'']=data.message.fileID;
                    } else {
                        console.log('上传失败');
                    }
                },
                error: function(err) {
                    console.log('上传失败');
                }
            });
        }
    },
    getImgListByBusinessCode:function (businessCode, viewContainer) {
        var viewContainer = viewContainer || 'A';
        var files=[];
        if(businessCode){
            $.ajax({
                url:upload.IMG_URL+'/queryList',
                data:{
                    appKey:upload.appKey,
                    prodID:upload.prodID,
                    businessCode:businessCode + (viewContainer)
                },
                async: false,
                success:function (data) {
                    if(data.success){
                        files=data.files;
                    }
                }
            });
        }
        return files;
    },
    getAllImgListByBusinessCode:function (businessCode) {
        var files=[];
        if(businessCode){
            $.ajax({
                url:upload.IMG_URL+'/queryAllList',
                data:{
                    appKey:upload.appKey,
                    prodID:upload.prodID,
                    businessCode:businessCode
                },
                async: false,
                success:function (data) {
                    if(data.success){
                        files=data.files;
                    }
                }
            });
        }
        return files;
    },
    copyFile: function (businessCode, newBusinessCode) {
        $.ajax({
            type: "POST",
            url: appSettings.uploadServer + '/copyFile' + '?ticketId=' + vue.ticketId,
            async: false,
            data: {
                appKey: upload.appKey,
                prodID: upload.prodID,
                businessCode: businessCode,
                newBusinessCode: newBusinessCode
            },
            success: function (result) {
                return result.success;
            }
        });
        return false;
    },
    download:function (fileID) {
        var downloadUrl=upload.IMG_URL+'/download?fileID='+fileID + '&ticketId=' + upload.ticketId;
        window.location.href =downloadUrl;
    },
    /**
     *  根据业务编码打包下载文件
     *  businessCodes 业务唯一编码,多个编码按,分割
     *  fileName 生成的压缩包文件名
     */
    compressDownload:function (businessCodes,fileName) {
        var downloadUrl=upload.IMG_URL+'/compressDownload?businessCodes='+businessCodes+ '&fileName=' + fileName + '&ticketId=' + upload.ticketId;
        window.location.href =downloadUrl;
    },
    unCheckDownload:function(fileID) {
        var downloadUrl=upload.IMG_URL+'/download?fileID='+fileID + '&ticketId=unCheck';
        window.location.href =downloadUrl;
    },
    rendorList:function (files, viewContainer, isView) {
        if(files && files.length > 0){
            var isView = isView || false;
            var viewContainer = viewContainer ||'A';
            var fileIndexList = upload.fileIndexList[viewContainer];
            var fileIDObject =  upload.fileIDObject[viewContainer];
            $(upload.previewContainers[viewContainer]).empty();

            var waterMarkParam = "";
            if (upload.waterMarkContainers[viewContainer]) {
                waterMarkParam += "&r=" + upload.waterMark.r;
                waterMarkParam += "&g=" + upload.waterMark.g;
                waterMarkParam += "&b=" + upload.waterMark.b;
                waterMarkParam += "&a=" + upload.waterMark.a;
                waterMarkParam += "&d=" + upload.waterMark.d;
                waterMarkParam += "&t=" + upload.waterMark.t;
                waterMarkParam += "&f=" + upload.waterMark.f;
            }

            for(var i in files){
                if(upload.imgFileType.indexOf(files[i]['fileExtension'])>-1){
                    var fileID=files[i]['fileID'];
                    fileIndexList.push(i*1);
                    fileIDObject[i+'']=fileID;
                    var imgSrc=upload.IMG_URL+'/view?fileID='+fileID;
                    var str='<div class="file-preview-frame img-preview" id="file-preview'+ (viewContainer) +i+'">'+
                        '<img src="'+imgSrc+waterMarkParam+'">'+
                        '<div class="file-thumbnail-footer">'+
                        '<a href="javascript:;" onclick="upload.download(\''+fileID+waterMarkParam+'\');" title="下载" class="downloadImg"><i class="fa fa-download"></i></a>'+
                        (isView ? '' : ( '<a href="javascript:;" title="删除" class="deleteImg" onclick="upload.deleteImg('+i+',\''+ (viewContainer) +'\')"><i class="fa fa-trash"></i></a>'+
                        '<div class="file-caption-name" style="color: green;">已上传</div>' )) +
                        '</div>'+
                        '</div>';
                    $(upload.previewContainers[viewContainer]).append(str);
                }else{
                    var fileID=files[i]['fileID'];
                    fileIndexList.push(i*1);
                    fileIDObject[i+'']=fileID;
                    var str='<div class="file-preview-frame img-preview" id="file-preview'+ (viewContainer) + i + '">'+
                        '<div class="text-preview">'+files[i]['fileName']+'</div>'+
                        '<div class="file-thumbnail-footer">'+
                        '<a href="javascript:;" onclick="upload.download(\''+fileID+'\');" title="下载" class="downloadImg"><i class="fa fa-download"></i></a>'+
                        (isView ? '' : ( '<a href="javascript:;" title="删除" class="deleteImg" onclick="upload.deleteImg('+i+',\''+ (viewContainer) +'\')"><i class="fa fa-trash"></i></a>'+
                        '<div class="file-caption-name" style="color: green;">已上传</div>' )) +
                        '</div>' +
                        '</div>';

                    $(upload.previewContainers[viewContainer]).append(str);
                }
            }
            upload.imgBindEvent();
            upload.index=files.length;
        }
    },
    rendorListDiv:function (file, divId, isView) {
        if(file && file['fileID']){
            $(divId).empty();
            var isView = isView || false;
            var fileID = file['fileID'];
            var imgSrc = upload.IMG_URL + '/view?fileID=' + fileID;
            var str = '<div class="file-preview-frame img-preview" id="file-preview' + divId + '">' +
                '<img src="' + imgSrc + '">' +
                '<div class="file-thumbnail-footer">' +
                '<a href="javascript:;" onclick="upload.download(\'' + fileID + '\');" title="下载" class="downloadImg"><i class="fa fa-download"></i></a>' +
                (isView ? '' : ('<a href="javascript:;" title="删除" class="deleteImg" onclick="upload.deleteImg(' + i + ',\'A\')"><i class="fa fa-trash"></i></a>' +
                    '<div class="file-caption-name" style="color: green;">已上传</div>')) +
                '</div>' +
                '</div>';
            $(divId).append(str);
            upload.imgBindEvent();
        }
    }
}
