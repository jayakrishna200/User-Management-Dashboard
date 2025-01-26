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
      department: ''
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.user && this.props.user !== prevProps.user) {
      const { id, firstName, lastName, email, department } = this.props.user;
      this.setState({ id, firstName, lastName, email, department });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      this.props.onSubmit(this.state);
      this.resetForm();
    }
  };

  validateForm = () => {
    const { firstName, lastName, email } = this.state;
    if (!firstName || !lastName || !email) {
      alert('All fields are required');
      return false;
    }
    if (!this.validateEmail(email)) {
      alert('Please enter a valid email');
      return false;
    }
    return true;
  };

  validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  resetForm = () => {
    this.setState({
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      department: ''
    });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { show, onClose } = this.props;
    if (!show) return null;

    return (
      <div className="modal">
        <div className="modal-content">
          <h2>{this.state.id ? 'Edit User' : 'Add User'}</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label>Department:</label>
              <input
                type="text"
                name="department"
                value={this.state.department}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-actions">
              <button type="submit">Submit</button>
              <button type="button" onClick={onClose}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default UserForm;