function setCurrentUser(email) {
    // Imposta l'utente corrente in localStorage
    localStorage.setItem("currentUser", email);
  }
  
  function getCurrentUser() {
    return localStorage.getItem("currentUser");
  }

  function updateAuthStatus() {
    const userAuthStatus = document.getElementById("userAuthStatus");
    const currentUser = getCurrentUser();
  
    // Pulizia del contenuto precedente
    userAuthStatus.innerHTML = "";
  
    if(currentUser){
      // Genera la chiave unica per l'utente utilizzando il nome utente
      const userKey = "user_" + getCurrentUser();
    
      // Recupera i dati utente da localStorage utilizzando la chiave unica
      const user = JSON.parse(localStorage.getItem(userKey));
  
      const profileCircle = document.createElement("div");
      profileCircle.className = "rounded-circle d-flex justify-content-center align-items-center bg-transparent border border-warning text-warning "
      profileCircle.style.width = "40px";
      profileCircle.style.height = "40px";
      const profileText = document.createElement("span");
      profileText.style.fontSize = "16px";
      profileText.style.fontWeight = "bold";
      profileText.textContent = `${user.nome[0]}${user.cognome[0]}`;
      profileCircle.appendChild(profileText);
  
      
      profileCircle.addEventListener("click", function() {
        // Reindirizza alla pagina del profilo
        window.location.href = "profilo.html?user=" + encodeURIComponent(currentUser);
      });
  
      userAuthStatus.appendChild(profileCircle);
    } else {
      // Se nessun utente è loggato, visualizza il pulsante "Accedi"
      const loginButton = document.createElement("button");
      loginButton.className = "btn btn-outline-warning";
      loginButton.textContent = "Accedi";
  
      loginButton.addEventListener("click", function() {
        // Reindirizza alla pagina di login
        window.location.href = "login.html";
      });
  
      userAuthStatus.appendChild(loginButton);
    }
  }
  
  // Chiamata della funzione al caricamento della pagina
  document.addEventListener("DOMContentLoaded", updateAuthStatus);
  