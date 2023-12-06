import react, {useState} from 'react';
import {createContext} from "react";

const UserContext = createContext({userID: '',username: '', auth: false})
// User is the name of the "data" that gets stored in context
const UserProvider = ({ children }) => {
const [user, setUser] = useState({userID: '', username: '', auth: false });

// Login updates the user data with a name parameter
const loginContext = (userID, username) => {
    setUser((user) => ({
        id: userID,
        username: username,
        auth: true,
    }));
    localStorage.setItem("username", username);
    localStorage.setItem("id", userID);
};

// Logout updates the user data to default
const logout = () => {
    setUser((user) => ({
        id: '',
        username: '',
        auth: false,
    }));
    localStorage.removeItem("username");
    localStorage.removeItem("id");
};
    return (
        <UserContext.Provider value={{ user, loginContext, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider};