export const initialFlagsState = {
    refreshToDosFlag: true,
    sortByAlphabetFlag: true
}

export const flagsReducer = (state = initialFlagsState, action) => {
    switch (action.type) {
        case 'CHANGE_REFRESH_TO_DOS_FLAG': {
            return {
                ...state,
                refreshToDosFlag: action.payload
            }
        }
        case 'CHANGE_ALPHABET_FLAG': {
            return {
                ...state,
                sortByAlphabetFlag: !state.sortByAlphabetFlag
            }
        }
        default:
            return state
    }
}