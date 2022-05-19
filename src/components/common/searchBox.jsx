import React from "react";

const SearchBox = ({value, onchange}) => {
    return (
        <input
            type='text'
            name='query'
            className='form-control my-3'
            placeholder='Search ...'
            value={value}
            onChange={e => onchange(e.currentTarget.value)}
        />
    );
}

export default SearchBox;