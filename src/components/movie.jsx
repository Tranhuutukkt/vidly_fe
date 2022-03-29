import React, {Component} from "react";
import {getMovies} from '../services/fakeMovieService';

class Movies extends Component{
    state = {
        movies: getMovies(),
    };

    handleDelete = movies => {

    };

    render() {
        let i = 1;
        return (<table className='table'>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Genre</th>
                    <th>Stock</th>
                    <th>Rate</th>
                </tr>
                </thead>
                <tbody>
                {this.state.movies.map(movie => (
                    <tr key={i++}>
                        <td>{movie.title}</td>
                        <td>{movie.genre.name}</td>
                        <td>{movie.numberInStock}</td>
                        <td>{movie.dailyRentalRate}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        );
    }
}

export default Movies;