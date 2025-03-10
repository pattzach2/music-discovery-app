async function test() {
    try {
        const response = await fetch(`/api/recommendations`);
        const data = await response.json();

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
}