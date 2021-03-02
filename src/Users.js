import React, {useState} from 'react';
// import axios from 'axios';
// import {useAsync} from 'react-async';
import User from './User';
import { getUsers, useUsersDispatch, useUsersState } from './UserContext';
// loading success error 만들거임

// async function getUsers() {
//     const response = await axios.get('https://jsonplaceholder.typicode.com/users');
//     return response.data;
// }



function Users() {
    
    
    const [userId,SetUserId] = useState(null);
    const state = useUsersState();
    const dispatch = useUsersDispatch();

    const {loading, data: users, error} = state.users;

    const fetchData = () => {
        getUsers(dispatch);
    }

    // const {data:users, error, isLoading, reload, run} = useAsync({
    //     deferFn: getUsers,
    // });

    if (loading) return <div>로딩중...</div>
    if (error) return <div>에러발생했덩</div>
    if (!users) return <button onClick={fetchData}>불러오기</button>
    return(
        <>
        <ul>
            {users.map(user => 
            <li key={user.id} onClick={()=>{SetUserId(user.id)}}>
                {user.username} ({user.name})
            </li>
            )}
        </ul>
        <button onClick={fetchData}>다시 불러오기</button>
        {userId && <User id={userId} />}
        </>
    );
}

export default Users;