var vue = new Vue({
    el: '#app',
    data: {
        loading: false,
        tableData: [],
        pickerOptions0: {
            disabledDate(time) {
                return time.getTime() > Date.now() - 8.64e6;//如果没有后面的-8.64e7就是不可以选择今天的
            }
        },
        paramData: {
            authorized: true,
            operateBy: '',
            current: 1, //当前页数
            size: 10, //每页条数
            totalRecord: 0 //总条数
        },
        dialogFormVisible: false,
        formLabelWidth: '350px',
        labelPosition: 'right',
        roleForm: {
            userName:'',
            age:'',
            sex: '',
            email:'',
            tel: '',
        },
        roleFormRules: {
            userName: [
                {required: true, message: '请填写用户名'}
            ],
            age: [
                {required: true, message: '请填写年龄'},
            ],
            sex: [
                {required: true, message: '请填写性别'},
            ],
            email: [
                {required: true, message: '请填写邮箱'},
            ],
            tel: [
                {required: true, message: '请填写电话'},
            ],
        },
        dialogTitle: '新增用户',
        formRead: false
    },
    created: function () {
        this.initTable();
    },
    methods: {
        handleSizeChange: function (pageSize) {
            this.paramData.size = pageSize;
            this.initTable();
        },
        handleCurrentChange: function (pageCurrent) {
            this.paramData.current = pageCurrent;
            this.initTable();
        },
        handleDialogClose: function () {
            this.$nextTick(function () {
                this.$refs['roleForm'].resetFields();
            }.bind(this))
        },
        onSearch: function () {
            this.paramData.current = 1;
            this.initTable();
        },
        initTable: function () {
            var self = this;
            Util.ajax({
                url:'/log/listLog',
                data:JSON.stringify(self.paramData),
                contentType: "application/json;charset=utf-8",
                success(result){
                    if(result.success){
                        self.tableData = result.data;
                        self.paramData.totalRecord = result.total;
                    }

                }
            })
        },
        statusRender: function (value) {
            return this.statusDic[value];
        },
        roleTypeRender: function (value) {
            return this.roleTypeDic[value];
        }
    }
});