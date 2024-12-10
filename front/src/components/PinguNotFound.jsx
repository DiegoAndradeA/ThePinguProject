import React from "react";

import sadPingu from "../assets/notfoundimg.gif";

export default function PokeNotFound() {
  document.title = "Oops! - PiplupPedia";
  return (
    <div>
      <b className="text-blue-600 text-5xl sm:text-6xl">¡Oops!</b>
      <img src={sadPingu} className="mx-auto mt-10 mb-5 rounded-lg w-[300px]" />
      <p className="text-blue-600 text-3xl mb-5">
        Al parecer, la pagina que buscas no existe.
      </p>
    </div>
  );
}
