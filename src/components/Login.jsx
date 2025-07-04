import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', {
        username: form.email,
        password: form.password,
      });

      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('email', response.data.user.username);
      navigate('/dashboard');
    } catch (error) {
      alert('Credenciales inválidas');
    }
  };

  return (
    <div className="form-container">
      <div className="image-box">
        <FaUserCircle size={64} color="#4f46e5" />
      </div>
      <h2 style={{ textAlign: 'center' }}>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" onChange={handleChange} placeholder="Correo electrónico" required />
        <input name="password" type="password" onChange={handleChange} placeholder="Contraseña" required />
        <button type="submit">Entrar</button>
      </form>
      <p style={{ textAlign: 'center' }}>
        ¿No tienes cuenta?{' '}
        <button onClick={() => navigate('/register')} className="link-button">
          Regístrate
        </button>
      </p>
    </div>
  );
}
