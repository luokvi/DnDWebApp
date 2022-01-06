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

    //Debug item creation.
    console.log("CreateItem posting:")
    console.log(body)

    const res = await axios.post(url, body, axiosConfig)

    //Debug item creation.
    console.log("CreateItem got response:")
    console.log(res)

    return res.data
}

const getEquipment = async (body, token) => {
    const url = baseUrl + "items/equipment"
    const axiosConfig = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    const res = await axios.get(url, body, axiosConfig)

    return res.data
}

const getSpells = async (body, token) => {
    const url = baseUrl + "items/spells"
    const axiosConfig = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    const res = await axios.get(url, body, axiosConfig)

    return res.data
}

const getWeapons = async (body, token) => {
    const url = baseUrl + "items/weapons"
    const axiosConfig = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    const res = await axios.get(url, body, axiosConfig)

    return res.data
}

export default { createCharacter, createItem, getEquipment, getSpells, getWeapons }