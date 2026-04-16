import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import auteurRoutes from './routes/auteurRoutes.js';
import livreRoutes from './routes/livreRoutes.js';
import { searchAll } from './controllers/searchController.js'; 

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('pages/accueil', { title: 'Accueil - Bibliothèque', searchTerm: '' });
});

// Route de recherche globale
app.get('/recherche', searchAll);

app.use('/auteurs', auteurRoutes);
app.use('/livres', livreRoutes);

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).render('pages/404', { title: 'Page non trouvée' });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('pages/error', { 
    title: 'Erreur serveur',
    message: err.message || 'Une erreur inattendue est survenue'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});