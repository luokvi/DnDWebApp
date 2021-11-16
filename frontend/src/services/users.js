import axios from "axios";

const baseUrl = 'api/users';

// Get all users.
const getAll = async () => {
    const res = await axios.get(baseUrl)

    return res.data
};

// Get specific user by id.
const getUser = async (userId) => {
    const url = baseUrl + "/" + userId
    const res = await axios.get(url)

    return res.data
}

// Accept a friend request.
const acceptFriendRequest = async (userId, senderId, requestId, token) => {
    console.log("got token: " + token)
    const url = baseUrl + "/friend"
    const body = {
        "SenderId": userId,
        "ReceiverId": senderId,
        "friendRequest": requestId
    }
    const axiosConfig = {
        Headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    const res = await axios.post(url, body, axiosConfig)
    return res.data
}

export default { getAll, getUser, acceptFriendRequest }