import { getAllLivres, getLivreById, createLivre, updateLivre, deleteLivre, searchLivres } from '../models/livreModel.js';
import { getAllAuteurs } from '../models/auteurModel.js';

export const livreController = {
  liste: async (req, res) => {
    try {
      const { rows } = await getAllLivres();
      res.render('pages/livres/liste', { 
        title: 'Liste des livres', 
        livres: rows, 
        searchTerm: req.query.q || '' 
      });
    } catch (error) {
      console.error(error);
      res.status(500).render('pages/error', { 
        title: 'Erreur', 
        message: 'Impossible de récupérer la liste des livres' 
      });
    }
  },

  rechercher: async (req, res) => {
    try {
      const { rows } = await searchLivres(req.query.q || '');
      res.render('pages/livres/liste', { 
        title: 'Résultats de recherche', 
        livres: rows, 
        searchTerm: req.query.q 
      });
    } catch (error) {
      console.error(error);
      res.status(500).render('pages/error', { 
        title: 'Erreur', 
        message: 'Impossible d\'effectuer la recherche' 
      });
    }
  },

  ajouterForm: async (req, res) => {
    try {
      const { rows: auteurs } = await getAllAuteurs();
      res.render('pages/livres/ajouter', { 
        title: 'Ajouter un livre', 
        livre: {}, 
        auteurs 
      });
    } catch (error) {
      console.error(error);
      res.status(500).render('pages/error', { 
        title: 'Erreur', 
        message: 'Impossible de charger le formulaire' 
      });
    }
  },

  ajouter: async (req, res) => {
    try {
      const data = { 
        ...req.body, 
        disponible: req.body.disponible === 'on' 
      };
      await createLivre(data);
      res.redirect('/livres');
    } catch (error) {
      console.error(error);
      res.status(500).render('pages/error', { 
        title: 'Erreur', 
        message: 'Impossible d\'ajouter le livre' 
      });
    }
  },

  details: async (req, res) => {
    try {
      const { rows } = await getLivreById(req.params.id);
      if (!rows[0]) {
        return res.status(404).render('pages/404', { title: 'Livre non trouvé' });
      }
      res.render('pages/livres/details', { 
        title: rows[0].titre, 
        livre: rows[0] 
      });
    } catch (error) {
      console.error(error);
      res.status(500).render('pages/error', { 
        title: 'Erreur', 
        message: 'Impossible de récupérer les détails du livre' 
      });
    }
  },

  modifierForm: async (req, res) => {
    try {
      const { rows: livres } = await getLivreById(req.params.id);
      const { rows: auteurs } = await getAllAuteurs();
      if (!livres[0]) {
        return res.status(404).render('pages/404', { title: 'Livre non trouvé' });
      }
      res.render('pages/livres/modifier', { 
        title: 'Modifier un livre', 
        livre: livres[0], 
        auteurs 
      });
    } catch (error) {
      console.error(error);
      res.status(500).render('pages/error', { 
        title: 'Erreur', 
        message: 'Impossible de charger le formulaire' 
      });
    }
  },

  modifier: async (req, res) => {
    try {
      const data = { 
        ...req.body, 
        disponible: req.body.disponible === 'on' 
      };
      await updateLivre(req.params.id, data);
      res.redirect(`/livres/${req.params.id}`);
    } catch (error) {
      console.error(error);
      res.status(500).render('pages/error', { 
        title: 'Erreur', 
        message: 'Impossible de modifier le livre' 
      });
    }
  },

  supprimer: async (req, res) => {
    try {
      await deleteLivre(req.params.id);
      res.redirect('/livres');
    } catch (error) {
      console.error(error);
      res.status(500).render('pages/error', { 
        title: 'Erreur', 
        message: 'Impossible de supprimer le livre' 
      });
    }
  }
};