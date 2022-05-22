import React, {Component} from "react";
import {deleteMovie, getMovies} from '../services/movieService';
import Pagination from "./common/pagination";
import {paginate} from '../utils/paginate';
import ListGroup from "./common/listGroup";
import {getGenres} from "../services/genreService";
import MoviesTable from "./moviesTable";
import _ from 'lodash';
import {Link} from "react-router-dom";
import SearchBox from "./common/searchBox";
import {toast} from "react-toastify";

class Movies extends Component{
    state = {
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
        searchQuery: "",
        selectedGenre: null,
        sortColumn: {path: 'title', order: 'asc'}
    };

    async componentDidMount() {
        const {data: genre} = await getGenres();
        const genres = [{name: 'All genres', _id: "y"}, ...genre];
        const {data: movies} = await getMovies();
        this.setState({movies, genres});
    }

    handleDelete = async (movie) => {
        const originalMovies = this.state.movies;
        const movies = originalMovies.filter(mv => mv._id !== movie._id);
        this.setState({movies});

        try {
            await deleteMovie(movie._id);
        }
        catch (ex){
            if (ex.response && ex.response.status === 404)
                toast.error('This movie has already deleted!');
            this.setState({movies: originalMovies});
        }

    };

    handleLike = (movie) =>{
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]};
        movies[index].liked = !movies[index].liked;
        this.setState({movies});
    }

    handleSort = sortColumn =>{
        this.setState({sortColumn});
    }

    handlePageChange = page => {
        this.setState({currentPage: page});
    }

    handleGenreSelect = genre => {
        this.setState({selectedGenre: genre, searchQuery: "",currentPage: 1});
    }

    handleSearch = query =>{
        this.setState({searchQuery: query, selectedGenre: null, currentPage: 1});
    }

    getPageData = () => {
        const {pageSize, currentPage, movies, selectedGenre, sortColumn, searchQuery} = this.state;
        let filtered = movies;
        if (searchQuery)
            filtered = movies.filter(
                m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
        else if (selectedGenre && selectedGenre._id)
            filtered = movies.filter(m => m.genre._id === selectedGenre._id);

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        const moviesPerPage = paginate(sorted, currentPage, pageSize);
        return {totalCount: filtered.length, data: moviesPerPage}
    }
    render() {
        const {length: mvnumber} = this.state.movies;
        const {pageSize, currentPage, sortColumn, searchQuery} = this.state;

        if (mvnumber === 0) return <p>There is no movie in database!</p>
        const {totalCount, data} = this.getPageData();

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
                    <Link
                        to='/movies/new'
                        className='btn btn-primary btn-sm'
                        style={{marginBottom: 20}}
                    >
                        New Movies
                    </Link>
                    <p>Showing {totalCount} movie(s) in the database:</p>
                    <SearchBox value={searchQuery} onchange={this.handleSearch}/>
                    <MoviesTable
                        moviesPerPage={data}
                        sortColumn={sortColumn}
                        onDelete={this.handleDelete}
                        onLike={this.handleLike}
                        onSort={this.handleSort}
                    />
                    <Pagination
                        itemsCount={totalCount}
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