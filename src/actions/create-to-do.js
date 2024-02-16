export const createToDo = (formData) => {

    return (dispatch) => {
        fetch('http://localhost:3005/toDos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({...formData, completed: false})
        })
        .then((rawResponse) => rawResponse.json())
        .then((response) => {
            console.log('Server response:', response)
            dispatch({
                type: 'CREATE_TO_DO',
                payload: {...response}
            })
        })

        // fetch(`http://localhost:3005/toDos/`)
        //     .then((rawResponse) => rawResponse.json())
        //     .then((response) => {
        //         console.log(response)
        //         dispatch({
        //             type: 'CREATE_TO_DO',
        //             payload: [...response]
        //         })
        //     })
    } 
}