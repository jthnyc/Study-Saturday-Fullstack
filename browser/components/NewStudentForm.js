import React, { Component } from 'react';
import Axios from 'axios';

export default class NewStudentForm extends Component {
    constructor() {
        super()
        this.state = {
            firstName: '',
            lastName: '',
            email: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    async handleSubmit(event){
        event.preventDefault()
        const res = await Axios.post("/student", this.state)
        console.log("res: ", res)
        this.setState({
            firstName: '',
            lastName: '',
            email: ''
        })
        // defined in Main.js on line 49
        this.props.addStudent(res)
    }

  render() {
    console.log(this.state)
    return (
      <form onSubmit={this.handleSubmit}>
        <br />
        <label>
          First Name:
          <input type="text" name="firstName" onChange={this.handleChange} value={this.state.firstName}/>
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" name="lastName" onChange={this.handleChange} value={this.state.lastName}/>
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" onChange={this.handleChange} value={this.state.email}/>
        </label>
        <br />
        <button type="submit">Submit New Student</button>
      </form>
    );
  }
}
