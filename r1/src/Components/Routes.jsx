import Login from "./Login";
import Page from "./Page";
import { useContext } from 'react';
import { Global } from './Global';
import Home from './Home';

function Routes() {

    const {route} = useContext(Global);

    switch(route) {
            case 'bank': return <Home />;
            case 'login': return <Login />;
    }

}

export default Routes;