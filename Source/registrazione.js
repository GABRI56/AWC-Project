document.addEventListener("DOMContentLoaded", function () {
const registrationForm = document.getElementById("registrationForm");

registrationForm.addEventListener("submit", function(event) {
  event.preventDefault();

  // Recupera i dati dal form
  const nome = document.getElementById("nome").value;
  const cognome = document.getElementById("cognome").value;
  const data = document.getElementById("data").value;
  const sesso  = document.getElementById("sesso").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("password2").value;

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

    // Validazione Conferma Password
    if (password !== confirmPassword) {
        errors.push('Le password non corrispondono.');
    }

    // Mostra gli errori, se presenti
    if (errors.length > 0) {
        alert(errors.join('\n'));
    } else {
        // Se tutto è valido, puoi procedere con la logica di registrazione
        alert('Registrazione completata con successo!');
  
  // Crea un oggetto utente
  const user = {
    nome: nome,
    cognome: cognome,
    dataNascita: new Date(data),
    sesso: sesso,
    email: email,
    password: password,
    savedRecipes: [],
    recensioni: 0
  };

  // Salva l'oggetto utente in localStorage
  localStorage.setItem("user_"+email, JSON.stringify(user));

  localStorage.setItem("currentUser", email);

  // Reindirizza alla pagina del profilo utente
  window.location.href = "profilo.html?user=" + encodeURIComponent(email);

  }

});
});