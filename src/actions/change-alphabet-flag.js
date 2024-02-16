import { sortByAlphabet } from "../sort-by-alphabet"

export const changeAlphabetFlag = (flag, toDos) => {

    if (flag) {
        return {
            type: 'CHANGE_ALPHABET_FLAG',
            payload: sortByAlphabet(toDos)
        } 
    } else {
        return (dispatch) => {
            fetch(`http://localhost:3005/toDos/`)
                .then((rawResponse) => rawResponse.json())
                .then((response) => {
                    console.log(response)
                    dispatch({
                        type: 'CHANGE_ALPHABET_FLAG',
                        payload: [...response]
                    })
                })
        } 
    }   
}