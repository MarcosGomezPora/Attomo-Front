import { Link } from "react-router-dom";
import './Navbar.scss';

function Navbar(props) {
  const { user, onLogout } = props;

  return (
    <header className="header">
      <h1 className="header__h1">Vegetta777</h1>
      <nav className="header__nav">
        <Link to="/games" className="header__nav-link">Juegos</Link>
        <Link to="/games/create" className="header__nav-link">Añadir un juego</Link>
        {user.isAuthenticated ? (
          <>
            <p>{user.user}</p>
            <button onClick={onLogout}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <Link to="/users/register" className="header__nav-link">Registro</Link>
            <Link to="/users/login" className="header__nav-link">Inicio de sesión</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;