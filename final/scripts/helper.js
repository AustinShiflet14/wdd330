import { SPOON_KEY } from "./api.js"; // or wherever you store your Spoonacular key

export async function getRecipesByIds(ids) {
    const results = [];

    for (let id of ids) {
        try {
            const response = await fetch(
                `https://api.spoonacular.com/recipes/${id}/information?apiKey=${SPOON_KEY}`
            );
            if (!response.ok) {
                console.error(`Failed to fetch recipe ${id}:`, response.status);
                continue;
            }
            const data = await response.json();
            results.push(data);
        } catch (error) {
            console.error(`Error fetching recipe ${id}:`, error);
        }
    }

    return results;
}
