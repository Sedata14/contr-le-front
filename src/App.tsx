import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserList } from './User/UserList';
import { UserDetail } from './User/UserDetail';

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/user/:id" element={<UserDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
