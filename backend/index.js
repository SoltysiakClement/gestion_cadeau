require('dotenv').config();
const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.json());
// const cors = require('cors');
// app.use(cors());
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL server.');
});

/*ajout cadeau*/
app.post('/api/cadeaux', (req, res) => {
  
  const { listeId, nom, description, prix } = req.body;
  const prixOriginal = prix;
  
  const sql = 'INSERT INTO cadeaux (listeId, nom, description, prix, prixOriginal, reserve) VALUES (?, ?, ?, ?, ?, FALSE)';
  db.query(sql, [listeId, nom, description, prix, prixOriginal], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'ajout du cadeau:', err);
      return res.status(500).send('Erreur lors de l\'ajout du cadeau');
    }
    res.status(201).send('Cadeau ajouté avec succès');
  });
});

/*ajout*/
app.post('/api/listes', (req, res) => {
  const { nom, description, dateFin } = req.body;
  const sql = 'INSERT INTO listes (nom, description, dateFin) VALUES (?, ?, ?)';
  db.query(sql, [nom, description, dateFin], (err, result) => {
      if (err) throw err;
      res.status(201).send('Liste créée avec succès');
  });
});


/*update*/
app.put('/api/listes/:id', (req, res) => {
  const { nom, description, dateFin, enCours } = req.body;
  const sql = 'UPDATE listes SET nom = ?, description = ?, dateFin = ?, enCours = ? WHERE id = ?';
  db.query(sql, [nom, description, dateFin, enCours, req.params.id], (err, result) => {
      if (err) throw err;
      res.send('Liste mise à jour avec succès');
  });
});

/*suprr */
app.delete('/api/listes/:id', (req, res) => {
  const sql = 'DELETE FROM listes WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
      if (err) throw err;
      res.send('Liste supprimée avec succès');
  });
});

/*read*/
app.get('/api/listes', (req, res) => {
  const sql = 'SELECT * FROM listes';
  db.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result);
  });
});
/*detail*/
app.get('/api/listes/:id', (req, res) => {
  const sql = 'SELECT * FROM listes WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
      if (err) throw err;
      res.json(result[0]);
  });
});


app.get('/api/listes/enCours', (req, res) => {
  const sql = 'SELECT * FROM listes WHERE enCours = TRUE';
  db.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result);
  });
});


// modifier le prix d'un cadeau
app.put('/api/cadeaux/:id', (req, res) => {
  const { prix } = req.body;
  const sql = 'UPDATE cadeaux SET prixOriginal = prix, prix = ? WHERE id = ? AND reserve = FALSE';
  db.query(sql, [prix, req.params.id], (err, result) => {
      if (err) throw err;
      res.send('Prix du cadeau mis à jour avec succès');
  });
});


//reserver un cadeau
app.put('/api/cadeaux/reserve/:id', (req, res) => {
  const sql = 'UPDATE cadeaux SET reserve = TRUE WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
      if (err) throw err;
      res.send('Cadeau réservé avec succès');
  });
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
