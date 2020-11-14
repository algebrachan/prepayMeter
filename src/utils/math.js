
import moment from 'moment';

export function getNextMonthUtc(dateStr) {

    let year = parseInt(dateStr.split('-')[0]);
    let month = parseInt(dateStr.split('-')[1]);
    let nextDateStr = ""
    if (month === 12) {
        year += 1;
        month = 0;
    }
    month += 1;
    nextDateStr += year + "-" + month;
    let utc2 = moment(nextDateStr).valueOf();
    return utc2;
}

export function changeTimeStr2Min(timeStr) {
    let res = 0;
    let hour = parseInt(timeStr.split(':')[0]);
    let min = parseInt(timeStr.split(':')[1]);
    res = hour * 60 + min;
    return res;
}

export function isNumber(val) {
    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if (regPos.test(val) || regNeg.test(val)) {
        return true;
    } else {
        return false;
    }
}
export function checkInt(val){
    var regInt = /^[0-9]*[1-9][0-9]*$/;
    if(regInt.test(val)){
        return true;
    }else{
        return false;
    }
}
