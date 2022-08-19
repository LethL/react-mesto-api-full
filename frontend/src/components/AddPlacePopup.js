import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleAddPlaceSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name,
      link,
    });
  }

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name="add-place"
      title="Новое место"
      onSubmit={handleAddPlaceSubmit}
    >
      <input
        name="name"
        minLength="2"
        maxLength="30"
        required
        placeholder="Название"
        id="name-input"
        className="popup__form-input"
        type="text"
        value={name}
        onChange={handleChangeName}
      />
      <span className="popup__form-input-error name-input-error"></span>
      <input
        name="link"
        required
        placeholder="Ссылка на картинку"
        id="image-input"
        className="popup__form-input"
        type="url"
        value={link}
        onChange={handleChangeLink}
      />
      <span className="popup__form-input-error image-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
