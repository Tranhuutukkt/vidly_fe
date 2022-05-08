import React from "react";

const MovieForm = (props) => {
    return <div>
        <h1>Movie Form </h1>
        <h2>{props.match.params.id}</h2>
        <button
            className='btn btn-primary btn-sm'
            onClick={() => props.history.push('/movies')}
        >Save</button>
    </div>
}

export default MovieForm;