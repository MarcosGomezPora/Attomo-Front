import { Link } from "react-router-dom";

function Navbar() {
    return (
        <header>
            <h1>Vegetta777</h1>
            <nav>
                <Link to="/games">Juegos</Link>
                <Link to="/games/create">Añadir un juego</Link>
                <Link to="/register">Registro</Link>
                <Link to="/login">Inicio de sesión</Link>
            </nav>
        </header>
    );
}

export default Navbar;