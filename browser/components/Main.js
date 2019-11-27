import React, { Component } from 'react';
import axios from 'axios';

import StudentList from './StudentList.js';
import SingleStudent from './SingleStudent.js';
import Axios from 'axios';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      selectedStudent: {},
      firstName: '',
      lastName: ''
    };

    this.selectStudent = this.selectStudent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getStudents();
  }

  async getStudents() {
    console.log('fetching');
    try {
      const { data } = await axios.get('/student');
      this.setState({ students: data });
    } catch (err) {
      console.error(err);
    }
  }

  selectStudent(student) {
    return this.setState({
      selectedStudent: student,
    });
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event){
    event.preventDefault()
    const res = Axios.post('/routes/student', this.state)
    this.setState({
      
    })
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <h1>Students</h1>
        <form>
            <label htmlFor="firstName">First Name:</label>
            <input type="text" name="firstName" onChange={this.handleChange}/>
            <br />
            <label htmlFor="lastName">Last Name: </label>
            <input type="text" name="lastName" onChange={this.handleChange}/>
            <br />
            <button type="submit">Add a New Student</button>
        </form>
        <br />
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Tests</th>
            </tr>
          </thead>
          <StudentList
            students={this.state.students}
            selectStudent={this.selectStudent}
          />
        </table>
        {this.state.selectedStudent.id ? (
          <SingleStudent student={this.state.selectedStudent} />
        ) : null}
      </div>
    );
  }
}
