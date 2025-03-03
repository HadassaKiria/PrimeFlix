import { Link } from "react-router-dom";

import "./style.css"

function Header() {
    return(
        <header>
            <Link className="logo" to="/">Prime Flix</Link>
            <Link className="favorites" to="/favorites">Meus filmes</Link>
        </header>
    );
}

export default Header;