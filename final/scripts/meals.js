import { getRecipes } from "./api.js";
import { searchFood, getFoodDetails } from "./api2.js";

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const results = document.getElementById("results");

const favoriteKey = 'favoriteRecipes';
let favorites = JSON.parse(localStorage.getItem(favoriteKey)) || [];

function saveFavorites() {
    localStorage.setItem(favoriteKey, JSON.stringify(favorites));
}

searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { 
        searchBtn.click();
    }
});

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
        card.dataset.recipeId = recipe.id;

        card.innerHTML = `
            <button class="favorite-btn" aria-label="Toggle favorite">
                <svg class="heart-icon" width="24" height="24" viewBox="0 0 24 24" 
                fill="var(--fill-color)" stroke="var(--stroke-color)" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
            </button>
            <img src="${recipe.image}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <p>${recipe.readyInMinutes} mins | Serves ${recipe.servings}</p>
            <div class="nutrition-info"></div>
            <a href="${recipe.sourceUrl}" target="_blank" class="recipe-link">View Recipe</a>
        `;

        const favBtn = card.querySelector(".favorite-btn");
        const recipeId = recipe.id;

        if (favorites.includes(recipeId)) {
            favBtn.classList.add("favorited");
            card.classList.add("favorite-card");
        }

        favBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (favBtn.classList.contains("favorited")) {
                favBtn.classList.remove("favorited");
                card.classList.remove("favorite-card");
                favorites = favorites.filter(id => id !== recipeId);
            } else {
                favBtn.classList.add("favorited");
                card.classList.add("favorite-card");
                favorites.push(recipeId);
            }
            saveFavorites();
        });

        
        card.addEventListener("click", async () => {
            card.classList.toggle("active");

            const nutritionDiv = card.querySelector(".nutrition-info");
            nutritionDiv.innerHTML = "<p>Loading nutrition info...</p>";

            try {
                const fdcResults = await searchFood(recipe.title);
                if (!fdcResults || fdcResults.length === 0) {
                    nutritionDiv.innerHTML = "<p>No nutrition data found.</p>";
                    return;
                }

                const firstResult = fdcResults[0];
                const foodDetails = await getFoodDetails(firstResult.fdcId);

                let calories, protein, fat, carbs;

                if (foodDetails.labelNutrients) {
                    const ln = foodDetails.labelNutrients;
                    calories = ln.calories?.value ?? "N/A";
                    protein = ln.protein?.value ?? "N/A";
                    fat = ln.fat?.value ?? "N/A";
                    carbs = ln.carbohydrates?.value ?? "N/A";
                } else if (foodDetails.foodNutrients) {
                    const nutrients = foodDetails.foodNutrients.map(n => ({
                        name: n.nutrient?.name || n.nutrientName,
                        value: n.amount || n.value,
                    }));
                    calories = nutrients.find(n => /energy|calories/i.test(n.name))?.value ?? "N/A";
                    protein = nutrients.find(n => /protein/i.test(n.name))?.value ?? "N/A";
                    fat = nutrients.find(n => /fat|lipid/i.test(n.name))?.value ?? "N/A";
                    carbs = nutrients.find(n => /carbohydrate|carb/i.test(n.name))?.value ?? "N/A";
                }

                nutritionDiv.innerHTML = `
                    <p><strong>Calories:</strong> ${calories} kcal</p>
                    <p><strong>Protein:</strong> ${protein} g</p>
                    <p><strong>Fat:</strong> ${fat} g</p>
                    <p><strong>Carbs:</strong> ${carbs} g</p>
                `;
            } catch (error) {
                console.error("Error loading nutrition info:", error);
                nutritionDiv.innerHTML = "<p>Error loading nutrition data.</p>";
            }
        });

        results.appendChild(card);
    });
});