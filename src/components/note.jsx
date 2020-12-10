import React, { useState, useEffect } from "react";
import style from "./css/note.module.css";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { deleteNotas, editNotas } from '../redux/actions/notas_actions';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';



function Note({ note }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [nota, setNota] = useState({});

  const [msgs, setMsgs] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setNota(note);
  }, [])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrors([]);
    setMsgs([]);
    setNota(note);
  };

  const handleInputChange = function (e) {
    setNota({
      ...nota,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!nota.description.trim()){
      !errors.find((el)=> el === 'No puedes crear una nota vacía') && setErrors([...errors, 'No puedes crear una nota vacía'])
      return;
    }
    if(nota.description.length < 3) {
      !errors.find((el)=> el === "La nota debe tener al menos 3 caracteres") && setErrors([...errors, "La nota debe tener al menos 3 caracteres"]);
      return;
    }
    if(nota.description.length > 255){
      !errors.find((el)=> el === "La nota no puede exceder los 255 caracteres") && setErrors([...errors, "La nota no puede exceder los 255 caracteres"]);
      return;
    }
    setErrors([]);
    setMsgs([...msgs, "La nota se ha editado correctamente."]);
    try {
      dispatch(editNotas(nota));
      setOpen(false);
    } catch (err) {
      !errors.find((el)=> el === "Se ha producido un error. No fue posible crear la nota\n\n" + err.message) && setErrors([...errors, "Se ha producido un error. No fue posible crear la nota\n\n" + err.message]);
    }
  }
  return (
    <div className={style.note}>
      <p className={style.body}>{note.description}</p>
      <div style={{display: 'flex', height: '40px', flexDirection: 'column'}}>
        <Button onClick={()=> dispatch(deleteNotas(note.todo_id))} variant="contained" color="secondary">
          <DeleteIcon />
        </Button>
        <Button onClick={handleClickOpen} variant="contained" color="default">
          <EditIcon />
        </Button>
      </div>
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
          <div className={style.dialog}>
            <Button onClick={handleClose} variant="contained" color="secondary">X</Button>
      <h1 className={style.title}>Editar nota</h1>
        <form onSubmit={handleSubmit} className="d-flex mt-5">
          <input
          className={`create ${style.input}`}
          type="text"
          name="description"
          value={nota.description}
          onChange={handleInputChange}
          />
          <button type="submit" className={style.boton}>
            Guardar cambios
          </button>
        </form>
        {msgs && msgs.map((msg, i) => (
      <div key={i} className={style.msg}>
        {msg}
        <button onClick={()=> setMsgs([...msgs.filter((message) => msg !== message)])}>x</button>
      </div>
      ))
      }
      {errors && errors.map((error, i) => (
        <div key={i} className={style.error}>
          {error}
          <button onClick={()=> setErrors([...errors.filter((err) => error !== err)])}>x</button>
        </div>
        ))
        }
        </div>
        </DialogContent>
      </Dialog>
    </div>
    </div>
  );
}

export default Note;
