export const getToDos = () => {

    return (dispatch) => {
        fetch(`http://localhost:3005/toDos/`)
            .then((rawResponse) => rawResponse.json())
            .then((response) => {
                console.log(response)
                dispatch({
                    type: 'GET_TO_DOS',
                    payload: [...response]
                })
            })
    } 
}