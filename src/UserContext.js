import React, {createContext,useReducer,useContext} from 'react';
// import axios from 'axios';
import * as api from './api';
import createAsyncDispatch, { createAsyncHandler, initalAsyncState } from './asyncActionUtils';

const initialState = {
    users: initalAsyncState,
    user: initalAsyncState,
}

// const loadingState = {
//     loading: true,
//     data: null,
//     error: null,
// }

// const success = data => ({
//     loading: false,
//     data,
//     error: null,
// });

// const error = e => ({
//     loading: false,
//     data: null,
//     error: e,
// });

//get_users
//get_users_success
//get_users_error
//get_user
//get_user_success
//get_user_error
const usersHandler = createAsyncHandler('get_users','users');
const userHandler = createAsyncHandler('get_user','user');
function usersReducer(state,action){
    switch(action.type){
        case 'get_users':
        case 'get_users_success':  
        case 'get_users_error':
            return usersHandler(state,action);
        case 'get_user':
        case 'get_user_success':
        case 'get_user_error':
            return userHandler(state,action);
        default:
            throw new Error('Unhandled action type', action.type);
    }
}

const UsersStateContext = createContext(null);
const UsersDispatchContext = createContext(null);

export function UsersProvider({children}){
    const [state,dispatch] = useReducer(usersReducer,initialState);

    return(
        <UsersStateContext.Provider value={state}>
            <UsersDispatchContext.Provider value={dispatch}>
                {children}
            </UsersDispatchContext.Provider>
        </UsersStateContext.Provider>
    )
}

export function useUsersState(){
    const state = useContext(UsersStateContext);
    if(!state){
        throw new Error('Cannot find UserProvider');
    }
    return state;
}

export function useUsersDispatch(){
    const dispatch = useContext(UsersDispatchContext);
    if(!dispatch){
        throw new Error('Cannot find UserProvider');
    }
    return dispatch;
}

// export async function getUsers(dispatch){
//     dispatch({type: 'get_users'});
//     try{
//         const response = await axios.get('https://jsonplaceholder.typicode.com/users');
//         dispatch({
//             type: 'get_users_success',
//             data: response.data,
//         });
//     }catch(e){
//         dispatch({
//             type: 'get_users_error',
//             error: e,
//         })
//     }
// }
// export async function getUser(dispatch, id){
//     dispatch({type: 'get_user'});
//     try{
//         const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
//         dispatch({
//             type: 'get_user_success',
//             data: response.data,
//         });
//     }catch(e){
//         dispatch({
//             type: 'get_user_error',
//             error: e,
//         });
//     }
// }
export const getUsers = createAsyncDispatch('get_users',api.getUsers);
export const getUser = createAsyncDispatch('get_user',api.getUser);
