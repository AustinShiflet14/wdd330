import { getRecipes } from "./api.js";

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const results = document.getElementById("results");

searchBtn.addEventListener("click", async () => {
    const query = searchInput.value.trim();
    if (!query) return;

    results.innerHTML = "<p>Loading recipes...</p>";
    const recipes = await getRecipes(query);

    if (recipes.length === 0) {
        results.innerHTML = "<p>No recipes found. Try something else!</p>";
        return;
    }

    results.innerHTML = "";
    recipes.forEach(recipe => {
        const card = document.createElement("div");
        card.classList.add("recipe-card");
        card.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.title}">
        <h3>${recipe.title}</h3>
        <p>${recipe.readyInMinutes} mins | Serves ${recipe.servings}</p>
        `;
        results.appendChild(card);
    });
});
