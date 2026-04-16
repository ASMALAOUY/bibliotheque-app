import { getAllAuteurs, getAuteurById, createAuteur, updateAuteur, deleteAuteur, getLivresByAuteur } from '../models/auteurModel.js';

export const auteurController = {
  liste: async (req, res) => {
    try {
      const { rows } = await getAllAuteurs();
      res.render('pages/auteurs/liste', { 
        title: 'Liste des auteurs', 
        auteurs: rows 
      });
    } catch (error) {
      console.error(error);
      res.status(500).render('pages/error', { 
        title: 'Erreur', 
        message: 'Impossible de récupérer la liste des auteurs' 
      });
    }
  },

  ajouterForm: (req, res) => {
    res.render('pages/auteurs/ajouter', { 
      title: 'Ajouter un auteur', 
      auteur: {} 
    });
  },

  ajouter: async (req, res) => {
    try {
      await createAuteur(req.body);
      res.redirect('/auteurs');
    } catch (error) {
      console.error(error);
      res.status(500).render('pages/error', { 
        title: 'Erreur', 
        message: 'Impossible d\'ajouter l\'auteur' 
      });
    }
  },

  details: async (req, res) => {
    try {
      const { rows: auteurs } = await getAuteurById(req.params.id);
      if (!auteurs[0]) {
        return res.status(404).render('pages/404', { title: 'Auteur non trouvé' });
      }
      const { rows: livres } = await getLivresByAuteur(req.params.id);
      res.render('pages/auteurs/details', { 
        title: `${auteurs[0].prenom} ${auteurs[0].nom}`,
        auteur: auteurs[0], 
        livres 
      });
    } catch (error) {
      console.error(error);
      res.status(500).render('pages/error', { 
        title: 'Erreur', 
        message: 'Impossible de récupérer les détails de l\'auteur' 
      });
    }
  },

  modifierForm: async (req, res) => {
    try {
      const { rows } = await getAuteurById(req.params.id);
      if (!rows[0]) {
        return res.status(404).render('pages/404', { title: 'Auteur non trouvé' });
      }
      res.render('pages/auteurs/modifier', { 
        title: 'Modifier un auteur', 
        auteur: rows[0] 
      });
    } catch (error) {
      console.error(error);
      res.status(500).render('pages/error', { 
        title: 'Erreur', 
        message: 'Impossible de récupérer l\'auteur' 
      });
    }
  },

  modifier: async (req, res) => {
    try {
      await updateAuteur(req.params.id, req.body);
      res.redirect(`/auteurs/${req.params.id}`);
    } catch (error) {
      console.error(error);
      res.status(500).render('pages/error', { 
        title: 'Erreur', 
        message: 'Impossible de modifier l\'auteur' 
      });
    }
  },

  supprimer: async (req, res) => {
    try {
      await deleteAuteur(req.params.id);
      res.redirect('/auteurs');
    } catch (error) {
      console.error(error);
      res.status(500).render('pages/error', { 
        title: 'Erreur', 
        message: 'Impossible de supprimer l\'auteur' 
      });
    }
  }
};