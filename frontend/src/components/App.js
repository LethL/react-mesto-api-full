import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Loader from "./Loader/Loader";
import api from "../utils/api";
import React, { useEffect } from "react";
import { Route, Switch, useHistory} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth.js";
import successLogo from "../images/success-logo.svg";
import errorLogo from "../images/error-logo.svg";

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setselectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [status, setStatus] = React.useState({ image: null, message: "" });
  const history = useHistory();
  const [userEmail, setUserEmail] = React.useState('');

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setselectedCard(card);
  }

  function handlecloseAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setselectedCard(null);
    setInfoTooltipOpen(false);
  }

  function handleUpdateUser(user) {
    setLoading(true);
    api
      .editUserInfo(user)
      .then((data) => {
        setCurrentUser(data);
        handlecloseAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  function onUpdateAvatar(avatarLink) {
    setLoading(true);
    api
      .editAvatar(avatarLink)
      .then((data) => {
        setCurrentUser(data);
        handlecloseAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  function handleAddPlace(place) {
    setLoading(true);
    api
      .addCard(place)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handlecloseAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    if (loggedIn) {
      api.getUserInfo()
        .then((user) => {
          console.log(user)
          setCurrentUser(user)
        })
        .catch((err) => console.log(err))
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      api.getInitialCards()
        .then((cards) => {
          console.log(cards)
          setCards(cards.data)
        })
        .catch((err) => console.log(err))
    }
  }, [loggedIn]);

  useEffect(() => {
    tokenCheck()
  }, [])

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        handlecloseAllPopups();
      }
    }

    document.addEventListener('keydown', closeByEscape)
    
    return () => document.removeEventListener('keydown', closeByEscape)
  }, [])

  if (loading) {
    return <Loader />;
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    console.log(card)
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((newCard) => newCard !== card));
      })
      .catch((err) => console.log(err));
  }

  function handleRegister(password, email) {
    auth
      .register(password, email)
      .then(() => {
        setStatus({
          image: successLogo,
          message: "Вы успешно зарегистрировались!",
        });
        history.push("/signin");
      })
      .catch(() =>
        setStatus({
          image: errorLogo,
          message: "Что-то пошло не так! Попробуйте ещё раз.",
        })
      )
      .finally(() => setInfoTooltipOpen(true));
  }

  function tokenCheck() {
    if (localStorage.getItem('jwt')){
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        auth.getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            history.push("/");
            console.log(res)
            setUserEmail(res.email)
          }
        })
        .catch((err) => console.log(err))
      }
    }
  }

  function handleLogin(password, email) {
    auth
      .authorize(password, email)
      .then((token) => {
        auth.getContent(token)
          .then((res) => {
            console.log(res)
            setUserEmail(res.email)
            setLoggedIn(true)
            history.push('/')
          })
      })
      .catch((err) => console.log(err));
  }

  function logOut() {
    localStorage.removeItem('jwt');
    history.push('/signup');
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
        mail={userEmail}
        loggedIn={loggedIn}
        logOut={logOut}/>

        <Switch>
          <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            handleCardLike={handleCardLike}
            handleCardDelete={handleCardDelete}
          ></ProtectedRoute>

          <Route path="/signup">
            <Register onRegister={handleRegister} />
          </Route>

          <Route path="/signin">
            <Login onLogin={handleLogin} />
          </Route>
        </Switch>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={handlecloseAllPopups}
          onUpdateAvatar={onUpdateAvatar}
        ></EditAvatarPopup>

        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={handlecloseAllPopups}
        ></EditProfilePopup>

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={handlecloseAllPopups}
          onAddPlace={handleAddPlace}
        ></AddPlacePopup>

        <ImagePopup card={selectedCard} onClose={handlecloseAllPopups} />

        <InfoTooltip
          onClose={handlecloseAllPopups}
          isOpen={isInfoTooltipOpen}
          image={status.image}
          message={status.message}
        />

        <Footer />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
