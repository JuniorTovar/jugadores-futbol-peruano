-- Tabla de equipos
CREATE TABLE teams (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

-- Tabla de jugadores
CREATE TABLE players (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  age INT CHECK (age >= 15 AND age <= 50),
  position VARCHAR(50) NOT NULL
);

-- Tabla de asignaciones jugador-equipo
CREATE TABLE assignments (
  id SERIAL PRIMARY KEY,
  player_id INT NOT NULL,
  team_id INT NOT NULL,
  UNIQUE(player_id, team_id),
  FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
);
