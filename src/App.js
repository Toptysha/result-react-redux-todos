import styles from './styles/index.module.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux';
import { setNewName } from './actions/set-new-name';
import { changeNameOnToDo } from './actions/change-name-on-to-do';
import { setNewToDo } from './actions/set-new-to-do';
import { changeToDoOnToDo } from './actions/change-to-do-on-to-do';
import { changeCompletedOnToDo } from './actions/change-completed-on-to-do';
import { deleteToDo } from './actions/delete-to-do';
import { getToDos } from './actions/get-to-dos';
import { changeRefreshToDosFlag } from './actions/change-refresh-to-dos-flag';
import { createToDo } from './actions/create-to-do';
import { changeDisplayCurrentDiv } from './change-display-current-div';
import { changeAlphabetFlag } from './actions/change-alphabet-flag';
import { onSearch } from './actions/onSearch';

const fieldsScheme = yup.object().shape({
  userName: yup
      .string()
      .matches(/^([a-zA-Zа-яА-Я._-]+)*$/, 
        'ERROR: Имя должно содержать только кириллицу, латиницу, ".", "_" и "-"')
      .max(20, 'ERROR: Имя не должен быть длиннее 20 символов')
      .required('Все поля являются обязательными'),
  toDo: yup
      .string()
      .min(4, 'ERROR: новое дело не должен быть короче 4 символов')
      .required('Все поля являются обязательными'),
})

function App() {

  const toDos = useSelector(state => state.toDosState)
  const newName = useSelector(state => state.updateToDosState.newName)
  const newToDo = useSelector(state => state.updateToDosState.newToDo)
  const refreshToDosFlag = useSelector(state => state.flagsState.refreshToDosFlag)
  const sortByAlphabetFlag = useSelector(state => state.flagsState.sortByAlphabetFlag)

  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
        userName: '',
        toDo: ''
    },
    resolver: yupResolver(fieldsScheme)
  });

  const error = errors.userName?.message || errors.toDo?.message

  const requestAddToDo = (formData) => {
    dispatch(createToDo(formData))
  }

  if (refreshToDosFlag) {
    dispatch(getToDos())
    dispatch(changeRefreshToDosFlag(false))
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(requestAddToDo)} className={styles.formContainer}>
        <div>
          {error && <div className={styles.errorLabel}>{error}</div>}

          <h2>Имя:</h2>
          <input 
              type='text' 
              {...register('userName')}
              placeholder='Введите имя'
          ></input>

          <h2>Новая задача:</h2>
          <input
              type='text'
              {...register('toDo')}
              placeholder='Введите новую Задачу'
          ></input>
        </div>

        <button  className={styles.createToDo} disabled={!!error}>Создать задачу</button>
      </form>

      <div>
        <button type='submit'  className={styles.sortByAlphabet} onClick={() => dispatch(changeAlphabetFlag(sortByAlphabetFlag, toDos))}>Сортировать по алфавиту</button>
          <input
            type='text' 
            placeholder='Поиск по задачам'
            onChange={({target}) => {dispatch(onSearch(target.value))}}
          ></input>
      </div>

      {toDos.map(({userName, id, toDo, completed}) => 
        <div key={id} className={styles.toDo}> 
          Имя: {userName} <br></br> Задача: <span className='toDoSpan' style={{color: completed? 'green': 'red'}}>{toDo}</span>

            <div data-name-id={id} className={styles.changeInfo}>
              <input 
                  type='text' 
                  placeholder='Введите имя'
                  className={styles.newName}
                  onChange={({target}) => dispatch(setNewName(target.value))}
              ></input>
              <button data-id={id} className={styles.confirmChanges} onClick={(event) => dispatch(changeNameOnToDo(event.target.dataset.id, newName))}>Подтвердить изменения</button>
            </div>

            <div data-to-do-id={id} className={styles.changeInfo}>
              <input
                  type='text'
                  placeholder='Введите новую задачу'
                  className={styles.newToDo}
                  onChange={({target}) => dispatch(setNewToDo(target.value))}
              ></input>
              <button data-id={id} className={styles.confirmChanges} onClick={(event) => dispatch(changeToDoOnToDo(event.target.dataset.id, newToDo))}>Подтвердить изменения</button>
            </div>

          <div className={styles.toDoButtons}>
            <button data-id={id} className={styles.changeInfoButton} disabled={false} onClick={(event) => {changeDisplayCurrentDiv(event.target.dataset.id, 'data-name-id')}}>
              Изменить имя
            </button>
            <button data-id={id} className={styles.changeInfoButton} disabled={false} onClick={(event) => {changeDisplayCurrentDiv(event.target.dataset.id, 'data-to-do-id')}}>
              Изменить задачу
            </button>
            <button data-id={id} onClick={(event) => dispatch(changeCompletedOnToDo(event.target.dataset.id))} className={styles.changeInfoButton} disabled={false}>Изменить статус</button>
          </div>
          <button data-id={id} onClick={(event) => dispatch(deleteToDo(event.target.dataset.id))} className={styles.deleteButton} disabled={false}>Удалить</button>
        </div>
      )}
    </div>  
  );
}

export default App;
