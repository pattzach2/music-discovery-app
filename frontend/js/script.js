async function test() {
    try {
        const response = await fetch(`/.netlify/functions/api/getrecipes`);
        const data = await response.json();

        console.log(data);

    } catch (error) {
        console.error('Error fetching recommendations:', error);
    }
}