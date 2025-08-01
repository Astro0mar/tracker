fetch('cfps.json')
  .then(response => response.json())
  .then(data => {
    const list = document.getElementById('cfp-list');

    data.forEach(cfp => {
      const card = document.createElement('div');
      card.className = 'cfp-card';

      card.innerHTML = `
        <h2>${cfp.conference} (${cfp.acronym})</h2>
        <p><strong>Deadline:</strong> ${new Date(cfp.deadline).toLocaleDateString()}</p>
        <p><strong>Location:</strong> ${cfp.location}</p>
        <p><strong>Topics:</strong> ${cfp.topics.join(', ')}</p>
        <p><a href="${cfp.website}" target="_blank">🔗 Visit Website</a></p>
      `;

      list.appendChild(card);
    });
  });
