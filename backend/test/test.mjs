import supertest from 'supertest';
import { expect } from 'chai';
import app from '../index.js';

describe('API Tests', function() {
  let createdListeId;
  let createdCadeauId;

  // Test pour ajouter une liste
  it('POST /api/listes - create list', function(done) {
    supertest(app)
      .post('/api/listes')
      .send({ nom: 'Anniversaire', description: 'Liste pour l\'anniversaire', dateFin: '2024-12-31' })
      .expect(201)
      .end((err, res) => {
        expect(res.body).to.include({ message: 'Liste créée avec succès' });
        createdListeId = res.body.id; // Stockez l'ID pour l'utiliser dans d'autres tests
        done();
      });
  });

  // Test pour lire toutes les listes
  it('GET /api/listes - get all lists', function(done) {
    supertest(app)
      .get('/api/listes')
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        done();
      });
  });

  // Test pour mettre à jour une liste
  it('PUT /api/listes/:id - update list', function(done) {
    supertest(app)
      .put(`/api/listes/${createdListeId}`)
      .send({ nom: 'Anniversaire Modifié', description: 'Liste modifiée', dateFin: '2024-12-31', enCours: true })
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.include({ message: 'Liste mise à jour avec succès' });
        done();
      });
  });

  // Test pour supprimer une liste
  it('DELETE /api/listes/:id - delete list', function(done) {
    supertest(app)
      .delete(`/api/listes/${createdListeId}`)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.include({ message: 'Liste supprimée avec succès' });
        done();
      });
  });

});
