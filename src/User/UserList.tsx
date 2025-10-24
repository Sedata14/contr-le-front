import { useEffect, useState } from 'react';
import axios from 'axios';
import { UserCard } from './UserCard';
import type { User } from '../model/User';

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));

      try {
        const res = await axios.get('https://dummyjson.com/users');
        setUsers(res.data.users);
      } catch {
        setError("j'arrive pas à charger chef");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <p>loading...</p>;

  if (error)
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>réessayer</button>
      </div>
    );

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {users.map(user => <UserCard key={user.id} user={user} />)}
    </div>
  );
};
