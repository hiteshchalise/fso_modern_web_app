import React, { Fragment } from "react";

const Persons = ({ personsList }) => {
    return (
        <div>
            {personsList.map(person => <Fragment key={person.id}>{person.name} {person.number}<br /></Fragment>)}
        </div>
    )
}

export default Persons;