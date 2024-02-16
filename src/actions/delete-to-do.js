export const deleteToDo = (id) => {

    return (dispatch) => {
        fetch(`http://localhost:3005/toDos/${id}`)
        .then(
            fetch(`http://localhost:3005/toDos/${id}`, {method: 'DELETE'})
            .then((response) => {
                console.log('Server response:', response)
                dispatch({
                    type: 'DELETE_TO_DO',
                    payload: id
                })
            })
        )
    }

    // return {
    //     type: 'DELETE_TO_DO',
    //     payload: id
    // }    
}