document.addEventListener("DOMContentLoaded", function() {
    // Ottieni il parametro dell'URL per il nome utente
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("user");
  
    // Genera la chiave unica per l'utente utilizzando il nome utente
    const userKey = "user_" + email;
  
    // Recupera i dati utente da localStorage utilizzando la chiave unica
    const user = JSON.parse(localStorage.getItem(userKey));

    // Visualizza i dati utente sulla pagina
    const userProfileDiv = document.getElementById("userProfile");
    const formattedDob = new Date(user.dataNascita).toISOString().split('T')[0];
    
    userProfileDiv.innerHTML = `
      <div class="rounded-circle d-flex justify-content-center align-items-center bg-transparent border border-warning text-warning " style="width: 100px; height: 100px;">
      <span style="font-size: 40px; font-weight: bold;">${user.nome[0]}${user.cognome[0]}</span>
      </div>
      <h2>Benvenuto ${user.nome} ${user.cognome}!</h2>
      <p><strong>Data di nascita:</strong> ${formattedDob}</p>
      <p><strong>Sesso:</strong> ${user.sesso}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Ricette salvate:</strong> ${user.savedRecipes.length}</p>
      <p><strong>Recensioni effettuate:</strong> ${user.recensioni}</p>
    `;

  const editProfileButton = document.getElementById("editProfile");
  editProfileButton.addEventListener("click", function() {
    window.location.href = `editProfile.html?user=${encodeURIComponent(email)}`;
  });

  const deleteProfileButton = document.getElementById("deleteProfile");
  deleteProfileButton.addEventListener("click", function() {
    if (confirm("Sei sicuro di voler eliminare il tuo profilo?")) {
      localStorage.removeItem(userKey);
      if (localStorage.getItem("currentUser") === email) {
      localStorage.removeItem("currentUser");
      }
      const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
      const updatedReviews = reviews.filter(review => review.email !== email);
      localStorage.setItem("reviews", JSON.stringify(updatedReviews));
      alert("Profilo eliminato con successo.");
      window.location.href = "login.html";
    }
  });

  const logoutButton = document.getElementById("logout");
  logoutButton.addEventListener("click", function() {
    // Rimuove l'utente corrente dal localStorage
  localStorage.removeItem("currentUser");

  // Reindirizza o aggiorna la UI
  window.location.href = "index.html";
  })
  });
  