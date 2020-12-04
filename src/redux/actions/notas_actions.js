import {
    NOTAS_LIST_REQUEST,
    NOTAS_LIST_SUCCESS,
    NOTAS_LIST_FAIL,
    NOTAS_DETAILS_REQUEST,
    NOTAS_DETAILS_SUCCESS,
    NOTAS_DETAILS_FAIL,
    NOTAS_LIST_FILTER,
    NOTAS_EDIT_SUCCESS,
    NOTAS_DELETE_SUCCESS
  } from "../constants/notas_constants";
  import axios from "axios";
  
  const listNotas = () => async (dispatch) => {
      dispatch({ type: NOTAS_LIST_REQUEST });
      const { data } = await axios.get("https://pern-valenfontana7.herokuapp.com/todos");
      if (!data) {
        dispatch({
          type: NOTAS_LIST_FAIL,
          payload: "se ha producido un error",
        });
      } else {
        dispatch({ type: NOTAS_LIST_SUCCESS, payload: data });
      }
  };

  const deleteNotas = (id) => async (dispatch) => {
    await axios
      .delete(`https://pern-valenfontana7.herokuapp.com/todo/${id}`, {
        params: id,
      })
      .then((res) => {
        return res;
      });
    dispatch({ type: NOTAS_DELETE_SUCCESS, payload: id });
  };
  
  // const detailsProduct = (productId) => async (dispatch) => {
  //   try {
  //     dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
  //     const { data } = await axios.get(
  //       "http://localhost:3001/products/" + productId
  //     );
  //     dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  //   } catch (error) {
  //     dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
  //   }
  // };
  
  const editNotas = (nota) => async (dispatch) => {
    axios
      .put(`https://pern-valenfontana7.herokuapp.com/todo/${nota.todo_id}`, {
        description: `${nota.description}`
      })
      .then((data) => {
        dispatch({ type: NOTAS_EDIT_SUCCESS, payload: nota });
        return data;
      });
  };
  
  export { listNotas, deleteNotas, editNotas };
  