import { useContext } from "react";
import { Global } from './Global';

function Nav() {

    const { route, setRoute } = useContext(Global)

    return (
        <div className="nav">
            <a onClick={_ => setRoute('login')}>LOGIN</a>
            <a onClick={_ => setRoute('bank')}>BANK</a>
        </div>
    )
}

export default Nav;