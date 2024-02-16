export const changeCompletedOnToDo = (id) => {

    return (dispatch) => {
        fetch(`http://localhost:3005/toDos/${id}`)
            .then((rawResponse) => rawResponse.json())
            .then((response) => {
                fetch(`http://localhost:3005/toDos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({...response, completed: !response.completed})
                })
                    .then((rawResponse) => rawResponse.json())
                    .then((response) => {
                        console.log('Server response:', response)
                        dispatch({
                            type: 'CHANGE_COMPLETED_ON_TO_DO',
                            payload: id
                        })
                    })
            })
    }  
}