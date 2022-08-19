import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name="edit-profile"
      title="Редактировать профиль"
      onSubmit={handleSubmit}
    >
      <input
        name="name"
        minLength="2"
        maxLength="40"
        required
        id="title"
        className="popup__form-input"
        type="text"
        placeholder="Имя"
        value={name || ""}
        onChange={handleChangeName}
      />
      <span className="popup__form-input-error title-error"></span>
      <input
        name="about"
        minLength="2"
        maxLength="200"
        required
        id="subtitle"
        className="popup__form-input"
        type="text"
        placeholder="О себе"
        value={description || ""}
        onChange={handleChangeDescription}
      />
      <span className="popup__form-input-error subtitle-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
