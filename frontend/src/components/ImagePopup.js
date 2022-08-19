import closeBtn from "../images/close.svg";

function ImagePopup(props) {
  return (
    <div
      className={`popup popup_view_image ${props.card ? "popup_opened" : ""}`}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-btn"
          onClick={props.onClose}
        >
          <img className="popup__close-image" src={closeBtn} alt="закрыть" />
        </button>
        <div className="popup__card-content">
          <img
            className="popup__card-img"
            src={props.card ? props.card.link : ""}
            alt={props.card ? props.card.name : ""}
          />
          <p className="popup__card-name">
            {props.card ? props.card.name : ""}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ImagePopup;