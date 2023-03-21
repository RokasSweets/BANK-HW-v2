
import "./App.css";
import GlobalProvider from "./Components/Global";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Nav from "./Components/Nav";
import Routes from "./Components/Routes";

function App() {
    return (

        <GlobalProvider>

    <Nav />

    <Routes />



    </GlobalProvider>

    )
}

export default App;
