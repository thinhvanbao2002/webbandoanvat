import react, {useState} from 'react';
import {createContext} from "react";

const AdminContext = createContext({adminID: '',name: '', auth: false})
// User is the name of the "data" that gets stored in context
const AdminProvider = ({ children }) => {
    const [admin, setAdmin] = useState({adminID: '', name: '', auth: false });

// Login updates the user data with a name parameter
    const loginContext = (adminID, adminName) => {
        setAdmin((user) => ({
            adid: adminID,
            namead: adminName,
            auth: true,
        }));
        localStorage.setItem("namead", adminName);
        localStorage.setItem("idad", adminID);
    };

// Logout updates the user data to default
    const logout = () => {
        setAdmin((user) => ({
            adid: '',
            namead: '',
            auth: false,
        }));
        localStorage.removeItem("namead");
        localStorage.removeItem("idad");
    };
    return (
        <AdminContext.Provider value={{ admin, loginContext, logout }}>
            {children}
        </AdminContext.Provider>
    );
};

export { AdminContext , AdminProvider};