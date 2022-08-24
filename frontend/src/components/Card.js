import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const cardDeleteButtonClassName = `${
    isOwn ? "element__delete" : "element__delete element__delete_innactive"
  }`;
  const isLiked = props.card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `${
    isLiked ? "element__like like_active" : "element__like"
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="element">
      <button
        onClick={handleDeleteClick}
        className={cardDeleteButtonClassName}
        type="button"
      ></button>
      <img
        src={props.link}
        className="element__image"
        alt={props.name}
        onClick={handleClick}
      />
      <div className="element__info">
        <h2 className="element__title">{props.name}</h2>
        <button
          onClick={handleLikeClick}
          className={cardLikeButtonClassName}
          type="button"
        ></button>
        <span className="element__like-count">{props.likes.length}</span>
      </div>
    </li>
  );
}

export default Card;
