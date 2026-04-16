import { query } from '../config/db.js';

export const searchAllContent = async (term) => {
    const searchPattern = `%${term}%`;
    
    // Recherche dans les livres
    const livresResult = await query(
        `SELECT 
            l.id, 
            l.titre, 
            l.annee_publication, 
            l.genre,
            l.disponible,
            a.nom AS auteur_nom, 
            a.prenom AS auteur_prenom,
            'livre' AS type
         FROM livres l 
         JOIN auteurs a ON l.auteur_id = a.id
         WHERE l.titre ILIKE $1 
            OR a.nom ILIKE $1 
            OR a.prenom ILIKE $1 
            OR l.genre ILIKE $1
         ORDER BY 
            CASE 
                WHEN l.titre ILIKE $1 THEN 1
                WHEN a.nom ILIKE $1 THEN 2
                ELSE 3
            END
         LIMIT 20`,
        [searchPattern]
    );
    
    // Recherche dans les auteurs
    const auteursResult = await query(
        `SELECT 
            id, 
            nom, 
            prenom, 
            nationalite,
            date_naissance,
            'auteur' AS type
         FROM auteurs 
         WHERE nom ILIKE $1 
            OR prenom ILIKE $1 
            OR nationalite ILIKE $1
         ORDER BY 
            CASE 
                WHEN nom ILIKE $1 THEN 1
                WHEN prenom ILIKE $1 THEN 2
                ELSE 3
            END
         LIMIT 10`,
        [searchPattern]
    );
    
    return {
        livres: livresResult.rows,
        auteurs: auteursResult.rows
    };
};