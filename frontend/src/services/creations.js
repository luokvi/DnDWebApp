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

const addUserToParty = async (partyId, friendId, token, userId) => {
    const party = await getParty(partyId)

    const updated = {
        ...party,
        characters: [...(party.characters.map(c => c.id))],
        users: [...(party.users.map(u => u.id)), friendId],
        userId: userId
    }

    const url = baseUrl + "character/party/" + partyId
    const axiosConfig = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    const res = await axios.patch(url, updated, axiosConfig)
    return res.data

}

const updateParty = async (body, token) => {
    const url = baseUrl + "character/party/" + body.id
    const axiosConfig = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    const res = await axios.patch(url, body, axiosConfig)
    return res.data
}

export default { createCharacter, createItem, getEquipment, getSpells, getWeapons,
    getCharacter, updateCharacter, getParty, createParty, addUserToParty, updateParty }