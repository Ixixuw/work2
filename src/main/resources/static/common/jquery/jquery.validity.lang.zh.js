$.extend($.validity.messages, {
	require:"#{field}不能为空！",
	// Format validators:
//            match:"#{field} is in an invalid format.",
            integer:"#{field}必须是整数！",
            date:"#{field}格式错误！示例：2013-02-08",
            date1:"#{field}格式错误！示例：2013或201309",
            email:"#{field}必须是合法的Email！",
            usd:"#{field} must be formatted as a US Dollar amount.",
            url:"#{field}必须是合法的URL！",
            number:"#{field}必须是数字！",
            zip:"#{field} must be formatted as a zipcode ##### or #####-####.",
            phone:"#{field}必须是加区号的固定电话！",
            moblie:"#{field}必须是11位的手机号码！",
            guid:"#{field} must be formatted as a guid like {3F2504E0-4F89-11D3-9A0C-0305E82C3301}.",
            time24:"#{field}24小时制时间 time: 23:00.",
            time12:"#{field}12小时制时间 time: 12:00 AM/PM",
            positive_number: "#{field}不能为负数！",
            //cjj加的;
           /* phone:"#{field}电话格式不对！",
            moble_phone:"#{field}手机号格式不对！",
            email:"#{field}Email格式不对！",*/
          
            match:"#{field}格式不正确!",
            /*myemail:"#{field}格式不正确！",
            myMobile_phone："#{field}格式不正确！",
            myphone："#{field}格式不正确！",*/          
            
            // Value range messages:
            lessThan:"#{field}的值必须少于#{max}！",
            lessThanOrEqualTo:"#{field}的值不大于#{max}！",
            greaterThan:"#{field}的值必须大于#{min}！",
            greaterThanOrEqualTo:"#{field}的值不小于#{min}！",
            range:"#{field}d的值必须在#{min}和#{max}之间！",

            // Value length messages:
            tooLong:"#{field}的长度不能超过#{max}个字符！",
            tooShort:"#{field}的长度不能短于#{min}个字符！",

            // Composition validators:
            nonHtml:"#{field}不能包含HTML代码！",
            alphabet:"#{field}包含非法代码！",

            minCharClass:"#{field} cannot have more than #{min} #{charClass} characters.",
            maxCharClass:"#{field} cannot have less than #{min} #{charClass} characters.",
            
            // Aggregate validator messages:
            equal:"输入的值不匹配！",
            distinct:"已被占用！",
            sum:"Values don't add to #{sum}.",
            sumMax:"The sum of the values must be less than #{max}.",
            sumMin:"The sum of the values must be greater than #{min}.",

            // Radio validator messages:
            radioChecked:"此选项不可用！",
            
            generic:"无效的！"
});