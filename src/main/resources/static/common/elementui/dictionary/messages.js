//许可证的报错 去找对应的国际化找不到 如果没有对应的值默认使用dictionaryDev
var messages = {
    dev:dictionaryDev,
    ah:typeof(dictionaryAh)  == "undefined"?dictionaryDev:dictionaryAh,
    hebei:typeof(dictionaryHeBei)  == "undefined"?dictionaryDev:dictionaryHeBei,
    shh:typeof(dictionaryShh)  == "undefined"?dictionaryDev:dictionaryShh,
    jx:typeof(dictionaryJx)  == "undefined"?dictionaryDev:dictionaryJx,
};