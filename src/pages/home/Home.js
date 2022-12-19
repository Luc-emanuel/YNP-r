import { useState, useEffect } from "react";
import BaseContainer from "../../components/Containers/BaseContainer";
import NotFound from "../notfound/NotFound";
import "./index.css";

const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const Card = ({ id, handleChangeValues }) => {
  return (
    <div
      onClick={() => {
        handleChangeValues(id);
      }}
      style={{
        width: "200px",
        height: "200px",
        backgroundColor: "#000",
        borderRadius: "20px",
        boxShadow: "0px 0px 15px 0px #ffd700",
        margin: "2px",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontFamily: "Ubuntu",
              fontSize: "70px",
              color: "#ffd700",
            }}
          >
            {id}
          </span>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [card, setCard] = useState([]);
  const [init, setInit] = useState(0);
  //
  const [array, setArray] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  //
  const handleChangeValues = (value) => {
    if (init === 0) {
      setInit(new Date());
    }
    setCard([...card, value]);
    setArray(shuffle(array));
  };
  //
  const diff = () => {
    if (init !== 0) {
      let diffTime = Math.round(((new Date() - init) / 1000) * 100) / 100;
      if (diffTime > 60) {
        resetAll();
        return 60;
      } else {
        return diffTime;
      }
    } else {
      return 0;
    }
  };
  //
  const [time, setTime] = useState(60 - diff());
  useEffect(() => {
    const timer = setInterval(() => {
      if (init !== 0) {
        setTime(60 - diff());
        setArray(shuffle(array));
      }
    }, 500);
    return () => clearInterval(timer);
  });
  //
  const resetAll = () => {
    setInit(0);
    setArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  };
  //
  try {
    //
    return (
      <BaseContainer>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "616px",
            width: "816px",
            position: "relative",
            top: "50%",
            transform: "translateY(-50%)",
            margin: "0 auto",
          }}
        >
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
              onClick={() => resetAll()}
              style={{
                width: "90%",
                height: "60px",
                backgroundColor: "#ffbb00",
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
                Resetar
              </span>
            </div>
          </div>
          <div
            style={{
              width: "616px",
              height: "616px",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#ff9900",
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
                  />
                );
              })}
            </div>
          </div>
        </div>
      </BaseContainer>
    );
  } catch (err) {
    return <NotFound />;
  }
};

export default Home;
