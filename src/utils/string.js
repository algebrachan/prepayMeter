
export function trim(str) { //删除左右两端的空格
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
export function getUtcString() {
    var myDate = new Date();
    return myDate.getTime().toString();
}