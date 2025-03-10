document.addEventListener('DOMContentLoaded', async () => {
    const city = "London";  // You can use any city here for the weather app
    try {
        // Fetching recommendations from the backend
        const response = await fetch(`/api/recommendations`);
        const data = await response.json();

        // Log the recommendations
        if (data.tracks) {
            console.log('Recommended Songs:');
            data.tracks.forEach(track => {
                console.log(`Track: ${track.name} by ${track.artist} from the album "${track.album}"`);
                console.log(`Preview: ${track.preview_url}\n`);
            });
        }
    } catch (error) {
        console.error('Error fetching recommendations:', error);
    }
});
