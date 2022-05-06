import moment from "moment";

/**
 * 获取设备标识
 * PC 或 APP
 * @returns {string}
 */
function getDeviceType(){
    let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    );
    if (flag === null) {
        return 'PC'
    } else {
        return 'APP'
    }
}

/**
 * 修改时间格式
 */
function changeTimeFormat(val){
    return moment(val).format('YYYY-MM-DD HH:mm:ss')
}

/**
 * 计算上次时间
 */
function calLastTime(val) {
    moment.suppressDeprecationWarnings = true;
    val = moment(val).format("YYYY-MM-DD HH:mm:ss");
    const now = moment().format("YYYY-MM-DD HH:mm:ss");
    const seconds = moment(now).diff(val, "seconds");
    if (seconds <= 60) {
        return seconds + "秒前";
    } else if (seconds <= 3600) {
        return (seconds / 60).toFixed(0) + "分钟前";
    } else if (seconds <= 86400) {
        return (seconds / 3600).toFixed(0) + "小时前";
    } else if(seconds<=2592000){
        return moment(now).diff(val, "days") + "天前";
    } else if(seconds<=31104000)
    {
        return moment(now).diff(val, "months") + "月前";
    }
    else{
        return moment(now).diff(val, "years") + "年前";
    }
}


export default {
    getDeviceType,
    changeTimeFormat,
    calLastTime
}