import React, {Component} from "react";
import * as Icon from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class TableHeader extends Component{
    raiseSort = path => {
        const sortColumn = {...this.props.sortColumn};
        if (sortColumn.path === path)
            sortColumn.order = (sortColumn.order === 'asc') ? 'desc':'asc';
        else {
            sortColumn.path = path;
            sortColumn.order = 'asc';
        }
        this.props.onSort(sortColumn);
    };

    renderSortIcon = column => {
        const {sortColumn} = this.props;
        if (column.path !== sortColumn.path) return null;
        if (sortColumn.path !== undefined){
            if (sortColumn.order === 'asc') return <FontAwesomeIcon icon={Icon.faArrowUp} />
            return <FontAwesomeIcon icon={Icon.faArrowDown} />
        }

    }

    render() {
        return(
            <thead>
            <tr>
                {this.props.columns.map(column => (
                    <th
                        className='clickable'
                        key={column.path || column.key}
                        onClick={() => this.raiseSort(column.path)
                    }>
                        {column.label}
                        {this.renderSortIcon(column)}
                    </th>
                ))}
            </tr>
            </thead>
        );
    }
}

export default TableHeader;