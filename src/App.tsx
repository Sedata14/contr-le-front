import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserList } from './User/UserList';
import { UserDetail } from './User/UserDetail';

export const App = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <BrowserRouter>
      <div className={theme} style={{ padding: '1rem', minHeight: '100vh' }}>
        <button 
          onClick={toggleTheme} 
          style={{ marginBottom: '1rem', padding: '0.5rem 1rem' }}
        >
          Switch to {theme === 'light' ? 'dark' : 'light'} mode
        </button>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/user/:id" element={<UserDetail />} />
        </Routes>
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
    </BrowserRouter>
  );
};

export default App;
