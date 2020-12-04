import React from "react";
import style from "./css/header.module.css";

export default function header() {
  return (
    <div className={style.header}>
      <a className={style.brand} href="/">
        <h1 className={style.title}>Mis Notas</h1>
      </a>
      <div>
        <button className={style.boton}>
          <a href="/notas/new">Crear Nota</a>
        </button>
        <button className={style.boton}>
          <a href="/notas">Ver Notas</a>
        </button>
      </div>
    </div>
  );
}
