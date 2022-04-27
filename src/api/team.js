import axios from './http'

function getTeamList(params) {
    return axios.post('/team/getteamlist', params)
}

function getSelfTeamList(params) {
    return axios.post('/team/getselfteamlist', params)
}

export default {
    getTeamList,
    getSelfTeamList
}
