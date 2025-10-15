export const SPOON_KEY = "03a4b935d4e6486a91c41d26a2cdf736";

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
