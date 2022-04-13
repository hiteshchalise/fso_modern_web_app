import React, { Fragment } from 'react';

const Header = ({ course }) => <h2>{course.name}</h2>

const Total = ({ sum }) => <b>total of {sum} exercises</b>

const Part = ({ part }) => <p>
    {part.name} {part.exercises}
</p>

const Content = ({ parts }) => <Fragment>
    {parts.map((part) => <Part part={part} key={part.id} />)}
</Fragment>



const Course = ({ course }) => {
    const parts = course.parts;
    const sum = parts.reduce((acc, part) => acc + part.exercises, 0)
    return (
        <div>
            <Header course={course} />
            <Content parts={parts} />
            <Total sum={sum} />
        </div>
    )
}

export default Course