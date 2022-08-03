/*
 * @Description: 
 * @Author: wudang
 * @Date: 2021-07-22 14:55:36
 * @FilePath: \webapp\main\common\component\fileUpload\fileUpload.js
 * @LastEditTime: 2021-07-23 17:58:31
 * @LastEditors: wudang
 */
Vue.component('file-upload', {
    template: `
    <div class="file-upload-container">
        <div v-if="loading" class="file-loading"><i class="el-icon-loading"></i>文件加载中</div>
        <el-upload
            ref="fileUpload"
            :class="{'view-only':viewOnly}"
            :disabled="viewOnly"
            :action="upLoadAction"
            :data="upLoadParams"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="limit"
            :auto-upload="autoUpload"
            :accept="accept"
            :list-type="listType"
            :file-list="fileList"
            :before-upload="beforeUpload"
            :on-change="handleAvatarChange"
            :on-success="onUploadSuccess"
            :on-exceed="handleExceed">
                <i class="el-icon-plus" v-if="listType=='picture-card'"></i>
                <el-button size="small" type="primary" v-else>点击上传</el-button>
        </el-upload>
        <div class="upload-append">
                <slot name="append"></slot>
        </div>
        <div class="el-upload__tip" v-if="tip">{{tip}}</div>
        <div v-show="false" v-if="isNewVersion">
            <el-image :class="'preview'+item.fileID"
                :src="item.url" 
                v-for="(item,index) in imgFileList"
                :preview-src-list="imgUrlList">
            </el-image>
        </div>
        <el-dialog
            title="图片查看"
            :visible.sync="dialogVisible"
            width="80%">
            <img class="img-preview" :src="previewUrl"/>
        </el-dialog>
    </div>
    `,

    data() {
        return {
            upLoadAction: upload.IMG_URL + "/upload",
            upLoadParams: {
                appKey: upload.appKey,
                prodID: upload.prodID,
                businessCode: '',
                ticketId: Util.getParam("ticketId")
            },
            previewUrl: '',
            fileList: [],
            dialogVisible: false,
            isNewVersion: true,
            submitCallBack:null,
            loading:false,
        }
    },
    computed: {
        imgFileList() {
            let list = this.fileList.filter(item => {
                if(item.response&& this.isImg(item.response.message.fileExtension)){
                    return true;
                }
                let fileExtension=item.name.substr(item.name.lastIndexOf('.')+1);
                if(!item.response&&item.url&&this.isImg(fileExtension)){
                    return true;
                }
                return false
            })
            list.map(item => {
                if(item.response){
                    item.fileID = item.response.message.fileID;
                    item.url = upload.IMG_URL + "/view?fileID=" + item.response.message.fileID;
                }
            })
            return list;
        },
        imgUrlList() {
            let list = this.fileList.filter(item => {
                if(item.response&& this.isImg(item.response.message.fileExtension)){
                    return true;
                }
                let fileExtension=item.name.substr(item.name.lastIndexOf('.')+1);
                if(!item.response&&item.url&&this.isImg(fileExtension)){
                    return true;
                }
                return false
            })
            return list.map(item => {
                return item.response&&(upload.IMG_URL + "/view?fileID=" + item.response.message.fileID)||item.url;
            })
        }
    },
    props: {
        "businessCode": {
            type: String,
            default: ''
        },
        "listType": {
            type: String,
            default: 'text'
        },
        limit: {
            type: Number,
            default: 0
        },
        "autoUpload": {
            type: Boolean,
            default: true
        },
        "viewOnly": {
            type: Boolean,
            default: false
        },
        tip: {
            type: String,
            default: ''
        },
        accept: {
            type: String,
            default: ''
        },
        size: {
            type: Number,
            default: 0
        },
        "rewriteFlag": {
            type: Boolean,
            default: false
        }
    },
    watch: {
        businessCode: function (newVal, oldVal) {
            if (newVal) {
                this.init();
            }
        }
    },
    created() {
        this.checkVersion();
        if(this.businessCode){
            this.init();
        }

    },
    mounted() {},
    methods: {
        clearAll(){
            this.fileList.map(item=>{
                if(item.response&&item.response.message&&item.response.message.fileID){
                    upload.delete(item.response.message.fileID);
                }
            })
            this.fileList=[];
            this.$refs.fileUpload.clearFiles();
        },
        getFileList(){
            let uploadSuccessNum=0,noUploadNum=0,uploadFailNum=0;
            this.fileList.forEach(item=>{
                    if(!item.response){
                        noUploadNum++;
                    }else if(item.response.success){
                        uploadSuccessNum++;
                    }else{
                        uploadFailNum++;
                    }
            })
            let obj={
                fileList:this.fileList,
                totalNum:this.fileList.length,
                uploadSuccessNum,
                noUploadNum,
                uploadFailNum
            }
            return obj;
        },
        submit(callback){
            if(arguments.length>1){
                this.$set(this.upLoadParams,'businessCode',arguments[1])
            }
            if(typeof callback=='function'){
                this.submitCallBack=callback;
            }
            this.$nextTick(()=>{
                this.$refs.fileUpload.submit();
            })
        },
        checkVersion() {
            let currentVersion =ELEMENT.version;
            let targetVersion = '2.15.0';
            var a = this.toNum(currentVersion);
            var b = this.toNum(targetVersion);
            this.isNewVersion = a >= b;
        },
        init() {
            if (this.businessCode) {
                this.$set(this.upLoadParams, 'businessCode', this.businessCode);
            }
            this.getCurrentFileList();
        },
        endWith(str, endStr) {
            str = str.toLowerCase();
            endStr = endStr.toLowerCase();
            var d = str.length - endStr.length;
            return (d >= 0 && str.lastIndexOf(endStr) == d);
        },
        getCurrentFileList() {
            this.loading=true;
            $.ajax({
                url: upload.IMG_URL + '/queryList',
                data: {
                    appKey: upload.appKey,
                    prodID: upload.prodID,
                    businessCode: this.businessCode
                },
                success: (res) => {
                    this.loading=false;
                    if (res.success && res.files && res.files.length) {
                        let flag = true;
                        let list = res.files.map(item => {
                            if (flag && !this.isImg(item.fileExtension)) {
                                flag = false;
                            }
                            return {
                                name: item.fileName,
                                url: upload.IMG_URL + "/view?fileID=" + item.fileID,
                                response: {
                                    message: item,
                                    success: true
                                }
                            }
                        })
                        if (!flag) {
                            this.listType = '';
                        }
                        this.fileList = list;
                        this.$emit('change', list);
                    }else{
                        this.fileList = [];
                    }
                },error:(err)=>{
                    this.loading=false;
                }
            });

        },
        beforeUpload(file){
            if (this.accept) {
                let acceptTypeList = this.accept.split(',');
                let flag = acceptTypeList.some(item => {
                    return this.endWith(file.name, item);
                })
                if (!flag) {
                    this.$message.error('只能上传' + this.accept + '文件');
                    this.$refs.fileUpload.abort(file);
                    // fileList.pop();
                    return false;
                }
            }
            if (this.size > 0 && file.size > this.size * 1024 * 1024) {
                this.$message.error(`只能上传不大于${this.size}M的文件`);
                this.$refs.fileUpload.abort(file);
                // fileList.pop();
                return false;
            }

        },
        handleAvatarChange: function (file, fileList) {
            if(!this.autoUpload){
                if (this.accept) {
                    let acceptTypeList = this.accept.split(',');
                    let flag = acceptTypeList.some(item => {
                        return this.endWith(file.name, item);
                    })
                    if (!flag) {
                        this.$message.error('只能上传' + this.accept + '文件');
                        // this.$refs.fileUpload.abort(file);
                        fileList.pop();
                        return;
                    }
                }
                if (this.size > 0 && file.size > this.size * 1024 * 1024) {
                    this.$message.error(`只能上传不大于${this.size}M的文件`);
                    // this.$refs.fileUpload.abort(file);
                    fileList.pop();
                    return;
                }

                fileList.map((file,index)=>{
                    if(file.response||file.fileID){
                        return true;
                    }
                    let fileExtension=file.name.substr(file.name.lastIndexOf('.')+1);
                    if(this.isImg(fileExtension)&&!file.url){
                        ((file)=>{
                            this.getFileURL(file.raw,(url)=>{
                                file.url=url;
                                file.fileID=Math.floor(Math.random()*10000);
                                // this.fileList.push(file);
                                this.$set(this.fileList,index,file);
                            });
                        })(file)
                    }else if(!file.fileID){
                        file.fileID=Math.floor(Math.random()*10000);
                        this.$set(this.fileList,index,file);
                        // this.fileList.push(file);
                    }
                })
            }
            this.$emit('change', fileList);
        },
        onUploadSuccess(response, file, fileList) {
            if(!response.success&&this.autoUpload){
                this.$message({
                    type: 'error',
                    message: file.name+'上传失败，原因：'+response.message,
                    timeout: 2000
                });
                fileList.pop();
            }
            this.fileList = fileList;
            if(typeof this.submitCallBack=='function'){
                let flag=fileList.every(item=>{
                    return item.response;
                })
                if(flag){
                    let uploadSuccessNum=0,uploadFailNum=0;
                    fileList.forEach(item=>{
                        if(item.response.success){
                            uploadSuccessNum++;
                        }else{
                            uploadFailNum++;
                        }
                    })
                    let obj={
                        fileList:fileList,
                        totalNum:fileList.length,
                        uploadSuccessNum,
                        uploadFailNum
                    }
                    this.submitCallBack(obj);
                    this.submitCallBack=null;
                }
            }
        },
        handleRemove(file, fileList) {
            if (this.rewriteFlag) {
                this.$emit('rewrite',file,fileList);
                return false;
            }else {
                file.response&&file.response.message.fileID&&upload.delete(file.response.message.fileID);
                this.fileList=fileList;
                this.$emit('change', fileList);
            }
        },
        isImg(fileExtension) {
            if (!fileExtension) {
                return false;
            }
            fileExtension = fileExtension.toLowerCase();
            return ['png', 'jpg','jpeg', 'gif'].indexOf(fileExtension) > -1;
        },
        handlePreview(file) {
            if (this.autoUpload||file.response) {
                if (file.response && file.response.message) {
                    let obj = file.response.message;
                    let fileID = obj.fileID;
                    let url = upload.IMG_URL + "/view?fileID=" + fileID;
                    let fileExtension = obj.fileExtension.toLowerCase();
                    if (this.isImg(fileExtension)) {
                        if (this.isNewVersion) {
                            $('.preview' + fileID + ' img').click();
                        } else {
                            this.previewUrl = url;
                            this.dialogVisible = true;
                        }
                    } else if (fileExtension == 'pdf') {
                        let pdfUrl = '/main/pdfJs/web/viewer.html?file=' + encodeURIComponent('/enterpriseFileDetail/downByFileIdWithStream?fileUrl=' + upload.IMG_URL + "&fileId=" + obj.fileID + '#' + obj.fileName);
                        layer.open({
                            type: 2,
                            title: obj.fileName,
                            area: ['80%', '90%'],
                            content: pdfUrl
                        });
                    }else if (fileExtension =="doc" || fileExtension == "docx") {
                        let pdfUrl = '/main/pdfJs/web/viewer.html?file=' + encodeURIComponent('/enterpriseFileDetail/downByFileIdWithDocStream?fileUrl=' + upload.IMG_URL + "&fileId=" + obj.fileID + '#' + obj.fileName);
                        layer.open({
                            type: 2,
                            title: obj.fileName,
                            area: ['80%', '90%'],
                            content: pdfUrl
                        });
                    }  else {
                        window.open(upload.IMG_URL + "/download?fileID=" + fileID);
                    }
                }
            }else{
                let fileExtension=file.name.substr(file.name.lastIndexOf('.')+1);
                if(this.isImg(fileExtension)){
                    if (this.isNewVersion) {
                        $('.preview' + file.fileID + ' img').click();
                    } else {
                        this.previewUrl = file.url;
                        this.dialogVisible = true;
                    }
                }else if(fileExtension.toLowerCase()==='pdf'){
                    this.$message({
                        message: `pdf文件请上传后再查看`,
                        type: 'warning',
                        duration: 3000
                    });
                }
            }
        },
        getFileURL(file,callback) {
            //创建读取文件的对象
            var reader = new FileReader();
            //为文件读取成功设置事件
            reader.οnlοad=function(e) {
                callback(e.target.result);
            };
            reader.onloadend=function(e) {
                callback(e.target.result);
            };
            //正式读取文件
            reader.readAsDataURL(file);
        },
        toNum(a) {
            var a = a.toString();
            var c = a.split('.');
            var num_place = ["", "0", "00", "000", "0000"],
                r = num_place.reverse();
            for (var i = 0; i < c.length; i++) {
                var len = c[i].length;
                c[i] = r[len] + c[i];
            }
            var res = c.join('');
            return res;
        },
        handleExceed(files, fileList) {
            this.$message({
                message: `当前限制选择 ${this.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`,
                type: 'warning',
                duration: 5000
            });
        },
        beforeRemove(file, fileList) {
            return !file.response||!file.response.message.fileID||this.$confirm(`确定移除 ${ file.name }？`);
        }
    }
})