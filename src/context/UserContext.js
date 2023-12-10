import react, {useState} from 'react';
import {createContext} from "react";

const UserContext = createContext({
    userID: '',
    username: '',
    auth: false,
    totalOder: '',
    productImage: '',
    productName: '',
    price: '',
    sold: ''
})
// User is the name of the "data" that gets stored in context
const UserProvider = ({ children }) => {
    const [user, setUser] = useState({userID: '', username: '', auth: false });
    const [order, setOrder] = useState({totalOder: '', productImage: '', productName: '', price: '', sold: '' });
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
    const newOrder = (totalOder,productImage,productName,price,sold) => {
        setOrder((order) => ({
            total: totalOder,
            imgPrd: productImage,
            namePrd: productName,
            price: price,
            sold: sold
        }));
    }
    return (
        <UserContext.Provider value={{ user, order, loginContext, logout, newOrder }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider};