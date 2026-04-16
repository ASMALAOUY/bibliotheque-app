import { searchAllContent } from '../models/searchModel.js';

export const searchAll = async (req, res) => {
    try {
        const searchTerm = req.query.q || '';
        
        if (!searchTerm.trim()) {
            return res.render('pages/recherche', {
                title: 'Recherche',
                searchTerm: '',
                livres: [],
                auteurs: [],
                message: 'Veuillez saisir un terme de recherche'
            });
        }
        
        const result = await searchAllContent(searchTerm);
        
        const totalResults = result.livres.length + result.auteurs.length;
        
        res.render('pages/recherche', {
            title: `Résultats pour "${searchTerm}"`,
            searchTerm: searchTerm,
            livres: result.livres,
            auteurs: result.auteurs,
            totalResults: totalResults,
            message: totalResults === 0 ? 'Aucun résultat trouvé' : null
        });
    } catch (error) {
        console.error(error);
        res.status(500).render('pages/error', {
            title: 'Erreur',
            message: 'Une erreur est survenue lors de la recherche'
        });
    }
};