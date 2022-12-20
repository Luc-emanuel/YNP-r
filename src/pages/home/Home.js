import { useState, useEffect } from "react";
import BaseContainer from "../../components/Containers/BaseContainer";
import NotFound from "../notfound/NotFound";
import Card from "../../components/Cards/Card";
import "./index.css";

import { shuffle, calcPoints } from "../../utils/functions";
import { arrayBase, timeRange } from "../../utils/constants";

const Modal = ({ resetAll, data }) => {
  return (
    <div
      style={{
        width: "1016px",
        height: "616px",
        backgroundColor: "#222",
        borderRadius: "20px",
      }}
    >
      <div
        style={{
          width: "956px",
          margin: "0 auto",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "76px",
            textAlign: "center",
            borderBottom: "1px solid #ff9900",
          }}
        >
          <span
            style={{ fontFamily: "Ubuntu", fontSize: "28px", color: "#ff9900" }}
          >
            {"Resultado"}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "462px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "250px",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontFamily: "Ubuntu",
                fontSize: "86px",
                color: "#ff9900",
                fontWeight: "600",
              }}
            >
              {data.first}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "456px",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontFamily: "Ubuntu",
                fontSize: "86px",
                color: "#ff9900",
                fontWeight: "600",
              }}
            >
              {data.res.points}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "250px",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontFamily: "Ubuntu",
                fontSize: "40px",
                color: "#ff9900",
                fontWeight: "600",
              }}
            >
              {"Acertos: " + data.res.click_match}
            </span>
            <span
              style={{
                fontFamily: "Ubuntu",
                fontSize: "40px",
                color: "#ff9900",
                fontWeight: "600",
              }}
            >
              {"Erros: " + data.res.click_miss}
            </span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "76px",
            borderTop: "1px solid #ff9900",
          }}
        >
          <span
            onClick={() => {
              resetAll();
            }}
            style={{
              fontFamily: "Ubuntu",
              fontSize: "30px",
              cursor: "pointer",
              color: "#ff9900",
              width: "30px",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            x
          </span>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [card, setCard] = useState([]);
  const [init, setInit] = useState(0);
  const [array, setArray] = useState([...arrayBase]);
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
  const [time, setTime] = useState(timeRange - diff());
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
        <div
          className="notSelect"
          style={{
            display: "flex",
            flexDirection: "row",
            height: "616px",
            width: "1016px",
            position: "relative",
            top: "50%",
            transform: "translateY(-50%)",
            margin: "0 auto",
          }}
        >
          {state.open === true && state.finish === true ? (
            <Modal resetAll={resetAll} data={resp} />
          ) : (
            <>
              <div
                style={{
                  width: "200px",
                  height: "616px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}
              >
                <div
                  onClick={() => {
                    if (state.ready) {
                      resetAll();
                    } else {
                      readyGame();
                    }
                  }}
                  style={{
                    width: "90%",
                    height: "60px",
                    background:
                      "linear-gradient(90deg, rgba(255,187,0,1) 0%, rgba(255,255,255,1) 100%)",
                    textAlign: "center",
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "30px",
                    cursor: "pointer",
                    marginBottom: "20px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Ubuntu",
                      fontSize: "26px",
                      color: "#000",
                    }}
                  >
                    {state.ready ? "Resetar" : "Preparar"}
                  </span>
                </div>
                <div
                  onClick={() => {
                    changeColorChoice();
                  }}
                  style={{
                    width: "90%",
                    height: "60px",
                    background: !color
                      ? "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)"
                      : "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(255,255,255,1) 100%)",
                    textAlign: "center",
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "30px",
                    cursor: "pointer",
                    marginBottom: "20px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Ubuntu",
                      fontSize: "26px",
                      color: "#000",
                    }}
                  >
                    {!color ? "Cores" : "Sem cores"}
                  </span>
                </div>
              </div>
              <div
                style={{
                  width: "616px",
                  height: "616px",
                  display: "flex",
                  flexDirection: "column",
                  borderBottomRightRadius: "20px",
                  borderTopRightRadius: "20px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "200px",
                    display: "flex",
                    flexDirection: "row",
                    margin: "2px",
                  }}
                >
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
                <div
                  style={{
                    width: "100%",
                    height: "200px",
                    display: "flex",
                    flexDirection: "row",
                    margin: "2px",
                  }}
                >
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
                <div
                  style={{
                    width: "100%",
                    height: "200px",
                    display: "flex",
                    flexDirection: "row",
                    margin: "2px",
                  }}
                >
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
              <div
                style={{
                  width: "200px",
                  height: "616px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}
              >
                <div
                  style={{
                    width: "90%",
                    height: "60px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    background:
                      "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,187,0,1) 100%)",
                    textAlign: "center",
                    marginBottom: "20px",
                    marginLeft: "10%",
                    borderRadius: "30px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Ubuntu",
                      fontSize: "18px",
                      color: "#000",
                      fontWeight: "500",
                    }}
                  >
                    {Math.round(time * 100) / 100 + "s"}
                  </span>
                </div>
                <div
                  style={{
                    width: "90%",
                    height: "60px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    background:
                      "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,187,0,1) 100%)",
                    textAlign: "center",
                    marginBottom: "20px",
                    marginLeft: "10%",
                    borderRadius: "30px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Ubuntu",
                      fontSize: "18px",
                      color: "#000",
                      fontWeight: "500",
                    }}
                  >
                    {state.first === null ? "" : "Primeiro: " + state.first}
                  </span>
                </div>
                <div
                  style={{
                    width: "90%",
                    height: "60px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    background:
                      "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,187,0,1) 100%)",
                    textAlign: "center",
                    marginBottom: "20px",
                    marginLeft: "10%",
                    borderRadius: "30px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Ubuntu",
                      fontSize: "18px",
                      color: "#000",
                      fontWeight: "500",
                    }}
                  >
                    {state.last === null ? "" : "Último: " + state.last}
                  </span>
                </div>
                <div
                  style={{
                    width: "90%",
                    height: "60px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    background:
                      "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,187,0,1) 100%)",
                    textAlign: "center",
                    marginBottom: "20px",
                    marginLeft: "10%",
                    borderRadius: "30px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Ubuntu",
                      fontSize: "18px",
                      color: "#000",
                      fontWeight: "500",
                    }}
                  >
                    {card.length === 0 ? "" : "Clicks: " + card.length}
                  </span>
                </div>
                <div
                  style={{
                    width: "90%",
                    height: "60px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    background:
                      "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,187,0,1) 100%)",
                    textAlign: "center",
                    marginBottom: "20px",
                    marginLeft: "10%",
                    borderRadius: "30px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Ubuntu",
                      fontSize: "18px",
                      color: "#000",
                      fontWeight: "500",
                    }}
                  >
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
