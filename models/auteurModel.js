import { query } from '../config/db.js';

// Fonctions pour les auteurs
export const getAllAuteurs = () => query('SELECT * FROM auteurs ORDER BY nom, prenom');

export const getAuteurById = (id) => query('SELECT * FROM auteurs WHERE id = $1', [id]);

export const createAuteur = (data) => query(
  `INSERT INTO auteurs (nom, prenom, date_naissance, nationalite, biographie)
   VALUES ($1, $2, $3, $4, $5) RETURNING *`,
  [data.nom, data.prenom, data.date_naissance, data.nationalite, data.biographie]
);

export const updateAuteur = (id, data) => query(
  `UPDATE auteurs SET 
    nom = $1, 
    prenom = $2, 
    date_naissance = $3,
    nationalite = $4, 
    biographie = $5 
   WHERE id = $6 RETURNING *`,
  [data.nom, data.prenom, data.date_naissance, data.nationalite, data.biographie, id]
);

export const deleteAuteur = (id) => query('DELETE FROM auteurs WHERE id = $1 RETURNING *', [id]);

export const getLivresByAuteur = (id) => query(
  'SELECT * FROM livres WHERE auteur_id = $1 ORDER BY titre',
  [id]
);