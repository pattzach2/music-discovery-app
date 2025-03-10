import request from "supertest";
import { handler } from "../netlify/functions/api.js";

describe ("Recipe API", () => {
    it ("should return recipe data for valid diet and ingredients", async () => {
        const res = await request(handler)
            .get("/.netlify/functions/api/getrecipes?diet=vegetarian&ingredients=chicken,tomato")
            .send();
        
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("results");
        expect(Array.isArray(res.body.results)).toBe(true);
    });
});