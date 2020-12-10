import React from "react";
import style from "./css/header.module.css";

export default function header() {
  return (
    <div className={style.header}>
      <a className={style.brand} href="/">
        <h1 className={style.title}>Mis Notas</h1>
      </a>
      <div>
      <a className={style.boton} href="/notas/new">
        <button>
          Crear Nota
        </button>
        </a>
        <a className={style.boton} href="/notas">
        <button>
          Ver Notas
        </button>
        </a>
      </div>
    </div>
  );
}
