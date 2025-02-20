document.addEventListener("DOMContentLoaded", function() {
    // Ottieni il parametro dell'URL per il nome utente
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("user");
  
    // Genera la chiave unica per l'utente utilizzando il nome utente
    const userKey = "user_" + email;
  
    // Recupera i dati utente da localStorage utilizzando la chiave unica
    const user = JSON.parse(localStorage.getItem(userKey));
  
    // Precompila il form con i dati dell'utente
    document.getElementById("nome").value = user.nome;
    document.getElementById("cognome").value = user.cognome;
    document.getElementById("data").value = user.dataNascita;
    document.getElementById("email").value = user.email;
    document.getElementById("password").value = user.password;
    document.getElementById("sesso").value = user.sesso;
  
    // Gestisco il salvataggio delle modifiche
    const editProfileForm = document.getElementById("editProfileForm");
    editProfileForm.addEventListener("submit", function(event) {
      event.preventDefault();

      let errors = [];

    // Validazione Nome
    if (!nome) {
        errors.push('Il campo Nome è obbligatorio.');
    }

    // Validazione Cognome
    if (!cognome) {
        errors.push('Il campo Cognome è obbligatorio.');
    }

    // Validazione Data di nascita
    if (!data) {
        errors.push('Il campo Data di nascita è obbligatorio.');
    }

    // Validazione Sesso
    if (sesso === 'Seleziona') {
        errors.push('Devi selezionare il sesso.');
    }

    // Validazione Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        errors.push('Il campo Email è obbligatorio.');
    } else if (!emailRegex.test(email)) {
        errors.push('Inserisci un indirizzo email valido.');
    } else if (localStorage.getItem(`user_${email}`)) {
      // Controllo se esiste già un utente con la stessa email nel localStorage
      errors.push('Esiste già un account con questa email.');
  }

    // Validazione Password
    if (!password) {
        errors.push('Il campo Password è obbligatorio.');
    } else if (password.length < 6) {
        errors.push('La password deve contenere almeno 6 caratteri.');
    }

    // Mostra gli errori, se presenti
    if (errors.length > 0) {
        alert(errors.join('\n'));
    } else {
        // Se tutto è valido, procedere con la logica di registrazione
        alert('Registrazione completata con successo!');
  
      // Aggiorna l'oggetto utente con i nuovi dati
      user.nome = document.getElementById("nome").value;
      user.cognome = document.getElementById("cognome").value;

      // Converte la data di nascita in formato ISO prima di salvarla
        const dobValue = document.getElementById("data").value;
        user.dataNascita = new Date(dobValue);

      user.email = document.getElementById("email").value;
      user.password = document.getElementById("password").value;
      user.sesso = document.getElementById("sesso").value;
  
      // Salva l'oggetto utente aggiornato in localStorage
      localStorage.setItem(userKey, JSON.stringify(user));
  
      // Reindirizza alla pagina del profilo
      alert("Profilo aggiornato con successo.");
      window.location.href = `profilo.html?user=${encodeURIComponent(email)}`;
      }
    });

  const cancelButton = document.getElementById("cancelButton");
  cancelButton.addEventListener("click", function() {
    // Reindirizza alla pagina del profilo senza salvare modifiche
    window.location.href = `profilo.html?user=${encodeURIComponent(email)}`;
  });
  });
  