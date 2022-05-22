import React from "react";
import Form from "./common/form";
import Joi from "joi";
import {getGenres} from "../services/genreService";
import {getMovie, saveMovie} from "../services/movieService";

class MovieForm extends Form{
    state = {
        data: {
            title: "",
            genreId: "",
            numberInStock: "",
            dailyRentalRate: ""
        },
        genres: [],
        errors: {}
    }

    schema = {
        _id: Joi.string(),
        title: Joi.string().required().label('Title'),
        genreId: Joi.string().required().label('Genre'),
        numberInStock: Joi.number().required().min(0).max(100).label('Number in stock'),
        dailyRentalRate: Joi.number().required().min(0).max(10).label('Daily rental rate')
    }

    async componentDidMount() {
        const {data: genres} = await getGenres();
        this.setState({genres});

        const movieId = this.props.match.params.id;
        if (movieId === 'new') return;

        try {
            const {data: movie} = await getMovie(movieId);
            this.setState({data: this.mapToViewModel(movie)});
        }
        catch (ex){
            if (ex.response && ex.response.status === 404)
                this.props.history.replace('/not-found');
        }
    }

    mapToViewModel(movie){
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        };
    }

    doSubmit = async () => {
        await saveMovie(this.state.data);
        this.props.history.push('/movies');
    }

    render() {
        return (
            <div>
                <h1>Movie Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('title', 'Title')}
                    {this.renderSelect('genreId', 'Genre', this.state.genres)}
                    {this.renderInput('numberInStock', 'Number in stock', 'number')}
                    {this.renderInput('dailyRentalRate', 'Daily rental rate')}
                    {this.renderButton('Save')}
                </form>
            </div>
        );
    }
}

export default MovieForm;