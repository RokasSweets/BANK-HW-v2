import Login from "./Login";
import Page from "./Page";
import { useContext } from 'react';
import { Global } from './Global';
import Home from './Home';
import Auth from "./Auth";
import Logout from "./Logout";

function Routes() {

    const {route} = useContext(Global);

    switch(route) {
            case 'homepage': return <Page />;
            case 'bank': return <Auth><Home /></Auth>;
            case 'login': return <Login />;
            case 'logout': return <Auth><Logout /></Auth>;
    }

}

export default Routes;