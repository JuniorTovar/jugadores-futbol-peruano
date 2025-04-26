const express = require('express');
const mysql = require('mysql2');

// Crea una instancia de Express
const app = express();

// Configura Express para que reciba datos en formato JSON
app.use(express.json());

// Conecta a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root', // Si tienes contraseña, ponla aquí
  database: 'futbol_peruano', // Cambia esto por el nombre de tu base de datos
});

// Verifica la conexión a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    // ¡Importante! No inicies el servidor si no hay conexión a la base de datos.
    // En un escenario real, podrías querer un manejo de errores más sofisticado aquí.
    return;
  }
  console.log('Conexión a la base de datos establecida correctamente.');

  // Ahora, *dentro* del callback de conexión exitosa, definimos las rutas e iniciamos el servidor.

  // Ruta para registrar jugadores (POST)
  app.post('/jugadores', (req, res) => {
    const { name, age, position } = req.body;
    const query = 'INSERT INTO players (name, age, position) VALUES (?, ?, ?)';
    connection.query(query, [name, age, position], (err, result) => {
      if (err) {
        console.error('Error al insertar jugador:', err);
        res.status(500).json({ error: 'Error al insertar jugador', details: err.message }); // Devuelve JSON con más detalles
        return;
      }
      res.status(201).json({ message: 'Jugador registrado', id: result.insertId }); // Devuelve JSON con el ID insertado
    });
  });

  // Ruta para obtener jugadores (GET)
  app.get('/jugadores', (req, res) => {
    const query = 'SELECT * FROM players';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error al obtener jugadores:', err);
        res.status(500).json({ error: 'Error al obtener jugadores', details: err.message }); // Devuelve JSON con detalles
        return;
      }
      res.status(200).json(results); // Devuelve los jugadores en formato JSON
    });
  });

  // Ruta de inicio (para verificar que el servidor está funcionando)
  app.get('/', (req, res) => {
    res.send('¡Hola Mundo! El servidor está funcionando correctamente.');
  });

  // Inicia el servidor en el puerto 3000
  app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
  });
});
