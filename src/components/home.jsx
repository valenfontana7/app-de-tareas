import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listNotas } from '../redux/actions/notas_actions';
import style from './css/home.module.css';

function Home() {
    const dispatch = useDispatch();
    const notasList = useSelector(state => state.notasList);
    const { notas, loading, error } = notasList;

    useEffect(()=> {
        dispatch(listNotas());
    },[])

    return (
        <div className={style.home}>
           {
           !loading ? (<h1 className={style.greeting}>Bienvenido/a a App de Notas! Actualmente hay {notas.length} notas.</h1> ) : (
               <img src="imagenes/Spin-1s-200px.gif" alt=""/>
           )
           }
        </div>
    )
}

export default Home;
