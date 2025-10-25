import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { UserCard } from './UserCard';
import type { User } from '../model/User';

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('name');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState<number[]>(() => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  });
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const toggleFavorite = (userId: number) => {
    setFavorites(prev => {
      const isFav = prev.includes(userId);
      const updated = isFav ? prev.filter(id => id !== userId) : [...prev, userId];
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
        setError('jarrive pas à charger les utilisateurs.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users
      .filter(u =>
        u.firstName.toLowerCase().includes(search.toLowerCase()) ||
        u.lastName.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => sort === 'name' ? a.firstName.localeCompare(b.firstName) : a.age - b.age);
  }, [users, search, sort]);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

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
        onChange={e => setSort(e.target.value)}
        style={{ padding: '0.5rem', marginBottom: '1rem', display: 'block' }}
      >
        <option value="name">Trier par nom</option>
        <option value="age">Trier par âge</option>
      </select>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {currentUsers.map(user => (
          <UserCard
            key={user.id}
            user={user}
            isFavorite={favorites.includes(user.id)}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>
      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        >
          Précédent
        </button>
        <span>{currentPage} / {totalPages}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        >
          Suivant
        </button>
      </div>
    </div>
  );
};
