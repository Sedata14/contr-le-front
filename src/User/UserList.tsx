import { useEffect, useState } from 'react';
import axios from 'axios';
import type { User } from '../model/User';

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
        <div key={user.id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', width: '200px' }}>
          <img src={user.image} alt={user.firstName} style={{ width: '100%', borderRadius: '50%' }} />
          <h3>{user.firstName} {user.lastName}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
};
