import { useEffect, useState } from 'react';
import axios from 'axios';
import type { User } from '../model/User';
import { UserCard } from './UserCard';

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get('https://dummyjson.com/users');
      setUsers(res.data.users);
    };
    fetchUsers();
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};
