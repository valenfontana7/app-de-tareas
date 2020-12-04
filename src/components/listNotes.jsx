import React, { useEffect, useState } from "react";
import Note from "./note";
import style from "./css/listNotes.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { listNotas } from '../redux/actions/notas_actions';

function ListNotes() {

  const dispatch = useDispatch();
  const notasList = useSelector(state => state.notasList);
  const { notas, loading, error } = notasList;

  useEffect(() => {
    dispatch(listNotas());
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
