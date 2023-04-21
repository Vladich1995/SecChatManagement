import logo from './logo.svg';
import React, {useState} from 'react';
import styles from './App.module.css';
import AddUser from './components/AddUser';
import UsersLayout from './components/UsersLayout';

function App() {
  const [newUser, setNewUser] = useState(null);

  const addUserHandler = (user) => {
    setNewUser(user);
  }

  return (
    <div className={styles.App}>
      <AddUser onAddUser={addUserHandler} />
      <UsersLayout setNewUser={setNewUser} newUser={newUser} />
    </div>
  );
}

export default App;
