// UserCard.tsx
import { Link } from 'react-router-dom';
import type { User } from '../model/User';

interface Props {
  user: User;
  isFavorite?: boolean;
  toggleFavorite?: (id: number) => void;
}

export const UserCard = ({ user, isFavorite, toggleFavorite }: Props) => {
  return (
    <Link to={`/user/${user.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="user-card">
        <img src={user.image} alt={user.firstName} />
        <h3>{user.firstName} {user.lastName}</h3>
        <p>{user.email}</p>
        {toggleFavorite && isFavorite !== undefined && (
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(user.id);
            }}
          >
            {isFavorite ? '★' : '☆'}
          </button>
        )}
      </div>
      <style>{`
        .user-card {
          border: 1px solid #ccc;
          padding: 1rem;
          border-radius: 8px;
          width: 200px;
          transition: transform 0.2s, box-shadow 0.2s, opacity 0.5s;
          opacity: 0;
          animation: fadeIn 0.5s forwards;
        }
        .user-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        .user-card img {
          width: 100%;
          border-radius: 50%;
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
        button {
          margin-top: 0.5rem;
          background: none;
          border: none;
          font-size: 1.2rem;
          cursor: pointer;
        }
      `}</style>
    </Link>
  );
};
