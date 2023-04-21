import React, {useState, useEffect} from 'react';
import styles from './UsersLayout.module.css';

const UsersLayout = (props) => {
    const [data, setData] = useState(null);
    const [pages, setPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentData, setCurrentData] = useState(null);
    const [search, setSearch] = useState("");
    const itemsPerPage = 10;
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    useEffect(()=>{
        const loadUsers = async () => {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + `/getusers`);
            const responseData = await response.json();
            setData(responseData.users);
        }
        loadUsers();
    }, []);

    useEffect(()=>{
        if(props.newUser != null){
            setData((prevData) => {
                return [...prevData, props.newUser];
            });
            props.setNewUser(null);
        }
        if(data != null){
            const pages2 = Math.ceil(data.length / itemsPerPage);
            setPages(pages2);
            const currentData2 = data.slice(startIndex, endIndex);
            setCurrentData(currentData2);
        }
    }, [data, props.newUser]);
    

    const handlePreviousClick = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleNextClick = () => {
        setCurrentPage(currentPage + 1);
    };

    const deleteUserHandler = async (number, name) => {
        await fetch(process.env.REACT_APP_BACKEND_URL + "/deleteuser", {
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
      }).then((message) => {
        if(message.success == true){
            let index;
            for(let i = 0; i < data.length; i++){
              if(data[i].number == number && data[i].name == name){
                index = i;
               }
             }
            setData([...data.slice(0, index), ...data.slice(index + 1)]);
            setSearch("");
        }
      });
    }

    const searchChangeHandler = (e) => {
        setSearch(e.target.value);
    }

    if(currentData != null) {
        return (
            <div className={styles.container} >
                <input type="text" placeholder='Search' value={search} className={styles.search} onChange={searchChangeHandler} />
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Number</th>
                        <th>Authorized</th>
                        <th>Options</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentData.map((item) => (
                        (((search == "") || (item.name.includes(search) || item.number.includes(search)))) && (<tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.number}</td>
                        <td>{item.authorized}</td>
                        <td>  
                            <button className={styles.deleteButton} onClick={()=>deleteUserHandler(item.number, item.name)} >Delete</button>
                        </td>
                        </tr>)
                    ))}
                    </tbody>
                </table>
                {((pages > 1) && (search == "")) && (
                    <div className={styles.buttons}>
                        <button disabled={currentPage === 0} onClick={handlePreviousClick} className={styles.navButton}>
                            Previous
                        </button>
                        <span>
                              <h4>Page {currentPage + 1} of {pages}</h4>
                        </span>
                        <button
                            className={styles.navButton}
                            disabled={currentPage === pages - 1}
                            onClick={handleNextClick}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        );
    }
    
};

export default UsersLayout;