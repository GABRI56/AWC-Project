const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(event) {
  event.preventDefault();

  // Recupera i dati dal form
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Genera la chiave unica per l'utente utilizzando il nome utente
  const userKey = "user_" + email;

  // Controlla se l'utente esiste nel localStorage
  const user = JSON.parse(localStorage.getItem(userKey));
  if (user && user.password === password) {
    localStorage.setItem("currentUser", email);       
    // Reindirizza alla pagina del profilo utente
    window.location.href = "profilo.html?user=" + encodeURIComponent(email);
  } else {
    alert("Credenziali non valide. Riprova.");
  }
});
