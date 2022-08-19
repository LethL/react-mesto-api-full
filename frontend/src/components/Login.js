import React from "react";

function Login( {onLogin} ) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    function handleLoginSubmit(e) {
        e.preventDefault();
        onLogin(password, email)
    }

    return (
        <div className="sign" onSubmit={handleLoginSubmit}>
            <form className="sign__form">
                <h2 className="sign__form-title">Вход</h2>
                <input
                className="sign__form-input"
                placeholder='Email'
                required
                name="email"
                id="email-input"
                type="email"
                value={email || ""}
                onChange={handleChangeEmail}>
                </input>
                <input
                className="sign__form-input"
                placeholder="Пароль"
                required
                name="password"
                id="password-input"
                type="password"
                autoComplete="off"
                value={password || ""}
                onChange={handleChangePassword}>
                </input>
                <button className="sign__form-button">Войти</button>
            </form>
        </div>
    )
}

export default Login;