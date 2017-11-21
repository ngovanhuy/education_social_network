import { CALL_API, Schemas } from '../middleware/api'

export const USER_REQUEST = 'USER_REQUEST'
export const USER_SUCCESS = 'USER_SUCCESS'
export const USER_FAILURE = 'USER_FAILURE'

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchUser = id => ({
    [CALL_API]: {
        types: [ USER_REQUEST, USER_SUCCESS, USER_FAILURE ],
        endpoint: `users/${id}`,
        schema: Schemas.USER
    }
})

// Fetches a single user from Github API unless it is cached.
// Relies on Redux Thunk middleware.
export const loadUser = (id, requiredFields = []) => (dispatch, getState) => {
    const user = getState().entities.users[id]
    if (user && requiredFields.every(key => user.hasOwnProperty(key))) {
        return null
    }

    return dispatch(fetchUser(id))
}