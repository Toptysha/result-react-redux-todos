import { changeDisplayCurrentDiv } from "../change-display-current-div"

export const changeNameOnToDo = (id, newName) => {

    return (dispatch) => {
        fetch(`http://localhost:3005/toDos/${id}`)
            .then((rawResponse) => rawResponse.json())
            .then((response) => {
                fetch(`http://localhost:3005/toDos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({...response, userName: newName})
                })
                    .then((rawResponse) => rawResponse.json())
                    .then((response) => {
                        console.log('Server response:', response)
                        dispatch({
                            type: 'CHANGE_NAME_ON_TO_DO',
                            payload: id
                        })
                    })
                    .finally(changeDisplayCurrentDiv(id, 'data-name-id'))
            })
    } 
}