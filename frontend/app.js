const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public')); 
app.use(express.urlencoded({ extended: true }));
app.get('/', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3000/api/listes');
    const listes = response.data;
    res.render('pages/index', { listes });
  } catch (error) {
    console.error(error);
    res.send('Une erreur est survenue');
  }
});

app.post('/creer-liste', async (req, res) => {
  try {
    await axios.post('http://localhost:3000/api/listes', req.body);
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.send('Erreur lors de la création de la liste');
  }
});



app.post('/ajouter-cadeau/:listeId', async (req, res) => {
  const { listeId } = req.params;
  const { nom, description, prix } = req.body;

  // Le prix original est défini comme étant le prix au moment de l'ajout du cadeau pour le moment
  const prixOriginal = prix;

  try {
    await axios.post(`http://localhost:3000/api/cadeaux`, {
      listeId, 
      nom, 
      description,
      prix, 
      prixOriginal
    });
    res.redirect('/');
  } catch (error) {
    console.error('Erreur lors de l\'ajout du cadeau:', error);
    res.send('Erreur lors de l\'ajout du cadeau');
  }
});



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Frontend server running on port ${PORT}`);
});
