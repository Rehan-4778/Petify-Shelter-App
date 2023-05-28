import petifyContext from './petifyContext';
import { useState } from 'react';


const PetifyState = (props) => {

    const [Popup, setPopup] = useState({ show: false, message: '', type: '' });

    const setPopupValue = (obj) => {
        setPopup(obj);
    };

    // const host = 'http://localhost:5000';
    // const userInitial = [];
    // const [User, SetUser] = useState(userInitial);


    //Add a User
    // const addUser = async (email, name, password) => {
    //     email = email.toString();
    //     name = name.toString();
    //     password = password.toString();
    //     const response = await fetch(`${host}/api/auth/login`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'auth-token': localStorage.getItem('token'),
    //         },
    //         body: JSON.stringify({ email, name, password }),
    //     });

    //     const userResult = await response.json();
    //     SetUser(User.concat(userResult));
    // };


    return (
        <petifyContext.Provider
            value={{ Popup, setPopupValue }}
        >
            {props.children}
        </petifyContext.Provider>
    );
};

export default PetifyState;
