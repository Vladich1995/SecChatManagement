import React, {useState} from 'react';
import styles from './AddUser.module.css';

const AddUser = (props) => {
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");

    const nameChangeHandler = (e) => {
        setName(e.target.value);
    }

    const numberChangeHandler = (e) => {
        setNumber(e.target.value);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        await fetch(process.env.REACT_APP_BACKEND_URL + "/adduser", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          name: name,
          number: number
        })
      }).then((response) => {
        return response.json();
      }).then((data) => {
        console.log(data.success);
        if(data.success == true){
          props.onAddUser({name: name, number: number, authorized: "false"});
          setName("");
          setNumber("");
        }
      });
    }

    return (
        <form className={styles.container} onSubmit={submitHandler} >
            <input type="text" placeholder='Name' value={name} onChange={nameChangeHandler}  />
            <input type="text" placeholder='Number' value={number} onChange={numberChangeHandler}  />
            <button type="submit" >Submit</button>
        </form>
    );
}

export default AddUser;