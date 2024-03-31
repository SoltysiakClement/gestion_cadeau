document.addEventListener('submit', function(event) {
  event.preventDefault();
  const form = event.target;
  const listeId = form.getAttribute('data-liste-id');
  const formData = new FormData(form);
  
  fetch(`/ajouter-cadeau/${listeId}`, {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    console.log('Cadeau ajouté:', data);
  })
  .catch(error => console.error('Erreur:', error));
});
