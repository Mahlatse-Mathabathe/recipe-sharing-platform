function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

let recipes = JSON.parse(getCookie("recipes") || "[]");

document.getElementById("recipe-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const recipeName = document.getElementById("recipe-name").value;
  const ingredients = document.getElementById("ingredients").value;
  const instructions = document.getElementById("instructions").value;
  const imageUrl = document.getElementById("image-url").value;

  const recipe = {
    name: recipeName,
    ingredients: ingredients.split(",").map((item) => item.trim()),
    instructions: instructions,
    image: imageUrl,
  };

  recipes.push(recipe);
  setCookie("recipes", JSON.stringify(recipes), 365);

  document.getElementById("recipe-form").reset();

  displayRecipes();
});

function displayRecipes() {
  const recipeList = document.getElementById("recipe-list");
  recipeList.innerHTML = "";

  recipes.forEach((recipe, index) => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");

    recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}">
            <h3>${recipe.name}</h3>
            <p><strong>Ingredients:</strong> ${recipe.ingredients.join(
              ", "
            )}</p>
            <p><strong>Instructions:</strong> ${recipe.instructions}</p>
        `;

    recipeList.appendChild(recipeCard);
  });
}

// Display recipes on page load
document.addEventListener("DOMContentLoaded", displayRecipes);
