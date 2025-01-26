import React, { Component } from 'react';
import './index.css';

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      department: '',
      errors: {}
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.user && this.props.user !== prevProps.user) {
      const { id, firstName, lastName, email, department } = this.props.user;
      this.setState({ id, firstName, lastName, email, department });
    }
  }

  handleBlur = (field) => {
    if (!this.state[field]) {
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          [field]: 'This field is required'
        }
      }));
    } else {
      this.setState((prevState) => {
        const errors = { ...prevState.errors };
        delete errors[field];
        return { errors };
      });
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { id, firstName, lastName, email, department } = this.state;
    const userData = { id, firstName, lastName, email, department };
    this.props.onSubmit(userData);
  };

  render() {
    const { firstName, lastName, email, department, errors } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={this.handleChange}
            onBlur={() => this.handleBlur('firstName')}
          />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={this.handleChange}
            onBlur={() => this.handleBlur('lastName')}
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            onBlur={() => this.handleBlur('email')}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div>
          <label>Department</label>
          <input
            type="text"
            name="department"
            value={department}
            onChange={this.handleChange}
            onBlur={() => this.handleBlur('department')}
          />
          {errors.department && <span className="error">{errors.department}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default UserForm;