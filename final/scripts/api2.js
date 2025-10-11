const FDC_KEY = "Y5orqQbppYqSz7C1Se6hqcdzra4rCYuf3GskA1Nh";

export async function searchFood(query) {
    try {
        const response = await fetch(
        `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(query)}&api_key=${FDC_KEY}`
        );
        if (!response.ok) throw new Error("Failed to fetch food data");
        const data = await response.json();
        return data.foods || [];
    } catch (error) {
        console.error("Error fetching FoodData:", error);
        return [];
    }
}

export async function getFoodDetails(fdcId) {
    try {
        const response = await fetch(
        `https://api.nal.usda.gov/fdc/v1/food/${fdcId}?api_key=${FDC_KEY}`
        );
        if (!response.ok) throw new Error("Failed to fetch food details");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching Food Details:", error);
        return null;
    }
}
