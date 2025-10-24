import { Link } from 'react-router-dom';
import type { User } from '../model/User';

interface Props {
  user: User;
}

export const UserCard = ({ user }: Props) => {
  return (
    <Link to={`/user/${user.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', width: '200px' }}>
        <img src={user.image} alt={user.firstName} style={{ width: '100%', borderRadius: '50%' }} />
        <h3>{user.firstName} {user.lastName}</h3>
        <p>{user.email}</p>
      </div>
    </Link>
  );
};
