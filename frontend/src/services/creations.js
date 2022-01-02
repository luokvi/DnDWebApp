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

export default { createCharacter, createItem, getEquipment, getSpells, getWeapons }