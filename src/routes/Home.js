import React from "react";
import axios from "axios";
import Movie from "../components/Movies";
import "./Home.css";

class Home extends React.Component {
  state = {
    isLoading: true,
    movies: [],
  };

  render() {
    console.log("render");
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="container__loading">
            <span className="loading__text">Loading...</span>
          </div>
        ) : (
          <div className="container__movies">
            {movies.map((movie) => {
              console.log(movie);
              return (
                <Movie
                  key={movie.id}
                  id={movie.id}
                  year={movie.year}
                  title={movie.title}
                  summary={movie.summary}
                  poster={movie.medium_cover_image}
                  genres={movie.genres}
                />
              );
            })}
          </div>
        )}
      </section>
    );
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.getMovies();
  }

  getMovies = async () => {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get(
      "https://yts-proxy.now.sh/list_movies.json?sort_by=rating"
    );

    this.setState({
      movies,
    });

    this.setState({ isLoading: false });
  };
}

export default Home;
