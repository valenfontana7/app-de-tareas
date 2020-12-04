import React, { useState } from 'react';
import style from './css/newNote.module.css';

function NewNote() {
    const [todo, setTodo] = useState({
        todo_id: "",
        description: "",
      });

      const handleInputChange = (e) => {
        setTodo({
          ...todo,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        if(todo.description.trim()){
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
                  window.location = '/notas';
                }
              } catch (err) {
                console.error(err.message);
              }
        } else {
            console.log('No puedes crear una nota vacía')
        }
        
      };

    return (
    <div className={style.new}>
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
