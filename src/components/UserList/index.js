import React, { Component } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './index.css';

class UserList extends Component {
  render() {
    const { users, onEdit, onDelete } = this.props;

    return (
      <div className="user-list">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{`${user.firstName} ${user.lastName}`}</td>
                <td>{user.email}</td>
                <td>{user.department}</td>
                <td>
                  <button onClick={() => onEdit(user)} className="edit-btn">
                    <FaEdit />
                  </button>
                  <button onClick={() => onDelete(user.id)} className="delete-btn">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default UserList;