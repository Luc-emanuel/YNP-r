//
import Lottie from "react-lottie";
import ani404 from "../../assets/animations/404";

const NotFound = () => {
  //
  const aniOptions = {
    loop: true,
    autoplay: true,
    animationData: ani404,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  //
  return (
    <div
      className="notFoundPage notSelect"
      style={{
        height: `${window.innerHeight - 20}px`,
        width: `${window.innerWidth - 50}px`,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          top: "50%",
          position: "relative",
          transform: "translateY(-50%)",
        }}
      >
        <div>
          <Lottie options={aniOptions} height={400} width={700} style={{}} />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
