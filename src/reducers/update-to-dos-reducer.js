export const initialUpdateToDosState = {
    newName: '',
    newToDo: ''
}

export const updateToDosReducer = (state = initialUpdateToDosState, action) => {
    switch (action.type) {
        case 'SET_NEW_NAME': {
            return {
                ...state,
                newName: action.payload
            }
        }
        case 'SET_NEW_TO_DO': {
            return {
                ...state,
                newToDo: action.payload
            }
        }
        default:
            return state
    }
}