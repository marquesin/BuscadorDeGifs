import { ReactComponent as LogoDesktop } from "../../public/images/logo-desktop.svg";
import { ReactComponent as LogoMobileModoNocturno } from "../../public/images/logo-mobile-modo-noct.svg";

export default function Header(props) {
  return (
    <div>
      
      <div className="conteinerLogosDesktop">
        {props.dia ? <LogoDesktop /> : <LogoMobileModoNocturno />}
      </div>

      <button
        className="buttonEstilo"
        value={props.dia}
        onClick={props.HandlerDia}
      >
        {props.dia ? <p>MODO DARK</p> : <p>MODO LIGTH</p>}
      </button>
      
    </div>
  );
}
