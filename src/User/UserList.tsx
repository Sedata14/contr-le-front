import { useEffect, useState } from 'react';
import axios from 'axios';
import { UserCard } from './UserCard';
import type { User } from '../model/User';

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('name'); // 'name' ou 'age'
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const usersPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('https://dummyjson.com/users');
        setUsers(res.data.users);
      } catch {
        setError('jarrive pas à charger les utilisateurs.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <p style={{ textAlign: 'center' }}>Ouais, ça charge...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;

  const filteredUsers = users
    .filter(
      u =>
        u.firstName.toLowerCase().includes(search.toLowerCase()) ||
        u.lastName.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === 'name') return a.firstName.localeCompare(b.firstName);
      return a.age - b.age;
    });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (page - 1) * usersPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  return (
    <div style={{ padding: '1rem' }}>
      <input
        type="text"
        placeholder="Recherchez un utilisateur.."
        value={search}
        onChange={e => { setSearch(e.target.value); setPage(1); }}
        style={{ padding: '0.5rem', marginBottom: '1rem', width: '100%' }}
      />
      <select
        value={sort}
        onChange={e => setSort(e.target.value)}
        style={{ padding: '0.5rem', marginBottom: '1rem', display: 'block' }}
      >
        <option value="name">Trier par nom</option>
        <option value="age">Trier par âge</option>
      </select>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {paginatedUsers.map(user => <UserCard key={user.id} user={user} />)}
      </div>

      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
          style={{ marginRight: '0.5rem' }}
        >
          ← Précédent
        </button>
        <span>Page {page} / {totalPages}</span>
        <button
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          style={{ marginLeft: '0.5rem' }}
        >
          Suivant →
        </button>
      </div>
    </div>
  );
};
