import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from "@/components/GlobalStyles";
import { UserProvider } from './context/UserContext';
import { AdminProvider } from './context/AdminContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    // <AdminProvider>
        <UserProvider>
            <GlobalStyles>
                <App />
            </GlobalStyles>
        </UserProvider>
    // </AdminProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
