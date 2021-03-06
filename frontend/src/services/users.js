import axios from "axios";

const baseUrl = '/api/users';

// Get all users.
const getAll = async () => {
    const res = await axios.get(baseUrl)

    return res.data
};

// Get specific user by id.
const getUser = async (userId, token) => {
    const url = baseUrl + "/" + userId
    const axiosConfig = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    const res = await axios.get(url, axiosConfig)

    return res.data
}

const getOtherUser = async (userId) => {
    const url = baseUrl + "/other/" + userId
    const res = await axios.get(url)

    return res.data
}

const sendFriendRequest = async (body, token) => {
    const url = baseUrl + "/friendRequest"

    const axiosConfig = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    const res = await axios.post(url, body, axiosConfig)
    return res.data
}

// Accept a friend request.
const acceptFriendRequest = async (userId, senderId, requestId, token) => {
    const url = baseUrl + "/friend"
    const body = {
        "senderId": userId,
        "receiverId": senderId,
        "friendRequest": requestId
    }
    const axiosConfig = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    const res = await axios.post(url, body, axiosConfig)
    return res.data
}

// Create new user.
const createUser = async (newUser) => {
    const res = await axios.post(baseUrl, newUser)

    return res.data
}

export default { getAll, getUser, sendFriendRequest, acceptFriendRequest, getOtherUser, createUser }