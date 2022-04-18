import React from "react";

const Persons = ({ personsList, handleDelete }) => {

    const onClickListener = (person) => {
        const confirm = window.confirm(`Delete ${person.name}?`);
        if (confirm) handleDelete(person);
    }

    return (
        <div>
            {personsList.map(person => <div key={person.id}>
                {person.name} {person.number} &nbsp;
                <button onClick={() => onClickListener(person)}>delete</button>
            </div>)}
        </div>
    )
}

export default Persons;