app.post('/crear-equipo', (req, res) => {
    const { teamName } = req.body;
    
    if (!teamName) {
        return res.status(400).send('El nombre del equipo es obligatorio.');
    }
    
    // Guardar el equipo en la base de datos
    const query = 'INSERT INTO teams (name) VALUES (?)';
    db.query(query, [teamName], (err, result) => {
        if (err) return res.status(500).send('Error al crear el equipo.');
        res.status(200).send('Equipo creado con éxito.');
    });
});
