import express from 'express';
import { validate } from '../middlewares/validate';
import { RestaurantSchema, type Restaurant } from '../schemas/restaurant';
import { initializeRedisClient } from '../utils/client';
const router = express.Router();

router.post("/", validate(RestaurantSchema), async (req, res) => {
    const data = req.body as Restaurant;
    const client = await initializeRedisClient();
    res.send("hello world")
})

export default router;