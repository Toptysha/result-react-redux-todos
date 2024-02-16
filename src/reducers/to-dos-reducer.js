export const initialToDosState = []

export const toDosReducer = (state = initialToDosState, action) => {
    switch (action.type) {
        case 'GET_TO_DOS': {
            return action.payload
        }case 'CREATE_TO_DO': {
            return [...state, action.payload]
        }
        case 'CHANGE_ALPHABET_FLAG': {
            return action.payload
        }
        case 'ON_SEARCH': {
            return action.payload
        }
        case 'CHANGE_COMPLETED_ON_TO_DO': {
            return state.map(elem => {
                if (elem.id === action.payload) {
                    return {...elem, completed: !elem.completed}
                } else {
                    return elem
                }
            })
        }
        case 'CHANGE_NAME_ON_TO_DO': {
            return state.map(elem => {
                if (elem.id === action.payload) {
                    return {...elem, userName: state.newName}
                } else {
                    return elem
                }
            })
        }
        case 'CHANGE_TO_DO_ON_TO_DO': {
            return state.map(elem => {
                if (elem.id === action.payload) {
                    return {...elem, toDo: state.newToDo}
                } else {
                    return elem
                }
            })
        }
        case 'DELETE_TO_DO': {
            return state.filter(elem => elem.id !== action.payload)
        }
        default:
            return state
    }
}