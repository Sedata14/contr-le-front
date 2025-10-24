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
    <div>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
};
