import React, { useState } from 'react';
import style from './css/newNote.module.css';

function NewNote() {
    const [todo, setTodo] = useState({
        todo_id: "",
        description: "",
      });

      const [msgs, setMsgs] = useState([]);
      const [errors, setErrors] = useState([]);

      const handleInputChange = (e) => {
        setTodo({
          ...todo,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        if(!todo.description.trim()){
          !errors.find((el)=> el === 'No puedes crear una nota vacía') && setErrors([...errors, 'No puedes crear una nota vacía'])
          return;
        }
        if(todo.description.length < 3) {
          !errors.find((el)=> el === "La nota debe tener al menos 3 caracteres") && setErrors([...errors, "La nota debe tener al menos 3 caracteres"]);
          return;
        }
        if(todo.description.length > 255){
          !errors.find((el)=> el === "La nota no puede exceder los 255 caracteres") && setErrors([...errors, "La nota no puede exceder los 255 caracteres"]);
          return;
        }
        try {
          const { description } = todo;
          const body = { description: description };
          const response = await fetch(`https://pern-valenfontana7.herokuapp.com/todos`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(body),
          });
          if (response.status === 200) {
            document.getElementsByClassName("create")[0].value = "";
            setTodo({
              todo_id: "",
              description: "",
            });
            setErrors([]);
            setMsgs([...msgs, "La nota se ha creado correctamente."]);
            setTimeout(()=> window.location = '/notas', 2000);
          } else {
            !errors.find((el)=> el === "Se ha producido un error. No fue posible crear la nota") && setErrors([...errors, "Se ha producido un error. No fue posible crear la nota"]);
          }
        } catch (err) {
          console.error(err.message);
        }
        
      };

    return (
    <div className={style.new}>
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
      <div className={style.form}>
        <h1 className={style.title}>Agregar nota</h1>
        <form onSubmit={handleSubmit} className="d-flex mt-5">
          <input
          onChange={(e) => handleInputChange(e)}
          className={`create ${style.input}`}
          type="text"
          value={todo.description}
          name="description"
          />
          <button type="submit" className={style.boton}>
            Agregar
          </button>
        </form>
      </div>
    </div>
    );
}

export default NewNote;
