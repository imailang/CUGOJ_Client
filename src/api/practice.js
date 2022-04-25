import axios from './http'

function checkPermission(params) {
    return axios.post('/practice/checkpermission', params)
}

export default {
    checkPermission
}