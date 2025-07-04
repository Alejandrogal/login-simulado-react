const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Crear o conectar a base de datos
const db = new sqlite3.Database('./users.db');

// Crear tabla si no existe
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT,
  password TEXT
)`);

// Ruta para login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get(`SELECT * FROM users WHERE username = ? AND password = ?`, [username, password], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (row) return res.json({ message: 'Login exitoso', user: row });
    res.status(401).json({ message: 'Credenciales inválidas' });
  });
});

// Ruta para registrar (opcional)
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, password], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Usuario registrado con éxito' });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
