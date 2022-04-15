import React from "react";

const Filter = ({ handleFilterChange, filterQuery }) => {
    return (<div>
        filter shown with <input onChange={handleFilterChange} value={filterQuery} />
    </div>)
}

export default Filter;