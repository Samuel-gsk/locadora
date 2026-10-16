CREATE DATABASE locadora_filmes;
USE locadora_filmes;

CREATE TABLE filmes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    genero VARCHAR(50) NOT NULL,
    duracao INT NOT NULL,
    classificacao VARCHAR(20) NOT NULL,
    ano INT NOT NULL
);

INSERT INTO filmes (titulo, genero, duracao, classificacao, ano) VALUES
('Titanic', 'Romance', 194, '12 anos', 1997),
('Vingadores: Ultimato', 'Ação', 181, '12 anos', 2019),
('Toy Story', 'Animação', 81, 'Livre', 1995),
('Coringa', 'Drama', 122, '16 anos', 2019),
('Avatar', 'Ficção Científica', 162, '12 anos', 2009);

SELECT * FROM filmes;