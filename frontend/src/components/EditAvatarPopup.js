import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarLink = React.createRef("");

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateAvatar({
        link: avatarLink.current.value,
    });
  };

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name="edit-avatar"
      title="Обновить аватар"
      onSubmit={handleSubmit}
    >
      <input
        name="link"
        required
        placeholder="Ссылка на картинку"
        id="edit-input"
        className="popup__form-input"
        type="url"
        ref={avatarLink}
      />
      <span className="popup__form-input-error edit-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
