import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import "./styles.css"

function Favorites(){
    const [movies, setMovies] = useState([]);

    useEffect(() => {

        const myList = localStorage.getItem("@primeflix");
        setMovies(JSON.parse(myList) || [])

    }, []);

    function delMovie(id){
        let filterMovies = movies.filter((movie) => {
            return (movie.id !== id)
        })
        setMovies(filterMovies);
        localStorage.setItem("@primeflix", JSON.stringify(filterMovies))
        toast.success("Filme removido com sucesso!")
    }

    return(
        <div className="my-movies">
            <h1>Meus filmes</h1>

            {movies.length === 0 && <span>Você não possui nenhum filme salvo :( </span>}

            <ul>
                {movies.map((movie) => {
                    return(
                        <li key={movie.id}>
                            <span>{movie.title}</span>

                            <div>
                                <Link to={`/movie/${movie.id}`}>Ver detlhes</Link>
                                <button onClick={() => delMovie(movie.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default Favorites;