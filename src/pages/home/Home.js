import { useState, useEffect } from "react";
import BaseContainer from "../../components/Containers/BaseContainer";
import NotFound from "../notfound/NotFound";
import Card from "../../components/Cards/Card";
import Modal from "../../components/Modals/Modal";
import "./index.css";

import { shuffle, calcPoints } from "../../utils/functions";
import { arrayBase, timeRange } from "../../utils/constants";

const Home = () => {
  const [card, setCard] = useState([]);
  const [init, setInit] = useState(0);
  const [array, setArray] = useState([...arrayBase]);
  const [time, setTime] = useState(timeRange);
  const [state, setState] = useState({
    first: null,
    last: null,
    ready: false,
    finish: false,
    open: false,
  });
  const [resp, setResp] = useState({});
  const [color, setColor] = useState(true);
  //
  const changeColorChoice = () => {
    if (!state.ready) {
      setColor(!color);
    }
  };
  //
  const handleChangeValues = (value) => {
    if (state.ready) {
      if (init === 0) {
        setInit(new Date());
      }
      setCard([...card, value]);
      setArray(shuffle(array));
      if (state.first === null) {
        setState({ ...state, first: value, last: value });
      } else {
        setState({ ...state, last: value });
      }
    } else {
      alert("Clique em 'Preparar' primeiro...");
    }
  };
  //
  const diff = () => {
    if (init !== 0) {
      let diffTime = Math.round(((new Date() - init) / 1000) * 100) / 100;
      if (diffTime > timeRange) {
        setResp({
          first: state.first,
          res: calcPoints(card, state.first, timeRange, color),
        });
        setInit(0);
        setArray([...arrayBase]);
        setCard([]);
        setState({
          first: null,
          last: null,
          ready: false,
          finish: true,
          open: true,
        });
        return timeRange;
      } else {
        return diffTime;
      }
    } else {
      return 0;
    }
  };
  //
  useEffect(() => {
    const timer = setInterval(() => {
      if (init !== 0) {
        setTime(timeRange - diff());
      } else {
        setTime(timeRange);
      }
    }, 100);
    return () => clearInterval(timer);
  });
  //
  const resetAll = () => {
    setInit(0);
    setArray([...arrayBase]);
    setCard([]);
    setState({
      first: null,
      last: null,
      ready: false,
      finish: false,
      open: false,
    });
    setResp({});
  };
  //
  const readyGame = () => {
    setState({ ...state, ready: true, finish: false, open: false });
    setResp({});
  };
  //
  try {
    //
    return (
      <BaseContainer>
        <div className="notSelect boxContainer">
          {state.open === true && state.finish === true ? (
            <Modal resetAll={resetAll} data={resp} />
          ) : (
            <>
              <div className="boxLeft">
                <div
                  id="bot1"
                  onClick={() => {
                    if (state.ready) {
                      resetAll();
                    } else {
                      readyGame();
                    }
                  }}
                >
                  <span>{state.ready ? "Resetar" : "Preparar"}</span>
                </div>
                <div
                  id="bot2"
                  onClick={() => {
                    changeColorChoice();
                  }}
                  style={{
                    background: !color
                      ? "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)"
                      : "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(255,255,255,1) 100%)",
                  }}
                >
                  <span>{!color ? "Cores" : "Sem cores"}</span>
                </div>
              </div>
              <div className="boxCenter">
                <div id="line">
                  {array.slice(0, 3).map((item, index) => {
                    return (
                      <Card
                        key={"A_" + index}
                        id={item}
                        handleChangeValues={handleChangeValues}
                        colorShow={color}
                      />
                    );
                  })}
                </div>
                <div id="line">
                  {array.slice(3, 6).map((item, index) => {
                    return (
                      <Card
                        key={"B_" + index}
                        id={item}
                        handleChangeValues={handleChangeValues}
                        colorShow={color}
                      />
                    );
                  })}
                </div>
                <div id="line">
                  {array.slice(6, 9).map((item, index) => {
                    return (
                      <Card
                        key={"C_" + index}
                        id={item}
                        handleChangeValues={handleChangeValues}
                        colorShow={color}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="boxRight">
                <div id="bot">
                  <span>{Math.round(time * 100) / 100 + "s"}</span>
                </div>
                <div id="bot">
                  <span>
                    {state.first === null ? "" : "Primeiro: " + state.first}
                  </span>
                </div>
                <div id="bot">
                  <span>
                    {state.last === null ? "" : "Último: " + state.last}
                  </span>
                </div>
                <div id="bot">
                  <span>
                    {card.length === 0 ? "" : "Clicks: " + card.length}
                  </span>
                </div>
                <div id="bot">
                  <span>
                    {state.first === null
                      ? ""
                      : "Pontos: " +
                        calcPoints(card, state.first, timeRange, color)[
                          "points"
                        ]}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </BaseContainer>
    );
  } catch (err) {
    return <NotFound />;
  }
};

export default Home;
