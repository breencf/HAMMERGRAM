const LOAD_PROFILE = "users/LOAD"

const load = (profile) => {
    return {type: LOAD_PROFILE, profile}
}

export const loadProfile = id => async dispatch => {
    const response = await fetch(`/api/users/${id}`)

    if (response.ok) {
        const profile = await response.json()
        dispatch(load(profile))
    }
}

const initialState = {}
let newState

export const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_PROFILE:
            newState = {...state}
            newState = action.profile
            return newState
        default:
            return state
    }
}
