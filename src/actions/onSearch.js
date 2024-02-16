export const onSearch = (value) => {

    return (dispatch) => {
        fetch('http://localhost:3005/toDos')
            .then((loadedData) => loadedData.json())
            .then((loadedToDos) => {
                let data = loadedToDos.filter(({toDo}) => toDo.includes(value))
                dispatch({
                    type: 'ON_SEARCH',
                    payload: [...data]
                })    
            })
    } 
}
    
    