import React, {Component} from "react";
import {getMovies} from '../services/fakeMovieService';
import Like from "./common/like";
import Pagination from "./common/pagination";
import {paginate} from '../utils/paginate';
import ListGroup from "./common/listGroup";
import {getGenres} from "../services/fakeGenreService";

class Movies extends Component{
    state = {
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
        selectedGenre: null
    };

    componentDidMount() {
        const genres = [{name: 'All genres'}, ...getGenres()]
        this.setState({movies: getMovies(), genres});
    }

    handleDelete = (movie) => {
        const movies = this.state.movies.filter(mv => mv._id !== movie._id);
        this.setState({movies});
    };

    handleLike = (movie) =>{
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]};
        movies[index].liked = !movies[index].liked;
        this.setState({movies});
    }

    handlePageChange = page => {
        this.setState({currentPage: page});
    }

    handleGenreSelect = genre => {
        this.setState({selectedGenre: genre, currentPage: 1});
    }

    render() {
        const {length: mvnumber} = this.state.movies;
        const {pageSize, currentPage, movies, selectedGenre} = this.state;

        if (mvnumber === 0) return <p>There is no movie in database!</p>

        const filtered = selectedGenre && selectedGenre._id ? movies.filter(m => m.genre._id === selectedGenre._id): movies;

        const moviesPerPage = paginate(filtered, currentPage, pageSize);

        return (
            <div className='row'>
                <div className='col-3'>
                    <ListGroup
                        items={this.state.genres}
                        selectedItem={this.state.selectedGenre}
                        onItemsSelect={this.handleGenreSelect}
                    />
                </div>
                <div className='col'>
                    <p>Showing {filtered.length} movie(s) in the database:</p>
                    <table className='table'>
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Stock</th>
                            <th>Rate</th>
                            <th />
                            <th />
                        </tr>
                        </thead>
                        <tbody>
                        {moviesPerPage.map(movie => (
                            <tr key={movie._id}>
                                <td>{movie.title}</td>
                                <td>{movie.genre.name}</td>
                                <td>{movie.numberInStock}</td>
                                <td>{movie.dailyRentalRate}</td>
                                <td><Like liked={movie.liked} onClick={() => this.handleLike(movie)}/></td>
                                <td><button onClick={() => this.handleDelete(movie)} className="btn btn-danger btn-sm">Delete</button></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <Pagination
                        itemsCount={filtered.length}
                        pageSize={pageSize}
                        onPageChange={this.handlePageChange}
                        currentPage={currentPage}
                    />
                </div>

            </div>

        );
    }
}

export default Movies;