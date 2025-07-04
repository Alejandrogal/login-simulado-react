import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
await axios.post('http://localhost:3001/register', {
  username: form.email, // o form.username, según uses
  password: form.password,
});
      alert('¡Registro exitoso!');
      navigate('/login');
    } catch (error) {
      alert('Error al registrar: ' + (error.response?.data?.error || 'Servidor no disponible'));
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" onChange={handleChange} placeholder="Username" required />
        <input name="email" type="email" onChange={handleChange} placeholder="Email" required />
        <input name="password" type="password" onChange={handleChange} placeholder="Password" required />
        <input name="confirmPassword" type="password" onChange={handleChange} placeholder="Confirm Password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
