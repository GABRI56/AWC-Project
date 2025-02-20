// Funzione per ottenere i parametri dell'URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const recipeId = getQueryParam('id');

// URL dell'API per ottenere i dettagli della ricetta
const apiDetailUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;

// Seleziona il container dove verranno inseriti i dettagli della ricetta
const recipeDetailsContainer = document.getElementById("recipeDetails");
const imgContainer = document.getElementById("imgContainer");

// Funzione per ottenere e visualizzare i dettagli della ricetta
function fetchAndDisplayRecipeDetails() {
    fetch(apiDetailUrl)
        .then(response => response.json())
        .then(data => {
            if (data.meals && data.meals.length > 0) {
                const recipe = data.meals[0];

                // Crea l'elemento HTML per visualizzare i dettagli della ricetta
                const recipeDetailHTML = `
                    
                        <h1>${recipe.strMeal}</h1>
                        
                        <b>Categoria:</b>
                        <span class="badge rounded-pill text-bg-warning">${recipe.strCategory}</span> <br>
                        
                        <b class="d-inline-block">Area:</b>
                        <p class="d-inline-block text-warning">${recipe.strArea}</p> <br>
                        
                        <b>Ingredienti principali:</b>
                        <ul>
                            <li>${recipe.strIngredient1}</li>
                            <li>${recipe.strIngredient2}</li>
                            <li>${recipe.strIngredient3}</li>
                            <li>${recipe.strIngredient4}</li>
                            <li>${recipe.strIngredient5}</li>
                        </ul>

                        <b>Ricetta:</b>
                        <p>${recipe.strInstructions}</p>
                   
                `;

                // Inserisce il contenuto nel container
                recipeDetailsContainer.innerHTML = recipeDetailHTML;

                 // Crea l'elemento HTML per visualizzare l'immagine della ricetta
                 const imgHTML = `
                 
                     <img src="${recipe.strMealThumb}" class="img-fluid rounded" alt="${recipe.strMeal}">
                 
             `;

             // Inserisce l'immagine nel container dedicato
             imgContainer.innerHTML = imgHTML;
            } else {
                recipeDetailsContainer.textContent = "Dettagli della ricetta non trovati.";
            }
        })
        .catch(error => console.error("Errore durante il recupero dei dettagli della ricetta:", error));
}

// Chiamata della funzione al caricamento della pagina
document.addEventListener("DOMContentLoaded", fetchAndDisplayRecipeDetails);

  // Genera la chiave unica per l'utente utilizzando il nome utente
  const userKey = "user_" + localStorage.getItem("currentUser");
    
  // Recupera i dati utente da localStorage utilizzando la chiave unica
  const currentUser = JSON.parse(localStorage.getItem(userKey));

document.addEventListener("DOMContentLoaded", function () {
    const saveBtn = document.getElementById("saveRecipeBtn");
    const noteContainer = document.getElementById("noteContainer");
    const recipeNote = document.getElementById("recipeNote");

  if(!currentUser){
    saveBtn.addEventListener("click", function () {
        window.location.href="login.html";
    })
    return;
  }
    
    // Controlla se la ricetta è già salvata
    let recipeIndex = currentUser.savedRecipes.findIndex(recipe => recipe.id === recipeId);

    if (recipeIndex !== -1) {
        // Se la ricetta è già salvata, mostra il bottone come "Salvata" e mostra la nota
        saveBtn.textContent = "Salvata";
        saveBtn.className = "btn btn-outline-warning";
        noteContainer.style.display = "block";
        recipeNote.value = currentUser.savedRecipes[recipeIndex].note;
    }

    saveBtn.addEventListener("click", function () {

    if (!currentUser) {
        window.location.href="login.html";
        return;
    }
        
        if (saveBtn.textContent === "Salvata") {
            // Se la ricetta è già salvata viene rimossa
            currentUser.savedRecipes.splice(recipeIndex, 1);
            saveBtn.textContent = "Salva";
            saveBtn.className = "btn btn-warning";
            noteContainer.style.display = "none";
            recipeNote.value = "";
            localStorage.setItem(userKey, JSON.stringify(currentUser));
            recipeIndex = -1;
        } else {
            // Aggiungi la ricetta
            saveRecipe(recipeId, recipeNote.value); //Aggiorna il ricettario nel localStorage
            const newRecipe = {     //Aggiorna il ricettario del currentUser temporaneo
                id: recipeId,   
                note: ""
            };
            currentUser.savedRecipes.push(newRecipe);
            recipeIndex = currentUser.savedRecipes.findIndex(recipe => recipe.id === recipeId);

            // Cambia il testo del bottone e mostra il campo per la nota
            saveBtn.textContent = "Salvata";
            saveBtn.className = "btn btn-outline-warning";
            noteContainer.style.display = "block";
        }

    });

    document.getElementById("confirmNoteBtn").addEventListener("click", function () {
        const note = recipeNote.value;

    let recipeFiltered = [];
      recipeFiltered = currentUser.savedRecipes.filter(ricetta => !(ricetta.id === recipeId));
      currentUser.savedRecipes = recipeFiltered;
      const newRecipe = {
        id: recipeId,
        note: note
    };
    currentUser.savedRecipes.push(newRecipe);
    localStorage.setItem(userKey, JSON.stringify(currentUser));
    alert("Nota aggiunta con successo!");
    });
});

function saveRecipe(recipeId, note = "") {
  
    if (!currentUser) {
        window.location.href="login.html";
        return;
    }
  
    // Controlla se la ricetta è già stata salvata
    const existingRecipeIndex = currentUser.savedRecipes.findIndex(recipe => recipe.id === recipeId);
  
    if (existingRecipeIndex !== -1) {
        // Aggiorna la nota se la ricetta è già salvata
        currentUser.savedRecipes[existingRecipeIndex].note = note;
    } else {
        // Aggiungi una nuova ricetta
        const newRecipe = {
            id: recipeId,
            note: note
        };
        currentUser.savedRecipes.push(newRecipe);
    }
  
    localStorage.setItem(userKey, JSON.stringify(currentUser));
  }
  
  document.getElementById("reviewForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Previene il refresh della pagina al submit

    const currentUserEmail = localStorage.getItem("currentUser");

    if (!currentUserEmail || !recipeId) {
        window.location.href="login.html";
        return;
    }

    const reviewDate = document.getElementById("reviewDate").value;
    const difficultyRating = document.querySelector('input[name="difficulty"]:checked').value;
    const tasteRating = document.querySelector('input[name="taste"]:checked').value;

    const review = {
        email: currentUserEmail,
        recipeId: recipeId,
        date: reviewDate,
        difficulty: parseInt(difficultyRating),
        taste: parseInt(tasteRating)
    };

    // Recuperare l'array delle recensioni dal localStorage
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    // Aggiungere la nuova recensione
    reviews.push(review);

    // Salvare l'array delle recensioni aggiornato nel localStorage
    localStorage.setItem("reviews", JSON.stringify(reviews));

    // Aggiorna il counter delle recensioni del currentUser
    currentUser.recensioni += 1;
    localStorage.setItem(userKey, JSON.stringify(currentUser));

    // Feedback per l'utente
    alert("Recensione salvata con successo!");

    // Reset del form
    document.getElementById("reviewForm").reset();
});

function displayReviewsForRecipe(recipeId) {
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    const filteredReviews = reviews.filter(review => review.recipeId === recipeId);
    const reviewsTableBody = document.querySelector("#reviewsTable tbody");

    // Svuota la tabella
    reviewsTableBody.innerHTML = "";

    filteredReviews.forEach(review => {
        const userKey = "user_" + review.email;
        const user = JSON.parse(localStorage.getItem(userKey));

        if (user) {
            const row = document.createElement("tr");

            const nameCell = document.createElement("td");
            nameCell.textContent = `${user.nome} ${user.cognome}`;
            nameCell.className = "text-warning";
            row.appendChild(nameCell);

            const dateCell = document.createElement("td");
            dateCell.textContent = review.date;
            row.appendChild(dateCell);

            const difficultyCell = document.createElement("td");
            difficultyCell.textContent = review.difficulty;
            row.appendChild(difficultyCell);

            const tasteCell = document.createElement("td");
            tasteCell.textContent = review.taste;
            row.appendChild(tasteCell);

            reviewsTableBody.appendChild(row);
        }
    });
}

document.addEventListener("DOMContentLoaded", displayReviewsForRecipe(recipeId));

  
  