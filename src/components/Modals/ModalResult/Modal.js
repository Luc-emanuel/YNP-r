//
import "./index.css";

const Modal = ({ resetAll, data }) => {
  return (
    <div className="modalBox">
      <div className="modalBoxLimited">
        <div className="modalBoxBar">
          <span>{"Resultado"}</span>
        </div>
        <div className="modalContent">
          <div className="modalContentLeft">
            <span>{data.first}</span>
          </div>
          <div className="modalContentCenter">
            <span>{data.res.points}</span>
          </div>
          <div className="modalContentRight">
            <span>{"Acertos: " + data.res.click_match}</span>
            <span>{"Erros: " + data.res.click_miss}</span>
          </div>
        </div>
        <div className="modalBoxBarBottom">
          <span
            onClick={() => {
              resetAll();
            }}
          >
            x
          </span>
        </div>
      </div>
    </div>
  );
};
export default Modal;
