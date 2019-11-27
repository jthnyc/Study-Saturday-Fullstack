import React from 'react'

const NewStudentForm = (props) => {
    return (
        <form>
            <br />
            <label htmlFor="firstName">First Name:</label>
            <input type="text" name="firstName" onChange={props.handleChange} />
            <br />
            <label htmlFor="lastName">Last Name: </label>
            <input type="text" name="lastName" onChange={props.handleChange} />
            <br />
            <button type="submit">Add a New Student</button>
            <br />
            <br />
        </form>
    )
}

export default NewStudentForm