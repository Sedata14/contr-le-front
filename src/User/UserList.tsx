import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { UserCard } from './UserCard';
import type { User } from '../model/User';

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'name' | 'age'>('name');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState<number[]>(() => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  });

  const toggleFavorite = (userId: number) => {
    setFavorites(prev => {
      const updated = prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId];
      localStorage.setItem('favorites', JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('https://dummyjson.com/users');
        setUsers(res.data.users);
      } catch {
        setError("Impossible de charger les utilisateurs.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredAndSortedUsers = useMemo(() => {
    return users
      .filter(u =>
        u.firstName.toLowerCase().includes(search.toLowerCase()) ||
        u.lastName.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => sort === 'name' ? a.firstName.localeCompare(b.firstName) : a.age - b.age);
  }, [users, search, sort]);

  const usersPerPage = 10;
  const totalPages = Math.ceil(filteredAndSortedUsers.length / usersPerPage);
  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * usersPerPage;
    return filteredAndSortedUsers.slice(start, start + usersPerPage);
  }, [filteredAndSortedUsers, page]);

  if (loading) return <p style={{ textAlign: 'center' }}>Ouais, ça charge...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <input
        type="text"
        placeholder="Recherchez un utilisateur.."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ padding: '0.5rem', marginBottom: '1rem', width: '100%' }}
      />
      <select
        value={sort}
        onChange={e => setSort(e.target.value as 'name' | 'age')}
        style={{ padding: '0.5rem', marginBottom: '1rem', display: 'block' }}
      >
        <option value="name">Trier par nom</option>
        <option value="age">Trier par âge</option>
      </select>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {paginatedUsers.map(user => (
          <UserCard
            key={user.id}
            user={user}
            isFavorite={favorites.includes(user.id)}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>
      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            style={{
              padding: '0.3rem 0.6rem',
              backgroundColor: i + 1 === page ? '#09f' : '#eee',
              color: i + 1 === page ? '#fff' : '#000',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
