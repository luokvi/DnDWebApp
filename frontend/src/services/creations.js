import axios from "axios"

const baseUrl = '/api/'

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

const updateCharacter = async (body, token) => {
    const characterId = body.characterId
    const url = baseUrl + "character/" + characterId
    const axiosConfig = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    const res = await axios.patch(url, body, axiosConfig)
    return res.data
}

const getCharacter = async (id, token) => {
    const url = baseUrl + "character/" + id
    const axiosConfig = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    const res = await axios.get(url, axiosConfig)

    console.log("Creations got character:")
    console.log(res.data)
    
    return res.data
}

const createItem = async (body, token) => {
    const url = baseUrl + "items"
    const axiosConfig = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    //Debug item creation.
    console.log("CreateItem posting:")
    console.log(body)

    const res = await axios.post(url, body, axiosConfig)

    //Debug item creation.
    console.log("CreateItem got response:")
    console.log(res)

    return res.data
}

const getEquipment = async () => {
    const url = baseUrl + "items/equipment"

    const res = await axios.get(url)

    return res.data
}

const getSpells = async () => {
    const url = baseUrl + "items/spells"

    const res = await axios.get(url)

    return res.data
}

const getWeapons = async () => {
    const url = baseUrl + "items/weapons"

    const res = await axios.get(url)

    return res.data
}

const getParty = async (id) => {
    const url = baseUrl + 'character/party/' + id

    const res = await axios.get(url)

    return res.data
}

const createParty = async (body, token) => {
    const url = baseUrl + "character/party"
    const axiosConfig = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    const res = await axios.post(url, body, axiosConfig)
    return res.data
}

export default { createCharacter, createItem, getEquipment, getSpells, getWeapons, getCharacter, updateCharacter, getParty, createParty }