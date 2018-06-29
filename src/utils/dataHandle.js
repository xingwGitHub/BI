/*
* 接口返回的对象转换为数组，多用于表格数据
* @param obj
* @return arr
* */
export function objectToArr (obj) {
    let arr = [];
    let keyArr = Object.keys(obj);
    for(let k in keyArr) {
        arr.push(Object.assign({},{start_time: keyArr[k], key: k}, obj[keyArr[k]]));
    }
    return arr.reverse();
}
//按时间倒序排列数组
const by = function(name){
    return function(o, p){
        let a, b;
        if (typeof o === "object" && typeof p === "object" && o && p) {
            a = o[name];
            b = p[name];
            if (a === b) {
                return 0;
            }
            if (typeof a === typeof b) {
                return a < b ? 1 : -1;
            }
            return typeof a < typeof b ? -1 : 1;
        }
        else {
            throw ("error");
        }
    }
}
/*
* 计算两个日期相差多少天，例如：2018-06-01和2018-06-20
* @param startDateString
* @param endDateString
* @return Int
* */
export function dateDiff (startDateString, endDateString){
    var separator = "-"; //日期分隔符
    var startDates = startDateString.split(separator);
    var endDates = endDateString.split(separator);
    var startDate = new Date(startDates[0], startDates[1]-1, startDates[2]);
    var endDate = new Date(endDates[0], endDates[1]-1, endDates[2]);
    return parseInt(Math.abs(endDate - startDate ) / 1000 / 60 / 60 /24);//把相差的毫秒数转换为天数
    // return parseInt(Math.abs(endDate - startDate ) / 1000 / 60 / 60 /24)+1;  // 相差天数包含今天
};
