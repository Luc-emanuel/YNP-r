//
import "./index.css";
import { colors } from "../../utils/constants";

const Card = ({ id, handleChangeValues, colorShow }) => {
  return (
    <div
      className="card"
      onClick={() => {
        handleChangeValues(id);
      }}
      style={
        colorShow
          ? { backgroundColor: colors[id][0] }
          : { boxShadow: "0px 0px 10px 2px #ffd700" }
      }
    >
      <div className="cardContent">
        <div className="cardContent">
          <span
            className="cardTitle"
            style={colorShow ? { color: colors[id][1] } : {}}
          >
            {id}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
