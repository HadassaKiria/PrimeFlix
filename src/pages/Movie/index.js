import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../../services/api"
import "./styles.css"

function Movie() {
    const { id } = useParams();
    const [details, setDetails] = useState({});
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadDetails(){
            const response = await api.get(`/movie/${id}`, {
                params: {
                    api_key: "f4dd542b92150082d73160b5a9c1bb51",
                    language: "pt-BR"
                }
            })
            .then((response) => {
                setDetails(response.data);
                setLoading(false);
            })
            .catch(() => {
                navigate("/", { replace: true });
                return;
            })
        }

        loadDetails();

        return () => {
            console.log("COMPONENTE DESMONTADO")
        };

    }, [id, navigate]);

    function movieSave(){
        const myList = localStorage.getItem("@primeflix");

        let saveMovies = JSON.parse(myList) || [];

        const hasMovie = saveMovies.some((movie) => movie.id === details.id)

        if(hasMovie){
            toast.warn("Esse filme já está na sua lista!")
            return;
        }

        saveMovies.push(details);
        localStorage.setItem("@primeflix", JSON.stringify(saveMovies))
        toast.success("Filme salvo com sucesso!")
    }

    if(loading){
        return(
            <div className="movie-details">
                <h1>Carregando detalhes...</h1>
            </div>
        );
    }

    return(
        <div className="movie-details">
            <h1>{details.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${details.backdrop_path}`} alt={details.title}/>

            <h2>Sipnose</h2>
            <span>{details.overview}</span>

            <strong>Avaliação: {details.vote_average}/10</strong>

            <div className="button-area">
                <button onClick={movieSave}>Salvar</button>

                <button>
                    <a target="blank" rel="external" href={`https://www.youtube.com/results?search_query=${details.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    );
}

export default Movie;