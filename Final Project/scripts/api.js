const SPOON_KEY = "3eec258d04a947cb9ba1989c397b8614";

export async function getRecipes(query) {
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&addRecipeInformation=true&number=10&apiKey=${SPOON_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch recipes");
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error fetching recipes:", error);
        return [];
    }
}
