import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import type { User } from '../model/User';

export const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(`https://dummyjson.com/users/${id}`);
        setUser(res.data);
      } catch {
        setError('Impossible de charger cet utilisateur.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!user) return <p>Utilisateur introuvable</p>;

  return (
    <div>
      <Link to="/">← Retour à la liste</Link>
      <h2>{user.firstName} {user.lastName}</h2>
      <img src={user.image} alt={user.firstName} style={{ width: '150px', borderRadius: '50%' }} />
      <p>Email: {user.email}</p>
      <p>Age: {user.age}</p>
      <p>Ville: {user.address?.city}</p>
      <p>Société: {user.company?.name}</p>
    </div>
  );
};
