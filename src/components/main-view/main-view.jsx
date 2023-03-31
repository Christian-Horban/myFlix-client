import {useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "Iron Man",
            image:"https://upload.wikimedia.org/wikipedia/en/0/02/Iron_Man_%282008_film%29_poster.jpg",
            director:"Jon Favreau"
        },
        {
            id: 2,
            title: "Iron Man 2",
            image: "https://m.media-amazon.com/images/M/MV5BZGVkNDAyM2EtYzYxYy00ZWUxLTgwMjgtY2VmODE5OTk3N2M5XkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_.jpg",
            director:"Jon Favreau"
        },
        {
            id: 3,
            title: "Iron Man 3",
            image: "https://kbimages1-a.akamaihd.net/39f5758d-be8e-4dfd-8395-52092dfb6f49/1200/1200/False/marvel-s-iron-man-3.jpg",
            director:"Shane Black"
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) { 
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                    />
            ))}
        </div>
    );
};
