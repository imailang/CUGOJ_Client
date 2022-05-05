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


export default {
    getDeviceType
}