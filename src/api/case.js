import axios from './http'

function getFiles(params) {
    return axios.post('/cases/getfiles', params)
}

function getCaseUsed(params) {
    return axios.post('/cases/getcaseused', params)
}

function unCompress(params) {
    return axios.post('/cases/uncompress', params)
}

function deleteFile(params) {
    return axios.post('/cases/removefiles', params)
}

function setCases(params) {
    return axios.post('cases/setcases', params)
}
export default {
    getFiles,
    getCaseUsed,
    unCompress,
    deleteFile,
    setCases
}