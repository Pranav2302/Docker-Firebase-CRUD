import { User } from '../types/user';
const API_URLS = {
  GET_USERS: process.env.NEXT_PUBLIC_GET_USERS_URL || 'https://getusers-eljsamlcia-uc.a.run.app',
  GET_USER_BY_ID: process.env.NEXT_PUBLIC_GET_USER_BY_ID_URL || 'https://getuserbyid-eljsamlcia-uc.a.run.app',
  CREATE_USER: process.env.NEXT_PUBLIC_CREATE_USER_URL || 'https://createuser-eljsamlcia-uc.a.run.app',
  UPDATE_USER: process.env.NEXT_PUBLIC_UPDATE_USER_URL || 'https://updateuser-eljsamlcia-uc.a.run.app',
  DELETE_USER: process.env.NEXT_PUBLIC_DELETE_USER_URL || 'https://deleteuser-eljsamlcia-uc.a.run.app',
};

export const userService = {
  async getAllUsers(): Promise<User[]> {
    const response = await fetch(API_URLS.GET_USERS);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  },

  async getUserById(id: string): Promise<User> {
    const response = await fetch(`${API_URLS.GET_USER_BY_ID}?id=${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    return response.json();
  },

  async createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const response = await fetch(API_URLS.CREATE_USER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Failed to create user');
    }
    return response.json();
  },

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    const response = await fetch(`${API_URLS.UPDATE_USER}?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Failed to update user');
    }
    return response.json();
  },

  async deleteUser(id: string): Promise<void> {
    const response = await fetch(`${API_URLS.DELETE_USER}?id=${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
  },
};