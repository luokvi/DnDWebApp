import axiosInstance from "../util/axiosUtil";

const baseUrl = '/users';

// Get all users.
const getAll = async () => {
    const res = await axiosInstance.get(baseUrl)

    return res.data
};

// Get specific user by id.
const getUser = async (userId) => {
    const url = baseUrl + "/" + userId
    const res = await axiosInstance.get(url)

    return res.data
}

// Get user's username.
const getUsersName = async(userId) => {
    const url = baseUrl + "/" + userId
    const res = await axiosInstance.get(url)

    const username = res.data.username
    return username
}

// Accept a friend request.
const acceptFriendRequest = async (userId, senderId, requestId, token) => {
    console.log("got token: " + token)
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

    const res = await axiosInstance.post(url, body, axiosConfig)
    return res.data
}

export default { getAll, getUser, acceptFriendRequest, getUsersName }