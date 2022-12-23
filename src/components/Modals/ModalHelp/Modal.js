//
import "./index.css";

const ModalHelp = ({ setHelp }) => {
  return (
    <div className="hmodalBox">
      <div className="hmodalBoxLimited">
        <div className="hmodalBoxBar">
          <span>{"Ajuda"}</span>
        </div>
        <div className="hmodalContent">
          <span>
            {
              "Clique em preparar, após isso escolha um número e clique nele, esse número será o que você terá que procurar clicar nele em todas as mudanças o mais rápido possível."
            }
          </span>
          <span>
            {
              "Clicar no número errado acarreta em penalização, fazendo assim você perder pontos."
            }
          </span>
          <span>
            {
              "O multiplicador da pontuação muda de acordo com as opções das cores das células, caso escolha as células com cores variadas, o multiplicador é 1x, caso opte pelas células com a mesma cor padrão, aí o multiplicador é 1.5x. Isso é devido que com as células tendo cores diferentes é mais fácil para você identificar a que você procura (em vez de focar no número, você irá focar na cor da célula)."
            }
          </span>
        </div>
        <div className="hmodalBoxBarBottom">
          <span
            onClick={() => {
              setHelp(false);
            }}
          >
            x
          </span>
        </div>
      </div>
    </div>
  );
};
export default ModalHelp;
