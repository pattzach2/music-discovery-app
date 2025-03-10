import express from 'express';
import serverless from 'serverless-http';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const router = express.Router();

const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.spoonacular.com/recipes/complexSearch';

router.get('/getrecipes', async (req, res) => {
    try {
        const response = await fetch(BASE_URL + '?query=pasta', {
            headers: {
                'x-api-key': API_KEY
            }
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({ error: 'Failed to fetch recipes' });
    }
});

app.use('/.netlify/functions/api', router);

export const handler = serverless(app);
