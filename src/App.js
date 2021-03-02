import React from 'react';
import Users from './Users';
import {UsersProvider} from './UserContext'

function App() {
  return (
    <UsersProvider>
      <Users />
    </UsersProvider>
  );
}

export default App;
