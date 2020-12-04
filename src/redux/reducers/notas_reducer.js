import {
    NOTAS_LIST_REQUEST,
    NOTAS_LIST_SUCCESS,
    NOTAS_LIST_FAIL,
    NOTAS_DETAILS_REQUEST,
    NOTAS_DETAILS_SUCCESS,
    NOTAS_DETAILS_FAIL,
    NOTAS_DELETE_SUCCESS,
    NOTAS_EDIT_SUCCESS
  } from "../constants/notas_constants";
  
  function notasListReducer(state = { notas: [] }, action) {
    const filter = (el) => {
        return el.todo_id !== action.payload;
      };
    switch (action.type) {
      case NOTAS_LIST_REQUEST:
        return { loading: true };
      case NOTAS_LIST_SUCCESS:
        return {
          loading: false,
          notas: action.payload,
        };
      case NOTAS_LIST_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case NOTAS_DELETE_SUCCESS:
        return (state = { notas: state.notas.filter(filter) }
        );
      case NOTAS_EDIT_SUCCESS:
      const newNota = action.payload;
      const oldNota = state.notas.find(
        (nota) => nota.todo_id === newNota.todo_id
      );
      return {
        notas: state.notas.map((nota) => {
          return nota.todo_id === oldNota.todo_id ? newNota : nota;
        }),
      };
      default:
        return state;
    }
  }
  
  function notasDetailsReducer(state = { notaDet: {} }, action) {
    switch (action.type) {
      case NOTAS_DETAILS_REQUEST:
        return { loadingDet: true };
      case NOTAS_DETAILS_SUCCESS:
        return { loadingDet: false, notaDet: action.payload };
      case NOTAS_DETAILS_FAIL:
        return { loadingDet: false, errorDet: action.payload };
      default:
        return state;
    }
  }
  
  export { notasListReducer, notasDetailsReducer };
  