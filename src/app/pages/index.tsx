"use client";

import { useState, useEffect } from 'react';
import { User } from '../types/user';
import { userService } from '../services/userService';
import { UserForm } from '../components/userForm';
import { UserTable } from '../components/userTable';
import { Button } from '../../components/ui/button';
import { Alert, AlertDescription } from '../../components/ui/alert';

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  const showAlert = (type: 'success' | 'error' | 'info', message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const fetchedUsers = await userService.getAllUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      showAlert('error', 'Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateUser = async (userData: Omit<User, 'id' | 'createdAt'>) => {
    try {
      setIsSubmitting(true);
      await userService.createUser(userData);
      setShowForm(false);
      fetchUsers();
      showAlert('success', 'User created successfully!');
    } catch (error) {
      console.error('Error creating user:', error);
      showAlert('error', 'Failed to create user');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateUser = async (userData: Omit<User, 'id' | 'createdAt'>) => {
    if (!editingUser?.id) return;
    
    try {
      setIsSubmitting(true);
      await userService.updateUser(editingUser.id, userData);
      setEditingUser(null);
      setShowForm(false);
      fetchUsers();
      showAlert('success', 'User updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
      showAlert('error', 'Failed to update user');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    
    try {
      await userService.deleteUser(id);
      fetchUsers();
      showAlert('success', 'User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
      showAlert('error', 'Failed to delete user');
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                User Management Dashboard
              </h1>
              <p className="text-gray-600 text-lg">
                Manage your users with full CRUD operations
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{users.length}</div>
                <div className="text-sm text-gray-500">Total Users</div>
              </div>
            </div>
          </div>
        </div>

        {/* Alert */}
        {alert && (
          <div className="mb-6">
            <Alert variant={alert.type === 'error' ? 'destructive' : 'default'}>
              <AlertDescription>
                {alert.message}
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Form Section */}
        {showForm ? (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                {editingUser ? 'Edit User' : 'Create New User'}
              </h2>
            </div>
            <UserForm
              user={editingUser || undefined}
              onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
              onCancel={handleCancelForm}
              isLoading={isSubmitting}
            />
          </div>
        ) : (
          <div className="mb-8">
            <Button
              onClick={() => setShowForm(true)}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New User
            </Button>
          </div>
        )}

        {/* Table Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">
              Users Directory
            </h2>
            {!isLoading && users.length > 0 && (
              <div className="text-sm text-gray-500">
                Showing {users.length} user{users.length !== 1 ? 's' : ''}
              </div>
            )}
          </div>
          
          <UserTable
            users={users}
            onEdit={handleEdit}
            onDelete={handleDeleteUser}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}