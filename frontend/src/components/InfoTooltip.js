import closeBtn from "../images/close.svg";

function InfoTooltip(props) {
    return (
        <div className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container">
                <button
                    type="button"
                    className="popup__close-btn"
                    onClick={props.onClose}
                >
                    <img className="popup__close-image" src={closeBtn} alt="закрыть" />
                </button>
                <div className="popup__tulpip">
                    <img className="popup__tultip-image" alt="статус" src={props.image}></img>
                    <h2 className="popup__tultip-title">{props.message}</h2>
                </div>
            </div>
        </div>
    )
}

export default InfoTooltip;