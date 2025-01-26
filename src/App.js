import React, { Component } from 'react';
import ErrorBoundary from './components/ErrorBoundary/index.js';
import UserList from './components/UserList/index.js';
import UserForm from './components/UserForm/index.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      showForm: false,
      selectedUser: null,
      currentPage: 1,
      usersPerPage: 5,
      error: null
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      const users = await response.json();
      
      // Transform the data to match our schema
      const transformedUsers = users.map(user => ({
        id: user.id,
        firstName: user.name.split(' ')[0],
        lastName: user.name.split(' ')[1] || '',
        email: user.email,
        department: 'Engineering' // Default department
      }));
      
      this.setState({ users: transformedUsers });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  handleAddUser = () => {
    this.setState({ showForm: true, selectedUser: null });
  };

  handleEditUser = (user) => {
    this.setState({ showForm: true, selectedUser: user });
  };

  handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete user');
      
      this.setState(prevState => ({
        users: prevState.users.filter(user => user.id !== id)
      }));
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  handleFormSubmit = async (userData) => {
    try {
      const isEditing = Boolean(userData.id);
      const url = isEditing 
        ? `https://jsonplaceholder.typicode.com/users/${userData.id}`
        : 'https://jsonplaceholder.typicode.com/users';
      
      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-type': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error(`Failed to ${isEditing ? 'update' : 'create'} user`);
      
      this.setState(prevState => {
        if (isEditing) {
          return {
            users: prevState.users.map(user => 
              user.id === userData.id ? userData : user
            ),
            showForm: false,
            selectedUser: null
          };
        } else {
          return {
            users: [...prevState.users, { ...userData, id: prevState.users.length + 1 }],
            showForm: false,
            selectedUser: null
          };
        }
      });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  handleCloseForm = () => {
    this.setState({ showForm: false, selectedUser: null });
  };

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  render() {
    const { users, showForm, selectedUser, currentPage, usersPerPage, error } = this.state;
    
    // Pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(users.length / usersPerPage);

  
    return (
      <div className="app">
        <h1>User Management Dashboard</h1>
        <ErrorBoundary message={error}>
          <UserList
            users={this.state.users}
            onEdit={this.handleEditUser}
            onDelete={this.handleDeleteUser}
          />
        </ErrorBoundary>
        <button onClick={this.handleAddUser} className="add-btn">
          Add User
        </button>
        <UserForm
          show={showForm}
          user={selectedUser}
          onClose={this.handleCloseForm}
          onSubmit={this.handleFormSubmit}
        />
         {totalPages > 1 && (
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                <button
                  key={number}
                  onClick={() => this.handlePageChange(number)}
                  className={currentPage === number ? 'active' : ''}
                >
                  {number}
                </button>
              ))}
            </div>
          )}
      </div>
    );
  }
}

export default App;