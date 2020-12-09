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

  useEffect(() => {
    setNota(note);
  }, [])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = function (e) {
    setNota({
      ...nota,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editNotas(nota));
    setOpen(false);
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
            <Button onClick={(e)=> setOpen(false)} variant="contained" color="secondary">X</Button>
      <h1 className={style.title}>Editar nota</h1>
        <form onSubmit={handleSubmit} className="d-flex mt-5">
          <input
         // onChange={(e) => handleInputChange(e)}
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
        </div>
        </DialogContent>
      </Dialog>
    </div>
    </div>
  );
}

export default Note;
