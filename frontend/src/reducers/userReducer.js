import userService from '../services/users'

const userReducer = (state = "", action) => {
    switch(action.type){
        case 'Get':
            return action.data
        default:
            return state
    }
}

export const getUser = (userId) => {
    return async dispatch => {
        const user = await userService.getUser(userId)

        dispatch({
            type: 'Get',
            data: user
        })
    }
}

export default userReducer