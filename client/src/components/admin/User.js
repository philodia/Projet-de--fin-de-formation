import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, fetchUsers, updateUser, deleteUser } from '../../actions/authActions';
import { Button, Form, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './User.css';

// Function to capitalize the first letter of a string
const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const User = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.user?.users || []);
  const error = useSelector(state => state.user?.error);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [permissions, setPermissions] = useState({
    canCreate: false,
    canRead: false,
    canUpdate: false,
    canDelete: false,
  });
  const [userId, setUserId] = useState(null);
  const [formMode, setFormMode] = useState('add'); // 'add' or 'edit'

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const userData = {
      _id: userId,
      name,
      email,
      role,
      password,
      permissions,
    };

    if (userId) {
      const { password, ...updatedUserData } = userData;
      dispatch(updateUser(userId, updatedUserData))
        .then(() => resetForm())
        .catch((error) => alert(`Error updating user: ${error.message}`));
    } else {
      dispatch(register(userData))
        .then(() => resetForm())
        .catch((error) => alert(`Error creating user: ${error.message}`));
    }
  };

  const handleEdit = (user) => {
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
    setPermissions(user.permissions || {
      canCreate: false,
      canRead: false,
      canUpdate: false,
      canDelete: false,
    });
    setUserId(user._id);
    setPassword('');
    setConfirmPassword('');
    setFormMode('edit');
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id))
      .catch((error) => alert(`Error deleting user: ${error.message}`));
  };

  const handlePermissionChange = (e) => {
    const { name, checked } = e.target;
    setPermissions(prevPermissions => ({
      ...prevPermissions,
      [name]: checked,
    }));
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setRole('');
    setPassword('');
    setConfirmPassword('');
    setPermissions({
      canCreate: false,
      canRead: false,
      canUpdate: false,
      canDelete: false,
    });
    setUserId(null);
    setFormMode('add');
  };

  return (
    <div className="container my-5">
      <h2>User Management</h2>

      {error && <div className="alert alert-danger">An error occurred while fetching data: {error}</div>}

      <Form onSubmit={handleSubmit} className="mb-5">
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Role</Form.Label>
          <Form.Control
            as="select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select a role</option>
            <option value="manager">Manager</option>
            <option value="accountant">Accountant</option>
            <option value="admin">Admin</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={formMode === 'add'}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required={formMode === 'add'}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Permissions</Form.Label>
          <div>
            {Object.keys(permissions).map(permission => (
              <Form.Check
                key={permission}
                type="checkbox"
                id={permission}
                name={permission}
                label={capitalize(permission.replace(/([A-Z])/g, ' $1'))}
                checked={permissions[permission]}
                onChange={handlePermissionChange}
              />
            ))}
          </div>
        </Form.Group>
        <Button variant="primary" type="submit">
          {formMode === 'edit' ? 'Update' : 'Create'}
        </Button>
        <Button variant="secondary" onClick={resetForm} className="ms-2">
          Cancel
        </Button>
      </Form>

      <Table striped bordered hover className="mt-5">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {user.permissions?.canCreate ? 'Create ' : ''}
                  {user.permissions?.canRead ? 'Read ' : ''}
                  {user.permissions?.canUpdate ? 'Update ' : ''}
                  {user.permissions?.canDelete ? 'Delete ' : ''}
                </td>
                <td>
                  <Button variant="primary" size="sm" onClick={() => handleEdit(user)}>Edit</Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(user._id)}>Delete</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No users found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default User;
