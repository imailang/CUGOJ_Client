import axios from './http'

function getUserMessageList(params) {
    return axios.post('/message/getusermessagelist', params);
}

function getUserMessageCount(params) {
    return axios.post('/message/getuserunreadmessagecount', params);
}

function getMessage(params) {
    return axios.post('message/getmessage', params);
}
export default {
    getUserMessageCount,
    getUserMessageList,
    getMessage,
}