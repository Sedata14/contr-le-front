import { useState } from 'react';
import { UserList } from './User/UserList';

export const App = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={theme} style={{ padding: '1rem', minHeight: '100vh' }}>
      <button 
        onClick={toggleTheme} 
        style={{
          marginBottom: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: theme === 'light' ? '#222' : '#fdfdfd',
          color: theme === 'light' ? '#fdfdfd' : '#222',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Switch to {theme === 'light' ? 'dark' : 'light'} mode
      </button>
      <UserList />
      <style>{`
        .light {
          background-color: #fdfdfd;
          color: #222;
        }
        .dark {
          background-color: #222;
          color: #fdfdfd;
        }
      `}</style>
    </div>
  );
};

export default App;
