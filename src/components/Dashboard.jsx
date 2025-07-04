import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const email = sessionStorage.getItem('email');

  useEffect(() => {
    if (!sessionStorage.getItem('isLoggedIn')) navigate('/login');
  }, []);

  const logout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <h2>Welcome to the Dashboard</h2>
      <p>Logged in as: {email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}