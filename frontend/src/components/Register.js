import { Link } from 'react-router-dom';
import React from 'react';

function Register({onRegister}) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    function handleRegisterSubmit(e) {
        e.preventDefault();
        onRegister(password, email)
    }

    return (
        <div className="sign">
            <form className="sign__form" onSubmit={handleRegisterSubmit}>
                <h2 className="sign__form-title">Регистрация</h2>
                <input
                className="sign__form-input"
                placeholder='Email'
                required
                name="email"
                id="email-input"
                type="email"
                value={email || ""}
                onChange={handleChangeEmail}
                >
                </input>
                <input
                className="sign__form-input"
                placeholder="Пароль"
                required
                name="password"
                id="password-input"
                type="password"
                value={password || ""}
                autoComplete="off"
                onChange={handleChangePassword}>
                </input>
                <button className="sign__form-button">Зарегистрироваться</button>
                <Link to="/signin" className="sign__form-link">Уже зарегистрированы? Войти</Link>
            </form>
        </div>
    )
}

export default Register;