import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, handleCardLike, handleCardDelete }) {
  const userInfo = React.useContext(CurrentUserContext);  

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container" onClick={onEditAvatar}>
          <img className="profile__avatar" src={userInfo.avatar} alt="аватар" />
        </div>
        <div className="profile__info">
          <h1 className="profile__title"> {userInfo.name} </h1>
          <button
            type="button"
            className="profile__edit-button"
            onClick={onEditProfile}
          ></button>
          <p className="profile__subtitle"> {userInfo.about} </p>
        </div>
        <button
          type="button"
          className="profile__add-place-button"
          onClick={onAddPlace}
        ></button>
      </section>
      <ul className="elements">
        {cards.map((card) => {
          return (
            <Card
              {...card}
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          );
        })}
      </ul>
    </main>
  );
}

export default Main;
