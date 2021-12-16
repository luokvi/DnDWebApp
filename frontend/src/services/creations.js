import axios from "axios"

const baseUrl = 'api/'

const createCharacter = async (body, token) => {
    const url = baseUrl + "character"
    const axiosConfig = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    const res = await axios.post(url, body, axiosConfig)
    return res.data
}

const createItem = async (body, token) => {
    const url = baseUrl + "items"
    const axiosConfig = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    const res = await axios.post(url, body, axiosConfig)
    return res.data
}

export default { createCharacter, createItem }