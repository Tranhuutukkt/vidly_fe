import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = (props) => {
    const {columns, onSort, moviesPerPage, sortColumn} = props;

    return (
        <table className='table'>
            <TableHeader
                columns={columns}
                sortColumn={sortColumn}
                onSort={onSort}
            />
            <TableBody
                data={moviesPerPage}
                columns={columns}
            />
        </table>
    );
}

export default Table;