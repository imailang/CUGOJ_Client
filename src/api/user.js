import axios from "./http";


function emailVerification(params) {
    return axios.post('http://1.14.68.184:9999/ojLogin/userInfo/emailVerification', params)
}
function register(params) {
    return axios.post('http://1.14.68.184:9999/ojLogin/userInfo/register', params)
}

export default {
    emailVerification,
    register
}