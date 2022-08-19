import { Link } from "react-router-dom";
import logo from "../images/logo.svg";
import { Route} from "react-router-dom";

function Header({mail, loggedIn, logOut}) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="лого" />
      <div className="header__info">
        <p className="header__email">{`${loggedIn ? `${mail}` : '' }`}</p>
        {loggedIn ? <Link to="/signin" className="header__button header__button_gray" onClick={logOut}>Выйти</Link> :
        <>
          <Route path="/signin">
            <Link to='signup' className='header__button'>Регистрация</Link>
          </Route>
          <Route path="/signup">
            <Link to='signin' className='header__button'>Войти</Link>
          </Route>
        </>}
        
      </div>
    </header>
  );
}

export default Header;
