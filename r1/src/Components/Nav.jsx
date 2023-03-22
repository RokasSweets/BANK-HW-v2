import { useContext } from "react";
import { Global } from './Global';

function Nav() {

    const { route, setRoute, authName, logOut } = useContext(Global)

    return (
        <>
        <div className="nav">
            <a onClick={_ => setRoute('homepage')}>HOME</a>
            <a onClick={_ => setRoute('bank')}>BANK</a>
        
            {
                authName ? 
                (
                    <>
                    <a onClick={logOut}>LOGOUT</a>
                    <span style={{color: 'lightseagreen', float: 'right'}}>Logged in as: {authName}</span>
                    </>
                ) : <a onClick={_ => setRoute('login')}>LOGIN</a>
            }
            </div>
        </>
    )
}

export default Nav;