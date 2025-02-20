function generateRecipeCardElement(recipe) {
    const card = document.createElement('div');
    card.className = "card text-start h-110";
    card.style =  "width: 18rem;"

    const cardImg = document.createElement("img");
    cardImg.className = "card-img-top";
    cardImg.src = recipe.strMealThumb;
    cardImg.alt = recipe.strMeal;
    card.appendChild(cardImg);

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    card.appendChild(cardBody);

    const title = document.createElement("h5");
    title.className = "card-title";
    title.textContent = recipe.strMeal;
    cardBody.appendChild(title);

    const description = document.createElement("p");
    description.className = "card-text";
    description.textContent = recipe.strInstructions.substring(0, 100) + "...";
    cardBody.appendChild(description);

    const categoryElement = document.createElement("ul");
    categoryElement.className = "list-group list-group-flush";
    card.appendChild(categoryElement);

    const categoryItem = document.createElement("li");
    categoryItem.className = "list-group-item";
    categoryElement.appendChild(categoryItem);

    const categoryLabel = document.createElement("b");
    categoryLabel.textContent = "Categoria:";
    categoryItem.appendChild(categoryLabel);

    const categoryValue = document.createTextNode(" " + recipe.strCategory);
    categoryItem.appendChild(categoryValue);

    const ingredientElement = document.createElement("ul");
    ingredientElement.className = "list-group list-group-flush";
    card.appendChild(ingredientElement);

    const ingredientItem = document.createElement("li");
    ingredientItem.className = "list-group-item";
    ingredientElement.appendChild(ingredientItem);

    const ingredientLabel = document.createElement("b");
    ingredientLabel.textContent = "Ingredienti:";
    ingredientItem.appendChild(ingredientLabel);

    const ingValue = document.createTextNode(" " + recipe.strIngredient1 + ", " + recipe.strIngredient2 + "...");
    ingredientItem.appendChild(ingValue);

    const cardBody2 = document.createElement("div");
    cardBody2.className = "card-footer bg-transparent";
    card.appendChild(cardBody2);

    const innerDiv = document.createElement("div");
    innerDiv.className = "d-flex justify-content-between align-items-center";
    cardBody2.appendChild(innerDiv);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn btn-outline-warning";
    button.textContent = "Dettagli";
    button.addEventListener("click", function() {
      window.location.href = `dettagli.html?id=${recipe.idMeal}`;
    });
    innerDiv.appendChild(button);

    const save = document.createElement("i");
    if (isRecipeSaved(recipe.idMeal)) {
      save.className = "bi bi-bookmark-fill";
    } else {
      save.className = "bi bi-bookmark";
    }
    save.style.fontSize = "25px"; 
    save.style.color = "#ffc107"; 
    innerDiv.appendChild(save);

    save.addEventListener("click", function(){
      // Genera la chiave unica per l'utente utilizzando il nome utente
      const userKey = "user_" + getCurrentUser();
        
      // Recupera i dati utente da localStorage utilizzando la chiave unica
      const currentUser = JSON.parse(localStorage.getItem(userKey));

     if (!currentUser) {
      window.location.href="login.html";
          return;
      }

      if (isRecipeSaved(recipe.idMeal)) {
      let recipeFiltered = [];
      recipeFiltered = currentUser.savedRecipes.filter(ricetta => !(ricetta.id === recipe.idMeal));
      currentUser.savedRecipes = recipeFiltered;
      localStorage.setItem(userKey, JSON.stringify(currentUser));

      save.className = "bi bi-bookmark";
      } else {
      saveRecipe(recipe.idMeal, note = "");
      save.className = "bi bi-bookmark-fill";
      }
    });

    return card;
  }

  function setCurrentUser(email) {
    // Imposta l'utente corrente in localStorage
    localStorage.setItem("currentUser", email);
  }
  
  function getCurrentUser() {
    return localStorage.getItem("currentUser");
  }

function saveRecipe(recipeId, note = "") {
  
  // Genera la chiave unica per l'utente utilizzando il nome utente
  const userKey = "user_" + getCurrentUser();
    
  // Recupera i dati utente da localStorage utilizzando la chiave unica
  const currentUser = JSON.parse(localStorage.getItem(userKey));

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

function isRecipeSaved(recipeId) {
  // Genera la chiave unica per l'utente utilizzando il nome utente
  const userKey = "user_" + getCurrentUser();
      
  // Recupera i dati utente da localStorage utilizzando la chiave unica
  const currentUser = JSON.parse(localStorage.getItem(userKey));

  if (!currentUser) {
      console.error("Utente non trovato.");
      return false;
  }

  // Controlla se la ricetta è già salvata nell'array savedRecipes dell'utente corrente
  const recipeIndex = currentUser.savedRecipes.findIndex(recipe => recipe.id === recipeId);

  return recipeIndex !== -1;
}





