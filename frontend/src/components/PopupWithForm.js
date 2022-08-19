import closeBtn from "../images/close.svg";

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <button
          type="button"
          id="close-profile"
          className="popup__close-btn"
          onClick={props.onClose}
        >
          <img className="popup__close-image" src={closeBtn} alt="закрыть" />
        </button>
        <form
          name={props.name}
          className="popup__form"
          action="send"
          onSubmit={props.onSubmit}
        >
          <h2 className="popup__form-title"> {props.title} </h2>
          {props.children}
          <button type="submit" className="popup__form-btn">
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
