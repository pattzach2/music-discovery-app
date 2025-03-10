import express from 'express';
import serverless from 'serverless-http';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const router = express.Router();
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const getAccessToken = async () => {
    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
            },
            body: 'grant_type=client_credentials'
        });

        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error('Error getting access token:', error);
        throw new Error('Failed to get access token');
    }
};

router.get('/recommendations', async (req, res) => {
    const seedTrack = '3n3Ppam7vgaVa1iaRUc9Lp';

    try {
        const token = await getAccessToken();
        if (!token) return res.status(500).json({ error: 'Failed to get access token' });

        const response = await fetch(`https://api.spotify.com/v1/recommendations?seed_tracks=${seedTrack}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const data = await response.json();
        if (!data.tracks) return res.status(404).json({ error: 'No recommendations found' });

        res.json({
            tracks: data.tracks.map(track => ({
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                preview_url: track.preview_url
            }))
        });
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        res.status(500).json({ error: error });
    }
});

app.use('/.netlify/functions/api', router);

export const handler = serverless(app);
