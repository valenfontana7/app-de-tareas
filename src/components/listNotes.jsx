import React, { useEffect, useState } from "react";
import Note from "./note";
import axios from "axios";
import style from "./css/listNotes.module.css";

function ListNotes() {
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function fetch() {
      const todos = await axios
        .get("http://pern-valenfontana7.herokuapp.com/todos")
        .then((res) => res.data);
      todos && setNotas(todos);
      notas && setLoading(false);
    }
    fetch();
  }, []);

  return (
    <div className={style.container}>
      {notas && !loading ? (
        notas.map((nota) => (
          <div key={nota.todo_id} className={style.nota}>
            <Note note={nota} />
          </div>
        ))
      ) : (
        <div>
          <img src="imagenes/Spin-1s-200px.gif"></img>
        </div>
      )}
    </div>
  );
}

export default ListNotes;
