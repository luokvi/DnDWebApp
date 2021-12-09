import axiosInstance from "../util/axiosUtil";

const baseUrl = '/login';

const loginUser = async (username, password) => {
    const user = {
        username: username,
        password: password
    }
    const res = await axiosInstance.post(baseUrl, user)

    return res.data
};

export default { loginUser }