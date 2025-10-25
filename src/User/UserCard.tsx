import { Link } from 'react-router-dom';
import type { User } from '../model/User';

interface Props {
  user: User;
  isFavorite: boolean;
  toggleFavorite: (id: number) => void;
}

export const UserCard = ({ user, isFavorite, toggleFavorite }: Props) => {
  return (
    <Link to={`/user/${user.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', width: '200px', position: 'relative' }}>
        <img src={user.image} alt={user.firstName} style={{ width: '100%', borderRadius: '50%' }} />
        <h3>{user.firstName} {user.lastName}</h3>
        <p>{user.email}</p>
        <button
          onClick={e => { e.preventDefault(); toggleFavorite(user.id); }}
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.2rem',
            color: isFavorite ? 'gold' : '#ccc'
          }}
        >
          ★
        </button>
      </div>
    </Link>
  );
};
