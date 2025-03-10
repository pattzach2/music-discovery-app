async function test() {
    try {
        const response = await fetch(`/.netlify/functions/api/getrecipes`);
        const data = await response.json();

        console.log(data);

    } catch (error) {
        console.error('Error fetching recommendations:', error);
    }
}

document.getElementById("recipeForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const diet = document.getElementById("diet").value;
    const ingredients = document.getElementById("ingredients").value;

    const response = await fetch(`/.netlify/functions/api/getrecipes?diet=${encodeURIComponent(diet)}&ingredients=${encodeURIComponent(ingredients)}`);
    const data = await response.json();

    console.log(data);
});