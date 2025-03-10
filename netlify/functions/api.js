import express from 'express';
import serverless from 'serverless-http';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const router = express.Router();

const API_KEY = "ec74cc8195024ee6a933237b3adc6613";

router.get('/getrecipes', async (req, res) => {
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/716429/information?apiKey=${API_KEY}&includeNutrition=true`);
        const data = await response.json();

        res.json(data);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({ error: 'Failed to fetch recipes' });
    }
});

app.use('/.netlify/functions/api', router);

export const handler = serverless(app);
