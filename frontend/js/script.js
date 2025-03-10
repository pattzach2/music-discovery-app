document.getElementById("recipeForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const diet = document.getElementById("diet").value.trim();
    const ingredients = document.getElementById("ingredients").value.trim();

    const response = await fetch(`/.netlify/functions/api/getrecipes?diet=${encodeURIComponent(diet)}&ingredients=${encodeURIComponent(ingredients)}`);
    const data = await response.json();

    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";

    if (data.results && data.results.length > 0) {
        data.results.forEach(recipe => {
            const recipeCard = document.createElement("div");
            recipeCard.classList.add("recipe-card");

            recipeCard.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.title}">
                <h3>${recipe.title}</h3>
                <a href="https://spoonacular.com/recipes/${recipe.title.replace(/\s+/g, '-').toLowerCase()}-${recipe.id}">View Recipe</a>
            `;

            resultsContainer.appendChild(recipeCard);
        });
    } else {
        resultsContainer.innerHTML = "<p>No recipes found. Try different ingredients or dietary restrictions.</p>";
    }
});