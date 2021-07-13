import "./styles.css";
import { React, useState, useEffect } from "react";
import Header from "./Header.js";
import Search from "./Search.js";
import { ReactComponent as Cargando } from "../../public/images/cargando.svg";
import { ReactComponent as SugerenciasSerch } from "../../public/images/search-solid-sugerencias.svg";

export default function Conteiner() {
  const [AppDia, setAppDia] = useState(true);
  const [reset, setReset] = useState(false);
  const [dato, setDato] = useState([]);
  const [entrada, setEntrada] = useState("");
  const [sugerencias, setSugerencias] = useState([]);
  const [loading, setLoing] = useState(false);
  const [auto, setAuto] = useState(false);

  useEffect(() => {
    const BASE_URL = `https://api.giphy.com/v1/`;
    const API_KEY = `eEIm9JmDvnEXBhvlRlLLpOtRkvOR6K93`;
    setLoing(true);
    fetch(`${BASE_URL}gifs/search?api_key=${API_KEY}&q=${entrada}&limit=12`)
      .then((response) => response.json(response))
      .then((resultado) => {
        setLoing(false);
        setDato(resultado.data);
      })
      .catch((e) => alert("Error en la carga: " + e));

    if (entrada.length > 0) {
      return fetch(
        `${BASE_URL}gifs/search/tags?api_key=${API_KEY}&q=${entrada}&limit=12`
      )
        .then((response) => response.json(response))
        .then((resultado) => {
          setSugerencias(resultado.data);
        })
        .catch((e) => alert("Tenemos problemas con las sugerencias:" + e));
    } else {
      setSugerencias([]);
    }
  }, [entrada]);

  function Cards() {
    return dato.map((url) => {
      return (
        <img
          src={url.images.original.url}
          key={url.id}
          alt={url.username}
          className="gif"
        />
      );
    });
  }

  function Sugerencias() {
    return sugerencias.map((sugerencia) => {
      return (
        <div
          className="conteinerSugerencia"
          key={sugerencia.analytics_response_payload}
        >
          <h3
            className="suge"
            key={sugerencia.name}
            alt={sugerencia.name}
            value={sugerencia.name}
            onMouseDown={handlerAutocompletar}
          >
            <SugerenciasSerch
              id="sugerenciasIcon"
              value={sugerencia.name}
              onMouseDown={handlerAutocompletar}
            />
            {sugerencia.name}
          </h3>
        </div>
      );
    });
  }

  const HandlerDia = () => {
    setAppDia(!AppDia);
  };
  const handlerEntrada = (e) => {
    setEntrada(e.target.value);
  };
  const handlerReset = () => {
    setReset(true);
    setEntrada("");
  };

  const handlerAutocompletar = (e) => {
    setEntrada(e.target.getAttribute("value"));
    setAuto(false);
  };
  const handlerOnFocus = () => {
    setAuto(true);
  };
  const handlerOnBlur = () => {
    setAuto(false);
  };
  const handlerKeyPress = (e) => {
    if (e.which === 13) {
      setAuto(false);
    } else if (e.which !== 13) {
      setAuto(true);
    }
  };
  return (
    <div className={AppDia ? "AppDia" : "AppNoche"}>
      <div>
        <Search
          AppDia={AppDia}
          handlerEntrada={handlerEntrada}
          entrada={entrada}
          handlerOnFocus={handlerOnFocus}
          handlerOnBlur={handlerOnBlur}
          handlerReset={handlerReset}
          reset={reset}
          sugerencias={sugerencias}
          dato={dato}
          handlerKeyPress={handlerKeyPress}
        />
        <Header HandlerDia={HandlerDia} dia={AppDia} />
      </div>
      {auto && sugerencias.length > 0 && loading === false ? (
        <div
          className={
            AppDia ? "conteinerSugerencias" : "conteinerSugerenciasNoche"
          }
        >
          <Sugerencias
            sugerencias={sugerencias}
            handlerAutocompletar={handlerAutocompletar}
          />
        </div>
      ) : (
        ""
      )}
      {dato?.length > 0 && loading === false ? (
        <div className={!AppDia ? "fondoBlack" : ""}>
          <div className="conteinerCardsYResultado">
            <p className="resultados">Resultados de la busqueda</p>
            <div className={AppDia ? "conteinerCards" : "conteinerCardsNoche"}>
              <Cards />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {entrada !== "" && dato.length === 0 && loading === false ? (
        <div className={!AppDia ? "fondoBlack" : ""}>
          <div className="conteResultadosvacios">
            <h3 className="resultadosvacios">
              No se encontraron resultados para su búsqueda. Prueba con otros
              términos.
            </h3>
          </div>
        </div>
      ) : (
        ""
      )}
      {loading === true ? (
        <div className={!AppDia ? "fondoBlack" : ""}>
          <Cargando />
        </div>
      ) : (
        ""
      )}
      {!AppDia && dato.length === 0 ? <div className="fondoBlack" /> : ""}
    </div>
  );
}
