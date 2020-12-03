import React from "react";
import style from "./css/note.module.css";

function Note({ note }) {
  return (
    <div className={style.note}>
      <p className={style.body}>{note.description}</p>
    </div>
  );
}

export default Note;
