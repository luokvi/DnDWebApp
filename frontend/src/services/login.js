import axios from "axios";

const baseUrl = 'api/login';

const loginUser = async (username, password) => {
    const user = {
        username: username,
        password: password
    }
    const res = await axios.post(baseUrl, user)

    return res.data
};

export default { loginUser }