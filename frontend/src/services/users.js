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
    console.log("url: " + url)
    const res = await axios.get(url)

    console.log("Userservice got: " + res)
    return res.data
}

export default { getAll, getUser }