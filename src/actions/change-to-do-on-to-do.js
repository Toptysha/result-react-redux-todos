import { changeDisplayCurrentDiv } from "../change-display-current-div"

export const changeToDoOnToDo = (id, newToDo) => {

    return (dispatch) => {
        fetch(`http://localhost:3005/toDos/${id}`)
            .then((rawResponse) => rawResponse.json())
            .then((response) => {
                fetch(`http://localhost:3005/toDos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({...response, toDo: newToDo})
                })
                    .then((rawResponse) => rawResponse.json())
                    .then((response) => {
                        console.log('Server response:', response)
                        dispatch({
                            type: 'CHANGE_TO_DO_ON_TO_DO',
                            payload: id
                        })
                    })
                    .finally(changeDisplayCurrentDiv(id, 'data-to-do-id'))
            })
    } 
}