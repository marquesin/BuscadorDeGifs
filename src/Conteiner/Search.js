import { ReactComponent as IlustraHeader } from "../../public/images/ilustra_header.svg";
import { ReactComponent as IconCruz } from "../../public/images/times-solid.svg";
export default function Search(props) {
  return (
    <>
      <div className="ConteinerIlustraYTitulo">
        <h1 className={props.AppDia ? "inspirate" : "inpirateNoche"}>
          ¡Inspirate y busca los mejores GIFS!
        </h1>
        <IlustraHeader />
      </div>
      <div className="inputButon">
        <input
          type="text"
          placeholder="Busca gifs..."
          className="inputBusqueda"
          onChange={props.handlerEntrada}
          value={props.entrada}
          onFocus={props.handlerOnFocus}
          onBlur={props.handlerOnBlur}
          onKeyPress={props.handlerKeyPress}
        />

        <button
          className="botonBusqueda"
          onClick={props.handlerReset}
          value={props.reset}
        >
          {props.sugerencias.length > 0 ||
          (props.entrada.length > 0 && props.dato.length === 0) ||
          props.dato.length !== 0 ? (
            <IconCruz className="iconCruz" />
          ) : (
            <img
              src={require("../../public/images/icon search.png")}
              alt={"icon"}
            />
          )}
        </button>
      </div>
    </>
  );
}
