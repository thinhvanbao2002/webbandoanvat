import {Fragment, useContext, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '@/routes';
import { DefaultLayoutAdmin } from '@/components/Admin/Layout';
import { DefaultLayoutUser } from '@/components/User/Layout';
import Login from '@/Pages/Admin/Login';
import {UserContext} from "./context/UserContext";

function App() {

    const { user, loginContext } = useContext(UserContext);
    useEffect(() => {
        if(localStorage.getItem("username")) {
            loginContext(localStorage.getItem("id"),localStorage.getItem("username"))
        }
    }, []);
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayoutAdmin;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
